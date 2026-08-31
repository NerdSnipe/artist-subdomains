"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import GlowBlob from "./GlowBlob";
import Reveal from "./Reveal";
import { Kicker } from "./ui";

export default function LuminaryArtworksPage({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

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
            {/* ── Header ───────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
                <GlowBlob className="-top-24 right-0 h-96 w-96" colors={["#f6e3fb", "#fdeadb"]} opacity={0.5} />
                <Reveal className="relative mx-auto max-w-7xl">
                    <Kicker>The Gallery</Kicker>
                    <h1 className="mt-5 font-serif text-5xl italic text-[#3a3240] sm:text-6xl md:text-7xl">
                        Available Works
                    </h1>
                    <p className="mt-4 font-sans text-sm text-[#8a8189]">
                        {active.length} original work{active.length !== 1 ? "s" : ""} currently available
                    </p>
                </Reveal>
            </section>

            {/* ── Filter Bar ───────────────────────────────────────────────── */}
            <div className="sticky top-20 z-30 border-y border-[#3a3240]/10 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4 md:gap-8 md:px-10">
                    {mediumOptions.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setSelectedMedium("all")}
                                className={`rounded-full px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.14em] transition-colors ${
                                    selectedMedium === "all"
                                        ? "bg-[#3a3240] text-white"
                                        : "text-[#6b6470] hover:bg-[#3a3240]/5"
                                }`}
                            >
                                All
                            </button>
                            {mediumOptions.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setSelectedMedium(m)}
                                    className={`rounded-full px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.14em] transition-colors ${
                                        selectedMedium === m
                                            ? "bg-[#3a3240] text-white"
                                            : "text-[#6b6470] hover:bg-[#3a3240]/5"
                                    }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-3">
                        <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Sort</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="cursor-pointer rounded-full border border-[#3a3240]/15 bg-white px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.1em] text-[#3a3240] focus:border-[#a9769f] focus:outline-none"
                        >
                            <option value="default">Curated</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="year">Newest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Grid ─────────────────────────────────────────────────────── */}
            <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
                {filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <p className="font-serif text-2xl italic text-[#c9bdd2]">No works match this filter</p>
                        <button
                            onClick={() => setSelectedMedium("all")}
                            className="mt-4 font-sans text-xs uppercase tracking-[0.14em] text-[#a9769f] hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3">
                        {filtered.map((work, i) => {
                            const img = getProductImageUrl(work);
                            const glow = work.dominantColors?.[0]?.hex ?? "#e9d6ef";
                            return (
                                <Reveal key={work.id} delay={(i % 6) * 60}>
                                    <Link href={`/artworks/${work.slug ?? work.id}`} className="group relative block">
                                        <GlowBlob
                                            className="-inset-4 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                                            colors={[glow, "#ffffff"]}
                                            opacity={0}
                                        />
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-2 shadow-[0_16px_32px_-18px_rgba(58,50,64,0.2)] transition-transform duration-500 group-hover:-translate-y-1.5">
                                            <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                                {img ? (
                                                    <Image
                                                        src={img}
                                                        alt={work.title}
                                                        fill
                                                        sizes="(min-width: 768px) 33vw, 50vw"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-[#f0ebe9]" />
                                                )}
                                                {work.salePrice && (
                                                    <span className="absolute left-3 top-3 rounded-full bg-[#a9769f] px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-white">
                                                        Sale
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-3.5 flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-serif italic text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                                    {work.title}
                                                </p>
                                                {(work.mediums?.[0]?.medium?.name ?? work.medium) && (
                                                    <p className="mt-0.5 font-sans text-xs uppercase tracking-[0.1em] text-[#a39aa0]">
                                                        {work.mediums?.[0]?.medium?.name ?? work.medium}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="shrink-0 font-sans text-sm text-[#6b6470]">
                                                {work.salePrice ? (
                                                    <span className="flex flex-col items-end">
                                                        <span className="text-[#a9769f]">${work.salePrice.toLocaleString()}</span>
                                                        <span className="text-xs text-[#c9bdd2] line-through">
                                                            ${work.price.toLocaleString()}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    `$${work.price.toLocaleString()}`
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                )}

                {/* ── Sold Archive ─────────────────────────────────────────── */}
                {sold.length > 0 && (
                    <div className="mt-24 border-t border-[#3a3240]/10 pt-16">
                        <Reveal className="mb-10">
                            <Kicker>Archive</Kicker>
                            <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Previously Sold</h2>
                        </Reveal>
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                            {sold.map((work) => {
                                const img = getProductImageUrl(work);
                                return (
                                    <div key={work.id} className="group">
                                        <div className="relative aspect-square overflow-hidden bg-[#f6f3f1] grayscale-[0.3]">
                                            {img ? (
                                                <Image src={img} alt={work.title} fill sizes="(min-width: 768px) 16vw, (min-width: 640px) 25vw, 33vw" className="object-cover opacity-70" />
                                            ) : (
                                                <div className="absolute inset-0 bg-[#f0ebe9]" />
                                            )}
                                        </div>
                                        <p className="mt-2 truncate font-sans text-xs text-[#a39aa0]">{work.title}</p>
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
