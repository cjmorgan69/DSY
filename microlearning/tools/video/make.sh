#!/usr/bin/env bash
# Build a module's intro video from its video-src folder and the recorded narration.
#   tools/video/make.sh microlearning/<module>/video-src narration.mp3 microlearning/<module>/intro.mp4
# Needs: ffmpeg, node + playwright (Chromium), python3. pocketsphinx is optional (pip install pocketsphinx).
# Env: FPS (default 24; use 4 for a quick test), WORK (scratch dir, default a new temp dir),
#      PY (python with pocketsphinx installed, default python3).
set -euo pipefail
SRC=$(cd "$1" && pwd); AUDIO=$(cd "$(dirname "$2")" && pwd)/$(basename "$2"); OUT=$(cd "$(dirname "$3")" && pwd)/$(basename "$3")
HERE=$(cd "$(dirname "$0")" && pwd); FPS=${FPS:-24}; PY=${PY:-python3}; WORK=${WORK:-$(mktemp -d)}; mkdir -p "$WORK"
OV=(); [ -f "$SRC/overrides.json" ] && OV=(--overrides "$SRC/overrides.json")
"$PY" "$HERE/align.py" "$SRC/script.json" "$AUDIO" "$WORK/timeline.json" "${OV[@]}"
python3 - "$SRC/scene.html" "$WORK" <<'PY'
import sys; s=open(sys.argv[1]).read(); open(sys.argv[2]+"/scene_final.html","w").write(s.replace("TIMELINE",open(sys.argv[2]+"/timeline.json").read()))
PY
node "$HERE/render.js" "$WORK" "$FPS"
TAIL=$(python3 -c "import json;d=json.load(open('$WORK/timeline.json'));print(round(d['total']-d['audio'],2))")
ffmpeg -y -loglevel error -framerate "$FPS" -i "$WORK/frames/f%05d.jpg" -i "$AUDIO" -c:v libx264 -pix_fmt yuv420p -crf 22 -preset medium \
  -c:a aac -b:a 160k -af "apad=pad_dur=$TAIL" -movflags +faststart -shortest "$OUT"
echo "wrote $OUT (work files in $WORK; delete them when done)"
