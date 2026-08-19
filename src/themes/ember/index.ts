import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const emberTheme: ThemeModule = {
    key: "ember",
    name: "Ember",
    description: "Wildfire — bold and high-energy. Charcoal and cream grounded by a fiery orange-to-red gradient, diagonal cuts, and a scrolling ticker. Built for expressive, contemporary work.",
    palette: ["#f6f1e8", "#ff5a1f", "#0a0908"],
    previewWidth: 1330,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
