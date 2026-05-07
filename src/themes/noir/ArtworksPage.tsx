import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import ArtworksBrowser from "./ArtworksBrowser";

export default function NoirArtworksPage({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const visibleArtworks = artworks.filter((a) => a.status !== "inactive");

    return (
        <div className="bg-[#0d0d0d] min-h-screen">
            {/* Page header */}
            <div className="py-20 text-center border-b border-[#1a1a1a]">
                <p
                    className="text-[8px] tracking-[0.6em] uppercase text-[#a8884a]/60 mb-4"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    {name}
                </p>
                <h1
                    className="text-4xl md:text-6xl font-thin tracking-[0.2em] uppercase text-[#e8e8e8]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Works
                </h1>
                <div className="h-px w-12 bg-[#a8884a]/40 mx-auto mt-8" />
            </div>

            <ArtworksBrowser artworks={visibleArtworks} domain={domain} />
        </div>
    );
}
