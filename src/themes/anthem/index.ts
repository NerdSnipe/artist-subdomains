import type { ThemeModule } from "@/themes/types";
import Layout from "./AnthemLayout";
import HomePage from "./AnthemHome";
import ArtworksPage from "./AnthemArtworks";
import ArtworkDetailPage from "./AnthemArtworkDetail";
import AboutPage from "./AnthemAbout";
import ContactPage from "./AnthemContact";

export const anthemTheme: ThemeModule = {
    key: "anthem",
    name: "Anthem",
    description: "Varsity poster energy — huge condensed all-caps type, cream and black with red and yellow pop accents, built for bold, graphic, statement-making work.",
    palette: ["#f7f4ec", "#e62828", "#0a0a0a"],
    previewWidth: 1669,
    previewHeight: 4160,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
