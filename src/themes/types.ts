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
    Layout: React.ComponentType<ThemeLayoutProps>;
    HomePage: React.ComponentType<ThemePageProps>;
    ArtworksPage: React.ComponentType<ThemePageProps>;
    ArtworkDetailPage: React.ComponentType<ThemeArtworkDetailProps>;
    AboutPage: React.ComponentType<ThemePageProps>;
    ContactPage: React.ComponentType<ThemePageProps>;
}
