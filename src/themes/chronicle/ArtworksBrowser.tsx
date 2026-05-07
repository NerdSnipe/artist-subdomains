"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import Lightbox from "./Lightbox";

interface ArtworksBrowserProps {
    artworks: Product[];
}

export default function ArtworksBrowser({ artworks }: ArtworksBrowserProps) {
    const active = artworks.filter((a) => a.status !== "inactive");

    // Collect unique mediums / categories
    const mediumOptions = useMemo(() => {
        const set = new Set<string>();
        active.forEach((w) => {
            const m = w.mediums?.[0]?.medium?.name ?? w.medium ?? w.categoryName;
            if (m) set.add(m);
        });
        return Array.from(set).sort();
    }, [active]);

    const [selectedMedium, setSelectedMedium] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "year">("default");
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    const filtered = useMemo(() => {
        let works = [...active];
        if (selectedMedium !== "all") {
            works = works.filter((w) => {
                const m = w.mediums?.[0]?.medium?.name ?? w.medium ?? w.categoryName;
                return m === selectedMedium;
            });
        }
        if (sortBy === "price-asc") works.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") works.sort((a, b) => b.price - a.price);
        if (sortBy === "year") works.sort((a, b) => (b.yearCreated ?? 0) - (a.yearCreated ?? 0));
        return works;
    }, [active, selectedMedium, sortBy]);

    const openLightbox = (idx: number) => setLightboxIdx(idx);
    const closeLightbox = () => setLightboxIdx(null);
    const gotoPrev = () => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i));
    const gotoNext = () => setLightboxIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i));

    const MONO = "'IBM Plex Mono', monospace";
    const CORMORANT = "'Cormorant Garamond', serif";

    return (
        <>
            {/* Filter bar */}
            <div
                className="sticky top-[64px] z-40 border-b border-stone-200 bg-[#faf8f5]"
                style={{ backdropFilter: "blur(8px)" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex flex-wrap items-center gap-3 md:gap-6">
                    {/* Medium tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedMedium("all")}
                            className="px-3 py-1.5 transition-colors"
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.6rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                border: `1px solid ${selectedMedium === "all" ? "#1c1917" : "#d4cfc9"}`,
                                backgroundColor: selectedMedium === "all" ? "#1c1917" : "transparent",
                                color: selectedMedium === "all" ? "#faf8f5" : "#6b7c6d",
                            }}
                        >
                            All
                        </button>
                        {mediumOptions.map((m) => (
                            <button
                                key={m}
                                onClick={() => setSelectedMedium(m)}
                                className="px-3 py-1.5 transition-colors"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    border: `1px solid ${selectedMedium === m ? "#1c1917" : "#d4cfc9"}`,
                                    backgroundColor: selectedMedium === m ? "#1c1917" : "transparent",
                                    color: selectedMedium === m ? "#faf8f5" : "#6b7c6d",
                                }}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Sort dropdown */}
                    <div className="ml-auto flex items-center gap-2">
                        <span
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.6rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#9ca3af",
                            }}
                        >
                            Sort
                        </span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="bg-transparent border border-stone-200 px-2 py-1 focus:outline-none focus:border-[#6b7c6d]"
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.6rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#1c1917",
                            }}
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price ↑</option>
                            <option value="price-desc">Price ↓</option>
                            <option value="year">Year: Newest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {filtered.length === 0 ? (
                    <div className="py-32 text-center">
                        <p
                            style={{
                                fontFamily: CORMORANT,
                                fontStyle: "italic",
                                fontSize: "2rem",
                                color: "#d4cfc9",
                            }}
                        >
                            No works match this filter
                        </p>
                        <button
                            onClick={() => setSelectedMedium("all")}
                            className="mt-4 underline"
                            style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.12em", color: "#6b7c6d" }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        {filtered.map((work, idx) => {
                            const img = getProductImageUrl(work);
                            const medium = work.mediums?.[0]?.medium?.name ?? work.medium;
                            const isSold = work.status === "sold";

                            return (
                                <article
                                    key={work.id}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(idx)}
                                >
                                    <div
                                        className="relative overflow-hidden"
                                        style={{
                                            aspectRatio: "4/5",
                                            backgroundColor: "#e7e2dc",
                                        }}
                                    >
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={work.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                                style={{ filter: isSold ? "grayscale(100%)" : "none" }}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0" style={{ backgroundColor: "#e7e2dc" }} />
                                        )}

                                        {/* Sold badge */}
                                        {isSold && (
                                            <div
                                                className="absolute top-3 right-3 px-2 py-0.5"
                                                style={{
                                                    fontFamily: MONO,
                                                    fontSize: "0.58rem",
                                                    letterSpacing: "0.18em",
                                                    textTransform: "uppercase",
                                                    backgroundColor: "#1c1917",
                                                    color: "#faf8f5",
                                                }}
                                            >
                                                Sold
                                            </div>
                                        )}
                                    </div>

                                    {/* Card info */}
                                    <div
                                        className="mt-3 px-0.5 pb-5 border-b border-stone-200"
                                        style={{ backgroundColor: "#faf8f5" }}
                                    >
                                        <h3
                                            className="transition-colors duration-200 group-hover:text-[#6b7c6d]"
                                            style={{
                                                fontFamily: CORMORANT,
                                                fontSize: "1.15rem",
                                                fontWeight: 400,
                                                color: "#1c1917",
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {work.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {work.yearCreated && (
                                                <span
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.6rem",
                                                        letterSpacing: "0.1em",
                                                        color: "#6b7c6d",
                                                    }}
                                                >
                                                    {work.yearCreated}
                                                </span>
                                            )}
                                            {medium && work.yearCreated && (
                                                <span style={{ color: "#d4cfc9", fontSize: "0.6rem" }}>·</span>
                                            )}
                                            {medium && (
                                                <span
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.58rem",
                                                        letterSpacing: "0.08em",
                                                        textTransform: "uppercase",
                                                        color: "#9ca3af",
                                                    }}
                                                >
                                                    {medium}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <span
                                                style={{
                                                    fontFamily: "'Libre Baskerville', serif",
                                                    fontSize: "0.9rem",
                                                    fontWeight: 700,
                                                    color: "#1c1917",
                                                }}
                                            >
                                                {isSold ? "Sold" : `$${work.price.toLocaleString()}`}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxIdx !== null && filtered[lightboxIdx] && (
                <Lightbox
                    artwork={filtered[lightboxIdx]!}
                    onClose={closeLightbox}
                    onPrev={gotoPrev}
                    onNext={gotoNext}
                    hasPrev={lightboxIdx > 0}
                    hasNext={lightboxIdx < filtered.length - 1}
                />
            )}
        </>
    );
}
