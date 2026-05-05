import type { ArtistProfile, Product, LocalArtistResponse, ProductDetailResponse } from "@/types";
import { cache } from "react";

const API_BASE = process.env.ARTIST_API_URL ?? "https://api.artdistrictusa.com/api";

export interface DomainConfig {
    artistSlug: string;
    themeKey: string;
    isActive: boolean;
}

export const getDomainConfig = cache(async (domain: string): Promise<DomainConfig | null> => {
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

export async function getArtistData(slug: string): Promise<LocalArtistResponse> {
    const res = await fetch(`${API_BASE}/local-artist/${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
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
        { next: { revalidate: 60 } }
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
