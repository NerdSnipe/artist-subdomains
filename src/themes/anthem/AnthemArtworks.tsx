"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import AnthemArtworkCard from "./AnthemArtworkCard";

// Preferred display order for series chips — anything not in this list is appended after.
const SERIES_ORDER = ["Popular", "Teddy Series", "Icons & Pop", "Abstract Chaos", "New Release"];

// Every physical location Rocky's work can be sold through. Only "Artist Studio" has any
// pieces tagged today (Daniel hasn't built the per-piece gallery assignment yet) — the other
// two are Rocky's real represented galleries (see the About page's Gallery Representations),
// shown here ready to go the moment that per-piece data exists.
const GALLERY_SOURCES = ["Artist Studio", "Conrad West Gallery", "Art Center Gallery"];

export default function AnthemArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");
    const [filter, setFilter] = useState("All");
    const [source, setSource] = useState("All Gallery Sources");

    const chips = useMemo(() => {
        const found = new Set<string>();
        active.forEach((a) => a.series?.forEach((s) => found.add(s)));
        const known = SERIES_ORDER.filter((s) => found.has(s));
        const extra = [...found].filter((s) => !SERIES_ORDER.includes(s)).sort();
        return ["All", ...known, ...extra];
    }, [active]);

    const bySeries = filter === "All" ? active : active.filter((a) => a.series?.includes(filter));
    const filtered = source === "All Gallery Sources" ? bySeries : bySeries.filter((a) => a.gallerySource?.includes(source));

    return (
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">
            <div className="border-b-4 border-black pb-6 mb-10">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">Portfolio</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl">Available Artwork</h1>
                <p className="mt-3 text-sm text-black/60">{active.length} original work{active.length === 1 ? "" : "s"} available</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                {chips.length > 1 ? (
                    <div className="flex flex-wrap gap-3">
                        {chips.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setFilter(c)}
                                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border-2 border-black transition-colors ${
                                    filter === c ? "bg-black text-[#F7F4EC]" : "bg-transparent text-black hover:bg-black/5"
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div />
                )}

                <label className="text-xs font-bold uppercase tracking-widest">
                    <span className="sr-only">Gallery Source</span>
                    <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="bg-transparent border-2 border-black px-4 py-2 text-black uppercase tracking-widest focus:outline-none"
                    >
                        <option>All Gallery Sources</option>
                        {GALLERY_SOURCES.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Masonry: CSS columns + each card's aspect-ratio matched to the artwork's real
                physical proportions (not a forced square), so taller/wider pieces naturally
                stagger like the marketplace grid instead of all lining up in even rows. */}
            {filtered.length > 0 && (
                <div className="columns-2 md:columns-3 gap-6 [column-fill:_balance]">
                    {filtered.map((art, i) => (
                        <Reveal key={art.id} delay={Math.min(i, 8) * 50} className="break-inside-avoid mb-6 block">
                            <AnthemArtworkCard art={art} priority={i < 3} />
                        </Reveal>
                    ))}
                </div>
            )}

            {filtered.length === 0 && (
                <p className="text-sm text-black/50 py-16 text-center">No pieces match that filter right now — check back soon.</p>
            )}

            {sold.length > 0 && (
                <div className="mt-24">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-8 border-b-4 border-black pb-4">
                        Previously Sold
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {sold.map((art) => {
                            const img = getProductImageUrl(art);
                            return (
                                <div key={art.id} className="opacity-60">
                                    <div className="relative aspect-square border-2 border-black overflow-hidden mb-2">
                                        {img && <Image src={img} alt={art.title} fill sizes="200px" className="object-cover grayscale" />}
                                    </div>
                                    <p className="text-[11px] font-bold uppercase truncate">{art.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
