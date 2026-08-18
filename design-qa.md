# JC Roofing & Joinery Local QA

## Scope

- Brand: `JC Roofing & Joinery LTD`
- Local preview: `http://127.0.0.1:4179/`
- Routes: `/`, `/roof-installations-repairs`, `/joinery`, `/contact-us`, `/privacy-policy`
- Delivery boundary: local only; no deployment, analytics, external form submission, DNS change, or Git publication.

## Command validation

- `npm run build`: passed.
- Sites package outputs: `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json` created.
- `npm run test:sites`: passed, 4 of 4 tests.
- Runtime-media scan: all 15 referenced image, poster, and video paths exist.
- Hero videos: local H.264 video-only files at a maximum width of 1920 pixels.
- Palette contrast:
  - Chestnut on cream: 9.85:1.
  - Burnt sienna on cream: 4.64:1.
  - White on burnt sienna: 6.64:1.
  - White on chestnut: 14.07:1.

## Route and viewport matrix

Every route was directly loaded at 1440, 1280, 768, 390, and 320 pixels wide. All 25 combinations returned HTTP 200 with:

- the expected route title;
- document width equal to the viewport width;
- no broken images;
- no failed requests;
- no console errors;
- no external runtime media or script requests;
- no inherited brand, location, or experience strings.

The closed off-canvas drawer and curved wave artwork intentionally extend beyond their clipped containers. They do not create document-level horizontal scrolling.

## Visual evidence

Desktop and mobile full-page captures are stored in `output/playwright/`:

- `home-1440.png` and `home-390.png`
- `roof-installations-repairs-1440.png` and `roof-installations-repairs-390.png`
- `joinery-1440.png` and `joinery-390.png`
- `contact-us-1440.png` and `contact-us-390.png`
- `privacy-policy-1440.png` and `privacy-policy-390.png`
- `home-reduced-motion-390.png`

Visual review confirmed the original route layouts, section order, wave treatments, card grids, image masks, dark sections, footer structure, and responsive reflow remain intact with the JC identity and warm-artisan palette.

## Interaction checks

- Drawer opened at mobile width, exposed all four navigation links, and closed through route navigation.
- Internal navigation updated the title and URL; browser Back and Forward restored the correct pages.
- Review Next control advanced from the roofing/homeowner examples to the homeowner/joinery examples.
- Cookie Settings opened, optional preferences changed, and the JC-specific preference key persisted only in local storage.
- Contact panel advanced to Novas Agency and telephone actions; both destinations were correct.
- Required email validation rejected an empty field.
- Email-format validation rejected `not-an-email`.
- A valid test entry plus local CAPTCHA produced the on-page success state: “No information was sent or stored.”
- No request was emitted when the local form completed.
- Telephone actions use `tel:+447483260885`.
- Email actions use `mailto:help@novasagency.com`.
- Former map, social, review, chat, and QR positions link to `https://novasagency.com`.
- Keyboard Tab focus revealed the skip link with a visible browser outline.

## Motion and media checks

- Home, roofing, and joinery videos loaded from local MP4 files and reached ready state 4 with local poster URLs.
- With reduced motion enabled, the hero video was hidden, the generated poster remained visible, animations were reduced to 0.01 milliseconds, and the page retained its 390-pixel document width.

## Content and asset checks

- All original runtime raster, video, map, icon, and logo files were removed from the copy.
- No original identity, contact, service-area, history, cookie key, hidden/mobile string, or media filename remains.
- All stock media is stored locally and documented in `ASSET-CREDITS.md`.
- Named endorsements and inherited company-history claims were replaced with clearly illustrative portfolio wording.
- Template 9 source digest before and after: `551aea09761fbc6fc29659c277a28d8de8e30d99830ae9d3acd340eeb8cdcf69`.
- Website Streamline protected-master verification: all four masters passed after completion.

Final result: passed.

## Follow-up image-variety pass — 24 July 2026

- Replaced the home First Fix Joinery and Second Fix Joinery thumbnails with two distinct local images.
- Replaced the joinery introduction image beside “Bespoke Joinery Solutions Tailored to Your Needs”.
- Replaced every card image in “The Structural Foundation” and “The Finishing Touches”.
- The joinery introduction and 13 service cards now use 14 unique local image sources.
- Every replacement loaded with a non-zero natural width and meaningful alt text.
- Desktop Playwright check at 1440 pixels: no horizontal overflow, broken images, or console errors.
- Mobile Playwright check at 390 pixels: no horizontal overflow or broken images.
- Updated visual evidence:
  - `output/playwright/joinery-images-1440.png`
  - `output/playwright/joinery-images-390.png`
  - `output/playwright/home-service-images-1440.png`
