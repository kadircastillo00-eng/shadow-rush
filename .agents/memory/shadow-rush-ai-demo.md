---
name: Shadow Rush AI Demo mode
description: How the recording-only autopilot (Demo IA) works and where its safety guarantees live
---

Shadow Rush already has a full "Demo IA" autopilot for recording footage (`aiDemo` flag on the `ShadowRush` class in `game.js`).

- Enable via Settings → "MODO DEMO IA (GRABACIÓN)" toggle, or open the app with `?demo=1` in the URL (auto-enables the flag before the player presses PLAY; doesn't auto-start the run).
- `_aiControl()` keeps the player's y-position inside a safe band derived from the nearest un-passed obstacle gap (`_aiFindGap`), using the same ballistic integrator as `_updatePlayer` to predict ~0.16s ahead. This check is purely about the player's own vertical physics, not obstacle horizontal speed, so it stays correct even as stage speed scales unbounded.
- `_die()` has a hard early-return when `aiDemo` is true — an unconditional safety net so the AI can never trigger game over even if the steering logic misjudges.
- Ads are suppressed in demo mode (`adMgr.hideBanner()` / interstitial skipped) so recordings run uninterrupted.
- World index caps at 14 (`getWorldIdx`), so infinite play cycles through all 15 worlds once then stays in the final world — by design, not a bug.
- `aiDemo` is session-only (not persisted to localStorage) and fully isolated from normal player state — normal play is unaffected.

**Why:** documented here because a future agent asked to touch death/collision or AI-adjacent code should know this safety net exists and must be preserved, and should reuse `_aiFindGap`/`_aiControl` rather than re-deriving gap-finding logic.
