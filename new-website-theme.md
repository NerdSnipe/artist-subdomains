# Building a New Artist Website Theme

This document is a complete technical guide for creating a new theme in the `artist-subdomains` app. It covers the framework contract, every data field available to you, all the ways to display, sort, filter, and search products, and exactly what files to create and register. Visual design, color choices, typography, and layout are entirely up to you.

---

## What a theme is

A theme is a self-contained folder under `src/themes/` that exports a single `ThemeModule` object. That object is a set of React Server Components — one for the site shell (nav + footer) and one for each page. The framework routes all requests to the correct theme at runtime; you never touch the routing layer.

Every theme receives the same data. The artist's full profile and their complete product catalog are fetched from the API and handed to your components as props. You decide what to show and how to show it.

---

## Folder structure

Create your theme at `src/themes/{your-key}/`. Replace `{your-key}` with a short, lowercase, hyphenated identifier (e.g. `noir`, `verdant`, `blueprint`).

```
src/themes/{your-key}/
├── index.ts                  # Exports the ThemeModule — the only file the framework reads
├── Layout.tsx                # Site shell: navigation, footer, any persistent chrome
├── HomePage.tsx              # Artist's landing page
├── ArtworksPage.tsx          # Full product grid / listing page
├── ArtworkDetailPage.tsx     # Single product view
├── AboutPage.tsx             # Artist bio, statement, CV
└── ContactPage.tsx           # Contact info, social links, commission CTA
```

You may add as many sub-components, helper files, and local utilities as you need inside this folder. Nothing outside your folder is affected.

---

## The ThemeModule contract

Your `index.ts` must export an object that satisfies `ThemeModule` from `@/themes/types`:

```ts
import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const yourKeyTheme: ThemeModule = {
    key: "your-key",          // must match the folder name and registry key
    name: "Display Name",     // shown in the dashboard theme picker
    description: "One-line pitch — the vibe, the tone, who it's for.", // shown in the picker
    palette: ["#bgHex", "#accentHex", "#textHex"], // 3 swatch colors shown in the picker
    previewWidth: 1669,       // pixel dimensions of the preview screenshot (see Registering below)
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
```

`description`, `palette`, `previewWidth`, and `previewHeight` are not
decorative — they're served by this app's own `GET /api/themes` endpoint,
which is the live catalog the ADUSA Backend's artist-facing theme picker
reads from. Get these right and the theme is fully described with no other
repo involved.

---

## Component prop types

All prop interfaces are defined in `src/themes/types.ts`. Import them:

```ts
import type {
    ThemeLayoutProps,
    ThemePageProps,
    ThemeArtworkDetailProps,
} from "@/themes/types";
```

### ThemeLayoutProps — for `Layout.tsx`

```ts
interface ThemeLayoutProps {
    children: React.ReactNode;   // the page component rendered inside
    artist: ArtistProfile;       // full artist profile (for nav, footer, etc.)
    domain: string;              // the raw hostname, e.g. "johndoe.com"
}
```

### ThemePageProps — for `HomePage`, `ArtworksPage`, `AboutPage`, `ContactPage`

```ts
interface ThemePageProps {
    artist: ArtistProfile;       // full artist profile
    artworks: Product[];         // all of the artist's products (all statuses)
    domain: string;              // the raw hostname
}
```

### ThemeArtworkDetailProps — for `ArtworkDetailPage`

```ts
interface ThemeArtworkDetailProps {
    artist: ArtistProfile;       // full artist profile
    product: Product;            // the specific artwork being viewed
    relatedProducts: Product[];  // up to 4 other active works (pre-filtered by the framework)
    domain: string;              // the raw hostname
}
```

---

## Internal links

Because the domain is the first path segment internally, all links must be prefixed with `/${domain}`:

```tsx
// Correct
<Link href={`/${domain}/artworks`}>All Works</Link>
<Link href={`/${domain}/artworks/${artwork.slug ?? artwork.id}`}>View</Link>
<Link href={`/${domain}/about`}>About</Link>
<Link href={`/${domain}/contact`}>Contact</Link>

// Root (home)
<Link href={`/${domain}`}>Home</Link>
```

The user's browser always sees the clean domain URL (`johndoe.com/artworks`) — the `/${domain}` prefix is an internal routing detail only.

---

## The purchase link

This app is read-only. Artwork purchases are handled on the main ArtDistrictUSA marketplace. Use the helper to generate the correct link:

```ts
import { marketplaceArtworkUrl } from "@/lib/artist-api";

const url = marketplaceArtworkUrl(
    product.artistSlug ?? artist.slug ?? "",
    product.slug ?? product.id
);
// → "https://artdistrictusa.com/artist/john-doe/oil-on-canvas-2024"
```

Only show this link when `product.status === "active"` and both `artistSlug` and `product.slug` are present.

---

## Helper functions

These utilities live in `src/lib/artist-api.ts` and are safe to import in any theme component:

```ts
import {
    getProductImageUrl,   // Returns the best available image URL for a product
    getArtistName,        // Returns displayName or "First Last"
    marketplaceArtworkUrl // Constructs the buy link on artdistrictusa.com
} from "@/lib/artist-api";
```

**`getProductImageUrl(product)`** — handles the multi-image / legacy-image fallback chain:

```ts
// Prefers the primary image from product.images[], falls back to product.imageUrl, then product.image
const imgUrl = getProductImageUrl(product); // always returns a string (may be empty)
```

**`getArtistName(artist)`**:

```ts
const name = getArtistName(artist); // "Jane Doe" or artist.displayName
```

---

## The ArtistProfile data shape

Everything you know about the artist lives in `ArtistProfile`. All fields are optional except `firstName`, `lastName`, and `email` — always guard before rendering.

### Identity and contact

| Field | Type | Notes |
|---|---|---|
| `displayName` | `string?` | Preferred name; fall back to `firstName + lastName` |
| `firstName` | `string` | Always present |
| `lastName` | `string` | Always present |
| `email` | `string` | Always present |
| `phone` | `string` | Always present |
| `profilePhoto` | `string?` | URL to profile headshot |
| `coverPhoto` | `string?` | URL to banner/hero image |
| `slug` | `string?` | URL-safe identifier used in API calls and marketplace links |
| `city` | `string?` | |
| `state` | `string?` | |
| `country` | `string?` | |
| `website` | `string?` | |

### Bio and statement

| Field | Type | Notes |
|---|---|---|
| `bio` | `string?` | Long-form biography |
| `bioPhoto` | `string?` | Secondary portrait, often used near bio text |
| `artistStatement` | `string?` | Shorter personal artistic statement |
| `artistTagline` | `string?` | One-line descriptor, good for hero subtitles |
| `description` | `string?` | Alternative short description |

### Social media

All social fields are usernames or handles (not full URLs) unless they happen to contain one. Strip `@` before constructing URLs.

| Field | Platform | URL pattern |
|---|---|---|
| `instagram` | Instagram | `https://instagram.com/{handle}` |
| `facebook` | Facebook | use as-is if it looks like a URL, otherwise `https://facebook.com/{handle}` |
| `twitter` | Twitter/X | `https://twitter.com/{handle}` |
| `tiktok` | TikTok | `https://tiktok.com/@{handle}` |
| `pinterest` | Pinterest | `https://pinterest.com/{handle}` |
| `youtube` | YouTube | `https://youtube.com/@{handle}` |
| `linkedin` | LinkedIn | `https://linkedin.com/in/{handle}` |

A nested `socialMedia` object may also exist with the same fields. Prefer the top-level fields.

### Commissions

| Field | Type | Notes |
|---|---|---|
| `acceptsCommissions` | `string?` | `"yes"`, `"no"`, `"inquiry"`, or similar — treat any value other than `"no"` as open |
| `commissionDescription` | `string?` | Custom text describing commission terms; show a fallback if absent |