- `npm run build`: passed after the image changes.
- `npm run test:sites`: passed, 4 of 4 tests.

## Colour joinery and unique roofing revision — 24 July 2026

- Replaced the three home service-card photographs with brighter, clearly differentiated trade scenes.
- Replaced the two-image “A Team You Can Trust” stack with full-colour joinery and roofing photography.
- Replaced all 13 joinery service-card photographs with a wood-led set featuring timber frames, joinery tools, fitted timber, flooring and workshop craftsmanship.
- Replaced all nine roofing service-card photographs with nine distinct scenes covering slate, detailing, weatherproof systems, tile installation, repair inspection, aerial survey, leak work, conversion and storm damage.
- Updated every affected alt description and documented each local source in `ASSET-CREDITS.md`.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4 of 4 tests.
- Joinery desktop at 1440 pixels: 13 cards, 13 unique sources, all images loaded, no overflow and no console errors.
- Roofing desktop at 1440 pixels: nine cards, nine unique sources, all images loaded and no overflow.
- Joinery mobile at 390 pixels: all 13 card images loaded and document width remained exactly 390 pixels.
- Home desktop: both revised trust-stack images loaded, no broken images and no overflow.
- Updated visual evidence:
  - `output/playwright/joinery-wood-theme-1440.png`
  - `output/playwright/joinery-wood-theme-390.png`
  - `output/playwright/roofing-unique-theme-1440.png`
  - `output/playwright/home-team-theme-1440.png`

## Targeted joinery revision — 24 July 2026

- Replaced the Laminate Flooring card image with the close installation image previously used for solid wood, then moved the broader fitted-floor scene to Solid Wood Flooring so both cards remain unique and accurate.
- Replaced the image beside “Expert Joinery Services / Bespoke Joinery Solutions Tailored to Your Needs”.
- Replaced the main joinery photograph in the home “A Team You Can Trust, Quality That Lasts” image stack.
- Removed the Plasterboarding card from “The Structural Foundation”; the first-fix section now contains six cards.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4 of 4 tests.
- Joinery desktop at 1440 pixels: 12 service cards total, no Plasterboarding text, both requested replacement images loaded, no broken images and no horizontal overflow.
- Joinery mobile at 390 pixels: 12 service cards total, no Plasterboarding text, no broken images and document width remained exactly 390 pixels.
- Home desktop at 1440 pixels: the revised trust image loaded, no broken images and no horizontal overflow.
- Browser console: zero errors.
- Updated visual evidence:
  - `output/playwright/joinery-targeted-revision-1440.png`
  - `output/playwright/joinery-targeted-revision-390.png`
  - `output/playwright/home-team-targeted-revision-1440.png`

## Supplied logo integration — 24 July 2026

- Replaced the temporary generated JC monogram and separate text lockup with the supplied editable horizontal SVG.
- Used the supplied cream-backed horizontal lockup in the dark navigation drawer.
- Used the supplied social/profile mark for the floating contact control.
- Used the supplied app icon SVG with the supplied 512-pixel PNG as the browser favicon fallback.
- Preserved accessible link and control labels while keeping decorative logo images silent to screen readers.
- Repaired one invalid ampersand in the supplied SVGs' internal path identifiers; artwork paths, colours, and geometry were not changed.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4 of 4 tests.
- Home and contact desktop at 1440 pixels: header, drawer, contact-surface and floating-control variants loaded with no broken images or horizontal overflow.
- Home mobile at 390 pixels: the header and floating-control marks remained legible, the drawer lockup fitted cleanly, and document width remained exactly 390 pixels.
- Browser console: zero errors.
- Updated visual evidence:
  - `output/playwright/logo-integration-home-1440.png`
  - `output/playwright/logo-integration-drawer-1440.png`
  - `output/playwright/logo-integration-home-clean-390.png`
  - `output/playwright/logo-integration-drawer-390.png`
  - `output/playwright/logo-integration-contact-1440.png`

## Drawer and footer refinement — 24 July 2026

- Removed the Novas Agency QR code from the shared footer on every route.
- Replaced the cream-backed drawer lockup with the transparent supplied horizontal logo, rendered as a high-contrast white reverse mark over the dark roof background.
- `npm run build`: passed.
- `npm run test:sites`: passed, 4 of 4 tests.
- Drawer desktop at 1440 pixels and mobile at 390 pixels: transparent reverse logo loaded cleanly with no background panel, clipping or horizontal overflow.
- Footer desktop at 1440 pixels: QR image and link are absent and the remaining contact layout reflows cleanly.
- Browser console: zero errors.
- Updated visual evidence:
  - `output/playwright/drawer-transparent-logo-1440.png`
  - `output/playwright/drawer-transparent-logo-390.png`
  - `output/playwright/footer-without-qr-1440.png`
