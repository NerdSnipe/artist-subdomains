import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import DynamicColorProvider from "./DynamicColorProvider";
import HeroSlider from "./HeroSlider";
import HorizontalScrollStrip from "./HorizontalScrollStrip";

export default function VividHomePage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const activeWorks = artworks.filter((a) => a.status !== "inactive");
    const accent = activeWorks.find((a) => a.status === "active")?.dominantColors?.[0]?.hex ?? "#FF4D00";

    const sliderWorks = activeWorks.filter((a) => a.status === "active").slice(0, 6);
    const featuredWorks = activeWorks.filter((a) => a.status === "active").slice(0, 6);

    const activeCount = activeWorks.filter((a) => a.status === "active").length;
    const year = artist.createdAt ? new Date(artist.createdAt).getFullYear() : new Date().getFullYear();
    const city = artist.city ?? "";

    const scrollImages = [
        ...(artist.studioImages ?? []),
        ...(artist.socialImages ?? []),
    ];

    return (
        <div>
            <DynamicColorProvider accent={accent} />

            {/* ── Hero Slider ─────────────────────────────────────────────── */}
            <HeroSlider artworks={sliderWorks} artist={artist} />

            {/* ── "The Work" Section ─────────────────────────────────────── */}
            {featuredWorks.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                    <div className="flex items-baseline gap-6 mb-10 border-b-4 border-black pb-4">
                        <h2
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-5xl md:text-7xl font-bold text-[#111]"
                        >
                            The Work
                        </h2>
                        <Link
                            href="/artworks"
                            className="ml-auto text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
                            style={{ color: "var(--accent)" }}
                        >
                            View All →
                        </Link>
                    </div>

                    {/* Asymmetric featured grid: 2 large + 4 small */}
                    <div className="grid grid-cols-12 gap-4 md:gap-6">
                        {/* Large work 1 */}
                        {featuredWorks[0] && (() => {
                            const img = getProductImageUrl(featuredWorks[0]);
                            return (
                                <Link
                                    href={`/artworks/${featuredWorks[0].slug ?? featuredWorks[0].id}`}
                                    className="col-span-12 md:col-span-7 group block"
                                    style={{ gridRow: "span 2" }}
                                >
                                    <div className="relative overflow-hidden bg-neutral-100 h-full" style={{ minHeight: "400px" }}>
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={featuredWorks[0].title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 58vw"
                                                priority
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <p style={{ fontFamily: "'DM Serif Display', serif" }} className="text-2xl font-bold text-white">{featuredWorks[0].title}</p>
                                            <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--accent)" }}>
                                                ${featuredWorks[0].price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <p style={{ fontFamily: "'DM Serif Display', serif" }} className="text-xl font-bold text-[#111]">
                                            {featuredWorks[0].title}
                                        </p>
                                        <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--accent)" }}>
                                            ${featuredWorks[0].price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* Large work 2 */}
                        {featuredWorks[1] && (() => {
                            const img = getProductImageUrl(featuredWorks[1]);
                            return (
                                <Link
                                    href={`/artworks/${featuredWorks[1].slug ?? featuredWorks[1].id}`}
                                    className="col-span-12 md:col-span-5 group block"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={featuredWorks[1].title}
                                                fill
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-150"
                                                sizes="(max-width: 768px) 100vw, 42vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                    </div>
                                    <div className="pt-3">
                                        <p style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg font-bold text-[#111]">
                                            {featuredWorks[1].title}
                                        </p>
                                        <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--accent)" }}>
                                            ${featuredWorks[1].price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* Small works 3-6 */}
                        {featuredWorks.slice(2, 6).map((work) => {
                            const img = getProductImageUrl(work);
                            return (
                                <Link
                                    key={work.id}
                                    href={`/artworks/${work.slug ?? work.id}`}
                                    className="col-span-6 md:col-span-3 group block"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-neutral-100">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={work.title}
                                                fill
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-150"
                                                sizes="25vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                    </div>
                                    <p style={{ fontFamily: "'DM Serif Display', serif" }} className="text-sm font-bold text-[#111] mt-2">
                                        {work.title}
                                    </p>
                                    <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "var(--accent)" }}>
                                        ${work.price.toLocaleString()}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ── Artist Statement ─────────────────────────────────────────── */}
            {(artist.artistStatement || artist.bio) && (
                <section className="bg-white border-t-4 border-b-4 border-black py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <div className="grid grid-cols-12 gap-6 items-start">
                            <div className="col-span-12 md:col-span-1">
                                <span
                                    aria-hidden="true"
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        color: "var(--accent)",
                                        fontSize: "8rem",
                                        lineHeight: 1,
                                    }}
                                >
                                    &ldquo;
                                </span>
                            </div>
                            <div className="col-span-12 md:col-span-9">
                                <blockquote
                                    style={{ fontFamily: "'DM Serif Display', serif" }}
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold italic text-[#111] leading-[1.2] mb-8"
                                >
                                    {(artist.artistStatement ?? artist.bio ?? "").slice(0, 280)}
                                    {((artist.artistStatement?.length ?? 0) > 280 || (artist.bio?.length ?? 0) > 280) ? "…" : ""}
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-1" style={{ backgroundColor: "var(--accent)" }} />
                                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                                        {name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Stats Strip ─────────────────────────────────────────────── */}
            <section className="bg-[#111] text-white py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex flex-wrap gap-8 md:gap-16 items-end">
                        {activeCount > 0 && (
                            <div>
                                <span
                                    style={{ fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}
                                    className="text-6xl md:text-8xl font-bold leading-none"
                                >
                                    {activeCount}
                                </span>
                                <p className="text-xs font-bold tracking-widest uppercase text-white/40 mt-1">Works Available</p>
                            </div>
                        )}
                        <div>
                            <span
                                style={{ fontFamily: "'DM Serif Display', serif" }}
                                className="text-6xl md:text-8xl font-bold text-white leading-none"
                            >
                                Est.&nbsp;{year}
                            </span>
                            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mt-1">Year Founded</p>
                        </div>
                        {city && (
                            <div>
                                <span
                                    style={{ fontFamily: "'DM Serif Display', serif" }}
                                    className="text-6xl md:text-8xl font-bold text-white leading-none"
                                >
                                    {city}
                                </span>
                                <p className="text-xs font-bold tracking-widest uppercase text-white/40 mt-1">Location</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Studio / Social Image Strip ─────────────────────────────── */}
            {scrollImages.length > 0 && (
                <section className="py-12">
                    <HorizontalScrollStrip images={scrollImages} label="Studio & Life" itemWidth={340} itemHeight={260} />
                </section>
            )}

            {/* ── Reviews ─────────────────────────────────────────────────── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="py-14 md:py-20 border-t-4 border-black">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <h2
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-4xl md:text-5xl font-bold text-[#111] mb-10"
                        >
                            What They Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {artist.reviews.slice(0, 4).map((review, i) => (
                                <div
                                    key={i}
                                    className="p-6 border-l-4"
                                    style={{ borderColor: "var(--accent)" }}
                                >
                                    <p
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-lg md:text-xl font-bold italic text-[#111] mb-4 leading-snug"
                                    >
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-0.5" style={{ backgroundColor: "var(--accent)" }} />
                                        <div>
                                            <p className="text-xs font-bold tracking-widest uppercase text-[#111]">
                                                {review.author}
                                            </p>
                                            {review.role && (
                                                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mt-0.5">
                                                    {review.role}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA band ────────────────────────────────────────────────── */}
            <section className="py-20" style={{ backgroundColor: "var(--accent)" }}>
                <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
                    <h2
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Acquire Original Art
                    </h2>
                    <p className="text-white/80 font-bold text-sm tracking-widest uppercase mb-8">
                        Every piece is original — created by {name}
                    </p>
                    <Link
                        href="/artworks"
                        className="inline-block bg-white text-[#111] text-sm font-bold tracking-widest uppercase px-10 py-4 hover:bg-[#111] hover:text-white transition-colors duration-150"
                    >
                        Browse the Collection
                    </Link>
                </div>
            </section>
        </div>
    );
}
