import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { derivePalette } from "./color";
import DynamicColorProvider from "./DynamicColorProvider";
import HeroSlider from "./HeroSlider";
import FeaturedGrid from "./FeaturedGrid";
import HorizontalScrollStrip from "./HorizontalScrollStrip";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default function VividHomePage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const activeWorks = artworks.filter((a) => a.status === "active");
    const initialPalette = derivePalette(activeWorks[0]?.dominantColors, activeWorks[0]?.id ?? artist.id);

    const sliderWorks = activeWorks.slice(0, 8);
    const featuredWorks = activeWorks.slice(0, 6);

    const year = artist.createdAt ? new Date(artist.createdAt).getFullYear() : undefined;
    const city = artist.city ?? "";

    const studioReel = [...(artist.carouselImages ?? []), ...(artist.studioImages ?? []), ...(artist.socialImages ?? [])];

    const recognitionStats = [
        artist.exhibitions?.length ? { label: "Exhibitions", value: artist.exhibitions.length } : null,
        artist.galleries?.length ? { label: "Gallery Partners", value: artist.galleries.length } : null,
        artist.publications?.length ? { label: "Press Features", value: artist.publications.length } : null,
    ].filter((v): v is { label: string; value: number } => !!v);

    const styleTags = [artist.artStyle, artist.secondaryArtStyle, artist.medium, artist.secondaryMedium].filter(
        (v): v is string => !!v
    );

    return (
        <DynamicColorProvider initialPalette={initialPalette}>
            <div>
                <HeroSlider artworks={sliderWorks} artist={artist} />

                {styleTags.length > 0 && <Marquee items={styleTags} speedSeconds={26} />}

                {/* ── Featured Work ─────────────────────────────────────────── */}
                {featuredWorks.length > 0 && (
                    <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24">
                        <Reveal className="flex items-baseline gap-6 mb-10 border-b border-white/10 pb-6">
                            <h2
                                style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                                className="text-4xl md:text-6xl uppercase"
                            >
                                Selected Work
                            </h2>
                            <Link
                                href="/artworks"
                                className="ml-auto text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-70 shrink-0"
                                style={{ color: "var(--v-primary)" }}
                            >
                                View All →
                            </Link>
                        </Reveal>
                        <Reveal delayMs={100}>
                            <FeaturedGrid works={featuredWorks} />
                        </Reveal>
                    </section>
                )}

                {/* ── Artist Statement ──────────────────────────────────────── */}
                {(artist.artistStatement || artist.artistTagline || artist.bio) && (
                    <section className="border-t border-b border-white/10 py-16 md:py-24" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal className="grid grid-cols-12 gap-6 items-start">
                                <div className="col-span-12 md:col-span-1">
                                    <span
                                        aria-hidden="true"
                                        style={{ fontFamily: "var(--font-display)", color: "var(--v-primary)", fontSize: "7rem", lineHeight: 1 }}
                                    >
                                        &ldquo;
                                    </span>
                                </div>
                                <div className="col-span-12 md:col-span-9">
                                    {artist.artistTagline && (
                                        <p className="text-lg md:text-xl mb-6" style={{ color: "var(--v-secondary)" }}>
                                            {artist.artistTagline}
                                        </p>
                                    )}
                                    <blockquote
                                        style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--v-paper)" }}
                                        className="text-2xl md:text-4xl leading-[1.25] mb-8"
                                    >
                                        {(artist.artistStatement ?? artist.bio ?? "").slice(0, 320)}
                                        {((artist.artistStatement?.length ?? 0) > 320 || (artist.bio?.length ?? 0) > 320) ? "…" : ""}
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--v-primary), var(--v-secondary))" }} />
                                        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(246,244,239,0.5)" }}>
                                            {name}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>
                )}

                {/* ── Stats Band ────────────────────────────────────────────── */}
                <section className="py-14 md:py-20">
                    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                        <Reveal className="flex flex-wrap gap-10 md:gap-20 items-end">
                            {activeWorks.length > 0 && (
                                <div>
                                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-6xl md:text-8xl leading-none">
                                        {activeWorks.length}
                                    </span>
                                    <p className="text-xs font-bold tracking-widest uppercase mt-2" style={{ color: "rgba(246,244,239,0.45)" }}>
                                        Works Available
                                    </p>
                                </div>
                            )}
                            {year && (
                                <div>
                                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-6xl md:text-8xl leading-none">
                                        {year}
                                    </span>
                                    <p className="text-xs font-bold tracking-widest uppercase mt-2" style={{ color: "rgba(246,244,239,0.45)" }}>
                                        Est.
                                    </p>
                                </div>
                            )}
                            {city && (
                                <div>
                                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-6xl md:text-8xl leading-none">
                                        {city}
                                    </span>
                                    <p className="text-xs font-bold tracking-widest uppercase mt-2" style={{ color: "rgba(246,244,239,0.45)" }}>
                                        Based In
                                    </p>
                                </div>
                            )}
                            {recognitionStats.map((stat) => (
                                <div key={stat.label}>
                                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-secondary)" }} className="text-6xl md:text-8xl leading-none">
                                        {stat.value}
                                    </span>
                                    <p className="text-xs font-bold tracking-widest uppercase mt-2" style={{ color: "rgba(246,244,239,0.45)" }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </section>

                {/* ── Studio Process ────────────────────────────────────────── */}
                {(artist.studioProcessDescription || studioReel.length > 0) && (
                    <section className="border-t border-white/10 py-16 md:py-20">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-8">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--v-primary)" }}>
                                    {artist.studioSubtitle ?? "In the Studio"}
                                </p>
                                {artist.studioProcessDescription && (
                                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--v-paper)" }}>
                                        {artist.studioProcessDescription}
                                    </p>
                                )}
                            </Reveal>
                        </div>
                        {studioReel.length > 0 && (
                            <Reveal delayMs={100}>
                                <HorizontalScrollStrip images={studioReel} itemWidth={340} itemHeight={260} />
                            </Reveal>
                        )}
                    </section>
                )}

                {/* ── Book ──────────────────────────────────────────────────── */}
                {artist.book && (
                    <section className="border-t border-white/10 py-16 md:py-20">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                                <div className="md:col-span-4">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--v-ink-soft)", boxShadow: "0 30px 60px -20px var(--v-glow)" }}>
                                        <Image src={artist.book.imageUrl} alt={artist.book.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                                    </div>
                                </div>
                                <div className="md:col-span-8">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--v-primary)" }}>
                                        {artist.book.publisher ? `Published by ${artist.book.publisher}` : "Publication"}
                                    </p>
                                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-3xl md:text-5xl uppercase leading-tight mb-5">
                                        {artist.book.title}
                                    </h2>
                                    <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(246,244,239,0.7)" }}>
                                        {artist.book.description}
                                    </p>
                                    {artist.book.purchaseUrl && (
                                        <a
                                            href={artist.book.purchaseUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded-full vivid-btn-primary"
                                        >
                                            {artist.book.purchaseLabel ?? "Get the Book"}
                                        </a>
                                    )}
                                </div>
                            </Reveal>
                        </div>
                    </section>
                )}

                {/* ── Reviews ───────────────────────────────────────────────── */}
                {artist.reviews && artist.reviews.length > 0 && (
                    <section className="border-t border-white/10 py-16 md:py-20">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-3xl md:text-5xl uppercase mb-10">
                                    What Collectors Say
                                </h2>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {artist.reviews.slice(0, 4).map((review, i) => (
                                    <Reveal key={i} delayMs={i * 80}>
                                        <div className="p-7 rounded-2xl border-l-4" style={{ borderColor: "var(--v-primary)", backgroundColor: "var(--v-ink-soft)" }}>
                                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--v-paper)" }} className="text-lg md:text-xl mb-5 leading-snug">
                                                &ldquo;{review.text}&rdquo;
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-0.5" style={{ backgroundColor: "var(--v-secondary)" }} />
                                                <div>
                                                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--v-paper)" }}>
                                                        {review.author}
                                                    </p>
                                                    {review.role && (
                                                        <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                            {review.role}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Upcoming Events ───────────────────────────────────────── */}
                {artist.events && artist.events.length > 0 && (
                    <section className="border-t border-white/10 py-16 md:py-20">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-3xl md:text-5xl uppercase mb-10">
                                    Upcoming Events
                                </h2>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {artist.events.slice(0, 3).map((event, i) => (
                                    <Reveal key={i} delayMs={i * 80}>
                                        <div className="p-6 rounded-2xl border-t-4" style={{ borderColor: "var(--v-secondary)", backgroundColor: "var(--v-ink-soft)" }}>
                                            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                {event.date ?? event.startDate ?? "Upcoming"}
                                            </p>
                                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-xl leading-tight mb-2">
                                                {event.title}
                                            </p>
                                            {event.location && <p className="text-sm mb-2" style={{ color: "rgba(246,244,239,0.6)" }}>{event.location}</p>}
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── CTA ───────────────────────────────────────────────────── */}
                <section
                    className="py-20 md:py-28 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, var(--v-primary), var(--v-secondary))" }}
                >
                    <Reveal className="max-w-[1400px] mx-auto px-5 md:px-10 text-center relative">
                        <h2
                            style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-on-primary)" }}
                            className="text-4xl md:text-7xl uppercase mb-6 leading-[0.95]"
                        >
                            Acquire Original Art
                        </h2>
                        <p className="font-bold text-sm tracking-widest uppercase mb-9" style={{ color: "var(--v-on-primary)", opacity: 0.75 }}>
                            Every piece is original — created by {name}
                        </p>
                        <Link
                            href="/artworks"
                            className="inline-block text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-full transition-transform hover:-translate-y-0.5"
                            style={{ backgroundColor: "var(--v-ink)", color: "var(--v-paper)" }}
                        >
                            Browse the Collection
                        </Link>
                    </Reveal>
                </section>
            </div>
        </DynamicColorProvider>
    );
}
