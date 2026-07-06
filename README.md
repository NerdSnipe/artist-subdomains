# artist-subdomains

A Next.js 15 application that serves fully custom portfolio websites for artists on their own domains. Each domain resolves to an artist and a theme at runtime — no code changes required to add a new artist site.

---

## How it works

1. An artist registers a custom domain (e.g. `johndoe.com` or `johndoe.artdistrictusa.com`) through their ArtDistrictUSA dashboard and picks a theme.
2. That domain + theme choice is stored in the `ArtistCustomDomain` table in the shared database.
3. When a visitor hits `johndoe.com`, Next.js middleware reads the `Host` header, rewrites the request to the internal `[domain]` route, and the app resolves the artist and theme from the API.
4. The selected theme's components render the artist's content — pulled live from the ArtDistrictUSA backend API.

All purchases and inquiries link out to `artdistrictusa.com/artist/{slug}/{product-slug}`. This app is read-only; no cart or checkout lives here.

---

## Repository layout

```
artist-subdomains/
├── middleware.ts                   # Domain → [domain] param rewrite
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Minimal root shell (<html><body>)
│   │   ├── not-found.tsx           # Shown for unregistered domains
│   │   └── [domain]/
│   │       ├── layout.tsx          # Resolves domain → theme → wraps Layout
│   │       ├── page.tsx            # Artist home page
│   │       ├── artworks/
│   │       │   ├── page.tsx        # Artwork grid
│   │       │   └── [slug]/
│   │       │       └── page.tsx    # Artwork detail
│   │       ├── about/
│   │       │   └── page.tsx        # Bio, statement, exhibitions
│   │       └── contact/
│   │           └── page.tsx        # Contact info + commissions
│   ├── lib/
│   │   └── artist-api.ts           # All API calls + helper functions
│   ├── themes/
│   │   ├── types.ts                # ThemeModule interface (the contract)
│   │   ├── registry.ts             # Maps themeKey string → ThemeModule
│   │   ├── gallery/                # Theme: Gallery
│   │   ├── studio/                 # Theme: Studio
│   │   ├── market/                 # Theme: Market
│   │   └── artisan/                # Theme: Artisan
│   └── types/
│       └── index.ts                # Shared types (ArtistProfile, Product, etc.)
├── .env.local                      # ARTIST_API_URL
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Environment variables

| Variable         | Value                                | Notes                      |
|------------------|--------------------------------------|----------------------------|
| `ARTIST_API_URL` | `https://api.artdistrictusa.com/api` | The ADUSA backend base URL |

For local development, `.env.local` already contains this value.

---

## Running locally

```bash
cd artist-subdomains
npm install
npm run dev
```

To test a specific artist's site locally, navigate to:

```
http://localhost:3000/{domainName}/
```

For example, if you have a row in `ArtistCustomDomain` with `domainName = "jane.artdistrictusa.com"`, visit:

```
http://localhost:3000/jane.artdistrictusa.com/
```

The middleware rewrite handles this automatically. No special hosts file editing needed in development.

---

## Backend: required changes

The backend for this app is the **ADUSA Backend** at:

```
/Users/nerdsnipe/DispatchProjects/ghl-art-directory/ADUSA Backend
```

### 1. Database migration

A new Prisma model was added to `prisma/schema.prisma`:

```prisma
model ArtistCustomDomain {
  id          String   @id @default(uuid())
  domainName  String   @unique   // e.g. "johndoe.com" or "johndoe.artdistrictusa.com"
  artistSlug  String             // matches ArtistProfile.slug
  themeKey    String   @default("gallery")
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([domainName])
  @@index([artistSlug])
}
```

Run the migration:

```bash
cd "/Users/nerdsnipe/DispatchProjects/ghl-art-directory/ADUSA Backend"
npx prisma migrate dev --name add-artist-custom-domain
```

This creates the `ArtistCustomDomain` table in the production database. After the migration, regenerate the Prisma client:

```bash
npx prisma generate
```

### 2. New API routes

Three new route files were added under `app/api/artist-domain/`:

```
app/api/artist-domain/
├── [domainName]/route.ts    # Public: resolve domain → artist + theme
├── me/route.ts              # Authenticated: GET + POST domain config for current artist
└── themes/route.ts          # Public: list available themes
```

These files are already written and committed. No additional wiring is needed — Next.js picks up new `app/api/` routes automatically.

#### Endpoint reference

**`GET /api/artist-domain/:domainName`** — Public

Resolves a custom domain to the artist slug and theme key. Called by this app's middleware on every request. `www.` prefix is stripped automatically.

```
GET /api/artist-domain/johndoe.com
→ 200 { success: true, data: { artistSlug: "john-doe", themeKey: "gallery", isActive: true } }
→ 404 { success: false, error: "Domain not found" }
```

**`GET /api/artist-domain/me`** — Authenticated (`x-location-id` header)

Returns the current artist's registered domain config, or `null` if they haven't set one up yet.

