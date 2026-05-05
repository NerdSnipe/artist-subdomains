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

export function marketplaceArtworkUrl(artistSlug: string, productSlug: string): string {
    return `https://artdistrictusa.com/artist/${artistSlug}/${productSlug}`;
}
