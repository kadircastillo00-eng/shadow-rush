---
name: Shadow Rush audio architecture
description: How music vs SFX gain nodes are wired in the game audio engine.
---

- Music bus separates BGM fades from SFX: `_mg()` controls the music gain node, `_g()` controls the SFX gain node.
- The original `_bass`/`_melody` helpers had a `g.gain.gain` double-indirection bug (accessing `.gain` on an already-resolved gain value instead of the AudioParam) — watch for this pattern when touching synth helper functions.
