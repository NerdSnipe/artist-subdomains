import type { ThemePageProps } from "@/themes/types";
import { derivePalette } from "./color";
import DynamicColorProvider from "./DynamicColorProvider";
import MasonryBrowser from "./MasonryBrowser";

export default function VividArtworksPage({ artist, artworks }: ThemePageProps) {
    const activeWorks = artworks.filter((a) => a.status === "active");
    const initialPalette = derivePalette(activeWorks[0]?.dominantColors, activeWorks[0]?.id ?? artist.id);

    return (
        <DynamicColorProvider initialPalette={initialPalette}>
            <MasonryBrowser artworks={artworks} />
        </DynamicColorProvider>
    );
}
