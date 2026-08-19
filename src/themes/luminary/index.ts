import type { ThemeModule } from "@/themes/types";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ArtworksPage from "./ArtworksPage";
import ArtworkDetailPage from "./ArtworkDetailPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

export const luminaryTheme: ThemeModule = {
    key: "luminary",
    name: "Luminary",
    description: "Halo — light and dreamy, with a soft pastel glow, airy whitespace, and a delicate italic serif. Your artwork sits on a crisp white mat so color and detail stay front and center.",
    palette: ["#f6f3f1", "#a9769f", "#3a3240"],
    previewWidth: 1669,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
