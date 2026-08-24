"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import AnthemNoirArtworkCard from "./AnthemNoirArtworkCard";

const SERIES_ORDER = ["Popular", "Teddy Series", "Icons & Pop", "Large Scale", "Abstract Chaos", "New Release"];

// Per-piece gallery assignment isn't wired up on the backend yet, so the selector below is
// shown but disabled — fixed to "Artist Studio" (every piece defaults to that source today)
// until that field exists in GHL. Ready to re-enable the moment per-piece data lands.
type SortOption = "default" | "price-asc" | "price-desc";

export default function AnthemNoirArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState<SortOption>("default");

    // Named series, in preferred display order.
    const namedSeries = useMemo(() => {
        const found = new Set<string>();
        active.forEach((a) => a.seriesName && found.add(a.seriesName));
        const known = SERIES_ORDER.filter((s) => found.has(s));
        const extra = [...found].filter((s) => !SERIES_ORDER.includes(s)).sort();
        return [...known, ...extra];
    }, [active]);

    const chips = ["All", ...namedSeries];

    const bySeries = filter === "All" ? active : active.filter((a) => a.seriesName === filter);

    const filtered = useMemo(() => {
        if (sort === "default") return bySeries;
        const arr = [...bySeries];
        arr.sort((a, b) => (sort === "price-asc" ? a.price - b.price : b.price - a.price));
        return arr;
    }, [bySeries, sort]);

    return (
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-16 md:py-24">
            <div className="border-b-4 border-[#E9DFC9] pb-6 mb-10">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-3">Portfolio</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl">Available Artwork</h1>
                <p className="mt-3 text-sm text-[#E9DFC9]/60">{active.length} original work{active.length === 1 ? "" : "s"} available</p>
            </div>

            {/* Everything grouped in one bordered bar — chips on the left (scrolls if it overflows),
                filter icon + the two selects on the right — per reference. */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 border-2 border-[#E9DFC9] px-4 py-3">
                <div className="flex flex-nowrap gap-3 overflow-x-auto">
                    {chips.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setFilter(c)}
                            className={`shrink-0 text-xs font-bold uppercase tracking-widest px-4 py-2 border-2 border-[#E9DFC9] transition-colors ${
                                filter === c ? "bg-[#E9DFC9] text-[#0C0B09]" : "bg-transparent text-[#E9DFC9] hover:bg-[#E9DFC9]/10"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <SlidersHorizontal size={16} className="text-[#E9DFC9]/50 hidden sm:block" />
                    <label className="text-xs font-bold uppercase tracking-widest">
                        <span className="sr-only">Gallery Source</span>
                        {/* Disabled until per-piece gallery assignment exists on the backend — see the
                            comment above. Fixed to "Artist Studio", not clickable. */}
                        <select
                            value="Artist Studio"
                            disabled
                            aria-disabled="true"
                            title="Filtering by gallery source is coming soon"
                            className="bg-transparent border-2 border-[#E9DFC9]/30 px-4 py-2 text-[#E9DFC9]/40 uppercase tracking-widest cursor-not-allowed focus:outline-none"
                        >
                            <option className="bg-[#0C0B09]">Artist Studio</option>
                        </select>
                    </label>
                    <label className="text-xs font-bold uppercase tracking-widest">
                        <span className="sr-only">Sort</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="bg-transparent border-2 border-[#E9DFC9] px-4 py-2 text-[#E9DFC9] uppercase tracking-widest focus:outline-none"
                        >
                            <option className="bg-[#0C0B09]" value="default">Sort: Default</option>
                            <option className="bg-[#0C0B09]" value="price-asc">Price: Low to High</option>
                            <option className="bg-[#0C0B09]" value="price-desc">Price: High to Low</option>
                        </select>
                    </label>
                </div>
            </div>

            {/* Masonry: CSS columns + each card's aspect-ratio matched to the artwork's real
                physical proportions (not a forced square), so taller/wider pieces naturally
                stagger like the marketplace grid instead of all lining up in even rows. */}
            {filtered.length > 0 && (
                <div className="columns-2 md:columns-3 gap-6 [column-fill:_balance]">
                    {filtered.map((art, i) => (
                        <Reveal key={art.id} delay={Math.min(i, 8) * 50} className="break-inside-avoid mb-6 block">
                            <AnthemNoirArtworkCard art={art} priority={i < 3} />
                        </Reveal>
                    ))}
                </div>
            )}

            {filtered.length === 0 && (
                <p className="text-sm text-[#E9DFC9]/50 py-16 text-center">No pieces match that filter right now — check back soon.</p>
            )}

            {sold.length > 0 && (
                <div className="mt-24">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-8 border-b-4 border-[#E9DFC9] pb-4">
                        Previously Sold
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {sold.map((art) => {
                            const img = getProductImageUrl(art);
                            return (
                                <div key={art.id} className="opacity-60">
                                    <div className="relative aspect-square border-2 border-[#E9DFC9] overflow-hidden mb-2">
                                        {img && <Image src={img} alt={art.title} fill sizes="200px" className="object-cover" />}
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
