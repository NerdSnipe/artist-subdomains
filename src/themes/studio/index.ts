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
    Layout: StudioLayout,
    HomePage: StudioHome,
    ArtworksPage: StudioArtworks,
    ArtworkDetailPage: StudioArtworkDetail,
    AboutPage: StudioAbout,
    ContactPage: StudioContact,
};
