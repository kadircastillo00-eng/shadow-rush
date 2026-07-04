---
name: Shadow Rush audio architecture
description: Web Audio API architecture for Shadow Rush — music bus, jingle system, known bugs fixed
---

## Architecture

- `_master` GainNode → destination: overall volume + mute/unmute
- `_musicBus` GainNode → `_master`: music volume + smooth fade transitions
- SFX nodes connect to `_master` directly via `_g(vol)` (with `_sfxVol` multiplier)
- BGM/jingle nodes connect to `_musicBus` via `_mg(vol)`

## Key methods

- `stopBGM(fadeTime)` / `_stopBGMNodes(fadeTime, onDone)` — fade out then stop; use callback for crossfade
- `startMenuBGM()` / `startGameBGM()` — fade out old, fade in new via `_fadeInMusic()`
- `playGameOverJingle()` — descending Am lament (~5.2s), returns ms for menu BGM delay
- `playVictoryJingle()` — rising C-major fanfare (~3.8s), plays on new high score

## Bug fixed (was in original code)

`_bass()` and `_melody()` had `g.gain.gain.setValueAtTime(...)` — double indirection (GainNode → AudioParam → undefined). Fixed to `g.gain.setValueAtTime(...)`. `_melody()` now uses `_mg(0.0001)` so the envelope ramp starts from near-zero correctly.

**Why:** `_g(vol)` and `_mg(vol)` return a GainNode. `.gain` on a GainNode is an AudioParam, not another GainNode. Calling `.gain` again on an AudioParam is undefined.

**How to apply:** Any helper that returns a GainNode: access `.gain` once to get the AudioParam, then call `.setValueAtTime()`, `.linearRampToValueAtTime()` etc directly on it.

## Mobile optimization

- Page Visibility API in `unlock()`: suspend AudioContext on `hidden`, resume on visible
- On resume, `_nextT` is resynced to `currentTime + 0.05` to avoid catch-up flood of sequencer notes
- AudioContext created only on first user gesture (existing mobile-safe pattern)

## Persisted settings (localStorage keys)

- `sr_vol` — master volume (0–1)
- `sr_music_vol` — music bus volume (0–1)
- `sr_sfx_vol` — SFX gain multiplier (0–1)
- `sr_muted` — mute all
- `sr_music` — music on/off
- `sr_sfx` — SFX on/off
