# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## JC Roofing & Joinery brand decisions

- The displayed brand is `JC Roofing & Joinery LTD`.
- Use `help@novasagency.com`, `+44 7483 260885`, and `https://novasagency.com` for every contact action.
- Keep this as a local portfolio concept. Forms must remain browser-only, and no analytics, deployment, DNS, or external form submission may be added without separate authorisation.
- Preserve the inherited five-route structure, layout, animations, responsive behaviour, and interactions.
- On mobile, the bottom-right contact launcher is a standalone WhatsApp glyph in the site palette, without an outer circular badge, halo, or shadow. Desktop retains the JC social launcher.
- Use cream `#F1D3B2` as the dominant background, chestnut `#46211A` for dark surfaces and headings, and burnt sienna `#A43820` for calls to action and highlights.
- Stock media must remain locally stored and credited in `ASSET-CREDITS.md`.
