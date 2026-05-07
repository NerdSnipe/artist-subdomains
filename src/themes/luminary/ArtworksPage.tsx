"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";

export default function LuminaryArtworksPage({ artworks, domain }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    // Collect unique mediums
    const mediumOptions = useMemo(() => {
        const set = new Set<string>();
        active.forEach((w) => {
            const m = w.mediums?.[0]?.medium?.name ?? w.medium;
            if (m) set.add(m);
        });
        return Array.from(set).sort();
    }, [active]);

    const [selectedMedium, setSelectedMedium] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "year">("default");

    const filtered = useMemo(() => {
        let works = [...active];
        if (selectedMedium !== "all") {
            works = works.filter((w) => {
                const m = w.mediums?.[0]?.medium?.name ?? w.medium;
                return m === selectedMedium;
            });
        }
        if (sortBy === "price-asc") works.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") works.sort((a, b) => b.price - a.price);
        if (sortBy === "year") works.sort((a, b) => (b.yearCreated ?? 0) - (a.yearCreated ?? 0));
        return works;
    }, [active, selectedMedium, sortBy]);

    return (
        <div>
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="border-b-2 border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
                    <div className="grid grid-cols-12 items-end gap-4">
                        <div className="col-span-12 md:col-span-8">
                            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-3">
                                The Collection
                            </p>
                            <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#1a1a1a]">
                                Works
                            </h1>
                        </div>
                        <div className="col-span-12 md:col-span-4 text-left md:text-right">
                            <p className="font-sans text-sm text-neutral-400">
                                {active.length} work{active.length !== 1 ? "s" : ""} available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Filter Bar ────────────────────────────────────────────────── */}
            <div className="border-b border-neutral-200 bg-white sticky top-[65px] z-40">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center gap-4 md:gap-8">
                    {/* Medium filter */}
                    {mediumOptions.length > 0 && (
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 shrink-0">
                                Medium
                            </span>
                            <button
                                onClick={() => setSelectedMedium("all")}
                                className={`font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
                                    selectedMedium === "all"
                                        ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                                        : "border-neutral-300 text-neutral-600 hover:border-[#0f2d6b] hover:text-[#0f2d6b]"
                                }`}
                            >
                                All
                            </button>
                            {mediumOptions.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSelectedMedium(m)}
                                    className={`font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors ${
                                        selectedMedium === m
                                            ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                                            : "border-neutral-300 text-neutral-600 hover:border-[#0f2d6b] hover:text-[#0f2d6b]"
                                    }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Sort */}
                    <div className="flex items-center gap-3 ml-auto">
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 shrink-0">
                            Sort
                        </span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="font-sans text-[10px] tracking-[0.15em] uppercase text-neutral-600 border border-neutral-300 px-2 py-1.5 bg-white focus:outline-none focus:border-[#0f2d6b] cursor-pointer"
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="year">Year: Newest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Works Grid ────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                {filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <p className="font-serif font-black text-2xl text-neutral-300 mb-2">
                            No works found
                        </p>
                        <button
                            onClick={() => setSelectedMedium("all")}
                            className="font-sans text-xs tracking-widest uppercase text-[#0f2d6b] hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-4 md:gap-6">
                        {filtered.map((work, i) => {
                            const img = getProductImageUrl(work);
                            // Editorial pacing: alternate between 2-up and 3-up rows
                            // Row pattern: 6+6, 4+4+4, 6+6, 4+4+4…
                            const rowIndex = Math.floor(i / 6);
                            const posInCycle = i % 6;
                            let colSpan = "col-span-12 sm:col-span-6 md:col-span-4";
                            if (rowIndex % 2 === 0) {
                                // 2-up row: first 2 works are wide
                                colSpan = posInCycle < 2
                                    ? "col-span-12 sm:col-span-6"
                                    : "col-span-12 sm:col-span-6 md:col-span-4";
                            }

                            return (
                                <Link
                                    key={work.id}
                                    href={`/artworks/${work.slug ?? work.id}`}
                                    className={`${colSpan} group block`}
                                >
                                    <div className={`relative overflow-hidden bg-neutral-100 ${
                                        rowIndex % 2 === 0 && posInCycle < 2
                                            ? "aspect-[4/3]"
                                            : "aspect-[3/4]"
                                    }`}>
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={work.title}
                                                fill
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                        {work.salePrice && (
                                            <div className="absolute top-3 left-3 bg-[#0f2d6b] text-white text-[10px] px-2 py-0.5 tracking-widest uppercase font-sans">
                                                Sale
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-3 pb-1 border-b border-neutral-100 mb-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="font-serif font-black text-base text-[#1a1a1a] group-hover:text-[#0f2d6b] transition-colors leading-tight">
                                                {work.title}
                                            </p>
                                            <p className="font-sans text-sm font-medium text-[#1a1a1a] shrink-0">
                                                {work.salePrice ? (
                                                    <>
                                                        <span className="text-[#0f2d6b]">${work.salePrice.toLocaleString()}</span>
                                                        <span className="line-through text-neutral-300 text-xs ml-1">${work.price.toLocaleString()}</span>
                                                    </>
                                                ) : (
                                                    `$${work.price.toLocaleString()}`
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            {(work.mediums?.[0]?.medium?.name ?? work.medium) && (
                                                <span className="font-sans text-[10px] tracking-widest uppercase text-neutral-400">
                                                    {work.mediums?.[0]?.medium?.name ?? work.medium}
                                                </span>
                                            )}
                                            {work.dimensions && (
                                                <span className="font-sans text-[10px] text-neutral-400">
                                                    {work.dimensions.width} × {work.dimensions.height} {work.dimensions.unit}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* ── Sold Works ────────────────────────────────────────────── */}
                {sold.length > 0 && (
                    <div className="mt-20 pt-10 border-t-2 border-[#1a1a1a]">
                        <div className="flex items-baseline gap-6 mb-8">
                            <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                                Sold Works
                            </h2>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-300">
                                — Archival Collection
                            </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {sold.map((work) => {
                                const img = getProductImageUrl(work);
                                return (
                                    <div key={work.id} className="group">
                                        <div className="relative aspect-square overflow-hidden bg-neutral-100">
                                            {img ? (
                                                <Image
                                                    src={img}
                                                    alt={work.title}
                                                    fill
                                                    className="object-cover grayscale opacity-60"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-neutral-200" />
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 py-1.5 px-2 bg-[#1a1a1a]">
                                                <p className="font-sans text-[9px] tracking-widest uppercase text-white/60">
                                                    Sold
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-sans text-xs text-neutral-400 mt-2 leading-tight">
                                            {work.title}
                                        </p>
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
