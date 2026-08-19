import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const obsidianTheme: ThemeModule = {
    key: "obsidian",
    name: "Obsidian",
    description: "The Vault — dark luxury. Museum-quality presentation on a deep black canvas with champagne gold accents and glass-panel detailing.",
    palette: ["#0a0a0a", "#111111", "#c9a96e"],
    previewWidth: 1512,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
