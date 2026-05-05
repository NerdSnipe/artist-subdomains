import type { ThemeModule } from "@/themes/types";
import GalleryLayout from "./GalleryLayout";
import GalleryHome from "./GalleryHome";
import GalleryArtworks from "./GalleryArtworks";
import GalleryArtworkDetail from "./GalleryArtworkDetail";
import GalleryAbout from "./GalleryAbout";
import GalleryContact from "./GalleryContact";

export const galleryTheme: ThemeModule = {
    key: "gallery",
    name: "Gallery",
    Layout: GalleryLayout,
    HomePage: GalleryHome,
    ArtworksPage: GalleryArtworks,
    ArtworkDetailPage: GalleryArtworkDetail,
    AboutPage: GalleryAbout,
    ContactPage: GalleryContact,
};
