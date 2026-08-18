import Image from "next/image";
import Link from "next/link";
import type { ThemeArtworkDetailProps } from "@/themes/types";
import { getArtistName, getProductImageUrl, marketplaceArtworkUrl } from "@/lib/artist-api";
import { derivePalette } from "./color";
import DynamicColorProvider from "./DynamicColorProvider";
import ArtworkImageSwitcher from "./ArtworkImageSwitcher";
import Reveal from "./Reveal";

export default function VividArtworkDetailPage({ artist, product, relatedProducts }: ThemeArtworkDetailProps) {
    const name = getArtistName(artist);
    const artistSlug = product.artistSlug ?? artist.slug ?? "";
    const canPurchase = product.status === "active" && !!artistSlug && !!product.slug;
    const palette = derivePalette(product.dominantColors, product.id);

    const mediumNames = product.mediums?.map((m) => m.medium?.name).filter(Boolean) as string[] ?? (product.medium ? [product.medium] : []);
    const styleNames = product.styles?.map((s) => s.artStyle?.name).filter(Boolean) as string[] ?? [];
    const subjectNames = product.subjects?.map((s) => s.subject?.name).filter(Boolean) as string[] ?? [];
    const materialNames = product.materials?.map((m) => m.material?.name).filter(Boolean) as string[] ?? [];

    const related = relatedProducts.slice(0, 4);

    return (
        <DynamicColorProvider initialPalette={palette}>
            <div>
                <div className="border-b border-white/10">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4">
                        <Link
                            href="/artworks"
                            className="text-[10px] font-bold tracking-widest uppercase inline-flex items-center gap-2 transition-colors"
                            style={{ color: "rgba(246,244,239,0.5)" }}
                        >
                            ← All Works
                        </Link>
                    </div>
                </div>

                <section className="border-b border-white/10">
                    <ArtworkImageSwitcher product={product} />
                    {product.status === "sold" && (
                        <div className="text-center py-2.5" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--v-paper)" }}>Sold</span>
                        </div>
                    )}
                </section>

                <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                        <Reveal className="md:col-span-7">
                            <h1
                                style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                                className="text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] mb-4"
                            >
                                {product.title}
                            </h1>

                            {product.yearCreated && (
                                <p className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: "var(--v-primary)" }}>
                                    {product.yearCreated}
                                </p>
                            )}

                            {product.description && (
                                <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(246,244,239,0.7)" }}>
                                    {product.description}
                                </p>
                            )}

                            <div className="border-t border-white/10 pt-6">
                                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(246,244,239,0.4)" }}>
                                    Specifications
                                </p>
                                <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
                                    {mediumNames.length > 0 && <Spec label="Medium" value={mediumNames.join(", ")} />}
                                    {product.dimensions && (
                                        <Spec
                                            label="Dimensions"
                                            value={`${product.dimensions.width} × ${product.dimensions.height}${product.dimensions.depth ? ` × ${product.dimensions.depth}` : ""} ${product.dimensions.unit}`}
                                        />
                                    )}
                                    {product.isOriginal !== undefined && <Spec label="Type" value={product.isOriginal ? "Original" : "Print / Reproduction"} />}
                                    {product.isFramed !== undefined && <Spec label="Framing" value={product.isFramed ? "Framed" : "Unframed"} />}
                                    {product.readyToHang !== undefined && <Spec label="Ready to Hang" value={product.readyToHang ? "Yes" : "No"} />}
                                    {product.signedLocation && <Spec label="Signature" value={`Signed (${product.signedLocation})`} />}
                                    {styleNames.length > 0 && <Spec label="Style" value={styleNames.join(", ")} />}
                                    {subjectNames.length > 0 && <Spec label="Subject" value={subjectNames.join(", ")} />}
                                    {materialNames.length > 0 && <Spec label="Materials" value={materialNames.join(", ")} />}
                                </dl>
                            </div>

                            {product.dominantColors && product.dominantColors.length > 0 && (
                                <div className="mt-10 border-t border-white/10 pt-6">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(246,244,239,0.4)" }}>
                                        Color Palette
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {product.dominantColors.map((c, i) => (
                                            <div key={i} className="flex items-center gap-2.5">
                                                <div
                                                    className="rounded-full border border-white/15"
                                                    style={{ width: 36, height: 36, backgroundColor: c.hex, boxShadow: `0 6px 18px -6px ${c.hex}` }}
                                                    title={c.hex}
                                                />
                                                <span className="text-xs font-bold tracking-widest uppercase capitalize" style={{ color: "rgba(246,244,239,0.6)" }}>
                                                    {c.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Reveal>

                        <Reveal delayMs={120} className="md:col-span-5">
                            <div className="sticky top-24">
                                <div className="rounded-2xl p-7" style={{ backgroundColor: "var(--v-ink-soft)", boxShadow: "0 30px 60px -30px var(--v-glow)" }}>
                                    <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(246,244,239,0.4)" }}>
                                        Listed Price
                                    </p>
                                    <div className="flex items-baseline gap-3 mb-4">
                                        {product.salePrice ? (
                                            <>
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-4xl md:text-5xl">
                                                    ${product.salePrice.toLocaleString()}
                                                </span>
                                                <span className="text-lg line-through" style={{ color: "rgba(246,244,239,0.3)" }}>
                                                    ${product.price.toLocaleString()}
                                                </span>
                                            </>
                                        ) : (
                                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-4xl md:text-5xl">
                                                ${product.price.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {product.isOriginal && <Badge label="Original" />}
                                        {product.isFramed && <Badge label="Framed" />}
                                        {product.readyToHang && <Badge label="Ready to Hang" />}
                                    </div>

                                    {canPurchase ? (
                                        <a
                                            href={marketplaceArtworkUrl(product)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full text-center text-sm font-bold tracking-widest uppercase py-4 rounded-full vivid-btn-primary"
                                        >
                                            Acquire This Work
                                        </a>
                                    ) : product.status === "sold" ? (
                                        <div className="w-full text-center text-sm font-bold tracking-widest uppercase py-4 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(246,244,239,0.4)" }}>
                                            Sold
                                        </div>
                                    ) : null}

                                    <p className="text-[10px] mt-4 text-center leading-relaxed" style={{ color: "rgba(246,244,239,0.35)" }}>
                                        Purchase through{" "}
                                        <a href="https://www.artsdistrictusa.com" target="_blank" rel="noopener noreferrer" className="underline">
                                            ArtsDistrictUSA
                                        </a>
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(246,244,239,0.4)" }}>
                                        About the Artist
                                    </p>
                                    <Link href="/about" className="block group">
                                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-xl mb-2">
                                            {name}
                                        </p>
                                    </Link>
                                    {(artist.city || artist.state) && (
                                        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(246,244,239,0.4)" }}>
                                            {[artist.city, artist.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}
                                    {artist.bio && (
                                        <p className="text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.65)" }}>
                                            {artist.bio.slice(0, 180)}
                                            {artist.bio.length > 180 ? "…" : ""}
                                        </p>
                                    )}
                                    <Link href="/about" className="text-[10px] font-bold tracking-widest uppercase mt-3 inline-block" style={{ color: "var(--v-primary)" }}>
                                        Full Profile →
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="border-t border-white/10 py-14">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal className="flex items-center justify-between mb-7">
                                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-2xl md:text-3xl uppercase">
                                    Related Works
                                </h2>
                                <Link href="/artworks" className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--v-primary)" }}>
                                    View All →
                                </Link>
                            </Reveal>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {related.map((r, i) => {
                                    const rImg = getProductImageUrl(r);
                                    return (
                                        <Reveal key={r.id} delayMs={i * 70}>
                                            <Link href={`/artworks/${r.slug ?? r.id}`} className="group block">
                                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                                                    {rImg ? (
                                                        <Image src={rImg} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="25vw" />
                                                    ) : (
                                                        <div className="absolute inset-0" style={{ backgroundColor: "var(--v-ink-soft)" }} />
                                                    )}
                                                </div>
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-sm mt-2.5 leading-tight">
                                                    {r.title}
                                                </p>
                                                <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--v-primary)" }}>
                                                    ${r.price.toLocaleString()}
                                                </p>
                                            </Link>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </DynamicColorProvider>
    );
}

function Spec({ label, value }: { label: string; value: string }) {
    return (
        <>
            <dt className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(246,244,239,0.4)" }}>{label}</dt>
            <dd className="text-sm" style={{ color: "var(--v-paper)" }}>{value}</dd>
        </>
    );
}

function Badge({ label }: { label: string }) {
    return (
        <span className="text-[10px] font-bold tracking-widest uppercase border rounded-full px-3 py-1.5" style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--v-paper)" }}>
            {label}
        </span>
    );
}
