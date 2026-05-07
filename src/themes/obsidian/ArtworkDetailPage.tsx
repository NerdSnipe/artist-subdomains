import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function ObsidianArtworkDetail({
    artist,
    product,
    relatedProducts,
    domain,
}: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const medium = product.medium ?? product.mediums?.[0]?.medium.name;
    const styles = product.styles?.map((s) => s.artStyle.name) ?? [];
    const subjects = product.subjects?.map((s) => s.subject.name) ?? [];
    const hasMarketplaceLink = product.status === "active" && artistSlug && product.slug;

    // Sorted additional images
    const additionalImages = (product.images ?? [])
        .filter((img) => !img.isPrimary)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .slice(0, 4);

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Back link */}
            <div className="px-6 md:px-12 py-8">
                <Link
                    href={`/artworks`}
                    className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#4a4540] hover:text-[#c9a96e] transition-colors duration-300"
                >
                    <span className="h-px w-6 bg-current" />
                    All Works
                </Link>
            </div>

            {/* Main layout: image | details */}
            <div className="flex flex-col lg:flex-row min-h-[80vh]">
                {/* Left: Image (60%) */}
                <div className="lg:w-[60%] relative bg-[#0d0d0d]">
                    <div className="sticky top-20">
                        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[calc(100vh-5rem)]">
                            {imgUrl ? (
                                <Image
                                    src={imgUrl}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                                    <span className="text-[#2a2520] tracking-widest uppercase text-xs">No Image</span>
                                </div>
                            )}

                            {product.status === "sold" && (
                                <div className="absolute top-6 left-6">
                                    <span className="text-[9px] tracking-[0.35em] uppercase text-[#8a4a3a] border border-[#8a4a3a]/60 px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-sm">
                                        Sold
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Additional images strip */}
                        {additionalImages.length > 0 && (
                            <div className="flex gap-2 p-4 bg-[#0a0a0a]">
                                {additionalImages.map((img, i) => (
                                    <div key={i} className="relative w-20 h-20 bg-[#111] flex-shrink-0">
                                        <Image
                                            src={img.imageUrl}
                                            alt={img.caption ?? `${product.title} detail ${i + 2}`}
                                            fill
                                            className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Details (40%) */}
                <div className="lg:w-[40%] px-8 md:px-12 lg:px-14 py-12 border-l border-[#c9a96e]/10 flex flex-col">
                    {/* Title + year */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-thin tracking-[0.15em] uppercase text-[#f5f0eb] mb-3 leading-tight">
                            {product.title}
                        </h1>
                        {product.yearCreated && (
                            <p className="text-[10px] tracking-[0.3em] uppercase text-[#4a4540]">
                                {product.yearCreated}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <p className="text-2xl md:text-3xl font-thin text-[#c9a96e] tracking-wider">
                            ${product.price.toLocaleString()}
                        </p>
                        {product.salePrice && product.salePrice < product.price && (
                            <p className="text-sm text-[#6a6460] line-through mt-1">
                                ${product.salePrice.toLocaleString()}
                            </p>
                        )}
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent mb-8" />

                    {/* Metadata */}
                    <div className="space-y-4 mb-10">
                        {medium && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-24 shrink-0 pt-0.5">
                                    Medium
                                </span>
                                <span className="text-xs text-[#8a8278] font-light">{medium}</span>
                            </div>
                        )}

                        {product.dimensions && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-24 shrink-0 pt-0.5">
                                    Dimensions
                                </span>
                                <span className="text-xs text-[#8a8278] font-light">
                                    {product.dimensions.width} × {product.dimensions.height}
                                    {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""}{" "}
                                    {product.dimensions.unit}
                                </span>
                            </div>
                        )}

                        {product.isOriginal !== undefined && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-24 shrink-0 pt-0.5">
                                    Type
                                </span>
                                <span className="text-xs text-[#8a8278] font-light">
                                    {product.isOriginal ? "Original" : "Reproduction"}
                                </span>
                            </div>
                        )}

                        {product.isFramed !== undefined && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-24 shrink-0 pt-0.5">
                                    Framed
                                </span>
                                <span className="text-xs text-[#8a8278] font-light">
                                    {product.isFramed
                                        ? product.readyToHang
                                            ? "Framed, ready to hang"
                                            : "Framed"
                                        : "Unframed"}
                                </span>
                            </div>
                        )}

                        {styles.length > 0 && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-24 shrink-0 pt-0.5">
                                    Style
                                </span>
                                <span className="text-xs text-[#8a8278] font-light">{styles.join(", ")}</span>
                            </div>
                        )}

                        {subjects.length > 0 && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-24 shrink-0 pt-0.5">
                                    Subject
                                </span>
                                <span className="text-xs text-[#8a8278] font-light">{subjects.join(", ")}</span>
                            </div>
                        )}
                    </div>

                    {/* Dominant colors */}
                    {product.dominantColors && product.dominantColors.length > 0 && (
                        <div className="mb-10">
                            <p className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] mb-3">
                                Palette
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {product.dominantColors.map((color, i) => (
                                    <div key={i} className="flex items-center gap-2 group">
                                        <div
                                            className="w-5 h-5 rounded-full border border-[#2a2520]"
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                        <span className="text-[9px] text-[#3a3530] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                            {color.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {product.description && (
                        <div className="mb-10 border-t border-[#c9a96e]/10 pt-8">
                            <p className="text-sm text-[#7a7470] font-thin leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-4">
                        {hasMarketplaceLink ? (
                            <a
                                href={marketplaceArtworkUrl(product)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-4 w-full justify-center px-8 py-4 bg-[#c9a96e] text-[#0a0a0a] text-[10px] tracking-[0.4em] uppercase font-normal hover:bg-[#d4b87e] transition-colors duration-300"
                            >
                                Acquire This Work
                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </a>
                        ) : product.status === "sold" ? (
                            <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#8a4a3a] border border-[#8a4a3a]/30 py-4">
                                This Work Has Found Its Home
                            </p>
                        ) : null}

                        <p className="text-[9px] tracking-[0.15em] uppercase text-[#2a2520] text-center mt-4">
                            Transactions handled through{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3a3530] hover:text-[#c9a96e]/50 transition-colors"
                            >
                                ArtsDistrictUSA
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Related works */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-[#c9a96e]/10 mt-0 py-16 px-6 md:px-12">
                    <div className="flex items-center gap-6 mb-12 max-w-7xl mx-auto">
                        <span className="h-px flex-1 bg-[#c9a96e]/10" />
                        <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]/60 font-light">
                            Continue Exploring
                        </h2>
                        <span className="h-px flex-1 bg-[#c9a96e]/10" />
                    </div>

                    {/* Horizontal scroll on mobile, grid on desktop */}
                    <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible max-w-7xl mx-auto">
                        {relatedProducts.slice(0, 4).map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link
                                    key={r.id}
                                    href={`/artworks/${r.slug ?? r.id}`}
                                    className="group block flex-shrink-0 w-48 md:w-auto"
                                >
                                    <div className="relative aspect-square bg-[#111] overflow-hidden mb-3">
                                        {rImg ? (
                                            <Image
                                                src={rImg}
                                                alt={r.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[#1a1a1a]" />
                                        )}
                                        <div className="absolute inset-0 border border-[#c9a96e]/0 group-hover:border-[#c9a96e]/25 transition-colors duration-500" />
                                    </div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6a6460] font-light group-hover:text-[#c9a96e] transition-colors duration-300">
                                        {r.title}
                                    </p>
                                    <p className="text-[9px] text-[#3a3530]">${r.price.toLocaleString()}</p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
