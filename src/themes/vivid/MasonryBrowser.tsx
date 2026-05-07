"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

interface Props {
    artworks: Product[];
    domain: string;
    accent: string;
}

export default function MasonryBrowser({ artworks, accent }: Props) {
    const active = artworks.filter((a) => a.status !== "inactive");

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
            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
                            The Collection
                        </p>
                        <h1
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-7xl md:text-9xl font-bold text-[#111] leading-[0.9]"
                        >
                            Works
                        </h1>
                    </div>
                    <p className="text-sm font-bold tracking-widest uppercase text-neutral-400">
                        {active.length} work{active.length !== 1 ? "s" : ""} available
                    </p>
                </div>
            </div>

            {/* ── Filter bar ─────────────────────────────────────────────── */}
            <div className="sticky top-[64px] z-40 bg-white border-b-2 border-black">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex gap-4 items-center flex-wrap">
                    {/* Pills */}
                    <div className="flex gap-2 overflow-x-auto flex-1" style={{ scrollSnapType: "x mandatory" }}>
                        {[{ key: "all", label: "All" }, ...mediumOptions.map((m) => ({ key: m, label: m }))].map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setSelectedMedium(key)}
                                className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full border-2 transition-all duration-150"
                                style={{
                                    scrollSnapAlign: "start",
                                    backgroundColor: selectedMedium === key ? "#111" : "transparent",
                                    color: selectedMedium === key ? "#fff" : "#111",
                                    borderColor: selectedMedium === key ? "#111" : "#ccc",
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="text-[10px] font-bold tracking-widest uppercase border-2 border-black px-3 py-2 bg-white cursor-pointer focus:outline-none focus:ring-0"
                        style={{ color: "#111" }}
                    >
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price: Low</option>
                        <option value="price-desc">Price: High</option>
                        <option value="year">Newest</option>
                    </select>
                </div>
            </div>

            {/* ── Masonry Grid ────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
                {filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <p
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-3xl text-neutral-300 mb-4"
                        >
                            No works found
                        </p>
                        <button
                            onClick={() => setSelectedMedium("all")}
                            className="text-xs font-bold tracking-widest uppercase underline"
                            style={{ color: "var(--accent)" }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div
                        style={{
                            columns: "3 280px",
                            columnGap: "1rem",
                        }}
                    >
                        {filtered.map((work) => {
                            const img = getProductImageUrl(work);
                            const mediumLabel = work.mediums?.[0]?.medium?.name ?? work.medium ?? "";
                            return (
                                <Link
                                    key={work.id}
                                    href={`/artworks/${work.slug ?? work.id}`}
                                    className="group block mb-4"
                                    style={{ breakInside: "avoid" }}
                                >
                                    <div
                                        className="relative overflow-hidden bg-neutral-100 border-2 border-transparent transition-all duration-150"
                                        style={{
                                            /* border-color transitions are handled via JS on hover */
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = accent;
                                            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                                            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                                        }}
                                    >
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={work.title}
                                                width={600}
                                                height={800}
                                                className="w-full h-auto object-cover"
                                                style={{ display: "block" }}
                                            />
                                        ) : (
                                            <div className="aspect-[4/5] bg-neutral-200" />
                                        )}

                                        {/* Sold badge */}
                                        {work.status === "sold" && (
                                            <div className="absolute top-3 right-3 bg-[#111] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-full">
                                                SOLD
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-3 px-1">
                                        <p
                                            style={{ fontFamily: "'DM Serif Display', serif" }}
                                            className="text-lg font-bold text-[#111] leading-tight"
                                        >
                                            {work.title}
                                        </p>
                                        <div className="flex items-center justify-between mt-1 gap-2">
                                            {mediumLabel && (
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                                                    {mediumLabel}
                                                </span>
                                            )}
                                            <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                                                ${work.price.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
