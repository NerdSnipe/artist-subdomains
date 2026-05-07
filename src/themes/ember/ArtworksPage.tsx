"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function EmberArtworks({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);

    const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "title">("default");
    const [filterMedium, setFilterMedium] = useState<string>("all");

    const visible = artworks.filter((a) => a.status !== "inactive");
    const active = visible.filter((a) => a.status === "active");
    const sold = visible.filter((a) => a.status === "sold");

    // Build unique medium list from active works
    const mediums = useMemo(() => {
        const set = new Set<string>();
        active.forEach((a) => {
            if (a.medium) set.add(a.medium);
            a.mediums?.forEach((m) => set.add(m.medium.name));
        });
        return Array.from(set).sort();
    }, [active]);

    const filtered = useMemo(() => {
        let list = [...active];
        if (filterMedium !== "all") {
            list = list.filter(
                (a) =>
                    a.medium === filterMedium ||
                    a.mediums?.some((m) => m.medium.name === filterMedium)
            );
        }
        if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
        else if (sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));
        return list;
    }, [active, filterMedium, sortBy]);

    const pillBase: React.CSSProperties = {
        fontFamily: "'Georgia', serif",
        fontSize: "0.8rem",
        letterSpacing: "0.02em",
        padding: "0.35rem 1rem",
        border: "1px solid #d9d0c4",
        cursor: "pointer",
        transition: "all 0.2s",
        backgroundColor: "#f7f3ee",
        color: "#6b5f52",
    };

    const pillActive: React.CSSProperties = {
        ...pillBase,
        backgroundColor: "#b5451b",
        borderColor: "#b5451b",
        color: "#f7f3ee",
    };

    return (
        <div style={{ backgroundColor: "#f7f3ee", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* Page header */}
            <div className="max-w-6xl mx-auto px-8 pt-16 pb-10">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="font-serif text-4xl mb-2" style={{ color: "#2c2925" }}>The Collection</h1>
                        <p className="text-sm" style={{ color: "#8a7a6e" }}>
                            {active.length} work{active.length !== 1 ? "s" : ""} available
                        </p>
                    </div>
                    {/* Sort */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: "#a0907f", letterSpacing: "0.08em" }}>Sort</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="text-sm px-4 py-2 border appearance-none"
                            style={{
                                backgroundColor: "#f7f3ee",
                                borderColor: "#d9d0c4",
                                color: "#2c2925",
                                fontFamily: "'Georgia', serif",
                                cursor: "pointer",
                            }}
                        >
                            <option value="default">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="title">Alphabetical</option>
                        </select>
                    </div>
                </div>

                {/* Medium filter pills */}
                {mediums.length > 1 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                        <button
                            style={filterMedium === "all" ? pillActive : pillBase}
                            onClick={() => setFilterMedium("all")}
                        >
                            All
                        </button>
                        {mediums.map((m) => (
                            <button
                                key={m}
                                style={filterMedium === m ? pillActive : pillBase}
                                onClick={() => setFilterMedium(m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="max-w-6xl mx-auto px-8 mb-12">
                <div className="h-px" style={{ backgroundColor: "#d9d0c4" }} />
            </div>

            {/* Works grid */}
            <div className="max-w-6xl mx-auto px-8 pb-24">
                {filtered.length === 0 ? (
                    <p className="italic text-center py-16" style={{ color: "#8a7a6e" }}>
                        No works match this filter.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filtered.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/${domain}/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group block"
                                >
                                    {/* Matted frame */}
                                    <div
                                        className="relative mb-4 transition-all duration-300 group-hover:shadow-lg"
                                        style={{
                                            backgroundColor: "#ede8e1",
                                            padding: "1rem",
                                            boxShadow: "0 1px 4px rgba(44,41,37,0.06), inset 0 0 0 1px rgba(44,41,37,0.04)",
                                        }}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                                            {img ? (
                                                <Image
                                                    src={img}
                                                    alt={artwork.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full" style={{ backgroundColor: "#d9cfc5" }} />
                                            )}
                                            {/* Sold badge */}
                                            {artwork.status === "sold" && (
                                                <div
                                                    className="absolute top-3 left-3 px-2.5 py-1 text-xs"
                                                    style={{
                                                        backgroundColor: "#b5451b",
                                                        color: "#f7f3ee",
                                                        letterSpacing: "0.08em",
                                                        fontFamily: "'Georgia', serif",
                                                    }}
                                                >
                                                    Sold
                                                </div>
                                            )}
                                            {/* Hover overlay with price */}
                                            <div
                                                className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ background: "linear-gradient(to top, rgba(44,41,37,0.65) 0%, transparent 60%)" }}
                                            >
                                                <div className="p-4">
                                                    <p className="font-serif text-sm" style={{ color: "#f7f3ee" }}>
                                                        ${artwork.price.toLocaleString()}
                                                    </p>
                                                    {artwork.dimensions && (
                                                        <p className="text-xs mt-0.5" style={{ color: "rgba(247,243,238,0.7)" }}>
                                                            {artwork.dimensions.width}&Prime; &times; {artwork.dimensions.height}&Prime;
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="font-serif text-base leading-snug mb-1" style={{ color: "#2c2925" }}>
                                        {artwork.title}
                                    </p>
                                    {artwork.medium && (
                                        <p className="text-xs mb-1" style={{ color: "#8a7a6e" }}>{artwork.medium}</p>
                                    )}
                                    <p className="text-sm" style={{ color: "#b5451b" }}>
                                        {artwork.status === "sold" ? (
                                            <span style={{ color: "#8a7a6e" }}>Sold</span>
                                        ) : (
                                            `$${artwork.price.toLocaleString()}`
                                        )}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Sold works section */}
                {sold.length > 0 && filterMedium === "all" && (
                    <div className="mt-24 pt-16 border-t" style={{ borderColor: "#d9d0c4" }}>
                        <div className="flex items-center gap-6 mb-10">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#8a7a6e" }}>
                                Sold Works
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d9d0c4" }} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {sold.map((artwork) => {
                                const img = getProductImageUrl(artwork);
                                return (
                                    <div key={artwork.id} className="opacity-55">
                                        <div
                                            className="relative mb-3"
                                            style={{ backgroundColor: "#ede8e1", padding: "0.6rem" }}
                                        >
                                            <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                                                {img ? (
                                                    <Image
                                                        src={img}
                                                        alt={artwork.title}
                                                        fill
                                                        className="object-cover grayscale"
                                                        sizes="(max-width: 640px) 50vw, 25vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full" style={{ backgroundColor: "#d9cfc5" }} />
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs font-serif" style={{ color: "#6b5f52" }}>{artwork.title}</p>
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
