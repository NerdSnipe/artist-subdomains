"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import { getEffectiveDimensions } from "@/lib/product-dimensions";

// The one artwork-card design used everywhere a grid of pieces appears — homepage, the
// artworks/portfolio page, and the "More Work" strip on a single artwork's detail page.
// Bigger title, bigger gold price, medium, all three real dimensions, and a color-swatch
// row so a browsing collector never has to click through just to check size or palette.
export default function AnthemArtworkCard({ art, priority = false }: { art: Product; priority?: boolean }) {
    const img = getProductImageUrl(art);
    // Daniel's getEffectiveDimensions() is the authority on the artwork's real measurements, and
    // they make a good first guess at the tile's shape. But the canvas and the photograph of it are
    // rarely the same proportions — the photo includes a frame, or was shot a little wide — and
    // sizing the tile from measurements alone is what left black bars around anything that didn't
    // match. So: start from the measurements, then snap to the photo's own ratio once it loads.
    const effDims = getEffectiveDimensions(art);
    const [ratio, setRatio] = useState<number>(
        effDims && effDims.height ? effDims.width / effDims.height : 1
    );
    const dims = effDims
        ? `${effDims.height}" H × ${effDims.width}" W${effDims.depth ? ` × ${effDims.depth}" D` : ""}`
        : null;

    return (
        <Link href={`/artworks/${art.slug ?? art.id}`} className="group block">
            <div className="relative w-full overflow-hidden border-2 border-black" style={{ aspectRatio: ratio }}>
                {img && (
                    <Image
                        src={img}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onLoad={(e) => {
                            const el = e.currentTarget;
                            if (el.naturalWidth && el.naturalHeight) setRatio(el.naturalWidth / el.naturalHeight);
                        }}
                        priority={priority}
                    />
                )}
                {art.gallerySource && art.gallerySource.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
                        {art.gallerySource.map((g) => (
                            <span key={g} className="bg-black text-[#F7F4EC] text-[9px] font-bold uppercase tracking-wide px-2 py-1 border border-black">
                                {g}
                            </span>
                        ))}
                    </div>
                )}
                {art.status === "sold" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#F7F4EC] border-2 border-[#F7F4EC] px-4 py-2">Sold</span>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <p className="font-[family-name:var(--font-display)] uppercase text-2xl leading-[0.95] tracking-wide group-hover:text-[#E62828] transition-colors">
                    {art.title}
                </p>
                <p className="mt-1.5 text-xl font-bold text-[#C9A227]">${art.price.toLocaleString()}</p>
                {art.medium && <p className="mt-1 text-[11px] uppercase tracking-wide text-black/60">{art.medium}</p>}
                {dims && <p className="text-[11px] text-black/40">{dims}</p>}
                <div className="mt-2.5 border-t border-black/25" />
                {art.dominantColors && art.dominantColors.length > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                        {art.dominantColors.map((c, i) => (
                            <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-black/40"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
