#!/usr/bin/env python3
"""Work out when each sentence of a script is spoken in one continuous narration file.

    python3 align.py script.json narration.mp3 timeline.json [--overrides overrides.json] [--tail 1.6]

script.json   {"lines": [{"head": "Scene title", "sentences": ["First sentence.", "Second."]}, ...]}
              Each line is one scene. Write it exactly as it was pasted into the voice tool.
overrides     optional {"19": [silence_start, silence_end]}: force sentence 19 to end at that pause.
timeline.json is what scene.html reads: per line {head,start,end,s:[{text,s,e}]}, plus total and audio length.

How it works: ffmpeg finds the pauses; a small dynamic program picks, for each sentence boundary, the pause
that best fits the sentence's share of the words, favouring long pauses. If pocketsphinx is installed, the first
words after every boundary are recognised and compared with the script, and doubtful boundaries are flagged.
ALWAYS read the table it prints: a boundary that lands inside a sentence needs an override.
"""
import json, re, subprocess, sys, difflib

def main():
    a = sys.argv[1:]
    if len(a) < 3: sys.exit(__doc__)
    script, audio, out = a[0], a[1], a[2]
    ov = json.load(open(a[a.index("--overrides") + 1])) if "--overrides" in a else {}
    tail = float(a[a.index("--tail") + 1]) if "--tail" in a else 1.6
    lines = json.load(open(script))["lines"]
    sent = [(li, s) for li, l in enumerate(lines) for s in l["sentences"]]
    total = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio]))
    err = subprocess.run(["ffmpeg", "-i", audio, "-af", "silencedetect=noise=-38dB:d=0.12", "-f", "null", "-"], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", err)]
    en = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", err)]
    sil = list(zip(st, en))
    words = [len(re.findall(r"[A-Za-z']+", s)) for _, s in sent]
    cum = [0]
    for w in words: cum.append(cum[-1] + w)
    T0, T1 = 0.55, total - 0.4
    pred = [T0 + (T1 - T0) * cum[k] / cum[-1] for k in range(1, len(sent))]
    mid = [(x + y) / 2 for x, y in sil]; dur = [y - x for x, y in sil]
    n, K, INF = len(sil), len(pred), 1e18
    if n < K: sys.exit(f"only {n} pauses found for {K} boundaries: is this the right audio file?")
    cost = [[INF] * n for _ in range(K)]; prev = [[None] * n for _ in range(K)]
    for i in range(n): cost[0][i] = abs(mid[i] - pred[0]) / 3 - 1.2 * dur[i]
    for k in range(1, K):
        for i in range(n):
            best, bj = INF, None
            for j in range(i):
                if cost[k - 1][j] < best: best, bj = cost[k - 1][j], j
            if bj is not None: cost[k][i] = best + abs(mid[i] - pred[k]) / 3 - 1.2 * dur[i]; prev[k][i] = bj
    i = min(range(n), key=lambda i: cost[K - 1][i]); path = [i]
    for k in range(K - 1, 0, -1): i = prev[k][i]; path.append(i)
    bounds = [list(sil[i]) for i in path[::-1]]
    for key, val in ov.items():
        if key.isdigit(): bounds[int(key) - 1] = val
    starts = [0.08] + [b[1] for b in bounds]; ends = [b[0] for b in bounds] + [total - 0.2]

    # optional recognition check of the first words after each boundary
    heard = [""] * len(sent)
    try:
        from pocketsphinx import Decoder
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", audio, "-ar", "16000", "-ac", "1", "-f", "s16le", "-"], capture_output=True).stdout
        d = Decoder(samprate=16000)
        for k, s in enumerate(starts):
            d.start_utt(); d.process_raw(raw[int((s - 0.05) * 16000) * 2:int((s + 1.5) * 16000) * 2], full_utt=True); d.end_utt()
            heard[k] = d.hyp().hypstr if d.hyp() else ""
    except Exception as e:
        print("(pocketsphinx not available: boundaries are not speech-checked)", e)

    k = 0; tl = []
    for l in lines:
        items = []
        for s in l["sentences"]:
            items.append({"text": s, "s": round(starts[k], 3), "e": round(ends[k], 3)}); k += 1
        tl.append({"head": l["head"], "start": items[0]["s"], "end": items[-1]["e"], "s": items})
    json.dump({"total": round(total + tail, 3), "audio": round(total, 3), "lines": tl}, open(out, "w"), indent=1)

    print(f"{len(sent)} sentences, {len(sil)} pauses, audio {total:.1f}s")
    flagged = 0
    for k, (li, s) in enumerate(sent):
        exp = " ".join(re.sub(r"[^a-z' ]", "", s.lower()).split()[:4])
        r = difflib.SequenceMatcher(None, heard[k], exp).ratio() if heard[k] else None
        flag = "" if r is None or r > 0.35 else "   <-- CHECK"
        flagged += bool(flag)
        print(f"{k + 1:3d} {starts[k]:7.2f}-{ends[k]:7.2f}  {s[:48]:48s}" + (f" heard: {heard[k][:30]}" if heard[k] else "") + flag)
    print("flagged:", flagged, "(a flag means the boundary may sit inside a sentence: listen, then add an override)")

main()
