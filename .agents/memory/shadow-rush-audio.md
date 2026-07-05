---
name: Shadow Rush audio architecture
description: Web Audio API architecture for Shadow Rush — music bus, jingle system, world BGM dispatch, known bugs fixed
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
- `setWorld(w)` — sets `_world` index (0–14) so `_seqLoop` dispatches correct BGM

## World BGM dispatch

`_gameStep(s16, bar, t, step)` now dispatches to `_bgm0–_bgm14()` based on `this._world`.
Each BGM method uses world-appropriate instruments:
- `_pad(freqs, t, dur, vol)` — polyphonic sustained chords (detune-spread sines)
- `_bell(freq, t, dur, vol)` — triangle pluck with harmonic shimmer
- `_drone(freq, t, dur, vol)` — sine with LFO vibrato (both main + LFO nodes tracked)
- `_lead(freq, t, dur, vol, type)` — filtered oscillator melody
- `_perc(t, f1, f2, dur, vol)` — pitch-sweep tom/ethnic drum
- `_acid(freq, t, dur, vol, decay)` — square wave with resonant lowpass envelope

BPM formula (world-aware): `bpmBase + min(50, (stage-1)*3)` using `WORLDS[world].bpmBase`.

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
