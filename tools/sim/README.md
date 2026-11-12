# Treatment simulator (`/tools/sim/`) - prototype, 12 Nov 2026

A first-person job on a phone or iPad. The student talks or taps; the patient, family, driver and EOC Clinician
answer in recorded voices; the obs change with time and treatment; a debrief compares what was done with the protocol.
First case: David, 54, bee sting anaphylaxis (the walk-through `/modules/anaphylaxis/`). Student sign-in gate.
Live 12 Nov 2026. Not linked from any page yet.

## Files

- `index.html` - the page and its styles (class names are prefixed so they don't clash with `training/theme.css`).
- `sim.js` - the engine: clock, obs model, speech in (browser `SpeechRecognition`, `en-AU`) and out (one `<audio>`
  element playing `audio/<case>/<line id>.mp3`), confirm and choice boxes, monitor strip, notes, debrief page.
  It holds no clinical content.
- `cases/david.js` - everything clinical for the case: the lines, the obs model, the actions with their spoken
  patterns and rules, the events (`tick`) and the debrief checklist. The header lists the sources and what is
  DSY-written.
- `cases/david.scene.js` - the drawn scene (SVG) as a function of the state.
- `audio/david/*.mp3` - one file per line id in `SIM_CASE.lines`.

## How a case works

- The sim clock starts at the patient's side (David: 1442). It runs in real time, and each action adds its `secs`.
- Obs: with no adrenaline each value drifts by `model.drift` per minute; after each dose it moves toward that dose's
  target (`dose1`, `dose2`: the walk-through's obs sets) with time constant `model.tau` minutes. Oxygen adds
  `model.oxygen` to SpO2. Values show on the monitor strip only once measured (HR and SpO2 are live once the monitor is on).
- Rules live in each action's `run`: for example IM adrenaline is refused until the EOC Clinician has advised it,
  the EpiPen has been used and 5 minutes have passed; a wrong volume is caught by the driver at the medication check
  (nothing is given). Medicines always get a repeat-back and a Confirm.
- Voice: what the student says is matched against each visible action's `say` patterns (longest match wins). When a
  box is open, speech is matched against that box's options. Anything not understood is shown, and the buttons still work.
- The job ends on Transport (debrief), on End, or if he has no adrenaline until SBP reaches `model.collapseSbp`.

## Voices (ElevenLabs, `eleven_v4`, one take per line, about 2,700 credits for David's 40 lines)

| Who | Voice | voice_id | Delivery tag |
| --- | --- | --- | --- |
| David | James (Australian, 40s) | `Zpq4UaaRVMryEw8KSTWI` | `[short of breath, wheezing, hoarse]`, easing to `[relieved, slightly husky voice]` |
| His wife | Anne (Australian, middle aged) | `ZkDZ5VCyH0GGbxO7o4aO` | `[worried]` |
| Sam, the driver | Hannah Jayne (Australian) | `M7ya1YbaeFaPXljg9BpK` | `[calm, brisk]` |
| EOC Clinician | Paul (Australian) | `WLKp2jV6nrS8aMkPPDRO` | `[calm, clear]` |

Text sent to the voice spells numbers and letters out ("I M adrenaline, five hundred micrograms", "E O C",
"one mil"). Each file is trimmed, loudness-evened (`loudnorm I=-17`) and saved mono 64 kbps. ElevenLabs flow:
"DSY treatment simulator: David (anaphylaxis) voices". To change a line: change its `text` in `cases/david.js`,
record that one line again (ask the owner first: it costs credits) and bump the `?v=` tags in `index.html`.

## Adding a case

Copy `cases/david.js` and `cases/david.scene.js`, write the case from its walk-through and protocol, record its
lines, and load the new files from `index.html` (a case picker is not built yet). Label DSY-written parts in the
header and ask the owner to review them.

## Testing

Serve the repo root (`python3 -m http.server`), block `/shared/gate.js` in Playwright, click Start, then drive it with
`window.SIM.heard("call the EOC Clinician", true)` and read `window.SIM.state()`.
