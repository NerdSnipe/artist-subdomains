import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function ArtisanArtworkDetail({ artist, product, relatedProducts, domain }: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";

    return (
        <div className="max-w-5xl mx-auto px-6 py-12" style={{ fontFamily: "'Georgia', serif" }}>
            <Link href={`/${domain}/artworks`} className="text-sm text-amber-700 hover:text-stone-800 mb-8 inline-block">
                ← Back to Gallery
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="relative aspect-square bg-amber-100 border border-amber-200">
                    {imgUrl && <Image src={imgUrl} alt={product.title} fill className="object-contain" priority />}
                    {product.status === "sold" && (
                        <div className="absolute top-4 left-4 bg-stone-800 text-amber-50 text-xs px-3 py-1">Sold</div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl text-stone-800 mb-2"><em>{product.title}</em></h1>
                    {product.yearCreated && <p className="text-sm text-amber-700 mb-4">{product.yearCreated}</p>}
                    {product.medium && <p className="text-sm text-stone-500 mb-1">{product.medium}</p>}
                    {product.dimensions && (
                        <p className="text-sm text-stone-400 mb-4">
                            {product.dimensions.width}″ × {product.dimensions.height}″
                            {product.dimensions.depth ? ` × ${product.dimensions.depth}″` : ""}
                        </p>
                    )}

                    <p className="text-2xl text-stone-800 mb-6">${product.price.toLocaleString()}</p>

                    {product.description && (
                        <p className="text-stone-600 leading-relaxed mb-8 italic">{product.description}</p>
                    )}

                    {product.status === "active" && artistSlug && product.slug && (
                        <a
                            href={marketplaceArtworkUrl(artistSlug, product.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-stone-800 text-amber-50 px-8 py-3 text-sm hover:bg-stone-700 transition-colors"
                        >
                            Inquire / Purchase
                        </a>
                    )}
                    <p className="text-xs text-stone-400 mt-3">Handled through ArtDistrictUSA</p>

                    {product.isFramed && <p className="text-xs text-amber-700 mt-3">✦ Framed and ready to hang</p>}
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="border-t border-amber-200 mt-16 pt-12">
                    <h2 className="text-xl text-stone-600 mb-8"><em>More from the Studio</em></h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        {relatedProducts.slice(0, 3).map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link key={r.id} href={`/${domain}/artworks/${r.slug ?? r.id}`} className="group block">
                                    <div className="relative aspect-[4/5] bg-amber-100 overflow-hidden mb-2 border border-amber-200">
                                        {rImg && <Image src={rImg} alt={r.title} fill className="object-cover group-hover:scale-103 transition-transform" />}
                                    </div>
                                    <p className="text-sm text-stone-700">{r.title}</p>
                                    <p className="text-sm text-amber-700">${r.price.toLocaleString()}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
