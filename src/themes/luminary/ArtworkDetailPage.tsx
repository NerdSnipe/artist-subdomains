import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import GlowBlob from "./GlowBlob";
import Reveal from "./Reveal";
import { Kicker, PaletteDots, PillButton } from "./ui";

export default function LuminaryArtworkDetailPage({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const name = getArtistName(artist);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const canPurchase = product.status === "active" && !!artistSlug && !!product.slug;

    const images = [...(product.images ?? [])].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    const mediumNames = product.mediums?.map((m) => m.medium?.name).filter(Boolean) as string[] ?? (product.medium ? [product.medium] : []);
    const styleNames = product.styles?.map((s) => s.artStyle?.name).filter(Boolean) as string[] ?? [];
    const subjectNames = product.subjects?.map((s) => s.subject?.name).filter(Boolean) as string[] ?? [];

    const glow = product.dominantColors?.[0]?.hex ?? "#f3c6de";
    const glow2 = product.dominantColors?.[1]?.hex ?? "#c9d8f7";

    return (
        <div>
            <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10">
                <Link
                    href="/artworks"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-[#8a8189] transition-colors hover:text-[#a9769f]"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Gallery
                </Link>
            </div>

            <section className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
                    {/* Image — sits on a crisp white mat so the art keeps strong contrast */}
                    <Reveal className="relative md:col-span-7">
                        <GlowBlob className="-inset-x-10 -inset-y-10 -z-10" colors={[glow, glow2]} opacity={0.6} />
                        <div className="relative bg-white p-3 shadow-[0_30px_70px_-20px_rgba(58,50,64,0.25)] sm:p-5">
                            {imgUrl ? (
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f3f1]">
                                    <Image src={imgUrl} alt={product.title} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-contain" priority />
                                </div>
                            ) : (
                                <div className="flex aspect-[4/3] items-center justify-center bg-[#f6f3f1]">
                                    <p className="font-serif text-2xl italic text-[#c9bdd2]">{product.title}</p>
                                </div>
                            )}
                            {product.status === "sold" && (
                                <span className="absolute right-6 top-6 rounded-full bg-[#3a3240] px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-white">
                                    Sold
                                </span>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                                {images.slice(1).map((img, i) => (
                                    <div key={img.id ?? i} className="relative h-20 w-20 shrink-0 overflow-hidden bg-white p-1 shadow-sm md:h-24 md:w-24">
                                        <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                            <Image
                                                src={img.imageUrl}
                                                alt={img.caption ?? `${product.title} view ${i + 2}`}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Reveal>

                    {/* Details */}
                    <Reveal className="md:col-span-5" delay={120}>
                        {mediumNames.length > 0 && <Kicker>{mediumNames.join(" · ")}</Kicker>}
                        <h1 className="mt-5 font-serif text-4xl italic leading-[1.1] text-[#3a3240] sm:text-5xl">
                            {product.title}
                        </h1>
                        {product.yearCreated && (
                            <p className="mt-3 font-sans text-sm uppercase tracking-[0.16em] text-[#a39aa0]">
                                {product.yearCreated}
                            </p>
                        )}

                        {product.description && (
                            <p className="mt-6 font-sans text-[15px] leading-relaxed text-[#6b6470]">{product.description}</p>
                        )}

                        {/* Price + CTA */}
                        <div className="mt-8 rounded-[2px] border border-[#3a3240]/10 bg-white/70 p-6 backdrop-blur-sm">
                            <div className="mb-5 flex items-baseline gap-3">
                                {product.salePrice ? (
                                    <>
                                        <span className="font-serif text-3xl italic text-[#a9769f]">
                                            ${product.salePrice.toLocaleString()}
                                        </span>
                                        <span className="font-sans text-base text-[#c9bdd2] line-through">
                                            ${product.price.toLocaleString()}
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-serif text-3xl italic text-[#3a3240]">
                                        ${product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {canPurchase ? (
                                <PillButton href={marketplaceArtworkUrl(product)} external className="w-full">
                                    Inquire / Purchase
                                </PillButton>
                            ) : product.status === "sold" ? (
                                <div className="w-full rounded-full bg-[#3a3240]/5 py-3.5 text-center font-sans text-[13px] uppercase tracking-[0.14em] text-[#a39aa0]">
                                    This piece has found a home
                                </div>
                            ) : null}

                            <p className="mt-4 text-center font-sans text-[11px] leading-relaxed text-[#a39aa0]">
                                Purchases handled securely via{" "}
                                <a
                                    href="https://www.artsdistrictusa.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-[#e3c9dd] underline-offset-2 hover:text-[#a9769f]"
                                >
                                    ArtsDistrictUSA
                                </a>
                            </p>
                        </div>

                        {/* Specifications */}
                        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#3a3240]/10 pt-8">
                            {product.dimensions && (
                                <>
                                    <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Dimensions</dt>
                                    <dd className="font-sans text-sm text-[#3a3240]">
                                        {product.dimensions.width} × {product.dimensions.height}
                                        {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} {product.dimensions.unit}
                                    </dd>
                                </>
                            )}
                            {product.isOriginal !== undefined && (
                                <>
                                    <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Type</dt>
                                    <dd className="font-sans text-sm text-[#3a3240]">
                                        {product.isOriginal ? "Original" : "Print / Reproduction"}
                                    </dd>
                                </>
                            )}
                            {product.isFramed !== undefined && (
                                <>
                                    <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Framing</dt>
                                    <dd className="font-sans text-sm text-[#3a3240]">{product.isFramed ? "Framed" : "Unframed"}</dd>
                                </>
                            )}
                            {styleNames.length > 0 && (
                                <>
                                    <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Style</dt>
                                    <dd className="font-sans text-sm text-[#3a3240]">{styleNames.join(", ")}</dd>
                                </>
                            )}
                            {subjectNames.length > 0 && (
                                <>
                                    <dt className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Subject</dt>
                                    <dd className="font-sans text-sm text-[#3a3240]">{subjectNames.join(", ")}</dd>
                                </>
                            )}
                        </dl>

                        {product.dominantColors && product.dominantColors.length > 0 && (
                            <div className="mt-8 border-t border-[#3a3240]/10 pt-6">
                                <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">Palette</p>
                                <PaletteDots colors={product.dominantColors} />
                            </div>
                        )}

                        {/* Artist mini bio */}
                        <div className="mt-8 border-t border-[#3a3240]/10 pt-6">
                            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-[#a39aa0]">The Artist</p>
                            <Link href="/about" className="group">
                                <p className="font-serif text-lg italic text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                    {name}
                                </p>
                            </Link>
                            {artist.bio && (
                                <p className="mt-2 font-sans text-sm leading-relaxed text-[#8a8189]">
                                    {artist.bio.slice(0, 160)}
                                    {artist.bio.length > 160 ? "…" : ""}
                                </p>
                            )}
                            <Link
                                href="/about"
                                className="mt-3 inline-block font-sans text-xs font-medium uppercase tracking-[0.14em] text-[#a9769f] hover:text-[#3a3240]"
                            >
                                Full Profile →
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {product.youtubeVideoId && (
                <section className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
                    <Reveal className="mb-8">
                        <Kicker>Behind the Work</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">The Process</h2>
                    </Reveal>
                    <Reveal delay={80}>
                        <div className="bg-white p-3 shadow-[0_30px_70px_-20px_rgba(58,50,64,0.25)] sm:p-5">
                            <div className="relative w-full aspect-video overflow-hidden bg-[#f6f3f1]">
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
                    </Reveal>
                </section>
            )}

            {relatedProducts.length > 0 && (
                <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-10">
                        <Kicker>Continue Exploring</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Related Works</h2>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-4">
                        {relatedProducts.slice(0, 4).map((r, i) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Reveal key={r.id} delay={i * 80}>
                                    <Link href={`/artworks/${r.slug ?? r.id}`} className="group block">
                                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-2 shadow-[0_14px_28px_-16px_rgba(58,50,64,0.2)] transition-transform duration-500 group-hover:-translate-y-1">
                                            <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                                {rImg ? (
                                                    <Image
                                                        src={rImg}
                                                        alt={r.title}
                                                        fill
                                                        sizes="(min-width: 768px) 25vw, 50vw"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-[#f0ebe9]" />
                                                )}
                                            </div>
                                        </div>
                                        <p className="mt-3 font-serif italic text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                            {r.title}
                                        </p>
                                        <p className="font-sans text-sm text-[#6b6470]">${r.price.toLocaleString()}</p>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
