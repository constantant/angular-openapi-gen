# Chrome Web Store — publishing assets & checklist

## Image assets (in this folder)

| File | Size | Store requirement |
|---|---|---|
| `icon128.png` | 128×128 | **Required.** Store icon. Artwork is 96×96 centered with 16px transparent padding, per CWS guidelines. |
| `icon48.png` / `icon32.png` / `icon16.png` | 48/32/16 | Extension icons for manifest (toolbar, management page, favicon). |
| `small-promo-tile-440x280.png` | 440×280 | **Required** for store listing visibility. |
| `marquee-promo-tile-1400x560.png` | 1400×560 | Optional, needed if featured. |
| `screenshot-1-1280x800.png` | 1280×800 | **At least 1 required** (up to 5). 1280×800 or 640×400, no alpha. Replace/extend with real UI captures before publishing. |

## manifest.json

Merge `manifest-icons.snippet.json` into your manifest and place PNGs in `icons/`.

## Listing checklist (non-image items the store also requires)

- [ ] Name (≤ 75 chars): `openapi-resource-gen`
- [ ] Short description (≤ 132 chars), e.g.:
      `Tree-shakeable, InjectionToken-based Angular data access from your OpenAPI spec. Carry only what you need.`
- [ ] Detailed description
- [ ] Category (Developer Tools) + language
- [ ] Privacy policy URL + data-use disclosures (required even if you collect nothing)
- [ ] Single-purpose statement & permission justifications
- [ ] Verified publisher email; one-time $5 developer registration fee
- [ ] ZIP of the extension (manifest v3) uploaded via the Developer Dashboard

## Brand tokens

- Background: `#140A21` (deep violet-black), elevated `#1F1133`
- Gradient: `#F637E3` (pink) → `#8514F5` (violet)
- Text on dark: `#F4F0FA` · dimmed `#9C8FB8`
- Terminal CREATE green: `#3DDC91`
- Type: JetBrains Mono (Medium / ExtraBold)
- Mark: chevron "A" with sliced leg fragment — the fragment drift is the brand
  gesture; reuse small drifting fragments as decorative elements.
