import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function EmberArtworkDetail({ artist, product, relatedProducts, domain }: ThemeArtworkDetailProps) {
    const name = getArtistName(artist);
    const imgUrl = getProductImageUrl(product);
    const canPurchase = product.status === "active" && !!product.artistSlug && !!product.slug;

    const mediumNames = product.mediums?.map((m) => m.medium.name).join(", ") ?? product.medium ?? null;
    const styleNames = product.styles?.map((s) => s.artStyle.name).join(", ") ?? null;
    const subjectNames = product.subjects?.map((s) => s.subject.name).join(", ") ?? null;

    const related = relatedProducts.filter((r) => r.id !== product.id && r.status !== "inactive").slice(0, 3);

    return (
        <div style={{ backgroundColor: "#f7f3ee", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            <div className="max-w-6xl mx-auto px-8 pt-10 pb-6">
                <Link
                    href={`/artworks`}
                    className="inline-flex items-center gap-2 text-sm transition-all duration-200 hover:opacity-60"
                    style={{ color: "#b5451b" }}
                >
                    &larr; The Collection
                </Link>
            </div>

            {/* Main two-panel layout */}
            <div className="max-w-6xl mx-auto px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Matted artwork image */}
                    <div
                        className="sticky top-24"
                        style={{
                            backgroundColor: "#ede8e1",
                            padding: "1.5rem",
                            boxShadow: "0 2px 16px rgba(44,41,37,0.08), inset 0 0 0 1px rgba(44,41,37,0.05)",
                        }}
                    >
                        <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                            {imgUrl ? (
                                <Image
                                    src={imgUrl}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="w-full h-full" style={{ backgroundColor: "#d9cfc5" }} />
                            )}
                            {product.status === "sold" && (
                                <div
                                    className="absolute top-4 left-4 px-3 py-1.5 text-xs"
                                    style={{
                                        backgroundColor: "#b5451b",
                                        color: "#f7f3ee",
                                        letterSpacing: "0.1em",
                                        fontFamily: "'Georgia', serif",
                                    }}
                                >
                                    Sold
                                </div>
                            )}
                        </div>

                        {/* Additional images strip if available */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 mt-4">
                                {product.images
                                    .sort((a, b) => a.displayOrder - b.displayOrder)
                                    .slice(0, 5)
                                    .map((img, i) => (
                                        <div
                                            key={img.id}
                                            className="relative flex-shrink-0 w-14 h-14 overflow-hidden"
                                            style={{ backgroundColor: "#d9cfc5" }}
                                        >
                                            <Image
                                                src={img.imageUrl}
                                                alt={`View ${i + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="56px"
                                            />
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info panel */}
                    <div className="py-4">
                        {product.yearCreated && (
                            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#b5451b", letterSpacing: "0.14em" }}>
                                {product.yearCreated}
                            </p>
                        )}

                        <h1 className="font-serif leading-tight mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#2c2925" }}>
                            {product.title}
                        </h1>

                        <p className="text-sm mb-6" style={{ color: "#8a7a6e" }}>by {name}</p>

                        {/* Price */}
                        <div className="mb-8 pb-8 border-b" style={{ borderColor: "#d9d0c4" }}>
                            {product.salePrice ? (
                                <div className="flex items-baseline gap-4">
                                    <span className="font-serif text-2xl" style={{ color: "#b5451b" }}>
                                        ${product.salePrice.toLocaleString()}
                                    </span>
                                    <span className="text-base line-through" style={{ color: "#a0907f" }}>
                                        ${product.price.toLocaleString()}
                                    </span>
                                </div>
                            ) : (
                                <span className="font-serif text-2xl" style={{ color: "#b5451b" }}>
                                    ${product.price.toLocaleString()}
                                </span>
                            )}
                            {product.status === "sold" && (
                                <p className="text-xs mt-2" style={{ color: "#8a7a6e" }}>This work has found a home.</p>
                            )}
                        </div>

                        {/* Metadata — elegant label/value pairs */}
                        <div className="space-y-4 mb-8 pb-8 border-b" style={{ borderColor: "#d9d0c4" }}>
                            {mediumNames && (
                                <div className="flex gap-6">
                                    <span className="text-xs uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>Medium</span>
                                    <span className="text-sm leading-relaxed" style={{ color: "#2c2925" }}>{mediumNames}</span>
                                </div>
                            )}
                            {product.dimensions && (
                                <div className="flex gap-6">
                                    <span className="text-xs uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>Size</span>
                                    <span className="text-sm" style={{ color: "#2c2925" }}>
                                        {product.dimensions.width}&Prime; &times; {product.dimensions.height}&Prime;
                                        {product.dimensions.depth ? ` × ${product.dimensions.depth}″` : ""}
                                        {" "}{product.dimensions.unit === "cm" ? "cm" : "in"}
                                    </span>
                                </div>
                            )}
                            {styleNames && (
                                <div className="flex gap-6">
                                    <span className="text-xs uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>Style</span>
                                    <span className="text-sm" style={{ color: "#2c2925" }}>{styleNames}</span>
                                </div>
                            )}
                            {subjectNames && (
                                <div className="flex gap-6">
                                    <span className="text-xs uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>Subject</span>
                                    <span className="text-sm" style={{ color: "#2c2925" }}>{subjectNames}</span>
                                </div>
                            )}
                            {product.isOriginal !== undefined && (
                                <div className="flex gap-6">
                                    <span className="text-xs uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>Type</span>
                                    <span className="text-sm" style={{ color: "#2c2925" }}>
                                        {product.isOriginal ? "Original" : "Reproduction"}
                                    </span>
                                </div>
                            )}
                            {product.isFramed && (
                                <div className="flex gap-6">
                                    <span className="text-xs uppercase tracking-widest w-24 shrink-0 pt-0.5" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>Framing</span>
                                    <span className="text-sm" style={{ color: "#2c2925" }}>
                                        Framed{product.readyToHang ? " and ready to hang" : ""}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Dominant colors */}
                        {product.dominantColors && product.dominantColors.length > 0 && (
                            <div className="mb-8 pb-8 border-b" style={{ borderColor: "#d9d0c4" }}>
                                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#b5451b", letterSpacing: "0.1em" }}>
                                    Palette
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {product.dominantColors.map((c, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1.5">
                                            <div
                                                className="w-8 h-8 rounded-full border"
                                                style={{ backgroundColor: c.hex, borderColor: "rgba(44,41,37,0.12)" }}
                                            />
                                            <span className="text-xs text-center" style={{ color: "#8a7a6e", maxWidth: "4rem" }}>{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <div className="mb-8 pb-8 border-b" style={{ borderColor: "#d9d0c4" }}>
                                <p className="text-sm leading-loose" style={{ color: "#4a403a" }}>
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        {canPurchase ? (
                            <a
                                href={marketplaceArtworkUrl(product)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center py-4 font-serif text-base tracking-wide transition-all duration-300 hover:opacity-85"
                                style={{ backgroundColor: "#b5451b", color: "#f7f3ee" }}
                            >
                                Inquire &amp; Acquire
                            </a>
                        ) : product.status === "active" ? (
                            <Link
                                href={`/contact`}
                                className="inline-block w-full text-center py-4 font-serif text-base tracking-wide border transition-all duration-300 hover:opacity-70"
                                style={{ borderColor: "#b5451b", color: "#b5451b" }}
                            >
                                Inquire About This Work
                            </Link>
                        ) : null}

                        <p className="text-xs text-center mt-3" style={{ color: "#a0907f" }}>
                            Handled securely through ArtsDistrictUSA
                        </p>
                    </div>
                </div>
            </div>

            {/* Related works */}
            {related.length > 0 && (
                <div className="py-20 border-t" style={{ backgroundColor: "#ede8e1", borderColor: "#d9d0c4" }}>
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                                More from the Studio
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {related.map((r) => {
                                const rImg = getProductImageUrl(r);
                                return (
                                    <Link
                                        key={r.id}
                                        href={`/artworks/${r.slug ?? r.id}`}
                                        className="group block"
                                    >
                                        <div
                                            className="relative mb-4 transition-all duration-300 group-hover:shadow-lg"
                                            style={{
                                                backgroundColor: "#f7f3ee",
                                                padding: "0.75rem",
                                                boxShadow: "0 1px 4px rgba(44,41,37,0.06)",
                                            }}
                                        >
                                            <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                                                {rImg ? (
                                                    <Image
                                                        src={rImg}
                                                        alt={r.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                        sizes="(max-width: 640px) 100vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full" style={{ backgroundColor: "#d9cfc5" }} />
                                                )}
                                            </div>
                                        </div>
                                        <p className="font-serif text-sm" style={{ color: "#2c2925" }}>{r.title}</p>
                                        <p className="text-sm mt-0.5" style={{ color: "#b5451b" }}>${r.price.toLocaleString()}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
