import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";

export default function StudioArtworkDetail({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const gallery = product.images?.length ? product.images : [];
    const tags = [
        product.medium,
        ...(product.styles?.map((s) => s.artStyle?.name) ?? []),
        ...(product.subjects?.map((s) => s.subject?.name) ?? []),
    ].filter((t): t is string => Boolean(t));

    return (
        <div className="min-h-screen">
            {/* Full bleed image with vignette */}
            <div className="relative h-[62vh] min-h-[420px] bg-neutral-950 md:h-[76vh]">
                {imgUrl && (
                    <Image src={imgUrl} alt={product.title} fill className="object-contain" priority />
                )}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(10,9,8,0.65) 100%)",
                    }}
                />
                <div className="absolute left-6 top-6 md:left-10 md:top-8">
                    <Link
                        href="/artworks"
                        className="inline-flex items-center gap-2 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-400 transition-colors hover:text-neutral-100"
                    >
                        <ArrowLeft size={13} /> Works
                    </Link>
                </div>
                {product.status === "sold" && (
                    <div className="absolute right-6 top-6 bg-neutral-950/80 px-3 py-1 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-400 md:right-10 md:top-8">
                        Archive
                    </div>
                )}
            </div>

            {gallery.length > 1 && (
                <div className="border-b border-neutral-800/60 bg-[#0a0908]">
                    <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 md:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {gallery.map((im) => (
                            <div key={im.id} className="relative h-16 w-16 shrink-0 overflow-hidden bg-neutral-900 opacity-70 transition-opacity hover:opacity-100">
                                <Image src={im.imageUrl} alt={im.caption ?? product.title} fill className="object-cover" sizes="64px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Details */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 md:grid-cols-3 md:px-10 md:py-16">
                <ScrollReveal className="md:col-span-2">
                    <h1 className="mb-4 font-[family-name:var(--font-studio-display)] text-3xl italic font-light leading-tight text-neutral-100 md:text-6xl">
                        {product.title}
                    </h1>
                    <div className="mb-6 flex flex-wrap items-center gap-3 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.25em] text-neutral-600">
                        {product.yearCreated && <span>{product.yearCreated}</span>}
                        {product.yearCreated && tags.length > 0 && <span className="text-neutral-800">/</span>}
                        {tags.map((t) => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                    {product.description && (
                        <p className="max-w-xl font-[family-name:var(--font-studio-body)] font-light leading-relaxed text-neutral-400">
                            {product.description}
                        </p>
                    )}

                    {product.dominantColors && product.dominantColors.length > 0 && (
                        <div className="mt-8 flex items-center gap-2">
                            {product.dominantColors.slice(0, 6).map((c) => (
                                <span
                                    key={c.hex}
                                    title={c.name}
                                    className="h-5 w-5 rounded-full ring-1 ring-white/15"
                                    style={{ backgroundColor: c.hex }}
                                />
                            ))}
                        </div>
                    )}
                </ScrollReveal>

                <ScrollReveal delayMs={100} className="space-y-5 border-l border-neutral-800/60 pl-8">
                    {product.dimensions && (
                        <p className="font-[family-name:var(--font-studio-body)] text-sm font-light text-neutral-500">
                            {product.dimensions.width} × {product.dimensions.height}
                            {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} {product.dimensions.unit}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {product.isFramed && (
                            <span className="border border-neutral-800 px-2.5 py-1 font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-widest text-neutral-500">
                                Framed
                            </span>
                        )}
                        {product.readyToHang && (
                            <span className="border border-neutral-800 px-2.5 py-1 font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-widest text-neutral-500">
                                Ready to Hang
                            </span>
                        )}
                        {product.isOriginal && (
                            <span className="border border-neutral-800 px-2.5 py-1 font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-widest text-neutral-500">
                                Original
                            </span>
                        )}
                    </div>

                    <p className="font-[family-name:var(--font-studio-display)] text-3xl font-light text-neutral-100">
                        {product.salePrice ? (
                            <span className="flex items-baseline gap-2">
                                <span>${product.salePrice.toLocaleString()}</span>
                                <span className="text-base text-neutral-600 line-through">${product.price.toLocaleString()}</span>
                            </span>
                        ) : (
                            `$${product.price.toLocaleString()}`
                        )}
                    </p>
                    {product.shippingPrice != null && (
                        <p className="font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-700">
                            + ${product.shippingPrice.toLocaleString()} shipping
                        </p>
                    )}

                    {product.status === "active" && artistSlug && product.slug && (
                        <a
                            href={marketplaceArtworkUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-4 inline-flex w-fit items-center gap-2 border border-neutral-700 px-6 py-2.5 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.25em] text-neutral-300 transition-colors hover:border-amber-100/60 hover:text-amber-100/90"
                        >
                            Inquire / Purchase
                            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    )}
                    <p className="font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-widest text-neutral-800">
                        Handled through ArtsDistrictUSA
                    </p>
                </ScrollReveal>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mx-auto max-w-7xl border-t border-neutral-800/60 px-6 pb-20 pt-12 md:px-10">
                    <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                        More From the Studio
                    </p>
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
                        {relatedProducts.map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link key={r.id} href={`/artworks/${r.slug ?? r.id}`} className="group relative block aspect-square overflow-hidden bg-neutral-900">
                                    {rImg && (
                                        <Image
                                            src={rImg}
                                            alt={r.title}
                                            fill
                                            sizes="(min-width: 1024px) 25vw, 33vw"
                                            className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
