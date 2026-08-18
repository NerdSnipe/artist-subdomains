"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

type Availability = "available" | "sold" | "all";

function mediumOf(p: Product): string | null {
    return p.mediums?.[0]?.medium?.name ?? p.medium ?? null;
}

export default function ArtworksBrowser({ artworks }: { artworks: Product[] }) {
    const [availability, setAvailability] = useState<Availability>("available");
    const [medium, setMedium] = useState<string>("All");

    const mediums = useMemo(() => {
        const set = new Set<string>();
        artworks.forEach((a) => {
            const m = mediumOf(a);
            if (m) set.add(m);
        });
        return ["All", ...Array.from(set).sort()];
    }, [artworks]);

    const filtered = useMemo(() => {
        return artworks.filter((a) => {
            if (availability === "available" && a.status !== "active") return false;
            if (availability === "sold" && a.status !== "sold") return false;
            if (medium !== "All" && mediumOf(a) !== medium) return false;
            return true;
        });
    }, [artworks, availability, medium]);

    const availableCount = artworks.filter((a) => a.status === "active").length;
    const soldCount = artworks.filter((a) => a.status === "sold").length;

    return (
        <div>
            <div className="flex flex-col gap-5 mb-10 pb-6 border-b border-[#e3d5c1]">
                <div className="inline-flex w-fit items-center gap-1 bg-[#efe6d7] p-1">
                    {(
                        [
                            ["available", `Available (${availableCount})`],
                            ["all", `All Works (${artworks.length})`],
                            ...(soldCount > 0 ? [["sold", `Collected (${soldCount})`] as [Availability, string]] : []),
                        ] as [Availability, string][]
                    ).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setAvailability(key)}
                            className={clsx(
                                "px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors",
                                availability === key
                                    ? "bg-[#241e19] text-[#f8f2e9]"
                                    : "text-[#6b5d4f] hover:text-[#241e19]"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {mediums.length > 2 && (
                    <div className="flex flex-wrap gap-2">
                        {mediums.map((m) => (
                            <button
                                key={m}
                                onClick={() => setMedium(m)}
                                className={clsx(
                                    "px-3 py-1.5 text-xs font-medium border transition-colors",
                                    medium === m
                                        ? "border-[#b2542e] text-[#b2542e] bg-[#f0d9c5]/40"
                                        : "border-[#e3d5c1] text-[#6b5d4f] hover:border-[#b2542e] hover:text-[#b2542e]"
                                )}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-24 text-[#8a7d6e]">
                    <p className="font-[family-name:var(--market-font-display)] italic text-xl">
                        Nothing here just yet.
                    </p>
                    <p className="text-sm mt-2">Try a different filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                    {filtered.map((artwork, i) => (
                        <ProductCard key={artwork.id} artwork={artwork} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
