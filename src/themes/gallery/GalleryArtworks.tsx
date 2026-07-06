import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";
import { SectionLabel } from "./ui";

function formatDimensions(product: { dimensions: { width: number; height: number; depth?: number; unit: "inches" | "cm" } | null }): string | null {
    if (!product.dimensions) return null;
    const { width, height, depth, unit } = product.dimensions;
    const unitLabel = unit === "inches" ? "in" : "cm";
    return `${width} × ${height}${depth ? ` × ${depth}` : ""} ${unitLabel}`;
}

export default function GalleryArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="border-b border-[#E3DCCE] pb-6 mb-2">
                <SectionLabel>The Collection</SectionLabel>
                <h1 className="font-[family-name:var(--font-display)] italic text-4xl md:text-5xl mt-4 text-[#1B1812]">
                    Available Works
                </h1>
                <p className="mt-3 text-[13px] text-[#8C8478]">
                    {active.length} work{active.length === 1 ? "" : "s"} currently available
                </p>
            </div>

            {active.length === 0 && (
                <p className="text-[#8C8478] font-light py-16 text-center">
                    No works are currently available. Please check back soon.
                </p>
            )}

            {/* Checklist — a real gallery inventory, not a card grid */}
            {active.length > 0 && (
                <div>
                    {active.map((artwork, i) => {
                        const imgUrl = getProductImageUrl(artwork);
                        const dims = formatDimensions(artwork);
                        return (
                            <ScrollReveal key={artwork.id} delay={Math.min(i, 6) * 60}>
                                <Link
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr_auto] items-center gap-5 sm:gap-8 py-6 border-b border-[#E3DCCE] hover:bg-[#F1ECE2]/40 transition-colors -mx-4 px-4"
                                >
                                    <div className="relative w-[88px] h-[88px] sm:w-[120px] sm:h-[120px] bg-[#F1ECE2] shrink-0 overflow-hidden">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                sizes="120px"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0" />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-[family-name:var(--font-display)] italic text-lg sm:text-xl text-[#1B1812] truncate">
                                            {artwork.title}
                                        </p>
                                        <p className="mt-1.5 text-[12px] text-[#8C8478] tracking-wide">
                                            {[artwork.medium, dims, artwork.yearCreated ? String(artwork.yearCreated) : null]
                                                .filter(Boolean)
                                                .join("  ·  ")}
                                        </p>
                                        <p className="sm:hidden mt-2 text-[13px] text-[#57514A]">
                                            ${artwork.price.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="hidden sm:block text-right text-[14px] text-[#57514A] tracking-wide">
                                        ${artwork.price.toLocaleString()}
                                    </div>
                                </Link>
                            </ScrollReveal>
                        );
                    })}
                </div>
            )}

            {sold.length > 0 && (
                <div className="mt-20">
                    <div className="border-b border-[#E3DCCE] pb-4 mb-8">
                        <SectionLabel>Private Collections</SectionLabel>
                        <h2 className="font-[family-name:var(--font-display)] italic text-2xl mt-3 text-[#1B1812]">
                            Previously Sold
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
                        {sold.map((artwork) => {
                            const imgUrl = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="opacity-70">
                                    <div className="relative aspect-square bg-[#F1ECE2] overflow-hidden mb-2">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                sizes="200px"
                                                className="object-cover grayscale"
                                            />
                                        ) : (
                                            <div className="absolute inset-0" />
                                        )}
                                    </div>
                                    <p className="text-[11px] font-[family-name:var(--font-sans)] text-[#8C8478] truncate">
                                        {artwork.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
