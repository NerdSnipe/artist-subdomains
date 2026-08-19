"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

function dims(a: { dimensions: { width: number; height: number; depth?: number; unit: "inches" | "cm" } | null }) {
    if (!a.dimensions) return null;
    const { width, height, unit } = a.dimensions;
    return `${width} × ${height} ${unit === "inches" ? "in" : "cm"}`;
}

// Preferred display order for series chips — anything not in this list is appended after.
const SERIES_ORDER = ["Popular", "Teddy Series", "Icons & Pop", "Abstract Chaos", "New Release"];

export default function AnthemArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");
    const [filter, setFilter] = useState("All");

    const chips = useMemo(() => {
        const found = new Set<string>();
        active.forEach((a) => a.series?.forEach((s) => found.add(s)));
        const known = SERIES_ORDER.filter((s) => found.has(s));
        const extra = [...found].filter((s) => !SERIES_ORDER.includes(s)).sort();
        return ["All", ...known, ...extra];
    }, [active]);

    const filtered = filter === "All" ? active : active.filter((a) => a.series?.includes(filter));

    return (
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">
            <div className="border-b-4 border-black pb-6 mb-10">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">Portfolio</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl">Available Artwork</h1>
                <p className="mt-3 text-sm text-black/60">{active.length} original work{active.length === 1 ? "" : "s"} available</p>
            </div>

            {chips.length > 1 && (
                <div className="flex flex-wrap gap-3 mb-12">
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
            )}

            {filtered.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((art, i) => {
                        const img = getProductImageUrl(art);
                        return (
                            <Reveal key={art.id} delay={Math.min(i, 8) * 50}>
                                <Link href={`/artworks/${art.slug ?? art.id}`} className="group block">
                                    <div className="relative aspect-[4/5] bg-black overflow-hidden border-2 border-black">
                                        {img && (
                                            <Image
                                                src={img}
                                                alt={art.title}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                        {art.gallerySource && art.gallerySource.length > 0 && (
                                            <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
                                                {art.gallerySource.map((g) => (
                                                    <span
                                                        key={g}
                                                        className="bg-[#F7F4EC] text-black text-[9px] font-bold uppercase tracking-wide px-2 py-1 border border-black"
                                                    >
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-3 font-bold uppercase text-sm tracking-wide">{art.title}</p>
                                    <p className="text-xs text-black/60">
                                        {[art.medium, dims(art)].filter(Boolean).join(" · ")}
                                    </p>
                                    <p className="text-xs font-bold mt-0.5">${art.price.toLocaleString()}</p>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            )}

            {filtered.length === 0 && (
                <p className="text-sm text-black/50 py-16 text-center">No pieces in this series right now — check back soon.</p>
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
