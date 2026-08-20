"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

const SERIES_ORDER = ["Popular", "Teddy Series", "Icons & Pop", "Abstract Chaos", "New Release"];

export default function AnthemNoirArtworks({ artworks }: ThemePageProps) {
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
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-16 md:py-24">
            <div className="border-b-4 border-[#E9DFC9] pb-6 mb-10">
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-3">Portfolio</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl">Available Artwork</h1>
                <p className="mt-3 text-sm text-[#E9DFC9]/60">{active.length} original work{active.length === 1 ? "" : "s"} available</p>
            </div>

            {chips.length > 1 && (
                <div className="flex flex-wrap gap-3 mb-12">
                    {chips.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setFilter(c)}
                            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border-2 border-[#E9DFC9] transition-colors ${
                                filter === c ? "bg-[#E9DFC9] text-[#0C0B09]" : "bg-transparent text-[#E9DFC9] hover:bg-[#E9DFC9]/10"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            )}

            {/* Masonry: CSS columns + each card's aspect-ratio matched to the artwork's real
                physical proportions (not a forced square), so taller/wider pieces naturally
                stagger like the marketplace grid instead of all lining up in even rows. */}
            {filtered.length > 0 && (
                <div className="columns-2 md:columns-3 gap-6 [column-fill:_balance]">
                    {filtered.map((art, i) => {
                        const img = getProductImageUrl(art);
                        const ratio = art.dimensions ? `${art.dimensions.width} / ${art.dimensions.height}` : "1 / 1";
                        return (
                            <Reveal key={art.id} delay={Math.min(i, 8) * 50} className="break-inside-avoid mb-6 block">
                                <Link href={`/artworks/${art.slug ?? art.id}`} className="group block">
                                    <div className="relative w-full overflow-hidden border-2 border-[#E9DFC9]" style={{ aspectRatio: ratio }}>
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
                                                        className="bg-[#0C0B09] text-[#E9DFC9] text-[9px] font-bold uppercase tracking-wide px-2 py-1 border border-[#E9DFC9]"
                                                    >
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-3 font-[family-name:var(--font-display)] uppercase text-xl tracking-wide">{art.title}</p>
                                    <p className="text-base font-bold text-[#C9A227]">${art.price.toLocaleString()}</p>
                                    <div className="mt-2 border-t border-[#E9DFC9]/40" />
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            )}

            {filtered.length === 0 && (
                <p className="text-sm text-[#E9DFC9]/50 py-16 text-center">No pieces in this series right now — check back soon.</p>
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
