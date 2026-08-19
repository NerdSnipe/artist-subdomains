import type { ThemeModule } from "@/themes/types";
import StudioLayout from "./StudioLayout";
import StudioHome from "./StudioHome";
import StudioArtworks from "./StudioArtworks";
import StudioArtworkDetail from "./StudioArtworkDetail";
import StudioAbout from "./StudioAbout";
import StudioContact from "./StudioContact";

export const studioTheme: ThemeModule = {
    key: "studio",
    name: "Studio",
    description: "The Loft — cinematic and dark, with subtle film grain, a behind-the-scenes filmstrip of your studio, and an asymmetric gallery-style grid.",
    palette: ["#0a0908", "#2a2622", "#e8e4de"],
    previewWidth: 1784,
    previewHeight: 4160,
    Layout: StudioLayout,
    HomePage: StudioHome,
    ArtworksPage: StudioArtworks,
    ArtworkDetailPage: StudioArtworkDetail,
    AboutPage: StudioAbout,
    ContactPage: StudioContact,
};
