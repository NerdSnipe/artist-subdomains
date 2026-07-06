import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, MapPin } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import { ink, coal, coalLight, smoke, smokeDark, emberMid, emberDeep, emberGradient, emberGradientSteep } from "./palette";

export default function EmberHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const featured = active.slice(0, 5);
    const heroImg = artist.coverPhoto ?? getProductImageUrl(active[0] ?? artworks[0]) ?? artist.profilePhoto ?? null;

    const tickerItems = [
        artist.artStyle,
        artist.medium,
        artist.secondaryMedium,
        artist.secondaryArtStyle,
        ...(artist.exhibitions?.length ? [`${artist.exhibitions.length}+ Exhibitions`] : []),
        artist.acceptsCommissions && artist.acceptsCommissions !== "no" ? "Commissions Open" : null,
    ].filter((v): v is string => !!v);

    const nextEvent = artist.events?.[0];
    const facts = [
        artist.exhibitions?.length ? { n: artist.exhibitions.length, label: "Exhibitions" } : null,
        artist.galleries?.length ? { n: artist.galleries.length, label: "Galleries" } : null,
        active.length ? { n: active.length, label: "Works Available" } : null,
        artist.publications?.length ? { n: artist.publications.length, label: "Press Features" } : null,
    ].filter((f): f is { n: number; label: string } => !!f);

    return (
        <div style={{ backgroundColor: ink }}>
            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden" style={{ minHeight: "94vh" }}>
                <div
                    className="absolute inset-0 md:left-[22%]"
                    style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
                >
                    {heroImg ? (
                        <Image src={heroImg} alt={name} fill priority className="object-cover" sizes="100vw" />
                    ) : (
                        <div className="w-full h-full" style={{ background: `linear-gradient(160deg, ${coalLight}, ${ink})` }} />
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,9,8,0.85) 0%, rgba(10,9,8,0.1) 40%)" }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${ink} 0%, rgba(10,9,8,0.15) 30%, transparent 55%)` }} />
                </div>

                {/* diagonal ember seam */}
                <div
                    className="absolute inset-y-0 hidden md:block"
                    style={{ left: "20%", width: "6px", background: emberGradient, transform: "skewX(-8deg)" }}
                />

                <div className="relative z-10 flex flex-col justify-end min-h-[94vh] px-6 md:px-16 pb-20 pt-32">
                    <div className="max-w-3xl">
                        {(artist.city || artist.state) && (
                            <div className="flex items-center gap-2 mb-5">
                                <MapPin size={14} color={emberMid} />
                                <p className="text-xs uppercase font-bold tracking-widest" style={{ color: emberMid, letterSpacing: "0.2em" }}>
                                    {[artist.city, artist.state].filter(Boolean).join(", ")}
                                </p>
                            </div>
                        )}
                        <h1
                            className="uppercase leading-[0.88] mb-6 break-words"
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 10vw, 7.5rem)", color: "#f6f1e8" }}
                        >
                            {name}
                        </h1>
                        {(artist.artistTagline || artist.artStyle) && (
                            <p className="text-lg md:text-xl leading-relaxed mb-9 max-w-xl" style={{ color: "#d8cfc4" }}>
                                {artist.artistTagline ?? `${artist.artStyle}${artist.medium ? ` — ${artist.medium}` : ""}`}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/artworks`}
                                className="group relative inline-flex items-center gap-2 px-8 py-4 uppercase text-sm font-bold tracking-widest overflow-hidden"
                                style={{ letterSpacing: "0.1em", color: ink }}
                            >
                                <span className="absolute inset-0" style={{ background: emberGradientSteep }} />
                                <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ backgroundColor: "#f6f1e8" }} />
                                <span className="relative flex items-center gap-2">
                                    View the Work <ArrowRight size={16} />
                                </span>
                            </Link>
                            <Link
                                href={`/about`}
                                className="inline-flex items-center px-8 py-4 uppercase text-sm font-bold tracking-widest border-2 transition-colors duration-300 hover:bg-[#f6f1e8] hover:text-[#0a0908]"
                                style={{ letterSpacing: "0.1em", borderColor: "#f6f1e8", color: "#f6f1e8" }}
                            >
                                The Artist
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {tickerItems.length > 0 && <Marquee items={tickerItems} />}

            {/* ── Quick Facts ──────────────────────────────────────────── */}
            {facts.length > 0 && (
                <section className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {facts.map((f, i) => (
                            <Reveal key={f.label} delayMs={i * 80}>
                                <div>
                                    <p
                                        className="leading-none mb-1"
                                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4vw,3.2rem)", ...gradientTextStyle() }}
                                    >
                                        {f.n}
                                    </p>
                                    <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: smoke, letterSpacing: "0.14em" }}>
                                        {f.label}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Featured Works — layered asymmetric grid ────────────────── */}
            {featured.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32">
                    <Reveal>
                        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
                            <h2 className="uppercase leading-none" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#f6f1e8" }}>
                                Selected Works
                            </h2>
                            <Link href="/artworks" className="text-sm uppercase font-bold tracking-widest flex items-center gap-2 pb-1 border-b-2" style={{ color: emberMid, borderColor: emberMid, letterSpacing: "0.1em" }}>
                                Full Collection <ArrowRight size={15} />
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
                        {featured.map((artwork, i) => {
                            const img = getProductImageUrl(artwork);
                            const big = i === 0;
                            const tilt = i % 3 === 1 ? "md:group-hover:-rotate-1" : i % 3 === 2 ? "md:group-hover:rotate-1" : "";
                            return (
                                <Reveal key={artwork.id} delayMs={i * 70} className={big ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-3"}>
                                    <Link href={`/artworks/${artwork.slug ?? artwork.id}`} className="group block h-full">
                                        <div
                                            className={`relative overflow-hidden mb-4 transition-transform duration-300 ${tilt}`}
                                            style={{ backgroundColor: coal }}
                                        >
                                            <div className="relative w-full" style={{ aspectRatio: big ? "4 / 5" : "5 / 4" }}>
                                                {img ? (
                                                    <Image
                                                        src={img}
                                                        alt={artwork.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                                        sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                                                    />
                                                ) : null}
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{ background: "linear-gradient(0deg, rgba(10,9,8,0.75) 0%, transparent 55%)" }}
                                                />
                                                {artwork.status === "sold" && (
                                                    <div
                                                        className="absolute top-0 left-0 px-4 py-2 text-xs font-bold uppercase tracking-widest"
                                                        style={{ background: emberGradient, color: ink, letterSpacing: "0.1em" }}
                                                    >
                                                        Sold
                                                    </div>
                                                )}
                                                <div className="absolute left-4 bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                    <p className="text-sm font-bold" style={{ color: "#f6f1e8" }}>
                                                        {artwork.status === "sold" ? "Sold" : `$${artwork.price.toLocaleString()}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-base mb-1" style={{ color: "#f6f1e8" }}>{artwork.title}</p>
                                        {artwork.medium && <p className="text-xs uppercase tracking-wide" style={{ color: smokeDark }}>{artwork.medium}</p>}
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ── Artist Statement ─────────────────────────────────────── */}
            {(artist.artistStatement || (artist.bio && !artist.artistStatement)) && (
                <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: coal }}>
                    <p
                        className="absolute -top-10 left-4 md:left-16 select-none pointer-events-none leading-none"
                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(8rem,22vw,16rem)", color: "rgba(255,255,255,0.04)" }}
                        aria-hidden
                    >
                        &ldquo;
                    </p>
                    <Reveal className="relative max-w-4xl mx-auto px-6 md:px-16 text-center">
                        <p
                            className="leading-snug mb-8"
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem,3.6vw,2.8rem)", color: "#f6f1e8" }}
                        >
                            {(artist.artistStatement ?? artist.bio!).length > 340
                                ? `${(artist.artistStatement ?? artist.bio!).slice(0, 340).trim()}…`
                                : artist.artistStatement ?? artist.bio}
                        </p>
                        <p className="text-sm uppercase font-bold tracking-widest" style={{ color: emberMid, letterSpacing: "0.16em" }}>
                            &mdash; {name}
                        </p>
                    </Reveal>
                </section>
            )}

            {/* ── Next Show / Event highlight ──────────────────────────── */}
            {nextEvent && (
                <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
                    <Reveal>
                        <div className="flex items-center gap-3 mb-8">
                            <Flame size={18} color={emberMid} />
                            <p className="text-xs uppercase font-bold tracking-widest" style={{ color: emberMid, letterSpacing: "0.18em" }}>
                                Next Up
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-center">
                            {(nextEvent.imageUrl ?? nextEvent.image) && (
                                <div className="md:col-span-2 relative aspect-[4/3] overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)" }}>
                                    <Image src={(nextEvent.imageUrl ?? nextEvent.image)!} alt={nextEvent.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                                </div>
                            )}
                            <div className={nextEvent.imageUrl ?? nextEvent.image ? "md:col-span-3" : "md:col-span-5"}>
                                {(nextEvent.startDate ?? nextEvent.date) && (
                                    <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: smoke }}>
                                        {nextEvent.startDate ?? nextEvent.date}
                                        {nextEvent.endDate ? ` – ${nextEvent.endDate}` : ""}
                                    </p>
                                )}
                                <h3 className="uppercase leading-tight mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "#f6f1e8" }}>
                                    {nextEvent.title}
                                </h3>
                                <p className="text-sm mb-4" style={{ color: smoke }}>{nextEvent.location}</p>
                                {nextEvent.description && (
                                    <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "#d8cfc4" }}>{nextEvent.description}</p>
                                )}
                                {nextEvent.url && (
                                    <a
                                        href={nextEvent.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest pb-1 border-b-2"
                                        style={{ color: emberMid, borderColor: emberMid, letterSpacing: "0.1em" }}
                                    >
                                        Details <ArrowRight size={15} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </section>
            )}

            {/* ── From the Studio ──────────────────────────────────────── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="py-24" style={{ backgroundColor: coal }}>
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <Reveal>
                            <h2 className="uppercase leading-none mb-12" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "#f6f1e8" }}>
                                From the Studio
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                            {artist.studioImages.slice(0, 3).map((img, i) => (
                                <Reveal key={i} delayMs={i * 90}>
                                    <div
                                        className={`relative aspect-[4/5] overflow-hidden ${i === 1 ? "sm:mt-8" : ""}`}
                                        style={{ backgroundColor: coalLight }}
                                    >
                                        <Image src={img} alt={`Studio view ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Reviews ──────────────────────────────────────────────── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
                    <Reveal>
                        <h2 className="uppercase leading-none mb-12" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "#f6f1e8" }}>
                            Word on the Street
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {artist.reviews.slice(0, 4).map((review, i) => (
                            <Reveal key={i} delayMs={i * 80}>
                                <div className="relative p-8 h-full" style={{ backgroundColor: coal, borderLeft: `3px solid ${i % 2 === 0 ? emberMid : emberDeep}` }}>
                                    <p className="text-base leading-relaxed mb-6" style={{ color: "#e8dfd4" }}>
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <p className="text-sm font-bold uppercase tracking-wide" style={{ color: "#f6f1e8" }}>{review.author}</p>
                                    {review.role && <p className="text-xs mt-0.5" style={{ color: smokeDark }}>{review.role}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Closing CTA ──────────────────────────────────────────── */}
            <section className="relative py-24 md:py-32 overflow-hidden text-center" style={{ background: emberGradientSteep }}>
                <Reveal className="relative max-w-2xl mx-auto px-6">
                    <h2 className="uppercase leading-[0.9] mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,6vw,4.5rem)", color: ink }}>
                        Own a piece of the fire
                    </h2>
                    <Link
                        href="/artworks"
                        className="inline-flex items-center gap-2 px-9 py-4 uppercase text-sm font-bold tracking-widest transition-transform duration-300 hover:scale-[1.04]"
                        style={{ backgroundColor: ink, color: "#f6f1e8", letterSpacing: "0.1em" }}
                    >
                        Browse the Collection <ArrowRight size={16} />
                    </Link>
                </Reveal>
            </section>
        </div>
    );
}

function gradientTextStyle(): React.CSSProperties {
    return {
        backgroundImage: emberGradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
    };
}
