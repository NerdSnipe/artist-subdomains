"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

export default function AnthemNoirArtworkDetail({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
    const gallery = product.images?.length
        ? product.images.slice().sort((a, b) => a.displayOrder - b.displayOrder)
        : [{ imageUrl: getProductImageUrl(product), caption: null as string | null }];
    const [activeImg, setActiveImg] = useState(0);
    const img = gallery[activeImg]?.imageUrl ?? getProductImageUrl(product);

    // Sells through the ArtDistrictUSA marketplace, same as the other theme families — no
    // separate checkout funnel here, this just routes the buyer to the real product page
    // where the artist's connected payout (Stripe/PayPal) actually processes the sale.
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const hasMarketplaceLink = product.status === "active" && !!artistSlug && !!product.slug;

    // Marketplace convention: always Height x Width x Depth.
    const dims = product.dimensions
        ? `${product.dimensions.height} × ${product.dimensions.width}${product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} ${product.dimensions.unit === "inches" ? "in" : "cm"} (H×W×D)`
        : null;

    return (
        <div>
            <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16">
                <Reveal>
                    <div className="relative aspect-square border-2 border-[#E9DFC9] overflow-hidden mb-3">
                        {img && <Image src={img} alt={product.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority />}
                    </div>
                    {gallery.length > 1 && (
                        <div className="flex gap-3">
                            {gallery.map((g, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={`relative w-20 h-20 shrink-0 border-2 overflow-hidden transition-colors ${
                                        i === activeImg ? "border-[#C9A227]" : "border-[#E9DFC9]/50 hover:border-[#E9DFC9]"
                                    }`}
                                    aria-label={g.caption ?? `View image ${i + 1}`}
                                >
                                    <Image src={g.imageUrl} alt={g.caption ?? product.title} fill sizes="80px" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </Reveal>

                <Reveal delay={100}>
                    <Link href="/artworks" className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]/50 hover:text-[#E9DFC9]">
                        ← Back to Collection
                    </Link>
                    <h1 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl mt-4 mb-2 leading-[0.95]">
                        {product.title}
                    </h1>
                    <p className="text-2xl font-bold mb-6 text-[#C9A227]">${product.price.toLocaleString()}</p>

                    <dl className="grid grid-cols-2 gap-y-3 text-sm border-y-4 border-[#E9DFC9] py-6 mb-6">
                        {product.medium && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Medium</dt>
                                <dd className="text-[#E9DFC9]/70">{product.medium}</dd>
                            </>
                        )}
                        {dims && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Dimensions</dt>
                                <dd className="text-[#E9DFC9]/70">{dims}</dd>
                            </>
                        )}
                        {product.yearCreated && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Year</dt>
                                <dd className="text-[#E9DFC9]/70">{product.yearCreated}</dd>
                            </>
                        )}
                        {product.isFramed !== undefined && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Framed</dt>
                                <dd className="text-[#E9DFC9]/70">{product.isFramed ? "Yes" : "No"}</dd>
                            </>
                        )}
                        {product.signedLocation && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Signed</dt>
                                <dd className="text-[#E9DFC9]/70 capitalize">{product.signedLocation}</dd>
                            </>
                        )}
                        <dt className="font-bold uppercase tracking-wide">Status</dt>
                        <dd className="text-[#E9DFC9]/70 capitalize">{product.status === "active" ? "Available" : product.status}</dd>
                    </dl>

                    {product.description && <p className="text-base leading-relaxed text-[#E9DFC9]/80 mb-6">{product.description}</p>}

                    {product.dominantColors && product.dominantColors.length > 0 && (
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]/50">Palette</span>
                            {product.dominantColors.map((c, i) => (
                                <span
                                    key={i}
                                    className="w-6 h-6 rounded-full border-2 border-[#E9DFC9]"
                                    style={{ backgroundColor: c.hex }}
                                    title={`${c.name} — ${c.hex}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Sells through the ArtDistrictUSA marketplace (where the artist's connected
                        Stripe/PayPal actually processes the sale) — same pattern as the rest of
                        the theme family, no separate storefront/checkout built here. */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {hasMarketplaceLink ? (
                            <a
                                href={marketplaceArtworkUrl(product)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#C9A227] text-[#0C0B09] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#E9DFC9] transition-colors text-center"
                            >
                                Buy Now — ${product.price.toLocaleString()}
                            </a>
                        ) : product.status === "sold" ? (
                            <p className="inline-block border-2 border-[#E9DFC9]/40 text-[#E9DFC9]/60 font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 text-center">
                                This Piece Has Sold
                            </p>
                        ) : null}
                        <Link
                            href="/contact"
                            className="inline-block border-2 border-[#E9DFC9] text-[#E9DFC9] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#E9DFC9] hover:text-[#0C0B09] transition-colors text-center"
                        >
                            Ask a Question
                        </Link>
                    </div>
                    {product.shippingPrice != null && (
                        <p className="mt-3 text-xs text-[#E9DFC9]/50">+ ${product.shippingPrice} shipping · Certificate of authenticity included</p>
                    )}
                </Reveal>
            </div>

            {relatedProducts.length > 0 && (
                <section className="max-w-[1600px] mx-auto px-5 md:px-10 pb-20 md:pb-28">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-8 border-b-4 border-[#E9DFC9] pb-4">
                        More Work
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.slice(0, 4).map((art) => {
                            const rImg = getProductImageUrl(art);
                            return (
                                <Link key={art.id} href={`/artworks/${art.slug ?? art.id}`} className="group block">
                                    <div className="relative aspect-square border-2 border-[#E9DFC9] overflow-hidden">
                                        {rImg && <Image src={rImg} alt={art.title} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                                    </div>
                                    <p className="mt-2 text-xs font-bold uppercase truncate">{art.title}</p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
