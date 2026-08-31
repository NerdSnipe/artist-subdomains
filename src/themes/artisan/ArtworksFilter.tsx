"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

export default function ArtworksFilter({ artworks }: { artworks: Product[] }) {
    const [active, setActive] = useState<string>("All");

    const mediums = useMemo(() => {
        const set = new Set<string>();
        artworks.forEach((a) => {
            if (a.medium) set.add(a.medium);
            else if (a.categoryName) set.add(a.categoryName);
        });
        return Array.from(set).sort();
    }, [artworks]);

    const visible = useMemo(() => {
        if (active === "All") return artworks;
        return artworks.filter((a) => (a.medium ?? a.categoryName) === active);
    }, [artworks, active]);

    return (
        <div>
            {mediums.length > 1 && (
                <div className="mb-10 flex flex-wrap gap-2.5">
                    {["All", ...mediums].map((m) => (
                        <button
                            key={m}
                            onClick={() => setActive(m)}
                            className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                                active === m
                                    ? "border-[var(--clay)] bg-[var(--clay)] text-[var(--paper)]"
                                    : "border-[var(--ink)]/20 text-[var(--ink-soft)] hover:border-[var(--clay)]/60 hover:text-[var(--clay-dark)]"
                            }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            )}

            {visible.length === 0 ? (
                <p className="italic text-[var(--ink-soft)]">No works in this medium just yet.</p>
            ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                    {visible.map((artwork) => {
                        const img = getProductImageUrl(artwork);
                        return (
                            <Link key={artwork.id} href={`/artworks/${artwork.slug ?? artwork.id}`} className="group block">
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--sand)]">
                                    {img && (
                                        <Image
                                            src={img}
                                            alt={artwork.title}
                                            fill
                                            sizes="(min-width: 640px) 33vw, 50vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                    )}
                                </div>
                                <p className="mt-3 text-sm text-[var(--ink)]">{artwork.title}</p>
                                {artwork.dimensions && (
                                    <p className="text-xs text-[var(--ink-soft)]">
                                        {artwork.dimensions.width}&Prime; × {artwork.dimensions.height}&Prime;
                                    </p>
                                )}
                                <p className="text-sm text-[var(--clay-dark)]">${artwork.price.toLocaleString()}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
