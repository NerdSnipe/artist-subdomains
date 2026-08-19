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
    description: "The White Cube — a museum aesthetic on warm paper-white walls, with wall-label typography and a proper exhibition CV for your shows and press.",
    palette: ["#f8f5ef", "#e3dcce", "#1b1812"],
    previewWidth: 1669,
    previewHeight: 4160,
    Layout: GalleryLayout,
    HomePage: GalleryHome,
    ArtworksPage: GalleryArtworks,
    ArtworkDetailPage: GalleryArtworkDetail,
    AboutPage: GalleryAbout,
    ContactPage: GalleryContact,
};
