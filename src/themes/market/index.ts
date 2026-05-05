import type { ThemeModule } from "@/themes/types";
import MarketLayout from "./MarketLayout";
import MarketHome from "./MarketHome";
import MarketArtworks from "./MarketArtworks";
import MarketArtworkDetail from "./MarketArtworkDetail";
import MarketAbout from "./MarketAbout";
import MarketContact from "./MarketContact";

export const marketTheme: ThemeModule = {
    key: "market",
    name: "Market",
    Layout: MarketLayout,
    HomePage: MarketHome,
    ArtworksPage: MarketArtworks,
    ArtworkDetailPage: MarketArtworkDetail,
    AboutPage: MarketAbout,
    ContactPage: MarketContact,
};
