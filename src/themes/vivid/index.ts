import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const vividTheme: ThemeModule = {
    key: "vivid",
    name: "Vivid",
    description: "Maximalist and alive — your artwork's own colors dynamically tint the entire interface. Bold, energetic, unmissable.",
    palette: ["#ffffff", "#111111", "#FF4D00"],
    previewWidth: 1324,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
