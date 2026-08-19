import type { ThemeModule } from "@/themes/types";
import Layout from "./AnthemNoirLayout";
import HomePage from "./AnthemNoirHome";
import ArtworksPage from "./AnthemNoirArtworks";
import ArtworkDetailPage from "./AnthemNoirArtworkDetail";
import AboutPage from "./AnthemNoirAbout";
import ContactPage from "./AnthemNoirContact";

// Anthem Noir — the black & beige variant of Anthem (template 12). Same layout, behavior,
// and data wiring as Anthem; only the palette changes (near-black base, warm beige
// text/borders, a single unified gold accent replacing Anthem's red/yellow duo).
export const anthemnoirTheme: ThemeModule = {
    key: "anthemnoir",
    name: "Anthem Noir",
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
