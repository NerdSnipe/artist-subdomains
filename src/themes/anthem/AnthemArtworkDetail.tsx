import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

export default function AnthemArtworkDetail({ product, relatedProducts }: ThemeArtworkDetailProps) {
    const img = getProductImageUrl(product);
    const dims = product.dimensions
        ? `${product.dimensions.width} × ${product.dimensions.height}${product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} ${product.dimensions.unit === "inches" ? "in" : "cm"}`
        : null;

    return (
        <div>
            <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16">
                <Reveal>
                    <div className="relative aspect-square border-2 border-black overflow-hidden">
                        {img && <Image src={img} alt={product.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority />}
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <Link href="/artworks" className="text-xs font-bold uppercase tracking-widest text-black/50 hover:text-black">
                        ← Back to Collection
                    </Link>
                    <h1 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl mt-4 mb-2 leading-[0.95]">
                        {product.title}
                    </h1>
                    <p className="text-2xl font-bold mb-6">${product.price.toLocaleString()}</p>

                    <dl className="grid grid-cols-2 gap-y-3 text-sm border-y-4 border-black py-6 mb-6">
                        {product.medium && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Medium</dt>
                                <dd className="text-black/70">{product.medium}</dd>
                            </>
                        )}
                        {dims && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Dimensions</dt>
                                <dd className="text-black/70">{dims}</dd>
                            </>
                        )}
                        {product.yearCreated && (
                            <>
                                <dt className="font-bold uppercase tracking-wide">Year</dt>
                                <dd className="text-black/70">{product.yearCreated}</dd>
                            </>
                        )}
                        <dt className="font-bold uppercase tracking-wide">Status</dt>
                        <dd className="text-black/70 capitalize">{product.status === "active" ? "Available" : product.status}</dd>
                    </dl>

                    {product.description && <p className="text-base leading-relaxed text-black/80 mb-6">{product.description}</p>}

                    {product.dominantColors && product.dominantColors.length > 0 && (
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-xs font-bold uppercase tracking-widest text-black/50">Palette</span>
                            {product.dominantColors.map((c, i) => (
                                <span key={i} className="w-6 h-6 rounded-full border-2 border-black" style={{ backgroundColor: c.hex }} title={c.name} />
                            ))}
                        </div>
                    )}

                    <Link
                        href="/contact"
                        className="inline-block bg-black text-[#F7F4EC] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#E62828] hover:text-black transition-colors"
                    >
                        Inquire About This Piece
                    </Link>
                </Reveal>
            </div>

            {relatedProducts.length > 0 && (
                <section className="max-w-[1500px] mx-auto px-5 md:px-10 pb-20 md:pb-28">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-8 border-b-4 border-black pb-4">
                        More Work
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.slice(0, 4).map((art) => {
                            const rImg = getProductImageUrl(art);
                            return (
                                <Link key={art.id} href={`/artworks/${art.slug ?? art.id}`} className="group block">
                                    <div className="relative aspect-square border-2 border-black overflow-hidden">
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
