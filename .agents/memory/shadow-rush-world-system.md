---
name: Shadow Rush world progression system
description: 15-world progression architecture — WorldRenderer, world index formula, ShadowRush integration points
---

## World index formula

`getWorldIdx(stage) = Math.min(14, Math.floor((stage-1)/3))`
Stages 1–3 → world 0, stages 4–6 → world 1, …, stages 43–45 → world 14.

## WorldRenderer (worlds.js)

Single class instance at `game.worldRenderer`. Four public methods:
- `drawBG(ctx, W, H, elapsed, worldIdx, game)` — dispatches to `_bg0–_bg14`; replaces the static sky+grid+stars background entirely
- `drawObstacle(ctx, o, elapsed, ghostA, worldIdx, colorHue)` — dispatches to `_obs0–_obs14`; replaces old gradient fillRect approach
- `spawnAmbient(game, dt, worldIdx)` — dispatches to `_amb0–_amb14`; pushes plain objects with `update(dt)` and `draw(ctx)` and `life` into `game.particles`
- `drawTransition(ctx, W, H, transition, elapsed)` — cinematic world title: 0.5s fade-in → 1.4s hold → 0.5s fade-out (total 2.4s, timer in `_worldTransition.t`)

## ShadowRush integration points

- **constructor**: `this.worldRenderer = new WorldRenderer(); this._worldIdx = 0; this._worldTransition = null;`
- **`_startGame()`**: resets `_worldIdx=0`, `audio.setWorld(0)`, starts a world-0 transition on game start
- **`_advanceStage()`**: calls `getWorldIdx(this.stage)`, detects worldChanged, updates `audio.setWorld()`, calls `audio.startGameBGM()` for crossfade, sets `_worldTransition`
- **`_update()`**: calls `worldRenderer.spawnAmbient()` each frame; advances `_worldTransition.t` and clears when >2.5s
- **`_spawnObstacles()`**: no longer passes `theme` — WorldRenderer uses `worldIdx` directly
- **`_render()`**: `isDark` rule still gets plain black fill; otherwise delegates to `worldRenderer.drawBG()`; obstacles use `worldRenderer.drawObstacle()`; transition overlay drawn last before `ctx.restore()`

## Important: obstacle object shape

Obstacles no longer have a `theme` property. Shape: `{x, y, w, h, spd, fl}`.
`OBS_THEMES` and `stageObsTheme()` were removed from game.js (no longer needed).

## Known fix: `_bg11` Crystal Cave glow

Original code tried to convert hex color strings via `.replace('rgb','rgba')` — only works on `rgb(...)` strings, not hex. Fixed to use `ctx.shadowColor = cc; ctx.shadowBlur = 22` before the fill instead, then reset `ctx.shadowBlur = 0` after the loop.

**Why:** Canvas radial gradient `addColorStop` requires valid CSS color; `cc.replace(')',',0.15)')` on a hex string like `#cc44ff` produces `#cc44ff` (no change) → invalid CSS → DOMException.
