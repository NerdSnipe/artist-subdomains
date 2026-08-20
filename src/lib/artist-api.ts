import type { ArtistProfile, Product, LocalArtistResponse, ProductDetailResponse } from "@/types";
import { cache } from "react";

const API_BASE = process.env.ARTIST_API_URL ?? "https://api.artdistrictusa.com/api";

export interface DomainConfig {
    artistSlug: string;
    themeKey: string;
    isActive: boolean;
}

export const getDomainConfig = cache(async (domain: string): Promise<DomainConfig | null> => {
    if (domain.endsWith('.vercel.app')) return null;
    try {
        const res = await fetch(
            `${API_BASE}/artist-domain/${encodeURIComponent(domain)}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data?.isActive ? (json.data as DomainConfig) : null;
    } catch {
        return null;
    }
});

export async function getArtistSlugByAccountId(accountId: string): Promise<string | null> {
    try {
        const res = await fetch(
            `${API_BASE}/profile?accountId=${encodeURIComponent(accountId)}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        const profile = await res.json();
        return profile?.slug ?? null;
    } catch {
        return null;
    }
}

export function artistCacheTag(slug: string): string {
    return `artist:${slug}`;
}

export async function getArtistData(slug: string): Promise<LocalArtistResponse> {
    const res = await fetch(`${API_BASE}/local-artist/${encodeURIComponent(slug)}`, {
        next: { revalidate: 60, tags: [artistCacheTag(slug)] },
    });
    if (!res.ok) {
        throw new Error(`Artist not found: ${slug}`);
    }
    return res.json() as Promise<LocalArtistResponse>;
}

export async function getProductBySlug(
    artistSlug: string,
    productSlug: string
): Promise<ProductDetailResponse> {
    const res = await fetch(
        `${API_BASE}/artist/${encodeURIComponent(artistSlug)}/products/${encodeURIComponent(productSlug)}`,
        { next: { revalidate: 60, tags: [artistCacheTag(artistSlug)] } }
    );
    if (!res.ok) {
        throw new Error(`Product not found: ${productSlug}`);
    }
    return res.json() as Promise<ProductDetailResponse>;
}

export function getProductImageUrl(product: Product): string {
    if (product.images?.length) {
        const primary = product.images.find((i) => i.isPrimary) ?? product.images[0];
        return primary.imageUrl;
    }
    return product.imageUrl ?? product.image ?? "";
}

export function getArtistName(artist: ArtistProfile): string {
    return artist.displayName ?? `${artist.firstName} ${artist.lastName}`.trim();
}

// Returns a 1-2 line stacked headline for statement-style heroes (e.g. ["Beautiful", "Chaos"]).
// Priority: 1) a curated heroHeadline set by the artist/admin (best — e.g. Rocky's "Beautiful
// Chaos", the opening words of his real GHL artist statement). 2) the artist's own name — a
// guessed phrase pulled from bio/statement text reads awkward for most artists (e.g. derived
// "Las Vegas." from a bio that opens with the artist's city), where the artist's name is
// always safe, always on-brand, and needs no curation to look intentional.
export function getHeroHeadline(artist: ArtistProfile): string[] {
    if (artist.heroHeadline) {
        const words = artist.heroHeadline.trim().split(/\s+/).filter(Boolean);
        if (words.length >= 2) return [words[0], words.slice(1).join(" ")];
        if (words.length === 1) return [words[0], ""];
    }

    const name = getArtistName(artist).trim().split(/\s+/).filter(Boolean);
    if (name.length >= 2) return [name[0], name.slice(1).join(" ")];
    if (name.length === 1) return [name[0], ""];

    return ["Original", "Art"];
}

const MARKETPLACE_URL = 'https://www.artsdistrictusa.com';

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function marketplaceArtistUrl(artistSlug: string): string {
    return `${MARKETPLACE_URL}/artist/${artistSlug}`;
}

export function marketplaceArtworkUrl(product: {
    slug?: string;
    title: string;
    artistSlug?: string;
    artistName: string;
    medium?: string;
}): string {
    const artistSlug = product.artistSlug ?? slugify(product.artistName);
    const category = slugify(product.medium ?? 'artwork');
    const titleSlug = product.slug ?? slugify(product.title);
    return `${MARKETPLACE_URL}/artist/${artistSlug}/${category}/${titleSlug}`;
}
