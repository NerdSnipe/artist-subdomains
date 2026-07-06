"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import { derivePalette } from "./color";
import { useVividPalette } from "./DynamicColorProvider";
import { useScrollSpyPalette } from "./useScrollSpyPalette";

interface Props {
    artworks: Product[];
}

export default function MasonryBrowser({ artworks }: Props) {
    const active = artworks.filter((a) => a.status !== "inactive");
    const { setPalette } = useVividPalette();
    const { register } = useScrollSpyPalette();

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
            works = works.filter((w) => (w.mediums?.[0]?.medium?.name ?? w.medium) === selectedMedium);
        }
        if (sortBy === "price-asc") works.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") works.sort((a, b) => b.price - a.price);
        if (sortBy === "year") works.sort((a, b) => (b.yearCreated ?? 0) - (a.yearCreated ?? 0));
        return works;
    }, [active, selectedMedium, sortBy]);

    return (
        <div>
            <div className="border-b border-white/10">
                <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 md:py-16 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--v-primary)" }}>
                            The Collection
                        </p>
                        <h1
                            style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                            className="text-6xl md:text-9xl uppercase leading-[0.88]"
                        >
                            Works
                        </h1>
                    </div>
                    <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(246,244,239,0.4)" }}>
                        {active.length} work{active.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            <div className="sticky top-[72px] z-30 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: "rgba(8,8,11,0.85)" }}>
                <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-3 flex gap-4 items-center flex-wrap">
                    <div className="flex gap-2 overflow-x-auto flex-1">
                        {[{ key: "all", label: "All" }, ...mediumOptions.map((m) => ({ key: m, label: m }))].map(({ key, label }) => {
                            const isActive = selectedMedium === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedMedium(key)}
                                    className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200"
                                    style={{
                                        backgroundColor: isActive ? "var(--v-primary)" : "transparent",
                                        color: isActive ? "var(--v-on-primary)" : "rgba(246,244,239,0.6)",
                                        borderColor: isActive ? "var(--v-primary)" : "rgba(255,255,255,0.15)",
                                    }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="text-[10px] font-bold tracking-widest uppercase border rounded-full px-3 py-2 bg-transparent cursor-pointer focus:outline-none"
                        style={{ color: "var(--v-paper)", borderColor: "rgba(255,255,255,0.15)" }}
                    >
                        <option className="bg-black" value="default">Sort: Default</option>
                        <option className="bg-black" value="price-asc">Price: Low</option>
                        <option className="bg-black" value="price-desc">Price: High</option>
                        <option className="bg-black" value="year">Newest</option>
                    </select>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10">
                {filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <p style={{ fontFamily: "var(--font-display)", color: "rgba(246,244,239,0.3)" }} className="text-3xl uppercase mb-4">
                            No works found
                        </p>
                        <button onClick={() => setSelectedMedium("all")} className="text-xs font-bold tracking-widest uppercase underline" style={{ color: "var(--v-primary)" }}>
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div style={{ columns: "3 280px", columnGap: "1.25rem" }}>
                        {filtered.map((work) => {
                            const img = getProductImageUrl(work);
                            const mediumLabel = work.mediums?.[0]?.medium?.name ?? work.medium ?? "";
                            const palette = derivePalette(work.dominantColors, work.id);
                            return (
                                <Link
                                    key={work.id}
                                    ref={(el) => register(el, { id: work.id, dominantColors: work.dominantColors })}
                                    href={`/artworks/${work.slug ?? work.id}`}
                                    className="group block mb-5 vivid-mason-card"
                                    style={{ breakInside: "avoid" }}
                                    onMouseEnter={() => setPalette(palette, work.id)}
                                >
                                    <div
                                        className="relative overflow-hidden rounded-2xl border-2 transition-all duration-300"
                                        style={{ borderColor: "transparent", backgroundColor: "var(--v-ink-soft)" }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = palette.primary;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = "transparent";
                                        }}
                                    >
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={work.title}
                                                width={600}
                                                height={800}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                style={{ display: "block" }}
                                            />
                                        ) : (
                                            <div className="aspect-[4/5]" style={{ backgroundColor: "var(--v-ink-soft)" }} />
                                        )}

                                        {work.status === "sold" && (
                                            <div
                                                className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1.5 tracking-widest uppercase rounded-full backdrop-blur-md"
                                                style={{ backgroundColor: "rgba(8,8,11,0.7)", color: "var(--v-paper)", border: "1px solid rgba(255,255,255,0.2)" }}
                                            >
                                                Sold
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-3 px-1">
                                        <p
                                            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }}
                                            className="text-lg leading-tight"
                                        >
                                            {work.title}
                                        </p>
                                        <div className="flex items-center justify-between mt-1.5 gap-2">
                                            {mediumLabel && (
                                                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                    {mediumLabel}
                                                </span>
                                            )}
                                            <span className="text-sm font-bold" style={{ color: "var(--v-primary)" }}>
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
