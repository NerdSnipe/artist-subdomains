import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import ArtworkGallery from "./ArtworkGallery";
import { SectionLabel, WallLabel } from "./ui";

function getAllImageUrls(product: ThemeArtworkDetailProps["product"]): string[] {
    if (product.images?.length) {
        return [...product.images]
            .sort((a, b) => (a.isPrimary ? -1 : b.isPrimary ? 1 : a.displayOrder - b.displayOrder))
            .map((img) => img.imageUrl)
            .filter(Boolean);
    }
    const single = getProductImageUrl(product);
    return single ? [single] : [];
}

export default function GalleryArtworkDetail({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
    const images = getAllImageUrls(product);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const dimensions = product.dimensions
        ? `${product.dimensions.width} × ${product.dimensions.height}${
              product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""
          } ${product.dimensions.unit === "inches" ? "in" : "cm"}`
        : null;

    return (
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-12 md:py-16">
            <Link
                href="/artworks"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#8C8478] hover:text-[#1B1812] transition-colors mb-10"
            >
                <ArrowLeft size={13} strokeWidth={1.5} />
                All Works
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-7">
                    <ArtworkGallery images={images} alt={product.title} soldBadge={product.status === "sold"} />
                </div>

                {/* Wall label */}
                <div className="lg:col-span-5">
                    <SectionLabel>{product.medium ?? product.categoryName ?? "Original Work"}</SectionLabel>
                    <h1 className="font-[family-name:var(--font-display)] italic text-3xl md:text-[2.5rem] leading-tight mt-3 text-[#1B1812]">
                        {product.title}
                    </h1>

                    <dl className="mt-7 space-y-2.5 border-t border-b border-[#E3DCCE] py-6">
                        {product.yearCreated && (
                            <div className="flex justify-between text-[13px]">
                                <dt className="text-[#8C8478] tracking-wide">Year</dt>
                                <dd className="text-[#3A342A]">{product.yearCreated}</dd>
                            </div>
                        )}
                        {product.medium && (
                            <div className="flex justify-between text-[13px]">
                                <dt className="text-[#8C8478] tracking-wide">Medium</dt>
                                <dd className="text-[#3A342A] text-right">{product.medium}</dd>
                            </div>
                        )}
                        {dimensions && (
                            <div className="flex justify-between text-[13px]">
                                <dt className="text-[#8C8478] tracking-wide">Dimensions</dt>
                                <dd className="text-[#3A342A]">{dimensions}</dd>
                            </div>
                        )}
                        {product.isFramed !== undefined && (
                            <div className="flex justify-between text-[13px]">
                                <dt className="text-[#8C8478] tracking-wide">Framing</dt>
                                <dd className="text-[#3A342A]">{product.isFramed ? "Framed" : "Unframed"}</dd>
                            </div>
                        )}
                        {product.isOriginal && (
                            <div className="flex justify-between text-[13px]">
                                <dt className="text-[#8C8478] tracking-wide">Edition</dt>
                                <dd className="text-[#3A342A]">Original</dd>
                            </div>
                        )}
                    </dl>

                    <p className="font-[family-name:var(--font-display)] text-2xl mt-6 text-[#1B1812]">
                        {product.status === "sold" ? (
                            <span className="text-[#8C8478] italic text-lg">In a Private Collection</span>
                        ) : (
                            `$${product.price.toLocaleString()}`
                        )}
                    </p>

                    {product.description && (
                        <p className="text-[15px] leading-relaxed text-[#57514A] mt-6 whitespace-pre-line">
                            {product.description}
                        </p>
                    )}

                    {product.status === "active" && artistSlug && (
                        <a
                            href={marketplaceArtworkUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-[#1B1812] text-[#F8F5EF] text-[12px] tracking-[0.2em] uppercase hover:bg-[#3A342A] transition-colors"
                        >
                            Inquire / Purchase
                            <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    )}

                    <p className="text-[11px] text-[#B8AF9E] mt-4 tracking-wide">
                        Inquiries handled through{" "}
                        <a
                            href="https://www.artsdistrictusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-[#E3DCCE] hover:text-[#8C8478]"
                        >
                            ArtsDistrictUSA
                        </a>
                    </p>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="mt-24 pt-12 border-t border-[#E3DCCE]">
                    <SectionLabel className="mb-8">More From This Collection</SectionLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {relatedProducts.map((r) => {
                            const rImg = getProductImageUrl(r);
                            return (
                                <Link key={r.id} href={`/artworks/${r.slug ?? r.id}`} className="group block">
                                    <div className="relative aspect-square bg-[#F1ECE2] overflow-hidden mb-3">
                                        {rImg ? (
                                            <Image
                                                src={rImg}
                                                alt={r.title}
                                                fill
                                                sizes="(min-width: 1024px) 25vw, 50vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0" />
                                        )}
                                    </div>
                                    <WallLabel product={r} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
