import type { ArtistProfile, Product } from "@/types";

export interface ThemePageProps {
    artist: ArtistProfile;
    artworks: Product[];
    domain: string;
}

export interface ThemeArtworkDetailProps {
    artist: ArtistProfile;
    product: Product;
    relatedProducts: Product[];
    domain: string;
}

export interface ThemeLayoutProps {
    children: React.ReactNode;
    artist: ArtistProfile;
    domain: string;
}

export interface ThemeModule {
    key: string;
    name: string;
    /** One-line description shown to artists when choosing a theme. */
    description: string;
    /** Three representative hex colors, background → accent → text. */
    palette: [string, string, string];
    /** Dimensions of the theme's preview screenshot at website-previews/{key}.png. */
    previewWidth: number;
    previewHeight: number;
    Layout: React.ComponentType<ThemeLayoutProps>;
    HomePage: React.ComponentType<ThemePageProps>;
    ArtworksPage: React.ComponentType<ThemePageProps>;
    ArtworkDetailPage: React.ComponentType<ThemeArtworkDetailProps>;
    AboutPage: React.ComponentType<ThemePageProps>;
    ContactPage: React.ComponentType<ThemePageProps>;
}
