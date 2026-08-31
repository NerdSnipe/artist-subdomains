import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function NoirArtworkDetailPage({
    artist,
    product,
    relatedProducts,
}: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const medium = product.medium ?? product.mediums?.[0]?.medium?.name;
    const styles = product.styles?.map((s) => s.artStyle?.name).filter(Boolean) as string[] ?? [];
    const subjects = product.subjects?.map((s) => s.subject?.name).filter(Boolean) as string[] ?? [];
    const hasMarketplaceLink = product.status === "active" && !!artistSlug && !!product.slug;

    const additionalImages = (product.images ?? [])
        .filter((img) => !img.isPrimary)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .slice(0, 5);

    return (
        <div className="bg-[#0d0d0d] min-h-screen">
            {/* Back link */}
            <div className="px-6 md:px-12 pt-8 pb-4">
                <Link
                    href="/artworks"
                    className="inline-flex items-center gap-3 text-[9px] tracking-[0.35em] uppercase text-[#4a4a4a] hover:text-[#a8884a] transition-colors duration-300"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    <span className="h-px w-6 bg-current" />
                    All Works
                </Link>
            </div>

            {/* Full-bleed hero image — 60vh */}
            <div className="relative h-[60vh] overflow-hidden">
                {imgUrl ? (
                    <Image
                        src={imgUrl}
                        alt={product.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#1a1a1a]" />
                )}

                {/* Spotlight vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.9) 100%)",
                    }}
                />

                {/* Dark gradient at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

                {/* Film grain */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.045,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "180px 180px",
                    }}
                />

                {/* Sold badge */}
                {product.status === "sold" && (
                    <div className="absolute top-6 left-8 z-10">
                        <span
                            className="text-[8px] tracking-[0.5em] uppercase text-[#8b0000] border border-[#8b0000]/60 px-3 py-1.5 bg-black/80 backdrop-blur-sm"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Acquired
                        </span>
                    </div>
                )}
            </div>

            {/* Two-panel layout */}
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 md:px-12 py-16 gap-12 lg:gap-20">
                {/* Left: main image + thumbnail strip */}
                <div className="lg:w-[55%]">
                    <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-4">
                        {imgUrl ? (
                            <Image
                                src={imgUrl}
                                alt={product.title}
                                fill
                                sizes="(min-width: 1024px) 55vw, 100vw"
                                className="object-contain"
                                priority
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                                <span
                                    className="text-[#2a2a2a] text-xs tracking-widest uppercase"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    No Image
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {additionalImages.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {additionalImages.map((img, i) => (
                                <div key={i} className="relative w-20 h-20 bg-[#111] overflow-hidden border border-[#2a2a2a] hover:border-[#a8884a]/50 transition-colors duration-300">
                                    <Image
                                        src={img.imageUrl}
                                        alt={img.caption ?? `${product.title} view ${i + 2}`}
                                        fill
                                        sizes="80px"
                                        className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: details panel */}
                <div className="lg:w-[45%] flex flex-col">
                    {/* Title */}
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-light italic text-[#e8e8e8] mb-3 leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {product.title}
                    </h1>

                    {product.yearCreated && (
                        <p
                            className="text-[9px] tracking-[0.4em] uppercase text-[#4a4a4a] mb-6"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            {product.yearCreated}
                        </p>
                    )}

                    {/* Price in gold Courier New */}
                    <p
                        className="text-2xl md:text-3xl text-[#a8884a] mb-2"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        ${product.price.toLocaleString()}
                    </p>
                    {product.salePrice && product.salePrice < product.price && (
                        <p
                            className="text-sm text-[#5a5a5a] line-through mb-4"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            ${product.salePrice.toLocaleString()}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-[#a8884a]/30 to-transparent mb-8" />

                    {/* Metadata in Courier New labels */}
                    <div className="space-y-4 mb-8">
                        {medium && (
                            <div className="flex gap-4 items-baseline">
                                <span
                                    className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] w-24 shrink-0"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    Medium
                                </span>
                                <span
                                    className="text-xs text-[#8a8a8a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {medium}
                                </span>
                            </div>
                        )}

                        {product.dimensions && (
                            <div className="flex gap-4 items-baseline">
                                <span
                                    className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] w-24 shrink-0"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    Dimensions
                                </span>
                                <span
                                    className="text-xs text-[#8a8a8a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {product.dimensions.width} × {product.dimensions.height}
                                    {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""}{" "}
                                    {product.dimensions.unit}
                                </span>
                            </div>
                        )}

                        {product.isOriginal !== undefined && (
                            <div className="flex gap-4 items-baseline">
                                <span
                                    className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] w-24 shrink-0"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    Type
                                </span>
                                <span
                                    className="text-xs text-[#8a8a8a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {product.isOriginal ? "Original" : "Reproduction"}
                                </span>
                            </div>
                        )}

                        {product.isFramed !== undefined && (
                            <div className="flex gap-4 items-baseline">
                                <span
                                    className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] w-24 shrink-0"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    Framing
                                </span>
                                <span
                                    className="text-xs text-[#8a8a8a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {product.isFramed
                                        ? product.readyToHang
                                            ? "Framed & Ready to Hang"
                                            : "Framed"
                                        : "Unframed"}
                                </span>
                            </div>
                        )}

                        {styles.length > 0 && (
                            <div className="flex gap-4 items-baseline">
                                <span
                                    className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] w-24 shrink-0"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    Style
                                </span>
                                <span
                                    className="text-xs text-[#8a8a8a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {styles.join(", ")}
                                </span>
                            </div>
                        )}

                        {subjects.length > 0 && (
                            <div className="flex gap-4 items-baseline">
                                <span
                                    className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] w-24 shrink-0"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    Subject
                                </span>
                                <span
                                    className="text-xs text-[#8a8a8a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {subjects.join(", ")}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Dominant colors */}
                    {product.dominantColors && product.dominantColors.length > 0 && (
                        <div className="mb-8">
                            <p
                                className="text-[8px] tracking-[0.4em] uppercase text-[#3a3a3a] mb-3"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Palette
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {product.dominantColors.map((color, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 group">
                                        <div
                                            className="w-6 h-6 rounded-full border border-[#2a2a2a] group-hover:border-[#a8884a]/40 transition-colors"
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                        <span
                                            className="text-[7px] tracking-widest uppercase text-[#3a3a3a] group-hover:text-[#5a5a5a] transition-colors"
                                            style={{ fontFamily: "'Courier New', monospace" }}
                                        >
                                            {color.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {product.description && (
                        <div className="mb-10 border-t border-[#1a1a1a] pt-6">
                            <p
                                className="text-sm text-[#7a7a7a] leading-relaxed font-light italic"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
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
                                className="group inline-flex items-center gap-4 w-full justify-center px-8 py-4 border border-[#a8884a]/70 bg-[#a8884a]/10 text-[#a8884a] text-[9px] tracking-[0.5em] uppercase hover:bg-[#a8884a]/20 hover:border-[#a8884a] transition-all duration-300"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Acquire This Work
                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </a>
                        ) : product.status === "sold" ? (
                            <p
                                className="text-center text-[9px] tracking-[0.4em] uppercase text-[#8b0000]/70 border border-[#8b0000]/25 py-4"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                This Work Has Found Its Home
                            </p>
                        ) : null}

                        <p
                            className="text-[8px] tracking-[0.15em] uppercase text-[#2a2a2a] text-center mt-4"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Transactions via{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3a3a3a] hover:text-[#a8884a]/50 transition-colors"
                            >
                                ArtsDistrictUSA
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Process video */}
            {product.youtubeVideoId && (
                <section className="border-t border-[#1a1a1a] py-16 px-6 md:px-12">
                    <div className="flex items-center gap-6 mb-10 max-w-7xl mx-auto">
                        <span className="h-px flex-1 bg-[#a8884a]/10" />
                        <h2
                            className="text-[8px] tracking-[0.5em] uppercase text-[#a8884a]/60"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            The Making Of
                        </h2>
                        <span className="h-px flex-1 bg-[#a8884a]/10" />
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="relative w-full aspect-video overflow-hidden bg-[#111] border border-[#2a2a2a]">
                            <iframe
                                src={`https://www.youtube.com/embed/${product.youtubeVideoId}`}
                                title={`${product.title} — video`}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Related works */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-[#1a1a1a] py-16 px-6 md:px-12">
                    <div className="flex items-center gap-6 mb-12 max-w-7xl mx-auto">
                        <span className="h-px flex-1 bg-[#a8884a]/10" />
                        <h2
                            className="text-[8px] tracking-[0.5em] uppercase text-[#a8884a]/60"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Continue Exploring
                        </h2>
                        <span className="h-px flex-1 bg-[#a8884a]/10" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                        {relatedProducts.slice(0, 4).map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link
                                    key={r.id}
                                    href={`/artworks/${r.slug ?? r.id}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-square bg-[#111] overflow-hidden mb-3">
                                        {rImg ? (
                                            <Image
                                                src={rImg}
                                                alt={r.title}
                                                fill
                                                sizes="(min-width: 768px) 25vw, 50vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[#1a1a1a]" />
                                        )}
                                        <div className="absolute inset-0 border border-[#a8884a]/0 group-hover:border-[#a8884a]/25 transition-colors duration-500" />
                                    </div>
                                    <p
                                        className="text-[9px] tracking-[0.2em] uppercase text-[#5a5a5a] group-hover:text-[#a8884a] transition-colors duration-300 italic"
                                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "none" }}
                                    >
                                        {r.title}
                                    </p>
                                    <p
                                        className="text-[8px] text-[#3a3a3a] mt-1"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        ${r.price.toLocaleString()}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
