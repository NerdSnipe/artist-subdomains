import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import DynamicColorProvider from "./DynamicColorProvider";
import ArtworkImageSwitcher from "./ArtworkImageSwitcher";
import HorizontalScrollStrip from "./HorizontalScrollStrip";

export default function VividArtworkDetailPage({
    artist,
    product,
    relatedProducts,
}: ThemeArtworkDetailProps) {
    const name = getArtistName(artist);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const canPurchase = product.status === "active" && !!artistSlug && !!product.slug;
    const accent = product.dominantColors?.[0]?.hex ?? "#FF4D00";

    const mediumNames = product.mediums?.map((m) => m.medium.name) ?? (product.medium ? [product.medium] : []);
    const styleNames = product.styles?.map((s) => s.artStyle.name) ?? [];
    const subjectNames = product.subjects?.map((s) => s.subject.name) ?? [];

    const relatedImgs = relatedProducts.slice(0, 4).map((r) => getProductImageUrl(r)).filter(Boolean);

    return (
        <div>
            <DynamicColorProvider accent={accent} />

            {/* ── Back nav ────────────────────────────────────────────────── */}
            <div className="border-b-2 border-black">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
                    <Link
                        href="/artworks"
                        className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 hover:text-[#111] transition-colors inline-flex items-center gap-2"
                    >
                        ← All Works
                    </Link>
                </div>
            </div>

            {/* ── Full-width image switcher ────────────────────────────────── */}
            <section className="bg-neutral-50 border-b-4 border-black">
                <ArtworkImageSwitcher product={product} />
                {product.status === "sold" && (
                    <div className="text-center py-2 bg-[#111]">
                        <span className="text-white text-xs font-bold tracking-widest uppercase">SOLD</span>
                    </div>
                )}
            </section>

            {/* ── Two-column detail layout ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

                    {/* Left 60%: details ─────────────────────────────────── */}
                    <div className="md:col-span-7">
                        <h1
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111] leading-[0.95] mb-4"
                        >
                            {product.title}
                        </h1>

                        {product.yearCreated && (
                            <p className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: "var(--accent)" }}>
                                {product.yearCreated}
                            </p>
                        )}

                        {product.description && (
                            <p className="text-base text-neutral-600 leading-relaxed mb-10 max-w-xl">
                                {product.description}
                            </p>
                        )}

                        {/* Specs */}
                        <div className="border-t-4 border-black pt-6">
                            <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-6">
                                Specifications
                            </p>
                            <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
                                {mediumNames.length > 0 && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Medium</dt>
                                        <dd className="text-sm text-[#111]">{mediumNames.join(", ")}</dd>
                                    </>
                                )}
                                {product.dimensions && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Dimensions</dt>
                                        <dd className="text-sm text-[#111]">
                                            {product.dimensions.width} &times; {product.dimensions.height}
                                            {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} {product.dimensions.unit}
                                        </dd>
                                    </>
                                )}
                                {product.isOriginal !== undefined && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Type</dt>
                                        <dd className="text-sm text-[#111]">{product.isOriginal ? "Original" : "Print / Reproduction"}</dd>
                                    </>
                                )}
                                {product.isFramed !== undefined && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Framing</dt>
                                        <dd className="text-sm text-[#111]">{product.isFramed ? "Framed" : "Unframed"}</dd>
                                    </>
                                )}
                                {product.readyToHang !== undefined && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Ready to Hang</dt>
                                        <dd className="text-sm text-[#111]">{product.readyToHang ? "Yes" : "No"}</dd>
                                    </>
                                )}
                                {styleNames.length > 0 && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Style</dt>
                                        <dd className="text-sm text-[#111]">{styleNames.join(", ")}</dd>
                                    </>
                                )}
                                {subjectNames.length > 0 && (
                                    <>
                                        <dt className="text-xs font-bold tracking-widest uppercase text-neutral-400">Subject</dt>
                                        <dd className="text-sm text-[#111]">{subjectNames.join(", ")}</dd>
                                    </>
                                )}
                            </dl>
                        </div>

                        {/* Dominant color swatches */}
                        {product.dominantColors && product.dominantColors.length > 0 && (
                            <div className="mt-10 border-t border-neutral-200 pt-6">
                                <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                                    Color Palette
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {product.dominantColors.map((c, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div
                                                className="rounded-full border border-neutral-200"
                                                style={{ width: 40, height: 40, backgroundColor: c.hex }}
                                                title={c.hex}
                                            />
                                            <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 capitalize">
                                                {c.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right 40%: purchase panel ─────────────────────────── */}
                    <div className="md:col-span-5">
                        <div className="sticky top-24">
                            <div className="border-4 border-black p-6">
                                <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
                                    Listed Price
                                </p>
                                <div className="flex items-baseline gap-3 mb-2">
                                    {product.salePrice ? (
                                        <>
                                            <span
                                                style={{ fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}
                                                className="text-5xl font-bold"
                                            >
                                                ${product.salePrice.toLocaleString()}
                                            </span>
                                            <span className="text-xl line-through text-neutral-300">
                                                ${product.price.toLocaleString()}
                                            </span>
                                        </>
                                    ) : (
                                        <span
                                            style={{ fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}
                                            className="text-5xl font-bold"
                                        >
                                            ${product.price.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {product.isOriginal && (
                                        <span className="text-[10px] font-bold tracking-widest uppercase border-2 border-black px-2 py-1">
                                            Original
                                        </span>
                                    )}
                                    {product.isFramed && (
                                        <span className="text-[10px] font-bold tracking-widest uppercase border-2 border-black px-2 py-1">
                                            Framed
                                        </span>
                                    )}
                                    {product.readyToHang && (
                                        <span className="text-[10px] font-bold tracking-widest uppercase border-2 border-black px-2 py-1">
                                            Ready to Hang
                                        </span>
                                    )}
                                </div>

                                {canPurchase ? (
                                    <a
                                        href={marketplaceArtworkUrl(product)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center text-sm font-bold tracking-widest uppercase bg-[#111] text-white py-4 transition-colors duration-150 hover:opacity-90"
                                        style={{ "--hover-bg": "var(--accent)" } as React.CSSProperties}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--accent)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#111"; }}
                                    >
                                        Acquire This Work
                                    </a>
                                ) : product.status === "sold" ? (
                                    <div className="w-full text-center text-sm font-bold tracking-widest uppercase bg-neutral-200 text-neutral-400 py-4">
                                        Sold
                                    </div>
                                ) : null}

                                <p className="text-[10px] text-neutral-400 mt-3 text-center leading-relaxed">
                                    Purchase through{" "}
                                    <a
                                        href="https://www.artsdistrictusa.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-[#111] transition-colors"
                                    >
                                        ArtsDistrictUSA
                                    </a>
                                </p>
                            </div>

                            {/* Artist snippet */}
                            <div className="mt-6 pt-6 border-t-2 border-black">
                                <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-3">
                                    About the Artist
                                </p>
                                <Link href="/about" className="block group">
                                    <p
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-xl font-bold text-[#111] group-hover:opacity-70 transition-opacity mb-2"
                                    >
                                        {name}
                                    </p>
                                </Link>
                                {(artist.city || artist.state) && (
                                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">
                                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                                {artist.bio && (
                                    <p className="text-sm text-neutral-600 leading-relaxed">
                                        {artist.bio.slice(0, 180)}
                                        {artist.bio.length > 180 ? "…" : ""}
                                    </p>
                                )}
                                <Link
                                    href="/about"
                                    className="text-[10px] font-bold tracking-widest uppercase mt-3 inline-block hover:opacity-70 transition-opacity"
                                    style={{ color: "var(--accent)" }}
                                >
                                    Full Profile →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Related works horizontal strip ───────────────────────────── */}
            {relatedImgs.length > 0 && (
                <section className="border-t-4 border-black py-12">
                    <div className="max-w-7xl mx-auto px-0">
                        <div className="px-6 md:px-10 mb-6 flex items-center justify-between">
                            <h2
                                style={{ fontFamily: "'DM Serif Display', serif" }}
                                className="text-3xl font-bold text-[#111]"
                            >
                                Related Works
                            </h2>
                            <Link
                                href="/artworks"
                                className="text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
                                style={{ color: "var(--accent)" }}
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 md:px-10">
                            {relatedProducts.slice(0, 4).map((r) => {
                                const rImg = getProductImageUrl(r);
                                return (
                                    <Link
                                        key={r.id}
                                        href={`/artworks/${r.slug ?? r.id}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                                            {rImg ? (
                                                <Image
                                                    src={rImg}
                                                    alt={r.title}
                                                    fill
                                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-150"
                                                    sizes="25vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-neutral-200" />
                                            )}
                                        </div>
                                        <p
                                            style={{ fontFamily: "'DM Serif Display', serif" }}
                                            className="text-sm font-bold text-[#111] mt-2 leading-tight"
                                        >
                                            {r.title}
                                        </p>
                                        <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--accent)" }}>
                                            ${r.price.toLocaleString()}
                                        </p>
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
