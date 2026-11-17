# Reev Cannon livestream overlays

Self-contained 1920×1080 browser-source files for Prism Live Studio (Web widget). Original art and Web Audio tones only — no Rockstar or GTA logos, HUD, or soundtrack.

These files live on the box. **Prism on the Galaxy Tab needs a public HTTPS URL** to load them. Hosting this folder (or uploading it somewhere Michael controls) is a needs-Michael item. Do not upload or publish these until he says so.

## How to add in Prism

1. Host this whole `overlays/` folder (fonts must stay next to the HTML).
2. My Studio → Widget → Web → paste the public URL, including any test params.
3. Drag the widget to fill the 16:9 canvas, then Lock layer.
4. Use at most two Web sources if you also have the Restream Chat embed (Prism mobile max is 4).

## Test URL parameters

Add `preview=1` to freeze the overlay at its peak (used for PNG previews). Add `demo=1` to replay the animation on a loop, with original sound. `lang=en`, `lang=hi`, or `lang=both` (default) for bilingual text.

| File | Example test URL |
|---|---|
| `p1-star-drop.html` | `?preview=1&type=stars&name=Alex&amount=50` — `type` = stars, superchat, sticker, jewels |
| `p2-emerald-crown.html` | `?preview=1&who=laowow` — `who` = laowow, luzminda, soriful; optional `name`, `amount` |
| `p3-vice-neon.html` | `?preview=1&type=member&name=Dee` — `type` = sub, member, gift; `count` for gifts |
| `p4-first-light.html` | `?preview=1&country=india&name=Priya` — `country` = india, uk, us, canada, first, other; `country_name` for other |
| `x2-heat.html` | `?preview=1&level=5` — `level` = 0–5; also `#level=3` or `postMessage({level:3})` |
| `x4-hype.html` | `?preview=1` or `?demo=1` |
| `starting-soon.html` | `?lang=both` (default), `?lang=en`, `?lang=hi` |
| `brb.html` | same `lang` params |

PNG previews (dark preview background, not used on the live transparent alerts) are in `previews/`.
