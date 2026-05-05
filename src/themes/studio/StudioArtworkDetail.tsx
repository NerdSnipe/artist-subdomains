import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function StudioArtworkDetail({ artist, product, relatedProducts, domain }: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";

    return (
        <div className="min-h-screen">
            {/* Full image */}
            <div className="relative h-[70vh] bg-neutral-900">
                {imgUrl && (
                    <Image src={imgUrl} alt={product.title} fill className="object-contain" priority />
                )}
                {product.status === "sold" && (
                    <div className="absolute top-6 left-6 text-xs tracking-[0.3em] uppercase text-neutral-600 bg-neutral-950/80 px-3 py-1">
                        Archive
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <Link href={`/${domain}/artworks`} className="text-xs tracking-[0.3em] uppercase text-neutral-700 hover:text-neutral-400 mb-6 inline-block">
                        ← Works
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-neutral-100 mb-4">{product.title}</h1>
                    {product.yearCreated && <p className="text-neutral-600 text-sm mb-6">{product.yearCreated}</p>}
                    {product.description && (
                        <p className="text-neutral-400 font-light leading-relaxed max-w-xl">{product.description}</p>
                    )}
                </div>
                <div className="space-y-4 border-l border-neutral-800 pl-8">
                    {product.medium && <p className="text-xs tracking-widest uppercase text-neutral-600">{product.medium}</p>}
                    {product.dimensions && (
                        <p className="text-sm text-neutral-500 font-light">
                            {product.dimensions.width} × {product.dimensions.height}
                            {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} {product.dimensions.unit}
                        </p>
                    )}
                    <p className="text-2xl text-neutral-100 font-light">${product.price.toLocaleString()}</p>
                    {product.status === "active" && artistSlug && product.slug && (
                        <a
                            href={marketplaceArtworkUrl(artistSlug, product.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-fit mt-4 px-6 py-2.5 border border-neutral-700 text-neutral-300 text-xs tracking-[0.2em] uppercase hover:border-neutral-400 hover:text-neutral-100 transition-colors"
                        >
                            Inquire / Purchase
                        </a>
                    )}
                    <p className="text-xs text-neutral-700 leading-relaxed">
                        Handled through ArtDistrictUSA
                    </p>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="max-w-7xl mx-auto px-8 pb-16 border-t border-neutral-800 pt-10">
                    <p className="text-xs tracking-[0.3em] uppercase text-neutral-700 mb-8">More Works</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
                        {relatedProducts.map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link key={r.id} href={`/${domain}/artworks/${r.slug ?? r.id}`} className="group relative aspect-square bg-neutral-900 block overflow-hidden">
                                    {rImg && <Image src={rImg} alt={r.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
