import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Ruler, Sparkles } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import { getEffectiveDimensions } from "@/lib/product-dimensions";
import { StudioFrame } from "./decor";
import Reveal from "./Reveal";

export default function ArtisanArtworkDetail({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const dims = getEffectiveDimensions(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const materials = product.materials?.map((m) => m.material?.name).filter(Boolean) as string[] ?? [];
    const mediums = product.mediums?.map((m) => m.medium?.name).filter(Boolean) as string[] ?? (product.medium ? [product.medium] : []);
    const tags = Array.from(new Set([...mediums, ...materials]));
    const onSale = typeof product.salePrice === "number" && product.salePrice < product.price;

    return (
        <div className="bg-[var(--paper)]">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <Link
                    href="/artworks"
                    className="mb-10 inline-flex items-center gap-1.5 text-sm text-[var(--sage-dark)] transition-colors hover:text-[var(--clay-dark)]"
                >
                    <ArrowLeft size={15} /> Back to the collection
                </Link>

                <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
                    <Reveal>
                        <StudioFrame rotate={-1} className="mx-auto w-full max-w-lg">
                            <div className="relative aspect-square w-full bg-[var(--sand)]">
                                {imgUrl && (
                                    <Image src={imgUrl} alt={product.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" priority />
                                )}
                                {product.status === "sold" && (
                                    <div className="absolute left-4 top-4 bg-[var(--ink)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--paper)]">
                                        Sold
                                    </div>
                                )}
                            </div>
                        </StudioFrame>
                    </Reveal>

                    <Reveal delay={100}>
                        <h1 className="text-3xl italic text-[var(--ink)] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                            {product.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--ink-soft)]">
                            {product.yearCreated && <span>{product.yearCreated}</span>}
                            {product.isOriginal && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-[var(--clay)]/50" aria-hidden />
                                    <span>Original, one of a kind</span>
                                </>
                            )}
                        </div>

                        {tags.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                                {tags.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-[var(--sage-dark)]/25 px-3 py-1 text-xs uppercase tracking-wide text-[var(--sage-dark)]"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        {dims && (
                            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--ink-soft)]">
                                <Ruler size={15} className="text-[var(--clay)]" />
                                {dims.width}&Prime; × {dims.height}&Prime;
                                {dims.depth ? ` × ${dims.depth}\u2033` : ""}
                            </div>
                        )}

                        <div className="mt-6 flex items-baseline gap-3">
                            <p className="text-2xl text-[var(--ink)]">
                                ${(onSale ? product.salePrice! : product.price).toLocaleString()}
                            </p>
                            {onSale && (
                                <p className="text-base text-[var(--ink-soft)] line-through">${product.price.toLocaleString()}</p>
                            )}
                        </div>

                        {product.description && (
                            <p className="mt-6 whitespace-pre-line leading-relaxed text-[var(--ink-soft)]">{product.description}</p>
                        )}

                        {product.status === "active" && artistSlug && product.slug && (
                            <a
                                href={marketplaceArtworkUrl(product)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-8 inline-flex items-center gap-2 bg-[var(--clay)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--paper)] transition-colors hover:bg-[var(--clay-dark)]"
                            >
                                Inquire / Purchase
                                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        )}
                        <p className="mt-3 text-xs text-[var(--ink-soft)]/70">Handled securely through ArtsDistrictUSA</p>

                        {(product.isFramed || product.readyToHang) && (
                            <div className="mt-5 flex items-center gap-2 text-xs text-[var(--sage-dark)]">
                                <Sparkles size={14} />
                                {[product.isFramed && "Framed", product.readyToHang && "Ready to hang"].filter(Boolean).join(" · ")}
                            </div>
                        )}
                    </Reveal>
                </div>

                {product.youtubeVideoId && (
                    <div className="mt-24 border-t border-[var(--ink)]/10 pt-14">
                        <Reveal>
                            <h2 className="mb-8 text-2xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                In the Studio
                            </h2>
                            <div className="relative w-full aspect-video overflow-hidden bg-[var(--sand)]">
                                <iframe
                                    src={`https://www.youtube.com/embed/${product.youtubeVideoId}`}
                                    title={`${product.title} — video`}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        </Reveal>
                    </div>
                )}

                {relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-[var(--ink)]/10 pt-14">
                        <Reveal>
                            <h2 className="mb-8 text-2xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                More from the Studio
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                            {relatedProducts.slice(0, 3).map((r, i) => {
                                const rImg = getProductImageUrl(r);
                                return (
                                    <Reveal key={r.id} delay={i * 90}>
                                        <Link href={`/artworks/${r.slug ?? r.id}`} className="group block">
                                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--sand)]">
                                                {rImg && (
                                                    <Image
                                                        src={rImg}
                                                        alt={r.title}
                                                        fill
                                                        sizes="(min-width: 640px) 33vw, 50vw"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                    />
                                                )}
                                            </div>
                                            <p className="mt-2.5 text-sm text-[var(--ink)]">{r.title}</p>
                                            <p className="text-sm text-[var(--clay-dark)]">${r.price.toLocaleString()}</p>
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
