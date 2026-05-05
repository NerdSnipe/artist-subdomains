import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function MarketArtworkDetail({ artist, product, relatedProducts, domain }: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const allImages = product.images?.length ? product.images : [];

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <Link href={`/${domain}/artworks`} className="text-xs text-stone-400 hover:text-stone-700 mb-6 inline-block font-medium">
                ← Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image(s) */}
                <div className="space-y-2">
                    <div className="relative aspect-square bg-stone-100 border border-stone-200">
                        {imgUrl && <Image src={imgUrl} alt={product.title} fill className="object-contain" priority />}
                        {product.status === "sold" && (
                            <div className="absolute top-3 left-3 bg-stone-900 text-white text-xs px-2 py-1 font-semibold">SOLD</div>
                        )}
                    </div>
                    {allImages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {allImages.slice(0, 5).map((img) => (
                                <div key={img.id} className="relative w-16 h-16 shrink-0 bg-stone-100 border border-stone-200">
                                    <Image src={img.imageUrl} alt={product.title} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 mb-2">{product.title}</h1>
                    {product.yearCreated && <p className="text-sm text-stone-400 mb-4">{product.yearCreated}</p>}

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-bold text-stone-900">${product.price.toLocaleString()}</span>
                        {product.salePrice && (
                            <span className="text-xl font-bold text-red-600">${product.salePrice.toLocaleString()} sale</span>
                        )}
                    </div>

                    {/* CTA */}
                    {product.status === "active" && artistSlug && product.slug && (
                        <a
                            href={marketplaceArtworkUrl(artistSlug, product.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-fit bg-stone-900 text-white px-8 py-3.5 text-sm font-semibold hover:bg-stone-700 transition-colors mb-3"
                        >
                            Purchase on ArtDistrictUSA
                            <ExternalLink size={14} />
                        </a>
                    )}
                    <p className="text-xs text-stone-400 mb-8">Secure checkout through ArtDistrictUSA marketplace</p>

                    {/* Details table */}
                    <div className="border-t border-stone-100 pt-6 space-y-3">
                        {product.medium && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <span className="text-stone-400">Medium</span>
                                <span className="text-stone-700">{product.medium}</span>
                            </div>
                        )}
                        {product.dimensions && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <span className="text-stone-400">Dimensions</span>
                                <span className="text-stone-700">
                                    {product.dimensions.width}″ × {product.dimensions.height}″
                                    {product.dimensions.depth ? ` × ${product.dimensions.depth}″` : ""}
                                </span>
                            </div>
                        )}
                        {product.isOriginal !== undefined && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <span className="text-stone-400">Type</span>
                                <span className="text-stone-700">{product.isOriginal ? "Original" : "Print / Edition"}</span>
                            </div>
                        )}
                        {product.isFramed !== undefined && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <span className="text-stone-400">Framed</span>
                                <span className="text-stone-700">{product.isFramed ? "Yes" : "No"}</span>
                            </div>
                        )}
                        {product.shippingPrice !== undefined && product.shippingPrice !== null && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <span className="text-stone-400">Shipping</span>
                                <span className="text-stone-700">${product.shippingPrice.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    {product.description && (
                        <div className="border-t border-stone-100 pt-6 mt-6">
                            <p className="text-sm text-stone-500 leading-relaxed">{product.description}</p>
                        </div>
                    )}
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="border-t border-stone-200 mt-14 pt-10">
                    <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-widest mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {relatedProducts.map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link key={r.id} href={`/${domain}/artworks/${r.slug ?? r.id}`} className="group bg-white border border-stone-100 hover:border-stone-300 transition-colors block">
                                    <div className="relative aspect-square bg-stone-50 overflow-hidden">
                                        {rImg && <Image src={rImg} alt={r.title} fill className="object-cover group-hover:scale-103 transition-transform" />}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs font-semibold text-stone-900 leading-tight mb-1">{r.title}</p>
                                        <p className="text-sm font-bold text-stone-900">${r.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
