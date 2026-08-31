import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import ArtworksBrowser from "./ArtworksBrowser";
import ScrollReveal from "./ScrollReveal";

export default function ObsidianArtworks({ artist, artworks, domain }: ThemePageProps) {
    const visible = artworks.filter((a) => a.status !== "inactive");
    const collected = artist.soldArtworks ?? [];

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Page header */}
            <div className="px-6 md:px-12 pt-16 pb-12 border-b border-[#c9a96e]/10">
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e]/50 mb-4 font-light">
                    Collection
                </p>
                <h1 className="font-[family-name:var(--font-obsidian-display)] text-7xl md:text-9xl lg:text-[10rem] font-light tracking-[0.02em] uppercase text-[#f5f0eb] leading-none">
                    Works
                </h1>
            </div>

            <ArtworksBrowser artworks={visible} domain={domain} />

            {/* Collected Works — provenance record of pieces now in private collections */}
            {collected.length > 0 && (
                <ScrollReveal>
                    <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-20 max-w-6xl mx-auto">
                        <div className="flex items-center gap-6 mb-6">
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                Collected Works
                            </h2>
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        </div>
                        {artist.soldArtworksDescription && (
                            <p className="text-center text-xs font-light text-[#6a6460] max-w-xl mx-auto mb-14">
                                {artist.soldArtworksDescription}
                            </p>
                        )}
                        {!artist.soldArtworksDescription && <div className="mb-14" />}

                        <div className="divide-y divide-[#1a1a1a]">
                            {collected.map((work, i) => {
                                const dims =
                                    typeof work.dimensions === "string"
                                        ? work.dimensions
                                        : work.dimensions
                                          ? `${work.dimensions.width} × ${work.dimensions.height}${
                                                work.dimensions.depth ? ` × ${work.dimensions.depth}` : ""
                                            }`
                                          : null;
                                return (
                                    <div
                                        key={work.id ?? i}
                                        className="flex items-center gap-6 py-5 group"
                                    >
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 bg-[#111] overflow-hidden border border-white/5">
                                            <Image
                                                src={work.image}
                                                alt={work.title}
                                                fill
                                                sizes="80px"
                                                className="object-cover grayscale-[0.3] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-light text-[#d4cfc9] tracking-wide truncate">
                                                {work.title}
                                            </p>
                                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#4a4540] mt-1">
                                                {[work.medium, dims, work.year].filter(Boolean).join(" · ")}
                                            </p>
                                        </div>
                                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#7a4a3a] shrink-0">
                                            {work.status ?? "Sold"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </ScrollReveal>
            )}
        </div>
    );
}
