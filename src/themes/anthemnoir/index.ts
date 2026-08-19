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
    description: "Black & beige varsity poster energy — huge condensed all-caps type, near-black and warm beige with a single unified gold accent, built for bold, graphic, statement-making work.",
    palette: ["#0C0B09", "#E9DFC9", "#C9A227"],
    // TODO: upload the real preview screenshot to the img-artdistrictusa-com S3 bucket at
    // website-previews/anthemnoir.png and update these dimensions to match it exactly.
    previewWidth: 1600,
    previewHeight: 6137,
    Layout,
    HomePage,
    ArtworksPage,
    ArtworkDetailPage,
    AboutPage,
    ContactPage,
};
