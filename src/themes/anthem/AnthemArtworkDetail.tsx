"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Ruler, Paintbrush, Calendar, Frame, PenLine, type LucideIcon } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import AnthemArtworkCard from "./AnthemArtworkCard";

export default function AnthemArtworkDetail({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
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
    const acceptsCommissions = Boolean(artist.acceptsCommissions) && artist.acceptsCommissions !== "no";
    const firstName = artist.firstName || artist.displayName?.split(" ")[0] || "the artist";

    // Marketplace convention: always Height x Width x Depth.
    const dims = product.dimensions
        ? `${product.dimensions.height}" H × ${product.dimensions.width}" W${
              product.dimensions.depth ? ` × ${product.dimensions.depth}" D` : ""
          }`
        : null;

    type InfoTile = { icon: LucideIcon; label: string; value: string; capitalize?: boolean };
    const infoTiles = (
        [
            dims ? { icon: Ruler, label: "Dimensions", value: dims } : null,
            product.medium ? { icon: Paintbrush, label: "Medium", value: product.medium } : null,
            product.yearCreated ? { icon: Calendar, label: "Year Created", value: String(product.yearCreated) } : null,
            product.isFramed !== undefined ? { icon: Frame, label: "Framed", value: product.isFramed ? "Yes" : "No" } : null,
            product.signedLocation ? { icon: PenLine, label: "Signed", value: product.signedLocation, capitalize: true } : null,
        ] as (InfoTile | null)[]
    ).filter((t): t is InfoTile => t !== null);

    return (
        <div>
            <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16">
                <Reveal>
                    <div className="relative aspect-square border-2 border-black overflow-hidden mb-3">
                        {img && <Image src={img} alt={product.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority />}
                        {product.gallerySource && product.gallerySource.length > 0 && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                {product.gallerySource.map((g) => (
                                    <span key={g} className="bg-black text-[#F7F4EC] text-[10px] font-bold uppercase tracking-wide px-2.5 py-1.5 border border-black">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {gallery.length > 1 && (
                        <div className="flex gap-3">
                            {gallery.map((g, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setActiveImg(i)}
                                    className={`relative w-20 h-20 shrink-0 border-2 overflow-hidden transition-colors ${
                                        i === activeImg ? "border-[#E62828]" : "border-black/30 hover:border-black"
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
                    <Link href="/artworks" className="text-xs font-bold uppercase tracking-widest text-black/50 hover:text-black">
                        ← Back to Collection
                    </Link>
                    <h1 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl mt-4 mb-2 leading-[0.95]">
                        {product.title}
                    </h1>
                    <p className="text-3xl font-bold mb-5 text-[#C9A227]">${product.price.toLocaleString()}</p>

                    {product.status === "active" && (
                        <div className="flex items-start gap-2.5 mb-6 px-4 py-3 border border-[#1F8A4C] bg-[#EAF7EF]">
                            <ShieldCheck size={18} className="text-[#1F8A4C] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#14522E]">
                                Original fine artwork, signed by {firstName}.{product.readyToHang ? " Ready to hang." : ""}
                            </p>
                        </div>
                    )}

                    {infoTiles.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                            {infoTiles.map(({ icon: Icon, label, value, capitalize }) => (
                                <div key={label} className="border-2 border-black/20 px-3.5 py-3">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1.5">
                                        <Icon size={13} />
                                        {label}
                                    </div>
                                    <p className={`text-sm font-bold ${capitalize ? "capitalize" : ""}`}>{value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {product.description && <p className="text-base leading-relaxed text-black/80 mb-6">{product.description}</p>}

                    {product.dominantColors && product.dominantColors.length > 0 && (
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">Dominant Color Palette</p>
                            <div className="flex items-center gap-3">
                                {product.dominantColors.map((c, i) => (
                                    <span
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-black"
                                        style={{ backgroundColor: c.hex }}
                                        title={`${c.name} — ${c.hex}`}
                                    />
                                ))}
                            </div>
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
                                className="inline-block bg-black text-[#F7F4EC] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#E62828] transition-colors text-center"
                            >
                                Buy Now — ${product.price.toLocaleString()}
                            </a>
                        ) : product.status === "sold" ? (
                            <p className="inline-block border-2 border-black/30 text-black/50 font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 text-center">
                                This Piece Has Sold
                            </p>
                        ) : null}
                        <Link
                            href="/contact"
                            className="inline-block border-2 border-black text-black font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-black hover:text-[#F7F4EC] transition-colors text-center"
                        >
                            Ask a Question
                        </Link>
                        {acceptsCommissions && (
                            <Link
                                href="/contact#commission"
                                className="inline-block border-2 border-black/30 text-black/70 font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:border-black hover:text-black transition-colors text-center"
                            >
                                Commission a Similar Piece
                            </Link>
                        )}
                    </div>

                    <ul className="mt-6 space-y-1.5">
                        {[
                            "Certificate of authenticity included",
                            "Direct from the artist — 0% commission",
                            "Secure payment via the marketplace",
                            product.shippingPrice != null ? `Insured shipping — $${product.shippingPrice}` : "Insured shipping",
                            "14-day return policy",
                        ].map((line) => (
                            <li key={line} className="text-xs text-black/45 flex items-center gap-2">
                                <span className="text-[#E62828]">✓</span> {line}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            {relatedProducts.length > 0 && (
                <section className="max-w-[1600px] mx-auto px-5 md:px-10 pb-20 md:pb-28">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-8 border-b-4 border-black pb-4">
                        More Work
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
                        {relatedProducts.slice(0, 4).map((art) => (
                            <AnthemArtworkCard key={art.id} art={art} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