### CV / exhibition history

```ts
artist.exhibitions?: {
    year: string;
    title: string;
    location: string;
    type?: 'solo' | 'group';
}[]

artist.publications?: {
    year: string;
    title: string;
    publication?: string;
}[]

artist.galleries?: {
    name: string;
    city?: string;
    state?: string;
    link?: string;   // preferred URL
    url?: string;    // fallback URL
    photo?: string;
}[]
```

### Rich content

| Field | Type | Notes |
|---|---|---|
| `events` | array | Each has `title`, `date` or `startDate`/`endDate`, `location`, `description`, `image`/`imageUrl`, `url` |
| `blogPosts` | array | Each has `title`, `date`, `excerpt`, `imageUrl`, `externalUrl` |
| `reviews` | array | Each has `text`, `author`, `role` |
| `studioImages` | `string[]` | Array of image URLs showing the studio space |
| `studioProcessDescription` | `string?` | Description of the artist's working process |
| `carouselImages` | `string[]` | Images intended for a hero carousel |
| `socialImages` | `string[]` | Instagram-style images |
| `book` | object? | `title`, `description`, `imageUrl`, `purchaseUrl`, `publisher`, `isbn` |
| `studioLocations` | array | Physical studio locations with `address`, `city`, `state`, `directionsUrl` |

---

## The Product data shape

The `artworks` array on every page contains all of the artist's products regardless of status. Always filter by `status` before rendering.

### Status values

| Value | Meaning |
|---|---|
| `"active"` | Available for sale / inquiry |
| `"sold"` | Sold; show in archive if desired |
| `"inactive"` | Hidden / draft; do not show |

Always filter out `"inactive"` products. Show `"sold"` only if it adds value (archive section, history).

### Core fields

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique identifier |
| `slug` | `string?` | URL-safe title; use for links. Fall back to `id` if absent |
| `title` | `string` | Artwork title |
| `description` | `string` | Long description |
| `price` | `number` | In USD, as a number (e.g. `1200`) |
| `salePrice` | `number?` | If set and lower than price, the artwork is on sale |
| `status` | `'active' \| 'sold' \| 'inactive'` | |
| `isOriginal` | `boolean` | True for one-of-a-kind originals |
| `yearCreated` | `number?` | Year completed |
| `medium` | `string?` | Free-text medium description |
| `isFramed` | `boolean?` | Whether the work is framed |
| `readyToHang` | `boolean?` | Whether it arrives ready to hang |
| `shippingPrice` | `number?` | In USD |

### Images

Prefer `product.images[]` over the legacy `imageUrl` field. Use `getProductImageUrl(product)` for the hero image. For galleries, iterate `product.images` sorted by `displayOrder`:

```ts
const images = product.images
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
```

Each `ProductImage` has `imageUrl`, `isPrimary`, `displayOrder`, and `caption`.

### Dimensions

```ts
product.dimensions?: {
    width: number;
    height: number;
    depth?: number;      // present for 3D works
    unit: 'inches' | 'cm';
}
```

Format as: `12 × 16 in` or `30 × 40 cm`. Depth: `12 × 16 × 2 in`.

### Taxonomy (categories, styles, mediums, etc.)

Each taxonomy relation is an array of nested objects:

```ts
product.mediums?:    Array<{ medium:   { id, name, slug } }>
product.styles?:     Array<{ artStyle: { id, name, slug } }>
product.subjects?:   Array<{ subject:  { id, name, slug } }>
product.materials?:  Array<{ material: { id, name, slug } }>
```

Extract names for display:

```ts
const mediumNames = product.mediums?.map(m => m.medium.name).join(", ") ?? "";
const styleNames  = product.styles?.map(s => s.artStyle.name).join(", ") ?? "";
```

### Dominant colors

