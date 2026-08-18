"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import ImageLightbox from "./ImageLightbox";

interface Props {
    artworks: Product[];
    domain: string;
}

type SortOption = "default" | "price-asc" | "price-desc" | "title";

export default function ArtworksBrowser({ artworks }: Props) {
    const [selectedMedium, setSelectedMedium] = useState<string>("all");
    const [sort, setSort] = useState<SortOption>("default");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const mediums = useMemo(() => {
        const set = new Set<string>();
        for (const a of artworks) {
            if (a.medium) set.add(a.medium);
            if (a.mediums) for (const m of a.mediums) if (m.medium?.name) set.add(m.medium.name);
        }
        return Array.from(set).sort();
    }, [artworks]);

    const filtered = useMemo(() => {
        let list = [...artworks];

        if (selectedMedium !== "all") {
            list = list.filter((a) => {
                const direct = a.medium === selectedMedium;
                const nested = a.mediums?.some((m) => m.medium?.name === selectedMedium);
                return direct || nested;
            });
        }

        if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));

        return list;
    }, [artworks, selectedMedium, sort]);

    const available = filtered.filter((a) => a.status === "active");
    const sold = filtered.filter((a) => a.status === "sold");

    const pillClass = (active: boolean) =>
        `inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border transition-all duration-300 cursor-pointer ${
            active
                ? "border-[#a8884a] text-[#a8884a] bg-[#a8884a]/10"
                : "border-[#2a2a2a] text-[#5a5a5a] hover:border-[#a8884a]/40 hover:text-[#8a8a8a]"
        }`;

    return (
        <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
            {/* Filter + sort bar */}
            <div className="flex flex-col md:flex-row gap-6 mb-14 pb-8 border-b border-[#1a1a1a]">
                {/* Medium filter pills (film-reel perforations style) */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                        className="text-[8px] tracking-[0.4em] uppercase text-[#4a4a4a] mr-2"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        Medium
                    </span>
                    <button
                        onClick={() => setSelectedMedium("all")}
                        className={pillClass(selectedMedium === "all")}
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        {/* Film perf dots */}
                        <span className="w-1.5 h-1.5 rounded-sm border border-current opacity-60" />
                        All
                        <span className="w-1.5 h-1.5 rounded-sm border border-current opacity-60" />
                    </button>
                    {mediums.map((m) => (
                        <button
                            key={m}
                            onClick={() => setSelectedMedium(m)}
                            className={pillClass(selectedMedium === m)}
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            <span className="w-1.5 h-1.5 rounded-sm border border-current opacity-60" />
                            {m}
                            <span className="w-1.5 h-1.5 rounded-sm border border-current opacity-60" />
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3 md:ml-auto">
                    <span
                        className="text-[8px] tracking-[0.4em] uppercase text-[#4a4a4a]"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        Sort
                    </span>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="text-[9px] tracking-[0.2em] uppercase bg-[#0d0d0d] border border-[#2a2a2a] text-[#6a6a6a] px-3 py-2 focus:outline-none focus:border-[#a8884a]/40 cursor-pointer"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low</option>
                        <option value="price-desc">Price: High</option>
                        <option value="title">Title A–Z</option>
                    </select>
                </div>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
                <p
                    className="text-[#4a4a4a] text-center py-20 text-xs tracking-[0.3em] uppercase"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    No works match your selection.
                </p>
            )}

            {/* Available works — masonry alternating 2/3 col rows */}
            {available.length > 0 && (
                <div className="mb-20">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#111]">
                        {available.map((artwork, idx) => {
                            const imgUrl = getProductImageUrl(artwork);
                            const medium = artwork.medium ?? artwork.mediums?.[0]?.medium?.name;
                            // Alternate tall/wide for masonry feel
                            const tall = idx % 5 === 2;

                            return (
                                <div
                                    key={artwork.id}
                                    className="group relative bg-[#0d0d0d] overflow-hidden cursor-pointer"
                                    style={{ aspectRatio: tall ? "3/5" : "4/5" }}
                                    onClick={() => setLightboxIndex(available.indexOf(artwork))}
                                >
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#1a1a1a]" />
                                    )}

                                    {/* Hover spotlight */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: "radial-gradient(ellipse at center, rgba(168,136,74,0.07) 0%, rgba(0,0,0,0.35) 100%)",
                                        }}
                                    />

                                    {/* Slide-up overlay */}
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/50 to-transparent p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <Link
                                            href={`/artworks/${artwork.slug ?? artwork.id}`}
                                            className="block"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <p
                                                className="text-sm italic text-[#e8e8e8] mb-1 leading-snug"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {artwork.title}
                                            </p>
                                        </Link>
                                        {medium && (
                                            <p
                                                className="text-[8px] tracking-[0.25em] uppercase text-[#6a6a6a] mb-1"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                {medium}
                                            </p>
                                        )}
                                        <p
                                            className="text-[9px] tracking-[0.2em] text-[#a8884a]"
                                            style={{ fontFamily: "'Courier New', monospace" }}
                                        >
                                            ${artwork.price.toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Gold border */}
                                    <div className="absolute inset-0 border border-[#a8884a]/0 group-hover:border-[#a8884a]/25 transition-colors duration-500" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Sold works */}
            {sold.length > 0 && (
                <div className="border-t border-[#1a1a1a] pt-16">
                    <div className="flex items-center gap-6 mb-12">
                        <span className="h-px flex-1 bg-[#a8884a]/10" />
                        <h2
                            className="text-[8px] tracking-[0.5em] uppercase text-[#4a4a4a]"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Acquired Works
                        </h2>
                        <span className="h-px flex-1 bg-[#a8884a]/10" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sold.map((artwork) => {
                            const imgUrl = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="relative group">
                                    <div className="relative aspect-square bg-[#111] overflow-hidden mb-2">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover grayscale opacity-40"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[#1a1a1a]" />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span
                                                className="text-[8px] tracking-[0.5em] uppercase text-[#8b0000]/80 border border-[#8b0000]/50 px-2 py-0.5 rotate-[-10deg]"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                Acquired
                                            </span>
                                        </div>
                                    </div>
                                    <p
                                        className="text-[9px] tracking-[0.2em] uppercase text-[#3a3a3a]"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        {artwork.title}
                                    </p>
                                    {artwork.yearCreated && (
                                        <p
                                            className="text-[8px] text-[#2a2a2a]"
                                            style={{ fontFamily: "'Courier New', monospace" }}
                                        >
                                            {artwork.yearCreated}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && available.length > 0 && (
                <ImageLightbox
                    artworks={available}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNext={() => setLightboxIndex((lightboxIndex + 1) % available.length)}
                    onPrev={() => setLightboxIndex((lightboxIndex - 1 + available.length) % available.length)}
                />
            )}
        </div>
    );
}
