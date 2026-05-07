import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";

export default function LuminaryArtworkDetailPage({
    artist,
    product,
    relatedProducts,
    domain,
}: ThemeArtworkDetailProps) {
    const imgUrl = getProductImageUrl(product);
    const name = getArtistName(artist);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const canPurchase = product.status === "active" && !!artistSlug && !!product.slug;

    // Sort images by displayOrder
    const images = [...(product.images ?? [])].sort(
        (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );

    const mediumNames = product.mediums?.map((m) => m.medium.name) ?? (product.medium ? [product.medium] : []);
    const styleNames = product.styles?.map((s) => s.artStyle.name) ?? [];
    const subjectNames = product.subjects?.map((s) => s.subject.name) ?? [];

    return (
        <div>
            {/* ── Back Navigation ──────────────────────────────────────────── */}
            <div className="border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
                    <Link
                        href={`/${domain}/artworks`}
                        className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-[#0f2d6b] transition-colors inline-flex items-center gap-2"
                    >
                        <span>←</span> All Works
                    </Link>
                </div>
            </div>

            {/* ── Hero Image — Full Width, Art Takes Center Stage ──────────── */}
            <section className="w-full bg-neutral-50 border-b-2 border-[#1a1a1a]">
                <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-16">
                    <div className="relative w-full overflow-hidden bg-white shadow-sm">
                        {imgUrl ? (
                            <div className="relative" style={{ aspectRatio: "4/3" }}>
                                <Image
                                    src={imgUrl}
                                    alt={product.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center">
                                <p className="font-serif font-black text-neutral-300 text-2xl">
                                    {product.title}
                                </p>
                            </div>
                        )}
                        {product.status === "sold" && (
                            <div className="absolute top-4 right-4 bg-[#1a1a1a] text-white text-[10px] px-3 py-1 tracking-[0.2em] uppercase font-sans">
                                Sold
                            </div>
                        )}
                    </div>

                    {/* Additional images strip */}
                    {images.length > 1 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                            {images.slice(1).map((img, i) => (
                                <div
                                    key={img.id ?? i}
                                    className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden bg-neutral-100 border border-neutral-200"
                                >
                                    <Image
                                        src={img.imageUrl}
                                        alt={img.caption ?? `${product.title} view ${i + 2}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Detail: Two-column Editorial Layout ───────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

                    {/* Left: All metadata in editorial typesetting ──────────── */}
                    <div className="md:col-span-7">
                        {/* Title */}
                        <h1 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-[#1a1a1a] mb-4">
                            {product.title}
                        </h1>

                        {product.yearCreated && (
                            <p className="font-sans text-sm tracking-[0.2em] uppercase text-[#0f2d6b] mb-6">
                                {product.yearCreated}
                            </p>
                        )}

                        {/* Description */}
                        {product.description && (
                            <p className="font-sans text-base text-neutral-600 leading-relaxed mb-10 max-w-xl">
                                {product.description}
                            </p>
                        )}

                        {/* Specifications — editorial typesetting */}
                        <div className="border-t-2 border-[#1a1a1a] pt-6">
                            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                                Specifications
                            </p>
                            <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
                                {mediumNames.length > 0 && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Medium
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {mediumNames.join(", ")}
                                        </dd>
                                    </>
                                )}

                                {product.dimensions && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Dimensions
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {product.dimensions.width} &times; {product.dimensions.height}
                                            {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""}{" "}
                                            {product.dimensions.unit}
                                        </dd>
                                    </>
                                )}

                                {product.isOriginal !== undefined && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Type
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {product.isOriginal ? "Original" : "Print / Reproduction"}
                                        </dd>
                                    </>
                                )}

                                {product.isFramed !== undefined && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Framing
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {product.isFramed ? "Framed" : "Unframed"}
                                        </dd>
                                    </>
                                )}

                                {styleNames.length > 0 && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Style
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {styleNames.join(", ")}
                                        </dd>
                                    </>
                                )}

                                {subjectNames.length > 0 && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Subject
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {subjectNames.join(", ")}
                                        </dd>
                                    </>
                                )}

                                {product.categoryName && (
                                    <>
                                        <dt className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                                            Category
                                        </dt>
                                        <dd className="font-sans text-sm text-[#1a1a1a]">
                                            {product.categoryName}
                                        </dd>
                                    </>
                                )}
                            </dl>
                        </div>

                        {/* Dominant Colors */}
                        {product.dominantColors && product.dominantColors.length > 0 && (
                            <div className="mt-8 border-t border-neutral-100 pt-6">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                                    Palette
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {product.dominantColors.map((c, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 border border-neutral-200"
                                                style={{ backgroundColor: c.hex }}
                                                title={c.hex}
                                            />
                                            <span className="font-sans text-xs text-neutral-500 capitalize">
                                                {c.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Price, CTA, Artist bio snippet ───────────────── */}
                    <div className="md:col-span-5">
                        <div className="sticky top-24 space-y-8">
                            {/* Price block */}
                            <div className="border-2 border-[#1a1a1a] p-6">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-2">
                                    Listed Price
                                </p>
                                <div className="flex items-baseline gap-3 mb-4">
                                    {product.salePrice ? (
                                        <>
                                            <span className="font-serif font-black text-4xl text-[#0f2d6b]">
                                                ${product.salePrice.toLocaleString()}
                                            </span>
                                            <span className="font-sans text-lg line-through text-neutral-300">
                                                ${product.price.toLocaleString()}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-serif font-black text-4xl text-[#1a1a1a]">
                                            ${product.price.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {canPurchase ? (
                                    <a
                                        href={marketplaceArtworkUrl(product)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center font-sans text-xs tracking-[0.2em] uppercase bg-[#0f2d6b] text-white py-4 hover:bg-[#1a1a1a] transition-colors"
                                    >
                                        Inquire / Purchase
                                    </a>
                                ) : product.status === "sold" ? (
                                    <div className="w-full text-center font-sans text-xs tracking-[0.2em] uppercase bg-neutral-200 text-neutral-400 py-4">
                                        Sold
                                    </div>
                                ) : null}

                                <p className="font-sans text-[10px] text-neutral-400 mt-3 text-center leading-relaxed">
                                    Purchase and inquiries handled through{" "}
                                    <a
                                        href="https://www.artsdistrictusa.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-[#0f2d6b]"
                                    >
                                        ArtsDistrictUSA
                                    </a>
                                </p>
                            </div>

                            {/* Artist mini bio */}
                            <div className="border-t border-neutral-200 pt-6">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                                    About the Artist
                                </p>
                                <Link
                                    href={`/${domain}/about`}
                                    className="block group"
                                >
                                    <p className="font-serif font-black text-lg text-[#1a1a1a] group-hover:text-[#0f2d6b] transition-colors mb-2">
                                        {name}
                                    </p>
                                </Link>
                                {(artist.city || artist.state) && (
                                    <p className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-3">
                                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                                {artist.bio && (
                                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                                        {artist.bio.slice(0, 200)}
                                        {artist.bio.length > 200 ? "…" : ""}
                                    </p>
                                )}
                                <Link
                                    href={`/${domain}/about`}
                                    className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0f2d6b] hover:underline mt-3 inline-block"
                                >
                                    Full Profile →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Related Works — Horizontal Editorial Strip ────────────────── */}
            {relatedProducts.length > 0 && (
                <section className="border-t-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                        <div className="flex items-baseline gap-6 mb-8">
                            <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b]">
                                Related Works
                            </h2>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-300">
                                — Continue Exploring
                            </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.slice(0, 4).map((r) => {
                                const rImg = getProductImageUrl(r);
                                return (
                                    <Link
                                        key={r.id}
                                        href={`/${domain}/artworks/${r.slug ?? r.id}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                                            {rImg ? (
                                                <Image
                                                    src={rImg}
                                                    alt={r.title}
                                                    fill
                                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-neutral-200" />
                                            )}
                                        </div>
                                        <div className="pt-2.5">
                                            <p className="font-serif font-black text-sm text-[#1a1a1a] group-hover:text-[#0f2d6b] transition-colors leading-tight">
                                                {r.title}
                                            </p>
                                            {r.yearCreated && (
                                                <p className="font-sans text-[10px] tracking-widest uppercase text-neutral-400 mt-0.5">
                                                    {r.yearCreated}
                                                </p>
                                            )}
                                            <p className="font-sans text-sm text-[#1a1a1a] mt-1">
                                                ${r.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
