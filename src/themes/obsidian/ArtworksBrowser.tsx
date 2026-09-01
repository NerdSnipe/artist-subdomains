"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import { getEffectiveDimensions } from "@/lib/product-dimensions";

interface Props {
    artworks: Product[];
    domain: string;
}

type SortOption = "default" | "price-asc" | "price-desc" | "title";

export default function ArtworksBrowser({ artworks, domain }: Props) {
    const [selectedMedium, setSelectedMedium] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [sort, setSort] = useState<SortOption>("default");

    // Collect unique mediums
    const mediums = useMemo(() => {
        const set = new Set<string>();
        for (const a of artworks) {
            if (a.medium) set.add(a.medium);
            if (a.mediums) {
                for (const m of a.mediums) if (m.medium?.name) set.add(m.medium.name);
            }
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

        if (selectedStatus !== "all") {
            list = list.filter((a) => a.status === selectedStatus);
        }

        if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));

        return list;
    }, [artworks, selectedMedium, selectedStatus, sort]);

    const active = filtered.filter((a) => a.status === "active");
    const sold = filtered.filter((a) => a.status === "sold");

    const filterBtnClass = (active: boolean) =>
        `text-[10px] tracking-[0.25em] uppercase px-4 py-2 border backdrop-blur-md transition-all duration-300 ${
            active
                ? "border-[#c9a96e]/60 text-[#c9a96e] bg-[#c9a96e]/10"
                : "border-white/10 bg-white/[0.02] text-[#4a4540] hover:border-[#c9a96e]/40 hover:text-[#8a8278]"
        }`;

    return (
        <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
            {/* Filter + Sort controls */}
            <div className="flex flex-col md:flex-row gap-6 mb-16 border-b border-[#c9a96e]/10 pb-8">
                {/* Status filter */}
                <div className="flex items-center gap-3">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#4a4540] mr-2">Status</span>
                    {[
                        { value: "all", label: "All" },
                        { value: "active", label: "Available" },
                        { value: "sold", label: "Sold" },
                    ].map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setSelectedStatus(opt.value)}
                            className={filterBtnClass(selectedStatus === opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Medium filter */}
                {mediums.length > 0 && (
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-[#4a4540] mr-2">Medium</span>
                        <button
                            onClick={() => setSelectedMedium("all")}
                            className={filterBtnClass(selectedMedium === "all")}
                        >
                            All
                        </button>
                        {mediums.map((m) => (
                            <button
                                key={m}
                                onClick={() => setSelectedMedium(m)}
                                className={filterBtnClass(selectedMedium === m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                )}

                {/* Sort */}
                <div className="flex items-center gap-3 md:ml-auto">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#4a4540] mr-2">Sort</span>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="text-[10px] tracking-[0.2em] uppercase bg-white/[0.02] backdrop-blur-md border border-white/10 text-[#4a4540] px-3 py-2 focus:outline-none focus:border-[#c9a96e]/40 cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low</option>
                        <option value="price-desc">Price: High</option>
                        <option value="title">Title A–Z</option>
                    </select>
                </div>
            </div>

            {/* Available works */}
            {active.length === 0 && sold.length === 0 && (
                <p className="text-[#4a4540] font-thin tracking-wider text-center py-16">
                    No works match your selection.
                </p>
            )}

            {active.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {active.map((artwork) => {
                        const imgUrl = getProductImageUrl(artwork);
                        const medium = artwork.medium ?? artwork.mediums?.[0]?.medium?.name;
                        const dims = getEffectiveDimensions(artwork);
                        return (
                            <Link
                                key={artwork.id}
                                href={`/artworks/${artwork.slug ?? artwork.id}`}
                                className="group block"
                            >
                                <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-4">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={artwork.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#1a1a1a]" />
                                    )}
                                    <div className="absolute inset-0 border border-[#c9a96e]/0 group-hover:border-[#c9a96e]/30 transition-colors duration-500" />
                                </div>
                                <p className="text-[11px] tracking-[0.25em] uppercase text-[#c9a96e] font-light mb-1">
                                    {artwork.title}
                                </p>
                                {medium && (
                                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#4a4540] mb-2">
                                        {medium}
                                    </p>
                                )}
                                {dims && (
                                    <p className="text-[9px] tracking-[0.1em] text-[#3a3530] mb-1">
                                        {dims.width} × {dims.height} {dims.unit}
                                    </p>
                                )}
                                <p className="text-xs text-[#8a8278] font-thin">
                                    ${artwork.price.toLocaleString()}
                                    {artwork.salePrice && artwork.salePrice < artwork.price && (
                                        <span className="ml-2 text-[#c9a96e] line-through text-[10px]">
                                            ${artwork.price.toLocaleString()}
                                        </span>
                                    )}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Sold works */}
            {sold.length > 0 && (
                <div className="border-t border-[#c9a96e]/10 pt-16">
                    <div className="flex items-center gap-6 mb-12">
                        <span className="h-px flex-1 bg-[#c9a96e]/10" />
                        <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#4a4540] font-light">
                            Previous Works
                        </h2>
                        <span className="h-px flex-1 bg-[#c9a96e]/10" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sold.map((artwork) => {
                            const imgUrl = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="group relative">
                                    <div className="relative aspect-square bg-[#111] overflow-hidden mb-3">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                                className="object-cover grayscale opacity-50"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[#1a1a1a]" />
                                        )}
                                        {/* SOLD stamp */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8a4a3a] border border-[#8a4a3a]/60 px-3 py-1 rotate-[-12deg] opacity-80">
                                                Sold
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#3a3530] font-light">
                                        {artwork.title}
                                    </p>
                                    {artwork.yearCreated && (
                                        <p className="text-[9px] text-[#2a2520]">{artwork.yearCreated}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
