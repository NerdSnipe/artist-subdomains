import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import HeroParallax from "./HeroParallax";
import MarqueeStrip from "./MarqueeStrip";
import HorizontalGallery from "./HorizontalGallery";
import RevealOnScroll from "./RevealOnScroll";
import { sortByDateDesc } from "@/lib/cv-sort";

const MONO = "'IBM Plex Mono', monospace";
const CORMORANT = "'Cormorant Garamond', serif";
const BASKERVILLE = "'Libre Baskerville', serif";

export default function ChronicleHomePage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const activeWorks = artworks.filter((a) => a.status !== "inactive");

    // Gallery: up to 10 works
    const galleryWorks = activeWorks.slice(0, 10);

    // Featured centerpiece: a strong active work (prefer index 2 or fall back)
    const featuredWork =
        activeWorks.find((a) => a.status === "active") ??
        activeWorks[0] ??
        null;
    const featuredImgUrl = featuredWork ? getProductImageUrl(featuredWork) : null;

    const bioPhoto = artist.bioPhoto ?? artist.profilePhoto ?? null;
    const location = [artist.city, artist.state].filter(Boolean).join(", ");

    return (
        <div style={{ backgroundColor: "#faf8f5" }}>
            {/* ── 1. Hero Parallax ─────────────────────────────────────────── */}
            <HeroParallax artist={artist} />

            {/* ── 2. First Marquee Divider ─────────────────────────────────── */}
            <MarqueeStrip name={name} />

            {/* ── 3. Chapter I: The Work ───────────────────────────────────── */}
            <section className="py-20 md:py-28">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
                        <p
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.6rem",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#6b7c6d",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Chapter I
                        </p>
                        <h2
                            style={{
                                fontFamily: CORMORANT,
                                fontStyle: "italic",
                                fontWeight: 300,
                                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                                color: "#1c1917",
                                lineHeight: 1.05,
                            }}
                        >
                            The Work
                        </h2>
                    </div>
                </RevealOnScroll>

                <HorizontalGallery artworks={galleryWorks} />

                <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 flex justify-end">
                    <Link
                        href="/artworks"
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.65rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#6b7c6d",
                            textDecoration: "none",
                        }}
                        className="hover:text-[#1c1917] transition-colors"
                    >
                        View Full Collection →
                    </Link>
                </div>
            </section>

            {/* ── 4. Featured Work — Full-Bleed Centerpiece ─────────────────── */}
            {featuredWork && featuredImgUrl && (
                <RevealOnScroll>
                    <section
                        className="w-full border-t border-b border-stone-200"
                        style={{ backgroundColor: "#faf8f5" }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-[55%_45%]">
                            {/* Image — left 55% */}
                            <div
                                className="relative overflow-hidden"
                                style={{ minHeight: "420px", aspectRatio: "4/3" }}
                            >
                                <Image
                                    src={featuredImgUrl}
                                    alt={featuredWork.title}
                                    fill
                                    className="object-cover"
                                    sizes="55vw"
                                />
                            </div>

                            {/* Text — right 45% */}
                            <div className="flex flex-col justify-center px-8 md:px-14 py-14 md:py-20">
                                <p
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "#6b7c6d",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Featured Work
                                </p>
                                <h3
                                    style={{
                                        fontFamily: CORMORANT,
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                        color: "#1c1917",
                                        lineHeight: 1.05,
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    {featuredWork.title}
                                </h3>

                                <div
                                    className="flex items-center gap-3 flex-wrap mb-6"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "#9ca3af",
                                    }}
                                >
                                    {featuredWork.yearCreated && <span>{featuredWork.yearCreated}</span>}
                                    {(featuredWork.medium ?? featuredWork.mediums?.[0]?.medium?.name) && featuredWork.yearCreated && (
                                        <span>·</span>
                                    )}
                                    {(featuredWork.medium ?? featuredWork.mediums?.[0]?.medium?.name) && (
                                        <span>{featuredWork.medium ?? featuredWork.mediums?.[0]?.medium?.name}</span>
                                    )}
                                    {featuredWork.price > 0 && (
                                        <>
                                            <span>·</span>
                                            <span style={{ color: "#d4a853" }}>
                                                ${featuredWork.price.toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <Link
                                    href={`/artworks/${featuredWork.slug ?? featuredWork.id}`}
                                    style={{
                                        display: "inline-block",
                                        fontFamily: MONO,
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "#faf8f5",
                                        backgroundColor: "#1c1917",
                                        padding: "0.75rem 1.5rem",
                                        textDecoration: "none",
                                        alignSelf: "flex-start",
                                    }}
                                    className="hover:bg-[#6b7c6d] transition-colors"
                                >
                                    View This Work →
                                </Link>
                            </div>
                        </div>
                    </section>
                </RevealOnScroll>
            )}

            {/* ── 5. Second Marquee Divider ────────────────────────────────── */}
            <MarqueeStrip name={name} />

            {/* ── 6. Chapter II: The Artist ────────────────────────────────── */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <RevealOnScroll>
                        <div className="mb-14">
                            <p
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#6b7c6d",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                Chapter II
                            </p>
                            <h2
                                style={{
                                    fontFamily: CORMORANT,
                                    fontStyle: "italic",
                                    fontWeight: 300,
                                    fontSize: "clamp(2.8rem, 6vw, 5rem)",
                                    color: "#1c1917",
                                    lineHeight: 1.05,
                                }}
                            >
                                The Artist
                            </h2>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start">
                        {/* Editorial text column */}
                        <RevealOnScroll delay={100}>
                            <div style={{ maxWidth: "36rem" }}>
                                {(artist.artistStatement ?? artist.bio) && (
                                    <p
                                        style={{
                                            fontFamily: BASKERVILLE,
                                            fontSize: "1.05rem",
                                            lineHeight: 1.85,
                                            color: "#3d3733",
                                        }}
                                    >
                                        {artist.artistStatement ?? artist.bio}
                                    </p>
                                )}

                                {location && (
                                    <p
                                        className="mt-8"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: "#9ca3af",
                                        }}
                                    >
                                        Based in {location}
                                    </p>
                                )}

                                <Link
                                    href="/about"
                                    className="mt-6 inline-block hover:text-[#6b7c6d] transition-colors"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "#1c1917",
                                        textDecoration: "none",
                                    }}
                                >
                                    Full Profile →
                                </Link>
                            </div>
                        </RevealOnScroll>

                        {/* Bio photo */}
                        {bioPhoto && (
                            <RevealOnScroll delay={200}>
                                <div
                                    className="relative overflow-hidden shrink-0"
                                    style={{ width: "min(280px, 40vw)", aspectRatio: "3/4" }}
                                >
                                    <Image
                                        src={bioPhoto}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                        sizes="280px"
                                    />
                                </div>
                            </RevealOnScroll>
                        )}
                    </div>
                </div>
            </section>

            {/* ── 7. Chapter III: Recent Events ──────────────────────────────── */}
            {artist.events && artist.events.length > 0 && (
                <section
                    className="py-20 md:py-24 border-t border-stone-200"
                    style={{ backgroundColor: "#faf8f5" }}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <RevealOnScroll>
                            <div className="mb-14">
                                <p
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        color: "#6b7c6d",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    Chapter III
                                </p>
                                <h2
                                    style={{
                                        fontFamily: CORMORANT,
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        fontSize: "clamp(2.8rem, 6vw, 5rem)",
                                        color: "#1c1917",
                                        lineHeight: 1.05,
                                    }}
                                >
                                    Recent Events
                                </h2>
                            </div>
                        </RevealOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sortByDateDesc(artist.events, (event) => event.startDate ?? event.date).slice(0, 3).map((event, i) => (
                                <RevealOnScroll key={i} delay={i * 80}>
                                    <article
                                        className="border-l-2 pl-6 py-2"
                                        style={{ borderColor: "#6b7c6d" }}
                                    >
                                        <p
                                            style={{
                                                fontFamily: MONO,
                                                fontSize: "0.6rem",
                                                letterSpacing: "0.16em",
                                                textTransform: "uppercase",
                                                color: "#d4a853",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {event.date ?? event.startDate ?? "Upcoming"}
                                        </p>
                                        <h3
                                            style={{
                                                fontFamily: CORMORANT,
                                                fontSize: "1.4rem",
                                                fontWeight: 400,
                                                color: "#1c1917",
                                                lineHeight: 1.2,
                                                marginBottom: "0.4rem",
                                            }}
                                        >
                                            {event.title}
                                        </h3>
                                        {event.location && (
                                            <p
                                                style={{
                                                    fontFamily: MONO,
                                                    fontSize: "0.6rem",
                                                    letterSpacing: "0.1em",
                                                    color: "#9ca3af",
                                                    marginBottom: "0.5rem",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {event.location}
                                            </p>
                                        )}
                                        {event.description && (
                                            <p
                                                style={{
                                                    fontFamily: BASKERVILLE,
                                                    fontSize: "0.82rem",
                                                    lineHeight: 1.65,
                                                    color: "#6b7c6d",
                                                }}
                                            >
                                                {event.description.slice(0, 120)}
                                                {event.description.length > 120 ? "…" : ""}
                                            </p>
                                        )}
                                        {event.url && (
                                            <a
                                                href={event.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
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
                                                Details →
                                            </a>
                                        )}
                                    </article>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 8. Reviews ───────────────────────────────────────────────── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="py-20 md:py-24 border-t border-stone-200">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <RevealOnScroll>
                            <p
                                className="mb-12"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#6b7c6d",
                                }}
                            >
                                What They're Saying
                            </p>
                        </RevealOnScroll>

                        <div className="space-y-10">
                            {artist.reviews.slice(0, 4).map((review, i) => (
                                <RevealOnScroll key={i} delay={i * 100}>
                                    <blockquote
                                        className="relative pl-10"
                                        style={{
                                            borderLeft: "none",
                                        }}
                                    >
                                        {/* Large opening quote in sage */}
                                        <span
                                            className="absolute left-0 top-0 leading-none select-none"
                                            aria-hidden="true"
                                            style={{
                                                fontFamily: CORMORANT,
                                                fontSize: "4rem",
                                                color: "#6b7c6d",
                                                lineHeight: 0.8,
                                            }}
                                        >
                                            &ldquo;
                                        </span>
                                        <p
                                            style={{
                                                fontFamily: BASKERVILLE,
                                                fontStyle: "italic",
                                                fontSize: "1.05rem",
                                                lineHeight: 1.8,
                                                color: "#3d3733",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            {review.text}
                                        </p>
                                        <footer className="flex items-center gap-3">
                                            <span
                                                className="inline-block"
                                                style={{ width: 24, height: 1, backgroundColor: "#6b7c6d" }}
                                            />
                                            <div>
                                                <cite
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.62rem",
                                                        letterSpacing: "0.14em",
                                                        textTransform: "uppercase",
                                                        color: "#1c1917",
                                                        fontStyle: "normal",
                                                    }}
                                                >
                                                    {review.author}
                                                </cite>
                                                {review.role && (
                                                    <span
                                                        style={{
                                                            display: "block",
                                                            fontFamily: MONO,
                                                            fontSize: "0.58rem",
                                                            letterSpacing: "0.1em",
                                                            textTransform: "uppercase",
                                                            color: "#9ca3af",
                                                        }}
                                                    >
                                                        {review.role}
                                                    </span>
                                                )}
                                            </div>
                                        </footer>
                                    </blockquote>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
