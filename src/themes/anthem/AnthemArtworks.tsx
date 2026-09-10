"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import { getEffectiveDimensions } from "@/lib/product-dimensions";
import Reveal from "./Reveal";
import AnthemArtworkCard from "./AnthemArtworkCard";

// Preferred display order for series chips — anything not in this list is appended after.
const SERIES_ORDER = ["Popular", "Teddy Series", "Icons & Pop", "Large Scale", "Abstract Chaos", "New Release"];

// Per-piece gallery assignment isn't wired up on the backend yet, so the selector below is
// shown but disabled — fixed to "Artist Studio" (every piece defaults to that source today)
// until that field exists in GHL. Ready to re-enable the moment per-piece data lands.
type SortOption = "default" | "price-asc" | "price-desc";

// A sold tile is its own component (not inlined in the map) so each one gets its own ratio
// state — same trick AnthemArtworkCard uses: start from the measured dimensions, then snap to
// the photo's own proportions once it loads, instead of forcing every sold piece into a square.
function SoldTile({ art, onPreview }: { art: Product; onPreview: (src: string) => void }) {
    const img = getProductImageUrl(art);
    const effDims = getEffectiveDimensions(art);
    const [ratio, setRatio] = useState<number>(effDims && effDims.height ? effDims.width / effDims.height : 1);
    const dims = effDims
        ? `${effDims.height}" H × ${effDims.width}" W${effDims.depth ? ` × ${effDims.depth}" D` : ""}`
        : null;

    return (
        <button type="button" onClick={() => img && onPreview(img)} className="block w-full text-left opacity-70 hover:opacity-100 transition-opacity">
            <div className="relative w-full overflow-hidden border-2 border-black cursor-zoom-in" style={{ aspectRatio: ratio }}>
                {img && (
                    <Image
                        src={img}
                        alt={art.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                        onLoad={(e) => {
                            const el = e.currentTarget;
                            if (el.naturalWidth && el.naturalHeight) setRatio(el.naturalWidth / el.naturalHeight);
                        }}
                    />
                )}
                <div className="absolute top-2 right-2 bg-black text-[#F7F4EC] text-[9px] font-bold uppercase tracking-wide px-2 py-1 border border-black">
                    Sold
                </div>
            </div>
            <div className="mt-2">
                <p className="text-[11px] font-bold uppercase truncate">
                    {art.title}
                    {dims && <span className="normal-case font-medium text-black/50"> — {dims}</span>}
                </p>
            </div>
        </button>
    );
}

export default function AnthemArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState<SortOption>("default");
    const [soldPreview, setSoldPreview] = useState<string | null>(null);

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
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">
            <div className="border-b-4 border-black pb-6 mb-10">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">Portfolio</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl">Available Artwork</h1>
                <p className="mt-3 text-sm text-black/60">{active.length} original work{active.length === 1 ? "" : "s"} available</p>
            </div>

            {/* Everything grouped in one bordered bar — chips on the left (scrolls if it overflows),
                filter icon + the two selects on the right — per reference. */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 border-2 border-black px-4 py-3">
                <div className="flex flex-nowrap gap-3 overflow-x-auto">
                    {chips.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setFilter(c)}
                            className={`shrink-0 text-xs font-bold uppercase tracking-widest px-4 py-2 border-2 border-black transition-colors ${
                                filter === c ? "bg-black text-[#F7F4EC]" : "bg-transparent text-black hover:bg-black/5"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <SlidersHorizontal size={16} className="text-black/50 hidden sm:block" />
                    <label className="text-xs font-bold uppercase tracking-widest">
                        <span className="sr-only">Gallery Source</span>
                        {/* Disabled until per-piece gallery assignment exists on the backend — see the
                            GALLERY_SOURCES comment above. Fixed to "Artist Studio", not clickable. */}
                        <select
                            value="Artist Studio"
                            disabled
                            aria-disabled="true"
                            title="Filtering by gallery source is coming soon"
                            className="bg-transparent border-2 border-black/30 px-4 py-2 text-black/40 uppercase tracking-widest cursor-not-allowed focus:outline-none"
                        >
                            <option>Artist Studio</option>
                        </select>
                    </label>
                    <label className="text-xs font-bold uppercase tracking-widest">
                        <span className="sr-only">Sort</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="bg-transparent border-2 border-black px-4 py-2 text-black uppercase tracking-widest focus:outline-none"
                        >
                            <option value="default">Sort: Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </label>
                </div>
            </div>

            {/* Masonry: CSS columns + each card's aspect-ratio matched to the artwork's real
                physical proportions (not a forced square), so taller/wider pieces naturally
                stagger like the marketplace grid instead of all lining up in even rows. */}
            {filtered.length > 0 && (
                <div className="columns-2 md:columns-4 gap-6 [column-fill:_balance]">
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {sold.map((art) => (
                            <SoldTile key={art.id} art={art} onPreview={setSoldPreview} />
                        ))}
                    </div>
                </div>
            )}

            {soldPreview && (
                <div
                    className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setSoldPreview(null)}
                >
                    <button
                        type="button"
                        aria-label="Close preview"
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSoldPreview(null);
                        }}
                    >
                        ✕
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={soldPreview}
                        alt="Sold artwork preview"
                        className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
