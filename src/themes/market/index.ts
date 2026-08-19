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
    description: "The Shop — a warm, product-forward storefront in clay and cream tones, with clear pricing and sale/framed/original badges so collectors can browse and buy with confidence.",
    palette: ["#f8f2e9", "#b2542e", "#241e19"],
    previewWidth: 2408,
    previewHeight: 4160,
    Layout: MarketLayout,
    HomePage: MarketHome,
    ArtworksPage: MarketArtworks,
    ArtworkDetailPage: MarketArtworkDetail,
    AboutPage: MarketAbout,
    ContactPage: MarketContact,
};
