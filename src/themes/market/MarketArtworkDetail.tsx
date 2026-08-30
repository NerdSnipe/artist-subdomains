import Link from "next/link";
import { ArrowLeft, ExternalLink, Frame, PackageCheck, PenLine, Ruler, Truck } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { marketplaceArtworkUrl } from "@/lib/artist-api";
import Gallery from "./Gallery";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

function taxonomyList(items?: Array<{ name: string; id: string }> | null) {
    return items?.filter(Boolean) ?? [];
}

export default function MarketArtworkDetail({ artist, product, relatedProducts, domain }: ThemeArtworkDetailProps) {
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const isSold = product.status === "sold";
    const dominant = product.dominantColors?.slice(0, 6) ?? [];

    const mediums = taxonomyList(product.mediums?.map((m) => m.medium));
    const styles = taxonomyList(product.styles?.map((s) => s.artStyle));
    const subjects = taxonomyList(product.subjects?.map((s) => s.subject));
    const materials = taxonomyList(product.materials?.map((m) => m.material));
    const tags = [...mediums, ...styles, ...subjects, ...materials];

    const signedCopy = product.signedLocation
        ? `Signed by the artist (${product.signedLocation})`
        : null;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <Link
                href="/artworks"
                className="inline-flex items-center gap-1.5 text-xs text-[#8a7d6e] hover:text-[#b2542e] mb-8 font-medium transition-colors"
            >
                <ArrowLeft size={13} /> Back to the Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                <Reveal>
                    <Gallery images={product.images ?? []} fallbackUrl={product.imageUrl ?? product.image ?? ""} title={product.title} sold={isSold} />
                </Reveal>

                <Reveal delay={100}>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.slice(0, 6).map((t) => (
                                <span
                                    key={t.id}
                                    className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#8f3f1f] bg-[#f0d9c5] px-2 py-1"
                                >
                                    {t.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="font-[family-name:var(--market-font-display)] text-3xl md:text-4xl text-[#241e19] leading-tight mb-2">
                        {product.title}
                    </h1>
                    <p className="text-sm text-[#8a7d6e] mb-6">
                        {product.yearCreated ? `${product.yearCreated} · ` : ""}
                        {product.isOriginal ? "Original Artwork" : "Print / Edition"}
                    </p>

                    <div className="flex items-baseline gap-3 mb-7 pb-7 border-b border-[#e3d5c1]">
                        {product.salePrice != null ? (
                            <>
                                <span className="text-3xl font-semibold text-[#a23b2e]">
                                    ${product.salePrice.toLocaleString()}
                                </span>
                                <span className="text-lg text-[#a8998a] line-through">
                                    ${product.price.toLocaleString()}
                                </span>
                                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#faf6ee] bg-[#a23b2e] px-2 py-1">
                                    Sale
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-semibold text-[#241e19]">
                                ${product.price.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {isSold ? (
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 bg-[#efe6d7] text-[#6b5d4f] px-5 py-3 text-sm font-medium mb-3">
                                This piece has found its home.
                            </div>
                            {relatedProducts.length > 0 && (
                                <p className="text-sm text-[#8a7d6e]">
                                    Love the style?{" "}
                                    <a href="#more-from-studio" className="text-[#b2542e] underline underline-offset-2">
                                        See similar available works
                                    </a>{" "}
                                    below.
                                </p>
                            )}
                        </div>
                    ) : (
                        artistSlug && (
                            <div className="mb-8">
                                <a
                                    href={marketplaceArtworkUrl(product)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 w-fit bg-[#241e19] text-[#f8f2e9] px-8 py-4 text-sm font-semibold tracking-wide hover:bg-[#b2542e] transition-colors mb-3"
                                >
                                    Purchase on ArtsDistrictUSA
                                    <ExternalLink size={14} />
                                </a>
                                <p className="text-xs text-[#8a7d6e]">Secure checkout handled by ArtsDistrictUSA.</p>
                            </div>
                        )
                    )}

                    {/* Commerce facts */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 border-t border-[#e3d5c1]">
                        {product.dimensions && (
                            <div className="flex items-start gap-2.5">
                                <Ruler size={16} className="text-[#b2542e] mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a7d6e] mb-0.5">Dimensions</p>
                                    <p className="text-sm text-[#241e19] font-medium">
                                        {product.dimensions.width}″ × {product.dimensions.height}″
                                        {product.dimensions.depth ? ` × ${product.dimensions.depth}″` : ""}
                                    </p>
                                </div>
                            </div>
                        )}
                        {product.isFramed !== undefined && (
                            <div className="flex items-start gap-2.5">
                                <Frame size={16} className="text-[#b2542e] mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a7d6e] mb-0.5">Framing</p>
                                    <p className="text-sm text-[#241e19] font-medium">
                                        {product.isFramed ? "Framed" : "Unframed"}
                                        {product.readyToHang ? " · Ready to Hang" : ""}
                                    </p>
                                </div>
                            </div>
                        )}
                        {signedCopy && (
                            <div className="flex items-start gap-2.5">
                                <PenLine size={16} className="text-[#b2542e] mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a7d6e] mb-0.5">Signature</p>
                                    <p className="text-sm text-[#241e19] font-medium">{signedCopy}</p>
                                </div>
                            </div>
                        )}
                        {product.shippingPrice !== undefined && product.shippingPrice !== null && (
                            <div className="flex items-start gap-2.5">
                                <Truck size={16} className="text-[#b2542e] mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a7d6e] mb-0.5">Shipping</p>
                                    <p className="text-sm text-[#241e19] font-medium">
                                        {product.shippingPrice === 0 ? "Free" : `$${product.shippingPrice.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {dominant.length > 0 && (
                        <div className="py-6 border-t border-[#e3d5c1]">
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a7d6e] mb-3">Palette</p>
                            <div className="flex items-center gap-3">
                                {dominant.map((c, i) => (
                                    <div key={`${c.hex}-${i}`} className="flex flex-col items-center gap-1.5">
                                        <span
                                            className="w-7 h-7 rounded-full ring-1 ring-[#241e19]/10"
                                            style={{ backgroundColor: c.hex }}
                                            title={c.name}
                                        />
                                        <span className="text-[9px] text-[#8a7d6e]">{c.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.description && (
                        <div className="py-6 border-t border-[#e3d5c1]">
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#8a7d6e] mb-3">About This Piece</p>
                            <p className="text-sm text-[#4a4038] leading-relaxed whitespace-pre-line">{product.description}</p>
                        </div>
                    )}
                </Reveal>
            </div>

            {product.youtubeVideoId && (
                <div className="border-t border-[#e3d5c1] mt-16 pt-12">
                    <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-2">
                        In The Studio
                    </p>
                    <h2 className="font-[family-name:var(--market-font-display)] text-2xl text-[#241e19] mb-8">
                        Watch The Process
                    </h2>
                    <div className="relative w-full aspect-video overflow-hidden ring-1 ring-[#241e19]/10">
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
            )}

            {relatedProducts.length > 0 && (
                <div id="more-from-studio" className="border-t border-[#e3d5c1] mt-16 pt-12">
                    <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-2">
                        Keep Browsing
                    </p>
                    <h2 className="font-[family-name:var(--market-font-display)] text-2xl text-[#241e19] mb-8">
                        More From The Studio
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                        {relatedProducts.map((r, i) => (
                            <ProductCard key={r.id} artwork={r} index={i} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
