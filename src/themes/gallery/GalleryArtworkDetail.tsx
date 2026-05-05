import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function GalleryArtworkDetail({
    artist,
    product,
    relatedProducts,
    domain,
}: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Back link */}
            <Link
                href="/artworks"
                className="text-xs tracking-widest uppercase text-neutral-400 hover:text-neutral-900 mb-8 inline-block"
            >
                ← All Works
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
                {/* Image */}
                <div className="relative aspect-square bg-neutral-100">
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={product.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-neutral-200" />
                    )}
                    {product.status === "sold" && (
                        <div className="absolute top-4 right-4 bg-neutral-900 text-white text-xs px-3 py-1 tracking-widest uppercase">
                            Sold
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-light mb-2">{product.title}</h1>
                    {product.yearCreated && (
                        <p className="text-sm text-neutral-400 mb-4">{product.yearCreated}</p>
                    )}

                    {product.dimensions && (
                        <p className="text-sm text-neutral-600 mb-1">
                            {product.dimensions.width} × {product.dimensions.height}
                            {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""}{" "}
                            {product.dimensions.unit}
                        </p>
                    )}

                    {product.medium && (
                        <p className="text-sm text-neutral-600 mb-4">{product.medium}</p>
                    )}

                    <p className="text-2xl font-light mb-6">${product.price.toLocaleString()}</p>

                    {product.description && (
                        <p className="text-neutral-600 font-light leading-relaxed mb-8">
                            {product.description}
                        </p>
                    )}

                    {product.status === "active" && artistSlug && product.slug && (
                        <a
                            href={marketplaceArtworkUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-fit px-8 py-3 bg-neutral-900 text-white text-sm tracking-widest uppercase hover:bg-neutral-700 transition-colors"
                        >
                            Inquire / Purchase
                        </a>
                    )}

                    <p className="text-xs text-neutral-400 mt-3">
                        Purchase and inquiries handled through{" "}
                        <a
                            href="https://artdistrictusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            ArtDistrictUSA
                        </a>
                    </p>
                </div>
            </div>

            {/* Related works */}
            {relatedProducts.length > 0 && (
                <div className="mt-20 border-t border-neutral-100 pt-12">
                    <h2 className="text-xs tracking-widest uppercase text-neutral-400 mb-8">
                        More Works
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {relatedProducts.map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link
                                    key={r.id}
                                    href={`/artworks/${r.slug ?? r.id}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-square bg-neutral-100 overflow-hidden mb-2">
                                        {rImg ? (
                                            <Image
                                                src={rImg}
                                                alt={r.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                    </div>
                                    <p className="text-xs font-light">{r.title}</p>
                                    <p className="text-xs text-neutral-400">${r.price.toLocaleString()}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
