import Image from "next/image";
import Link from "next/link";
import { Frame, PackageCheck } from "lucide-react";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

function formatDimensions(product: Product): string | null {
    if (!product.dimensions) return null;
    const { width, height, depth, unit } = product.dimensions;
    const u = unit === "cm" ? "cm" : '"';
    return `${width}${u} × ${height}${u}${depth ? ` × ${depth}${u}` : ""}`;
}

function primaryTaxonomy(product: Product): string | null {
    const medium = product.mediums?.[0]?.medium?.name ?? product.medium;
    const style = product.styles?.[0]?.artStyle?.name;
    if (medium && style) return `${style} · ${medium}`;
    return medium ?? style ?? null;
}

export default function ProductCard({
    artwork,
    priority = false,
    index = 0,
}: {
    artwork: Product;
    priority?: boolean;
    index?: number;
}) {
    const img = getProductImageUrl(artwork);
    const isSold = artwork.status === "sold";
    const dims = formatDimensions(artwork);
    const taxonomy = primaryTaxonomy(artwork);
    const swatches = artwork.dominantColors?.slice(0, 5) ?? [];

    return (
        <Link
            href={`/artworks/${artwork.slug ?? artwork.id}`}
            className="group relative block"
            style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#efe6d7]">
                {img && (
                    <Image
                        src={img}
                        alt={artwork.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
                        priority={priority}
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] ${isSold ? "grayscale-[35%]" : ""}`}
                    />
                )}

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {artwork.isOriginal ? (
                        <span className="bg-[#faf6ee]/95 text-[#241e19] text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-1">
                            Original
                        </span>
                    ) : (
                        <span className="bg-[#faf6ee]/95 text-[#6b5d4f] text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-1">
                            Print
                        </span>
                    )}
                    {artwork.salePrice != null && !isSold && (
                        <span className="bg-[#a23b2e] text-[#faf6ee] text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-1">
                            Sale
                        </span>
                    )}
                </div>

                {isSold && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-[#241e19]/90 text-[#f8f2e9] text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5">
                            Collected
                        </span>
                    </div>
                )}

                {/* Frame / ready-to-hang chips */}
                {!isSold && (artwork.isFramed || artwork.readyToHang) && (
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {artwork.isFramed && (
                            <span className="inline-flex items-center gap-1 bg-[#241e19]/80 text-[#f8f2e9] text-[9px] font-medium tracking-wide uppercase px-1.5 py-1">
                                <Frame size={10} /> Framed
                            </span>
                        )}
                        {artwork.readyToHang && (
                            <span className="inline-flex items-center gap-1 bg-[#241e19]/80 text-[#f8f2e9] text-[9px] font-medium tracking-wide uppercase px-1.5 py-1">
                                <PackageCheck size={10} /> Ready to Hang
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="pt-3.5">
                <h3 className="font-[family-name:var(--market-font-display)] text-[#241e19] text-lg leading-snug group-hover:text-[#b2542e] transition-colors">
                    {artwork.title}
                </h3>
                <div className="flex items-center justify-between mt-1 mb-2">
                    {taxonomy && <p className="text-xs text-[#8a7d6e]">{taxonomy}</p>}
                    {dims && <p className="text-xs text-[#8a7d6e]">{dims}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        {artwork.salePrice != null ? (
                            <>
                                <span className="text-sm font-semibold text-[#a23b2e]">
                                    ${artwork.salePrice.toLocaleString()}
                                </span>
                                <span className="text-xs text-[#a8998a] line-through">
                                    ${artwork.price.toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="text-sm font-semibold text-[#241e19]">
                                ${artwork.price.toLocaleString()}
                            </span>
                        )}
                    </div>
                    {swatches.length > 0 && (
                        <div className="flex items-center gap-1">
                            {swatches.map((c, i) => (
                                <span
                                    key={`${c.hex}-${i}`}
                                    title={c.name}
                                    className="w-2.5 h-2.5 rounded-full ring-1 ring-[#241e19]/10"
                                    style={{ backgroundColor: c.hex }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
