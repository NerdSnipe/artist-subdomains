"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import { ink, coal, coalLight, smoke, smokeDark, emberMid, emberGradient } from "./palette";

export default function EmberArtworks({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "title">("default");
    const [filterMedium, setFilterMedium] = useState<string>("all");

    const visible = artworks.filter((a) => a.status !== "inactive");
    const active = visible.filter((a) => a.status === "active");
    const sold = visible.filter((a) => a.status === "sold");

    const mediums = useMemo(() => {
        const set = new Set<string>();
        active.forEach((a) => {
            if (a.medium) set.add(a.medium);
            a.mediums?.forEach((m) => { if (m.medium?.name) set.add(m.medium.name); });
        });
        return Array.from(set).sort();
    }, [active]);

    const filtered = useMemo(() => {
        let list = [...active];
        if (filterMedium !== "all") {
            list = list.filter((a) => a.medium === filterMedium || a.mediums?.some((m) => m.medium?.name === filterMedium));
        }
        if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));
        return list;
    }, [active, filterMedium, sortBy]);

    return (
        <div style={{ backgroundColor: ink }}>
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-10">
                <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: emberMid, letterSpacing: "0.2em" }}>
                    {name}
                </p>
                <div className="flex items-end justify-between gap-4 flex-wrap">
                    <h1 className="uppercase leading-[0.9]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem,7vw,5.5rem)", color: "#f6f1e8" }}>
                        The Work
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="text-xs uppercase font-semibold tracking-widest" style={{ color: smokeDark }}>Sort</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="text-sm px-4 py-2.5 border appearance-none uppercase font-semibold tracking-wide"
                            style={{ backgroundColor: coal, borderColor: "rgba(255,255,255,0.15)", color: "#f6f1e8", cursor: "pointer" }}
                        >
                            <option value="default">Featured</option>
                            <option value="price-asc">Price: Low–High</option>
                            <option value="price-desc">Price: High–Low</option>
                            <option value="title">Alphabetical</option>
                        </select>
                    </div>
                </div>
                <p className="text-sm mt-3" style={{ color: smoke }}>
                    {active.length} work{active.length !== 1 ? "s" : ""} available
                </p>

                {mediums.length > 1 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                        <FilterPill active={filterMedium === "all"} onClick={() => setFilterMedium("all")}>
                            All
                        </FilterPill>
                        {mediums.map((m) => (
                            <FilterPill key={m} active={filterMedium === m} onClick={() => setFilterMedium(m)}>
                                {m}
                            </FilterPill>
                        ))}
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
                <div className="h-px mb-14" style={{ background: emberGradient }} />

                {filtered.length === 0 ? (
                    <p className="text-center py-16 uppercase font-semibold tracking-wide" style={{ color: smokeDark }}>
                        No works match this filter.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filtered.map((artwork, i) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <Reveal key={artwork.id} delayMs={(i % 6) * 60}>
                                    <Link href={`/artworks/${artwork.slug ?? artwork.id}`} className="group block">
                                        <div className="relative overflow-hidden mb-4" style={{ backgroundColor: coalLight }}>
                                            <div className="relative aspect-[4/5]">
                                                {img ? (
                                                    <Image
                                                        src={img}
                                                        alt={artwork.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />
                                                ) : null}
                                                {artwork.status === "sold" && (
                                                    <div className="absolute top-0 left-0 px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ background: emberGradient, color: ink, letterSpacing: "0.1em" }}>
                                                        Sold
                                                    </div>
                                                )}
                                                <div
                                                    className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{ background: "linear-gradient(0deg, rgba(10,9,8,0.8) 0%, transparent 55%)" }}
                                                >
                                                    <div className="p-5">
                                                        <p className="text-sm font-bold" style={{ color: "#f6f1e8" }}>
                                                            {artwork.status === "sold" ? "Sold" : `$${artwork.price.toLocaleString()}`}
                                                        </p>
                                                        {artwork.dimensions && (
                                                            <p className="text-xs mt-0.5" style={{ color: "#d8cfc4" }}>
                                                                {artwork.dimensions.width}&Prime; &times; {artwork.dimensions.height}&Prime;
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-base leading-snug mb-1" style={{ color: "#f6f1e8" }}>{artwork.title}</p>
                                        {artwork.medium && <p className="text-xs uppercase tracking-wide mb-1" style={{ color: smokeDark }}>{artwork.medium}</p>}
                                        <p className="text-sm font-bold" style={{ color: emberMid }}>
                                            {artwork.status === "sold" ? <span style={{ color: smokeDark }}>Sold</span> : `$${artwork.price.toLocaleString()}`}
                                        </p>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                )}

                {sold.length > 0 && filterMedium === "all" && (
                    <div className="mt-24 pt-16 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                        <h2 className="uppercase leading-none mb-10" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: smoke }}>
                            Sold Works
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {sold.map((artwork) => {
                                const img = getProductImageUrl(artwork);
                                return (
                                    <div key={artwork.id} className="opacity-50">
                                        <div className="relative aspect-square overflow-hidden mb-3" style={{ backgroundColor: coalLight }}>
                                            {img ? (
                                                <Image src={img} alt={artwork.title} fill className="object-cover grayscale" sizes="(max-width: 640px) 50vw, 25vw" />
                                            ) : null}
                                        </div>
                                        <p className="text-xs font-semibold" style={{ color: smoke }}>{artwork.title}</p>
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

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className="text-xs uppercase font-bold tracking-widest px-4 py-2 transition-all duration-200"
            style={
                active
                    ? { background: emberGradient, color: ink, letterSpacing: "0.08em", clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)" }
                    : { backgroundColor: "transparent", color: smoke, border: "1px solid rgba(255,255,255,0.18)", letterSpacing: "0.08em" }
            }
        >
            {children}
        </button>
    );
}
