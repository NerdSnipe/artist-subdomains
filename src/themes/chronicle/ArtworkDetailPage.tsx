import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import ArtworkImageGallery from "./ArtworkImageGallery";
import HorizontalGallery from "./HorizontalGallery";
import RevealOnScroll from "./RevealOnScroll";

const MONO = "'IBM Plex Mono', monospace";
const CORMORANT = "'Cormorant Garamond', serif";
const BASKERVILLE = "'Libre Baskerville', serif";

export default function ChronicleArtworkDetailPage({
    artist,
    product,
    relatedProducts,
}: ThemeArtworkDetailProps) {
    const name = getArtistName(artist);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const canPurchase = product.status === "active" && !!artistSlug && !!product.slug;

    const mediumNames = product.mediums?.map((m) => m.medium?.name).filter(Boolean) as string[] ?? (product.medium ? [product.medium] : []);
    const styleNames = product.styles?.map((s) => s.artStyle?.name).filter(Boolean) as string[] ?? [];
    const subjectNames = product.subjects?.map((s) => s.subject?.name).filter(Boolean) as string[] ?? [];

    const relatedActive = relatedProducts.filter((r) => r.status !== "inactive").slice(0, 8);

    return (
        <div style={{ backgroundColor: "#faf8f5" }}>
            {/* ── Breadcrumb ────────────────────────────────────────────────── */}
            <div className="border-b border-stone-200 py-3">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <Link
                        href="/artworks"
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.6rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#6b7c6d",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#1c1917] transition-colors inline-flex items-center gap-2"
                    >
                        ← Back to Collection
                    </Link>
                </div>
            </div>

            {/* ── Main Detail ───────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                {/* Title + year */}
                <RevealOnScroll>
                    <div className="mb-10">
                        <h1
                            style={{
                                fontFamily: CORMORANT,
                                fontStyle: "italic",
                                fontWeight: 300,
                                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                                color: "#1c1917",
                                lineHeight: 1.0,
                                marginBottom: "0.6rem",
                            }}
                        >
                            {product.title}
                        </h1>
                        {product.yearCreated && (
                            <p
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "#9ca3af",
                                }}
                            >
                                {product.yearCreated}
                            </p>
                        )}
                    </div>
                </RevealOnScroll>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 md:gap-16">
                    {/* Left: Image gallery + description + specs */}
                    <div>
                        <ArtworkImageGallery product={product} />

                        {/* Description */}
                        {product.description && (
                            <RevealOnScroll>
                                <div className="mt-10">
                                    <p
                                        style={{
                                            fontFamily: BASKERVILLE,
                                            fontSize: "1rem",
                                            lineHeight: 1.8,
                                            color: "#3d3733",
                                        }}
                                    >
                                        {product.description}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        )}

                        {/* Specifications */}
                        <RevealOnScroll>
                            <div
                                className="mt-10 pt-8 border-t border-stone-200"
                            >
                                <p
                                    className="mb-6"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "#6b7c6d",
                                    }}
                                >
                                    Specifications
                                </p>
                                <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
                                    {mediumNames.length > 0 && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Medium</dt>
                                            <dd style={{ fontFamily: BASKERVILLE, fontSize: "0.85rem", color: "#1c1917" }}>{mediumNames.join(", ")}</dd>
                                        </>
                                    )}
                                    {product.dimensions && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Dimensions</dt>
                                            <dd style={{ fontFamily: MONO, fontSize: "0.75rem", color: "#1c1917" }}>
                                                {product.dimensions.width} × {product.dimensions.height}
                                                {product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} {product.dimensions.unit}
                                            </dd>
                                        </>
                                    )}
                                    {product.isOriginal !== undefined && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Type</dt>
                                            <dd style={{ fontFamily: BASKERVILLE, fontSize: "0.85rem", color: "#1c1917" }}>
                                                {product.isOriginal ? "Original" : "Print / Reproduction"}
                                            </dd>
                                        </>
                                    )}
                                    {product.isFramed !== undefined && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Framing</dt>
                                            <dd style={{ fontFamily: BASKERVILLE, fontSize: "0.85rem", color: "#1c1917" }}>
                                                {product.isFramed ? "Framed" : "Unframed"}
                                            </dd>
                                        </>
                                    )}
                                    {styleNames.length > 0 && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Style</dt>
                                            <dd style={{ fontFamily: BASKERVILLE, fontSize: "0.85rem", color: "#1c1917" }}>{styleNames.join(", ")}</dd>
                                        </>
                                    )}
                                    {subjectNames.length > 0 && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Subject</dt>
                                            <dd style={{ fontFamily: BASKERVILLE, fontSize: "0.85rem", color: "#1c1917" }}>{subjectNames.join(", ")}</dd>
                                        </>
                                    )}
                                    {product.categoryName && (
                                        <>
                                            <dt style={{ fontFamily: MONO, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af" }}>Category</dt>
                                            <dd style={{ fontFamily: BASKERVILLE, fontSize: "0.85rem", color: "#1c1917" }}>{product.categoryName}</dd>
                                        </>
                                    )}
                                </dl>
                            </div>
                        </RevealOnScroll>

                        {/* Dominant Colors */}
                        {product.dominantColors && product.dominantColors.length > 0 && (
                            <RevealOnScroll>
                                <div className="mt-8 pt-6 border-t border-stone-200">
                                    <p
                                        className="mb-4"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: "#6b7c6d",
                                        }}
                                    >
                                        Palette
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {product.dominantColors.map((c, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div
                                                    className="border border-stone-200"
                                                    style={{
                                                        width: 28,
                                                        height: 28,
                                                        backgroundColor: c.hex,
                                                        flexShrink: 0,
                                                    }}
                                                    title={c.hex}
                                                />
                                                <span
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.6rem",
                                                        letterSpacing: "0.08em",
                                                        color: "#6b7c6d",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {c.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        )}
                    </div>

                    {/* Right: Price + acquire + artist bio */}
                    <div>
                        <div className="sticky top-24 space-y-8">
                            {/* Price block */}
                            <div
                                className="p-7 border border-stone-200"
                                style={{ backgroundColor: "#faf8f5" }}
                            >
                                <p
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.58rem",
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "#9ca3af",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Listed Price
                                </p>
                                <div className="flex items-baseline gap-3 mb-5">
                                    {product.salePrice ? (
                                        <>
                                            <span
                                                style={{
                                                    fontFamily: CORMORANT,
                                                    fontSize: "2.5rem",
                                                    fontWeight: 400,
                                                    color: "#d4a853",
                                                }}
                                            >
                                                ${product.salePrice.toLocaleString()}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: BASKERVILLE,
                                                    fontSize: "1rem",
                                                    color: "#d4cfc9",
                                                    textDecoration: "line-through",
                                                }}
                                            >
                                                ${product.price.toLocaleString()}
                                            </span>
                                        </>
                                    ) : (
                                        <span
                                            style={{
                                                fontFamily: CORMORANT,
                                                fontSize: "2.5rem",
                                                fontWeight: 400,
                                                color: "#1c1917",
                                            }}
                                        >
                                            ${product.price.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {canPurchase ? (
                                    <a
                                        href={marketplaceArtworkUrl(product)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center transition-colors bg-[#6b7c6d] hover:bg-[#1c1917]"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.65rem",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: "#faf8f5",
                                            padding: "0.875rem",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Acquire This Work
                                    </a>
                                ) : product.status === "sold" ? (
                                    <div
                                        className="w-full text-center"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.65rem",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            backgroundColor: "#e7e2dc",
                                            color: "#9ca3af",
                                            padding: "0.875rem",
                                        }}
                                    >
                                        Sold
                                    </div>
                                ) : null}

                                <p
                                    className="mt-3 text-center"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.08em",
                                        color: "#9ca3af",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Inquiries via{" "}
                                    <a
                                        href="https://www.artsdistrictusa.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-[#6b7c6d]"
                                    >
                                        ArtsDistrictUSA
                                    </a>
                                </p>
                            </div>

                            {/* Artist mini-bio */}
                            <div className="border-t border-stone-200 pt-6">
                                <p
                                    className="mb-3"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.58rem",
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "#9ca3af",
                                    }}
                                >
                                    About the Artist
                                </p>
                                <Link
                                    href="/about"
                                    style={{
                                        fontFamily: CORMORANT,
                                        fontStyle: "italic",
                                        fontSize: "1.3rem",
                                        fontWeight: 300,
                                        color: "#1c1917",
                                        textDecoration: "none",
                                        display: "block",
                                        marginBottom: "0.4rem",
                                    }}
                                    className="hover:text-[#6b7c6d] transition-colors"
                                >
                                    {name}
                                </Link>
                                {(artist.city || artist.state) && (
                                    <p
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.58rem",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color: "#9ca3af",
                                            marginBottom: "0.6rem",
                                        }}
                                    >
                                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                                {artist.bio && (
                                    <p
                                        style={{
                                            fontFamily: BASKERVILLE,
                                            fontSize: "0.82rem",
                                            lineHeight: 1.7,
                                            color: "#6b7c6d",
                                        }}
                                    >
                                        {artist.bio.slice(0, 200)}
                                        {artist.bio.length > 200 ? "…" : ""}
                                    </p>
                                )}
                                <Link
                                    href="/about"
                                    className="mt-3 inline-block hover:text-[#1c1917] transition-colors"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        color: "#6b7c6d",
                                        textDecoration: "none",
                                    }}
                                >
                                    Full Profile →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Related Works ─────────────────────────────────────────────── */}
            {relatedActive.length > 0 && (
                <section className="py-16 border-t border-stone-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
                        <p
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.6rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#6b7c6d",
                                marginBottom: "0.4rem",
                            }}
                        >
                            Continue Exploring
                        </p>
                        <h2
                            style={{
                                fontFamily: CORMORANT,
                                fontStyle: "italic",
                                fontWeight: 300,
                                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                                color: "#1c1917",
                            }}
                        >
                            Related Works
                        </h2>
                    </div>
                    <HorizontalGallery artworks={relatedActive} />
                </section>
            )}
        </div>
    );
}
