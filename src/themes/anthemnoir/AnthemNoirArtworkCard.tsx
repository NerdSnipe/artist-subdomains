import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import { getEffectiveDimensions } from "@/lib/product-dimensions";

// The one artwork-card design used everywhere a grid of pieces appears — homepage, the
// artworks/portfolio page, and the "More Work" strip on a single artwork's detail page.
// Bigger title, bigger gold price, medium, all three real dimensions, and a color-swatch
// row so a browsing collector never has to click through just to check size or palette.
export default function AnthemNoirArtworkCard({ art, priority = false }: { art: Product; priority?: boolean }) {
    const img = getProductImageUrl(art);
    const effDims = getEffectiveDimensions(art);
    const ratio = effDims ? `${effDims.width} / ${effDims.height}` : "1 / 1";
    const dims = effDims
        ? `${effDims.height}" H × ${effDims.width}" W${effDims.depth ? ` × ${effDims.depth}" D` : ""}`
        : null;

    return (
        <Link href={`/artworks/${art.slug ?? art.id}`} className="group block">
            {/* object-contain (not cover) — the container is sized to the artwork's real
                proportions, but the source photo's own crop/framing can still differ slightly,
                so contain is what actually guarantees the whole piece is always visible. */}
            <div className="relative w-full overflow-hidden border-2 border-[#E9DFC9] bg-black" style={{ aspectRatio: ratio }}>
                {img && (
                    <Image
                        src={img}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        priority={priority}
                    />
                )}
                {art.gallerySource && art.gallerySource.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[90%]">
                        {art.gallerySource.map((g) => (
                            <span key={g} className="bg-[#0C0B09] text-[#E9DFC9] text-[9px] font-bold uppercase tracking-wide px-2 py-1 border border-[#E9DFC9]">
                                {g}
                            </span>
                        ))}
                    </div>
                )}
                {art.status === "sold" && (
                    <div className="absolute inset-0 bg-[#0C0B09]/60 flex items-center justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9] border-2 border-[#E9DFC9] px-4 py-2">Sold</span>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <p className="font-[family-name:var(--font-display)] uppercase text-2xl leading-[0.95] tracking-wide group-hover:text-[#C9A227] transition-colors">
                    {art.title}
                </p>
                {/* Deliberately brighter yellow, not the theme's usual gold — a dedicated "look
                    here, this is the price" highlight, distinct from every other gold accent. */}
                <p className="mt-1.5 text-xl font-bold text-[#FFDC00]">${art.price.toLocaleString()}</p>
                {art.medium && <p className="mt-1 text-[11px] uppercase tracking-wide text-[#E9DFC9]/60">{art.medium}</p>}
                {dims && <p className="text-[11px] text-[#E9DFC9]/40">{dims}</p>}
                <div className="mt-2.5 border-t border-[#E9DFC9]/30" />
                {art.dominantColors && art.dominantColors.length > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                        {art.dominantColors.map((c, i) => (
                            <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-[#E9DFC9]/50"
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