```
GET /api/artist-domain/me
Headers: x-location-id: {ghlLocationId}
→ 200 { success: true, data: { domainName: "johndoe.com", themeKey: "gallery", isActive: true } }
→ 200 { success: true, data: null }   (not yet configured)
```

**`POST /api/artist-domain/me`** — Authenticated (`x-location-id` header)

Creates or updates the artist's domain + theme. Uses upsert, so calling it again changes the theme or domain. Rejects if the domain is already claimed by a different artist (409).

```
POST /api/artist-domain/me
Headers: x-location-id: {ghlLocationId}
Body: { "domainName": "johndoe.com", "themeKey": "gallery" }
→ 200 { success: true, data: { id, domainName, artistSlug, themeKey, isActive, ... } }
→ 409 { success: false, error: "This domain is already registered to another artist" }
→ 400 { success: false, error: "themeKey must be one of: gallery, studio, market, artisan" }
```

**`GET /api/artist-domain/themes`** — Public

Returns the list of available themes. Used by the dashboard theme picker UI.

```
GET /api/artist-domain/themes
→ 200 { success: true, data: [ { key, name, description, screenshotUrl }, ... ] }
```

`screenshotUrl` is `null` until screenshots are captured and uploaded. Once screenshots exist, update the `themes` array in `app/api/artist-domain/themes/route.ts` with the S3/R2 URLs.

### 3. Registering themes in the VALID_THEME_KEYS list

When a new theme is added to this app, its `key` must also be added to the `VALID_THEME_KEYS` tuple in `app/api/artist-domain/me/route.ts` in the ADUSA Backend, otherwise the API will reject it with a 400 error:

```ts
// app/api/artist-domain/me/route.ts
const VALID_THEME_KEYS = ['gallery', 'studio', 'market', 'artisan', 'your-new-theme'] as const;
```

Also add it to the themes array in `app/api/artist-domain/themes/route.ts`.

### 4. Deploying the backend changes

The ADUSA Backend is a Next.js app deployed on Vercel. After the migration runs against the production database, deploy the backend with the new API routes:

```bash
vercel --prod
```

Or push to the main branch if CI/CD is configured to auto-deploy.

---

## Adding a new artist domain (manual, admin method)

Until the dashboard self-serve UI is built, insert rows directly into the database:

```sql
INSERT INTO "ArtistCustomDomain" (id, "domainName", "artistSlug", "themeKey", "isActive", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'johndoe.com',
  'john-doe',          -- must match ArtistProfile.slug exactly
  'gallery',
  true,
  now(),
  now()
);
```

Or via Prisma Studio:

```bash
cd "/Users/nerdsnipe/DispatchProjects/ghl-art-directory/ADUSA Backend"
npx prisma studio
```

Navigate to `ArtistCustomDomain` and create a record.

---

## Deploying this app (artist-subdomains)

This app is deployed as a separate Vercel project from the main frontend. To set it up:

1. Create a new Vercel project linked to this folder.
2. Set the environment variable `ARTIST_API_URL=https://api.artdistrictusa.com/api`.
3. Add the wildcard domain `*.artdistrictusa.com` to the Vercel project. This lets all ArtDistrictUSA subdomains resolve to this app.
4. For fully custom domains (e.g. `johndoe.com`), the artist adds this app's Vercel IP/CNAME to their DNS, then the domain is registered in the database as above.

Vercel handles the `Host` header automatically — the middleware reads it on every request and resolves the correct artist.

---

## ISR / caching

| Data | Revalidation | Reason |
|---|---|---|
| Domain config (`getDomainConfig`) | 5 minutes | Domain-to-theme mapping rarely changes |
| Artist profile + products (`getArtistData`) | 60 seconds | Product availability, pricing, profile edits |
| Individual product (`getProductBySlug`) | 60 seconds | Status, price, image changes |

To force an immediate cache bust for a specific artist after a data change, use Next.js on-demand revalidation or wait for the 60-second TTL to expire naturally.

---

## Type safety

`src/types/index.ts` is a copy of the same file from `artdistrictusa-frontend`. If the API contract changes (new fields added, types changed), update both files. The types that matter most are:

- `ArtistProfile` — everything about the artist (bio, images, exhibitions, social links, etc.)
- `Product` — artwork data including images, dimensions, taxonomy, pricing
- `LocalArtistResponse` — the shape returned by `GET /local-artist/:slug` (profile + products + meta)
- `ProductDetailResponse` — the shape returned by `GET /artist/:slug/products/:slug`

---

## Theme overview

| Key | Name | Character |
|---|---|---|
| `gallery` | Gallery | Minimal white, spacious, typography-led |
| `studio` | Studio | Dark editorial, high-contrast, full-bleed images |
| `market` | Market | Product-forward shop, prominent pricing, clean cards |
| `artisan` | Artisan | Warm amber tones, serif type, craft-focused |

See `new-website-theme.md` for detailed instructions on building additional themes.
