import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const noirTheme: ThemeModule = {
    key: "noir",
    name: "Noir",
    description: "Cinematic dark — film grain, spotlight effects, and full-screen artwork carousels for a private gallery after-hours feel.",
    palette: ["#0d0d0d", "#1a1a1a", "#a8884a"],
    previewWidth: 1658,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
