# artist-subdomains

Next.js 15 (App Router) app that serves fully custom portfolio websites for
artists on their own domains/subdomains. Each domain resolves at runtime to
an artist + theme — no code changes needed to onboard a new artist.

Read-only: all purchases/inquiries link out to `artdistrictusa.com`. No cart
or checkout lives here.

## How a request resolves

1. Artist picks a domain + theme in their ArtDistrictUSA dashboard (the
   **ADUSA Backend** repo). That choice is stored in `ArtistCustomDomain` in
   the shared database.
2. A visitor hits `johndoe.com` (or `johndoe.artsdistrictusa.com`).
   `next.config.ts` rewrites (`/:path` + `Host` header → `/:domain/:path`),
   excluding `/preview` and `/api` so those routes resolve normally.
3. `src/app/[domain]/layout.tsx` calls `getDomainConfig(domain)` and
   `getArtistData(slug)` (`src/lib/artist-api.ts`, backed by the ADUSA
   backend API), then looks up the theme via `getThemeModule(themeKey)`.
4. The resolved theme's `Layout`/`HomePage`/`ArtworksPage`/etc. render the
   artist's live content.

`src/app/preview/[theme]/[slug]` renders any theme for any artist slug
without needing a saved domain — used for QA and for generating the
marketing screenshots referenced by `/api/themes`.

## Themes — this app is the source of truth

`src/themes/registry.ts` is the single canonical list of available website
themes. The ADUSA backend does **not** hardcode themes — it calls this app's
`GET /api/themes` endpoint (see `src/app/api/themes/route.ts`) to get theme
metadata (name, description, palette, preview image) for the artist-facing
picker, and to validate a `themeKey` on save. That means:

- Adding a theme here makes it available to artists with **no backend
  deploy**.
- If this app is unreachable, the backend falls back to a small static
  snapshot (`lib/theme-catalog.ts` there) — so keep that in sync loosely,
  but it's not load-bearing day to day.

### Registering a new theme

1. **Build the components** in a new `src/themes/<key>/` folder. Copy an
   existing theme (`src/themes/gallery/` is a good template) and implement:
   `Layout`, `HomePage`, `ArtworksPage`, `ArtworkDetailPage`, `AboutPage`,
   `ContactPage` — each matching the prop shapes in `src/themes/types.ts`
   (`ThemeLayoutProps`, `ThemePageProps`, `ThemeArtworkDetailProps`).

2. **Export a `ThemeModule`** from `src/themes/<key>/index.ts` with the full
   metadata, not just the components:

   ```ts
   export const yourTheme: ThemeModule = {
       key: "yourtheme",          // unique slug — used in DB, URLs, S3 preview path
       name: "Your Theme Name",   // shown to artists in the picker
       description: "One-line pitch — the vibe, the tone, who it's for.",
       palette: ["#bgHex", "#accentHex", "#textHex"], // 3 swatches shown in the picker
       previewWidth: 1669,        // pixel size of the preview screenshot
       previewHeight: 4160,
       Layout: YourLayout,
       HomePage: YourHome,
       ArtworksPage: YourArtworks,
       ArtworkDetailPage: YourArtworkDetail,
       AboutPage: YourAbout,
       ContactPage: YourContact,
   };
   ```

3. **Register it** in `src/themes/registry.ts` — import it and add one entry
   to the `registry` object keyed by the same `key`.

4. **Upload a preview screenshot** to the `img-artdistrictusa-com` S3 bucket
   at `website-previews/<key>.png`, matching the `previewWidth`/
   `previewHeight` declared above. `GET /api/themes` builds the preview URL
   from the key, so this step is required for the artist-facing lightbox
   preview to work.

5. Deploy. `GET /api/themes` and `getThemeModule("yourtheme")` both pick it
   up immediately — nothing else to touch, in this repo or the backend.

`getThemeModule` falls back to `gallery` for an unknown key, so a bad/typo'd
`themeKey` in the database never hard-crashes a domain.

## Key files

```
middleware.ts                  # currently a no-op; actual host→domain rewrite lives in next.config.ts
next.config.ts                 # Host-header rewrite, image remote patterns, no-store cache headers
src/app/[domain]/              # Live artist site: layout resolves domain→artist→theme
src/app/preview/[theme]/[slug] # Render any theme for any artist, for QA/screenshots
src/app/api/themes/            # Public theme catalog endpoint — consumed by the ADUSA backend
src/app/api/revalidate/        # POST, x-revalidate-secret header — backend calls this after an artist saves
src/lib/artist-api.ts          # All calls to the ADUSA backend API (artist data, domain config)
src/lib/og-image.tsx           # Per-subdomain dynamic OG/Twitter card image generation
src/themes/registry.ts         # Canonical theme list — see above
src/themes/types.ts            # ThemeModule / page prop contracts every theme must satisfy
src/types/index.ts             # Product, ArtistProfile, etc. shared types
```

## Related repo

**ADUSA Backend** (`ghl-art-directory` — path map lives in the global
CLAUDE.md) is the artist dashboard/backend. Its `/api/artist-domain/*`
routes manage domain+theme selection and call back into this app's
`/api/themes` (catalog) and `/api/revalidate` (cache-busting after a save).
`ARTIST_SUBDOMAINS_URL` in that repo points at this app's deployed URL.

## Commands

```
npm run dev         # local dev server
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint          # next lint
```
