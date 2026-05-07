import type { ThemePageProps } from "@/themes/types";
import DynamicColorProvider from "./DynamicColorProvider";
import MasonryBrowser from "./MasonryBrowser";

export default function VividArtworksPage({ artist, artworks, domain }: ThemePageProps) {
    const activeWorks = artworks.filter((a) => a.status !== "inactive");
    const accent = activeWorks.find((a) => a.status === "active")?.dominantColors?.[0]?.hex ?? "#FF4D00";

    return (
        <div>
            <DynamicColorProvider accent={accent} />
            <MasonryBrowser artworks={artworks} domain={domain} accent={accent} />
        </div>
    );
}
