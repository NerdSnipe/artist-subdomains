import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import ArtworksBrowser from "./ArtworksBrowser";

export default function MarketArtworks({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="mb-10">
                <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-2">
                    The Shop
                </p>
                <h1 className="font-[family-name:var(--market-font-display)] text-4xl text-[#241e19] mb-3">
                    Available Works
                </h1>
                <p className="text-[#6b5d4f] max-w-xl">
                    Original pieces by {name}, ready to ship direct from the studio. Every purchase supports
                    working artists.
                </p>
            </div>

            <ArtworksBrowser artworks={artworks} />
        </div>
    );
}