```ts
product.dominantColors?: Array<{ name: string; hex: string }>
// e.g. [{ name: "Crimson", hex: "#DC143C" }, ...]
```

Useful for color swatch displays or background tints on detail pages.

---

## Working with the product list

The `artworks` array arrives pre-fetched and complete. All filtering, sorting, and searching happens client-side in JavaScript (or in a Client Component if you need interactivity). The API does not accept filter parameters from this app — the full catalog is always provided.

### Filtering

```ts
// Only show available work on main gallery pages
const available = artworks.filter(a => a.status === "active");

// Separate sold works for an archive section
const sold = artworks.filter(a => a.status === "sold");

// By category (categoryName is a string)
const paintings = artworks.filter(a =>
    a.categoryName?.toLowerCase() === "painting"
);

// By medium (nested taxonomy)
const oils = artworks.filter(a =>
    a.mediums?.some(m => m.medium.name.toLowerCase().includes("oil"))
);

// By price range
const affordable = artworks.filter(a => a.price <= 500);
const premium    = artworks.filter(a => a.price > 2000);

// Works that are framed and ready to hang
const readyToHang = artworks.filter(a => a.isFramed && a.readyToHang);

// Only originals
const originals = artworks.filter(a => a.isOriginal);

// Filter by dominant color (approximate hex match or color name)
const redWorks = artworks.filter(a =>
    a.dominantColors?.some(c => c.name.toLowerCase().includes("red"))
);
```

### Sorting

```ts
// Newest first (by createdAt)
const byNewest = [...artworks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

// Price ascending
const cheapestFirst = [...artworks].sort((a, b) => a.price - b.price);

// Price descending
const mostExpensive = [...artworks].sort((a, b) => b.price - a.price);

// Alphabetical by title
const alphabetical = [...artworks].sort((a, b) => a.title.localeCompare(b.title));

// By year created (newest year first)
const byYear = [...artworks].sort(
    (a, b) => (b.yearCreated ?? 0) - (a.yearCreated ?? 0)
);

// Largest first (by area in square inches)
const largest = [...artworks].sort((a, b) => {
    const aArea = a.dimensions ? a.dimensions.width * a.dimensions.height : 0;
    const bArea = b.dimensions ? b.dimensions.width * b.dimensions.height : 0;
    return bArea - aArea;
});

// Sale items first
const saleFirst = [...artworks].sort((a, b) => {
    const aOnSale = a.salePrice != null ? 0 : 1;
    const bOnSale = b.salePrice != null ? 0 : 1;
    return aOnSale - bOnSale;
});
```

### Searching

Simple client-side search across title, description, and medium:

```ts
function searchArtworks(artworks: Product[], query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return artworks;
    return artworks.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.medium?.toLowerCase().includes(q) ||
        a.categoryName?.toLowerCase().includes(q) ||
        a.mediums?.some(m => m.medium.name.toLowerCase().includes(q)) ||
        a.styles?.some(s => s.artStyle.name.toLowerCase().includes(q)) ||
        a.subjects?.some(s => s.subject.name.toLowerCase().includes(q))
    );
}
```

### Pagination

Client-side pagination for large catalogs:

```ts
const PAGE_SIZE = 12;

function paginate<T>(items: T[], page: number): T[] {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
}

const totalPages = Math.ceil(artworks.length / PAGE_SIZE);
```

If you want interactive filtering, sorting, or search, you need a Client Component. Wrap your Server Component page in a thin client wrapper:

```tsx
// ArtworksPage.tsx — Server Component (receives artworks from the framework)
import ArtworksBrowser from "./ArtworksBrowser"; // 'use client'

export default function ArtworksPage({ artworks, domain }: ThemePageProps) {
    const available = artworks.filter(a => a.status === "active");
    return <ArtworksBrowser artworks={available} domain={domain} />;
}
```

