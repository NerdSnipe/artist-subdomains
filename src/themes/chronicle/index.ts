import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const chronicleTheme: ThemeModule = {
    key: "chronicle",
    name: "Chronicle",
    description: "Editorial storytelling — horizontal scroll galleries, scrolling marquee, and cinematic parallax. A digital art monograph.",
    palette: ["#faf8f5", "#1c1917", "#6b7c6d"],
    previewWidth: 1784,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
