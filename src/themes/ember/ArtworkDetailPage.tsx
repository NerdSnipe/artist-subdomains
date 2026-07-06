import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import { ink, coal, coalLight, smoke, smokeDark, emberMid, emberGradient, emberGradientSteep } from "./palette";

export default function EmberArtworkDetail({ artist, product, relatedProducts, domain }: ThemeArtworkDetailProps) {
    const name = getArtistName(artist);
    const imgUrl = getProductImageUrl(product);
    const canPurchase = product.status === "active" && !!product.artistSlug && !!product.slug;

    const mediumNames = product.mediums?.map((m) => m.medium.name) ?? (product.medium ? [product.medium] : []);
    const styleNames = product.styles?.map((s) => s.artStyle.name) ?? [];
    const subjectNames = product.subjects?.map((s) => s.subject.name) ?? [];
    const tags = [...mediumNames, ...styleNames, ...subjectNames];

    const related = relatedProducts.filter((r) => r.id !== product.id && r.status !== "inactive").slice(0, 3);

    return (
        <div style={{ backgroundColor: ink }}>
            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-10 pb-6">
                <Link href="/artworks" className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest transition-opacity duration-200 hover:opacity-70" style={{ color: emberMid, letterSpacing: "0.12em" }}>
                    <ArrowLeft size={14} /> The Work
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Image */}
                    <div className="lg:sticky lg:top-24">
                        <div
                            className="relative overflow-hidden"
                            style={{ backgroundColor: coal, clipPath: "polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)" }}
                        >
                            <div className="relative aspect-square" style={{ backgroundColor: coalLight }}>
                                {imgUrl ? (
                                    <Image src={imgUrl} alt={product.title} fill className="object-contain" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                                ) : null}
                                {product.status === "sold" && (
                                    <div className="absolute top-0 left-0 px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ background: emberGradient, color: ink, letterSpacing: "0.1em" }}>
                                        Sold
                                    </div>
                                )}
                            </div>
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 mt-4">
                                {product.images
                                    .sort((a, b) => a.displayOrder - b.displayOrder)
                                    .slice(0, 5)
                                    .map((img, i) => (
                                        <div key={img.id} className="relative flex-shrink-0 w-16 h-16 overflow-hidden" style={{ backgroundColor: coalLight }}>
                                            <Image src={img.imageUrl} alt={`View ${i + 1}`} fill className="object-cover" sizes="64px" />
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="py-2">
                        {product.yearCreated && (
                            <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: emberMid, letterSpacing: "0.18em" }}>
                                {product.yearCreated}
                            </p>
                        )}
                        <h1 className="uppercase leading-[0.95] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "#f6f1e8" }}>
                            {product.title}
                        </h1>
                        <p className="text-sm mb-8" style={{ color: smoke }}>by {name}</p>

                        <div className="mb-8 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                            {product.salePrice ? (
                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl font-bold" style={{ color: emberMid }}>${product.salePrice.toLocaleString()}</span>
                                    <span className="text-lg line-through" style={{ color: smokeDark }}>${product.price.toLocaleString()}</span>
                                </div>
                            ) : (
                                <span className="text-3xl font-bold" style={{ color: emberMid }}>${product.price.toLocaleString()}</span>
                            )}
                            {product.status === "sold" && <p className="text-xs mt-2" style={{ color: smokeDark }}>This piece has found its home.</p>}
                        </div>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {tags.map((t, i) => (
                                    <span key={i} className="text-xs uppercase font-bold tracking-wide px-3 py-1.5" style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#e8dfd4" }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4 mb-8 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                            {product.dimensions && (
                                <DetailRow label="Size">
                                    {product.dimensions.width}&Prime; &times; {product.dimensions.height}&Prime;
                                    {product.dimensions.depth ? ` × ${product.dimensions.depth}″` : ""} {product.dimensions.unit === "cm" ? "cm" : "in"}
                                </DetailRow>
                            )}
                            {product.isOriginal !== undefined && (
                                <DetailRow label="Type">{product.isOriginal ? "Original" : "Reproduction"}</DetailRow>
                            )}
                            {product.isFramed && (
                                <DetailRow label="Framing">Framed{product.readyToHang ? " · ready to hang" : ""}</DetailRow>
                            )}
                        </div>

                        {product.dominantColors && product.dominantColors.length > 0 && (
                            <div className="mb-8 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: emberMid, letterSpacing: "0.14em" }}>Palette</p>
                                <div className="flex flex-wrap gap-3">
                                    {product.dominantColors.map((c, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1.5">
                                            <div className="w-8 h-8" style={{ backgroundColor: c.hex, border: "1px solid rgba(255,255,255,0.15)" }} />
                                            <span className="text-xs text-center" style={{ color: smokeDark, maxWidth: "4rem" }}>{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.description && (
                            <div className="mb-8 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                <p className="text-sm leading-loose" style={{ color: "#d8cfc4" }}>{product.description}</p>
                            </div>
                        )}

                        {canPurchase ? (
                            <a
                                href={marketplaceArtworkUrl(product)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center py-4 text-sm font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-[1.015]"
                                style={{ background: emberGradientSteep, color: ink, letterSpacing: "0.1em" }}
                            >
                                Inquire &amp; Acquire
                            </a>
                        ) : product.status === "active" ? (
                            <Link
                                href="/contact"
                                className="inline-block w-full text-center py-4 text-sm font-bold uppercase tracking-widest border-2 transition-colors duration-300 hover:bg-[#f6f1e8] hover:text-[#0a0908]"
                                style={{ borderColor: "#f6f1e8", color: "#f6f1e8", letterSpacing: "0.1em" }}
                            >
                                Inquire About This Piece
                            </Link>
                        ) : null}

                        <p className="text-xs text-center mt-3" style={{ color: smokeDark }}>Handled securely through ArtsDistrictUSA</p>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <div className="py-20 border-t" style={{ backgroundColor: coal, borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <h2 className="uppercase leading-none mb-12" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#f6f1e8" }}>
                            More from the Studio
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {related.map((r) => {
                                const rImg = getProductImageUrl(r);
                                return (
                                    <Link key={r.id} href={`/artworks/${r.slug ?? r.id}`} className="group block">
                                        <div className="relative overflow-hidden mb-4" style={{ backgroundColor: coalLight }}>
                                            <div className="relative aspect-[4/5]">
                                                {rImg ? (
                                                    <Image src={rImg} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" sizes="(max-width: 640px) 100vw, 33vw" />
                                                ) : null}
                                            </div>
                                        </div>
                                        <p className="font-semibold text-sm mb-0.5" style={{ color: "#f6f1e8" }}>{r.title}</p>
                                        <p className="text-sm font-bold" style={{ color: emberMid }}>${r.price.toLocaleString()}</p>
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

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-6">
            <span className="text-xs uppercase font-bold tracking-widest w-20 shrink-0 pt-0.5" style={{ color: emberMid, letterSpacing: "0.1em" }}>{label}</span>
            <span className="text-sm" style={{ color: "#e8dfd4" }}>{children}</span>
        </div>
    );
}
