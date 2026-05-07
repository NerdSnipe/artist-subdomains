import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import ArtworksBrowser from "./ArtworksBrowser";

export default function ObsidianArtworks({ artist, artworks, domain }: ThemePageProps) {
    const visible = artworks.filter((a) => a.status !== "inactive");
    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Page header */}
            <div className="px-6 md:px-12 pt-16 pb-12 border-b border-[#c9a96e]/10">
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e]/50 mb-4 font-light">
                    Collection
                </p>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-thin tracking-[0.25em] uppercase text-[#f5f0eb] leading-none">
                    Works
                </h1>
            </div>

            <ArtworksBrowser artworks={visible} domain={domain} />
        </div>
    );
}
