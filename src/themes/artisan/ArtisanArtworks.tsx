import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import ArtworksFilter from "./ArtworksFilter";
import Reveal from "./Reveal";

export default function ArtisanArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="bg-[var(--paper)]">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <Reveal className="mb-12 max-w-xl">
                    <p className="text-xl text-[var(--sage-dark)]" style={{ fontFamily: "var(--font-script)" }}>
                        the full collection
                    </p>
                    <h1 className="text-4xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                        The Work
                    </h1>
                    <p className="mt-3 text-sm text-[var(--ink-soft)]">
                        {active.length} {active.length === 1 ? "piece" : "pieces"} currently available
                    </p>
                </Reveal>

                {active.length === 0 ? (
                    <p className="italic text-[var(--ink-soft)]">New work is being made — please check back soon.</p>
                ) : (
                    <ArtworksFilter artworks={active} />
                )}

                {sold.length > 0 && (
                    <div className="mt-20 border-t border-[var(--ink)]/10 pt-12">
                        <Reveal>
                            <h2 className="text-2xl italic text-[var(--ink-soft)]" style={{ fontFamily: "var(--font-display)" }}>
                                Previously Sold
                            </h2>
                            <p className="mb-8 mt-1 text-sm text-[var(--ink-soft)]/70">Found their homes — shown here for the archive.</p>
                        </Reveal>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                            {sold.map((artwork) => {
                                const img = getProductImageUrl(artwork);
                                return (
                                    <div key={artwork.id} className="opacity-60 grayscale">
                                        <div className="relative aspect-square w-full overflow-hidden bg-[var(--sand)]">
                                            {img && <Image src={img} alt={artwork.title} fill sizes="(min-width: 768px) 16vw, (min-width: 640px) 25vw, 33vw" className="object-cover" />}
                                        </div>
                                        <p className="mt-1.5 truncate text-[0.7rem] text-[var(--ink-soft)]">{artwork.title}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