```tsx
// ArtworksBrowser.tsx — Client Component
"use client";
import { useState, useMemo } from "react";

export default function ArtworksBrowser({ artworks, domain }) {
    const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        let result = artworks;
        if (query) result = searchArtworks(result, query);
        if (sort === "price-asc")  result = [...result].sort((a, b) => a.price - b.price);
        if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
        if (sort === "newest")     result = [...result].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return result;
    }, [artworks, sort, query]);

    return (/* your UI */);
}
```

---

## Registering your theme

### 1. Add to the registry

In `src/themes/registry.ts`:

```ts
import { yourKeyTheme } from "./your-key";

const registry: Record<string, ThemeModule> = {
    gallery: galleryTheme,
    studio: studioTheme,
    market: marketTheme,
    artisan: artisanTheme,
    "your-key": yourKeyTheme,   // add this line
};
```

### 2. Update the backend validation

In the ADUSA Backend at:
```
/Users/nerdsnipe/DispatchProjects/ghl-art-directory/ADUSA Backend/app/api/artist-domain/me/route.ts
```

Add your key to `VALID_THEME_KEYS`:

```ts
const VALID_THEME_KEYS = ['gallery', 'studio', 'market', 'artisan', 'your-key'] as const;
```

### 3. Add to the themes list

In the ADUSA Backend at:
```
/Users/nerdsnipe/DispatchProjects/ghl-art-directory/ADUSA Backend/app/api/artist-domain/themes/route.ts
```

Add an entry to the `themes` array:

```ts
{
    key: "your-key",
    name: "Display Name",
    description: "One sentence describing the feel of this theme",
    screenshotUrl: null,  // update later with an actual screenshot URL
},
```

### 4. Type check

```bash
cd /Users/nerdsnipe/Ahead/artist-subdomains
npm run typecheck
```

Zero errors before shipping.

---

## Checklist before shipping a new theme

- [ ] All 6 exports present in `index.ts` (`Layout`, `HomePage`, `ArtworksPage`, `ArtworkDetailPage`, `AboutPage`, `ContactPage`)
- [ ] `key` field in `ThemeModule` matches the folder name and registry key exactly
- [ ] All internal links use `/${domain}/...` prefix
- [ ] Artwork links use `artwork.slug ?? artwork.id` (never assume slug is present)
- [ ] Purchase link uses `marketplaceArtworkUrl()` and is only shown for `status === "active"` products
- [ ] `"inactive"` products are never rendered
- [ ] `getProductImageUrl(product)` used for image resolution (not raw `product.imageUrl`)
- [ ] All optional fields on `ArtistProfile` and `Product` are guarded before use
- [ ] Layout component does not render `<html>` or `<body>` tags (root layout owns those)
- [ ] Key registered in `src/themes/registry.ts`
- [ ] Key added to `VALID_THEME_KEYS` in the ADUSA Backend `me/route.ts`
- [ ] Theme entry added to ADUSA Backend `themes/route.ts`
- [ ] `npm run typecheck` passes with zero errors
- [ ] Tested locally at `localhost:3000/{any-registered-domain}/` with all 5 pages

---

## Notes on Server Components

All theme components are React Server Components by default (no `"use client"` directive). This means:

- No `useState`, `useEffect`, `useRef`, or other hooks
- No browser-only APIs
- Data is already in props — no fetching needed inside components

If you need interactivity (search input, filter dropdowns, tabs, accordion, lightbox, etc.), extract that piece into a separate file with `"use client"` at the top and import it into your Server Component. Pass the static data down as props.

---

## Notes on images

All images are served from AWS S3 or Cloudflare R2. Use Next.js `<Image>` from `next/image` for all artist and artwork images — it handles resizing, lazy loading, and format conversion automatically. The required remote patterns are already configured in `next.config.ts`.

Always provide a fallback for missing images since not every product or artist field is guaranteed to have one:

```tsx
{imgUrl ? (
    <Image src={imgUrl} alt={artwork.title} fill className="object-cover" />
) : (
    <div className="/* placeholder styling */" />
)}
```
