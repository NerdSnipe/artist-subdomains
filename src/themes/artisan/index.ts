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
    Layout: ArtisanLayout,
    HomePage: ArtisanHome,
    ArtworksPage: ArtisanArtworks,
    ArtworkDetailPage: ArtisanArtworkDetail,
    AboutPage: ArtisanAbout,
    ContactPage: ArtisanContact,
};
