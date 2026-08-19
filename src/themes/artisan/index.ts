import type { ThemeModule } from "@/themes/types";
import ArtisanLayout from "./ArtisanLayout";
import ArtisanHome from "./ArtisanHome";
import ArtisanArtworks from "./ArtisanArtworks";
import ArtisanArtworkDetail from "./ArtisanArtworkDetail";
import ArtisanAbout from "./ArtisanAbout";
import ArtisanContact from "./ArtisanContact";

export const artisanTheme: ThemeModule = {
    key: "artisan",
    name: "Artisan",
    description: "The Atelier — warm, handmade, and personal. Clay, sand and sage tones, hand-torn paper textures, and a dedicated space to tell the story of how your work is made.",
    palette: ["#f7f0e1", "#bd5a3a", "#7c8a68"],
    previewWidth: 2586,
    previewHeight: 4160,
    Layout: ArtisanLayout,
    HomePage: ArtisanHome,
    ArtworksPage: ArtisanArtworks,
    ArtworkDetailPage: ArtisanArtworkDetail,
    AboutPage: ArtisanAbout,
    ContactPage: ArtisanContact,
};
