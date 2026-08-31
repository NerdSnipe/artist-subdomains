import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import RevealOnScroll from "./RevealOnScroll";
import { sortByDateDesc } from "@/lib/cv-sort";

const MONO = "'IBM Plex Mono', monospace";
const CORMORANT = "'Cormorant Garamond', serif";
const BASKERVILLE = "'Libre Baskerville', serif";

export default function ChronicleAboutPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");
    const coverPhoto = artist.coverPhoto ?? artist.profilePhoto ?? null;

    const socials: { platform: string; handle: string; href: string }[] = [
        artist.instagram ? { platform: "Instagram", handle: `@${artist.instagram.replace("@", "")}`, href: `https://instagram.com/${artist.instagram.replace("@", "")}` } : null,
        artist.facebook ? { platform: "Facebook", handle: artist.facebook, href: artist.facebook.startsWith("http") ? artist.facebook : `https://facebook.com/${artist.facebook}` } : null,
        artist.twitter ? { platform: "X / Twitter", handle: `@${artist.twitter.replace("@", "")}`, href: `https://twitter.com/${artist.twitter.replace("@", "")}` } : null,
        artist.tiktok ? { platform: "TikTok", handle: `@${artist.tiktok.replace("@", "")}`, href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}` } : null,
        artist.pinterest ? { platform: "Pinterest", handle: artist.pinterest, href: artist.pinterest.startsWith("http") ? artist.pinterest : `https://pinterest.com/${artist.pinterest}` } : null,
        artist.youtube ? { platform: "YouTube", handle: artist.youtube, href: artist.youtube.startsWith("http") ? artist.youtube : `https://youtube.com/${artist.youtube}` } : null,
        artist.linkedin ? { platform: "LinkedIn", handle: artist.linkedin, href: artist.linkedin.startsWith("http") ? artist.linkedin : `https://linkedin.com/in/${artist.linkedin}` } : null,
    ].filter((s): s is { platform: string; handle: string; href: string } => s !== null);

    return (
        <div style={{ backgroundColor: "#faf8f5" }}>
            {/* ── Full-Bleed Chapter Opener ─────────────────────────────────── */}
            <section
                className="relative overflow-hidden border-b border-stone-200"
                style={{ minHeight: "60vh" }}
            >
                {coverPhoto ? (
                    <Image
                        src={coverPhoto}
                        alt={name}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                ) : (
                    <div className="absolute inset-0" style={{ backgroundColor: "#1c1917" }} />
                )}
                <div
                    className="absolute inset-0"
                    style={{ background: "rgba(28,25,23,0.55)" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.6rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.5)",
                            marginBottom: "1.25rem",
                        }}
                    >
                        Artist Profile
                    </p>
                    <h1
                        style={{
                            fontFamily: CORMORANT,
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(3rem, 9vw, 8rem)",
                            color: "#faf8f5",
                            lineHeight: 1.0,
                        }}
                    >
                        {name}
                    </h1>
                    {location && (
                        <p
                            className="mt-4"
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.62rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.45)",
                            }}
                        >
                            {location}
                        </p>
                    )}
                </div>
            </section>

            {/* ── Bio Section ───────────────────────────────────────────────── */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                        {/* Left: Bio text — editorial 2-column where long enough */}
                        <RevealOnScroll>
                            <div>
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
                                    Biography
                                </p>
                                {artist.bio ? (
                                    <div
                                        style={{
                                            fontFamily: BASKERVILLE,
                                            fontSize: "0.95rem",
                                            lineHeight: 1.9,
                                            color: "#3d3733",
                                        }}
                                    >
                                        <p className="whitespace-pre-line">{artist.bio}</p>
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            fontFamily: CORMORANT,
                                            fontStyle: "italic",
                                            fontSize: "1.3rem",
                                            color: "#9ca3af",
                                        }}
                                    >
                                        No biography provided.
                                    </p>
                                )}
                            </div>
                        </RevealOnScroll>

                        {/* Right: Photo + social links */}
                        <div className="flex flex-col gap-10">
                            {(artist.bioPhoto ?? artist.profilePhoto) && (
                                <RevealOnScroll delay={100}>
                                    <div
                                        className="relative overflow-hidden"
                                        style={{ aspectRatio: "3/4", maxWidth: "360px" }}
                                    >
                                        <Image
                                            src={(artist.bioPhoto ?? artist.profilePhoto)!}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                            sizes="360px"
                                        />
                                    </div>
                                </RevealOnScroll>
                            )}

                            {socials.length > 0 && (
                                <RevealOnScroll delay={150}>
                                    <div>
                                        <p
                                            className="mb-4"
                                            style={{
                                                fontFamily: MONO,
                                                fontSize: "0.58rem",
                                                letterSpacing: "0.18em",
                                                textTransform: "uppercase",
                                                color: "#9ca3af",
                                            }}
                                        >
                                            Follow
                                        </p>
                                        <div className="flex flex-col gap-2.5">
                                            {socials.map((s) => (
                                                <a
                                                    key={s.platform}
                                                    href={s.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        fontFamily: CORMORANT,
                                                        fontStyle: "italic",
                                                        fontSize: "1.05rem",
                                                        color: "#1c1917",
                                                        textDecoration: "none",
                                                    }}
                                                    className="hover:text-[#6b7c6d] transition-colors"
                                                >
                                                    {s.platform}{" "}
                                                    <span style={{ color: "#6b7c6d", fontStyle: "normal" }}>→</span>{" "}
                                                    {s.handle}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Exhibition History ────────────────────────────────────────── */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="py-16 md:py-20 border-t border-stone-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <RevealOnScroll>
                            <p
                                className="mb-10"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#6b7c6d",
                                }}
                            >
                                Exhibition History
                            </p>
                        </RevealOnScroll>

                        <div>
                            {sortByDateDesc(artist.exhibitions, (ex) => ex.year).map((ex, i) => (
                                <RevealOnScroll key={i} delay={i * 60}>
                                    <div
                                        className="grid grid-cols-12 gap-4 py-6 border-b border-stone-100"
                                    >
                                        {/* Year — large sage */}
                                        <div className="col-span-3 md:col-span-2">
                                            <span
                                                style={{
                                                    fontFamily: CORMORANT,
                                                    fontSize: "2.2rem",
                                                    fontWeight: 300,
                                                    color: "#6b7c6d",
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {ex.year}
                                            </span>
                                        </div>

                                        <div className="col-span-7 md:col-span-8 flex flex-col justify-center">
                                            <p
                                                style={{
                                                    fontFamily: BASKERVILLE,
                                                    fontSize: "0.95rem",
                                                    color: "#1c1917",
                                                    marginBottom: "0.25rem",
                                                }}
                                            >
                                                {ex.title}
                                            </p>
                                            {ex.location && (
                                                <p
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.6rem",
                                                        letterSpacing: "0.1em",
                                                        textTransform: "uppercase",
                                                        color: "#9ca3af",
                                                    }}
                                                >
                                                    {ex.location}
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-span-2 flex justify-end items-start pt-1">
                                            {ex.type && (
                                                <span
                                                    className="px-2 py-0.5 border"
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.55rem",
                                                        letterSpacing: "0.14em",
                                                        textTransform: "uppercase",
                                                        borderColor: "#d4cfc9",
                                                        color: "#9ca3af",
                                                    }}
                                                >
                                                    {ex.type === "solo" ? "Solo" : "Group"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Publications ──────────────────────────────────────────────── */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="py-16 md:py-20 border-t border-stone-200">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <RevealOnScroll>
                            <p
                                className="mb-10"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#6b7c6d",
                                }}
                            >
                                Publications &amp; Press
                            </p>
                        </RevealOnScroll>
                        {sortByDateDesc(artist.publications, (pub) => pub.date).map((pub, i) => (
                            <RevealOnScroll key={i} delay={i * 50}>
                                <div className="flex gap-6 py-5 border-b border-stone-100">
                                    <span
                                        style={{
                                            fontFamily: CORMORANT,
                                            fontSize: "1.6rem",
                                            fontWeight: 300,
                                            color: "#6b7c6d",
                                            width: "4rem",
                                            flexShrink: 0,
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {pub.date}
                                    </span>
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: BASKERVILLE,
                                                fontSize: "0.92rem",
                                                color: "#1c1917",
                                            }}
                                        >
                                            {pub.title}
                                        </p>
                                        {pub.description && (
                                            <p
                                                style={{
                                                    fontFamily: BASKERVILLE,
                                                    fontStyle: "italic",
                                                    fontSize: "0.82rem",
                                                    color: "#6b7c6d",
                                                    marginTop: "0.2rem",
                                                }}
                                            >
                                                {pub.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Gallery Representation ────────────────────────────────────── */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="py-16 md:py-20 border-t border-stone-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <RevealOnScroll>
                            <p
                                className="mb-10"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#6b7c6d",
                                }}
                            >
                                Gallery Representation
                            </p>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {artist.galleries.map((g, i) => (
                                <RevealOnScroll key={i} delay={i * 60}>
                                    <div className="border border-stone-200 p-5">
                                        {g.photo && (
                                            <div
                                                className="relative overflow-hidden mb-4"
                                                style={{ aspectRatio: "3/2" }}
                                            >
                                                <Image src={g.photo} alt={g.name} fill className="object-cover" sizes="300px" />
                                            </div>
                                        )}
                                        <p
                                            style={{
                                                fontFamily: BASKERVILLE,
                                                fontSize: "0.92rem",
                                                color: "#1c1917",
                                                marginBottom: "0.25rem",
                                            }}
                                        >
                                            {(g.link ?? g.url) ? (
                                                <a
                                                    href={g.link ?? g.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-[#6b7c6d] transition-colors"
                                                    style={{ textDecoration: "none", color: "inherit" }}
                                                >
                                                    {g.name}
                                                </a>
                                            ) : g.name}
                                        </p>
                                        {(g.city || g.state) && (
                                            <p
                                                style={{
                                                    fontFamily: MONO,
                                                    fontSize: "0.58rem",
                                                    letterSpacing: "0.12em",
                                                    textTransform: "uppercase",
                                                    color: "#9ca3af",
                                                }}
                                            >
                                                {[g.city, g.state].filter(Boolean).join(", ")}
                                            </p>
                                        )}
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Studio Images ────────────────────────────────────────────── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="py-16 md:py-20 border-t border-stone-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <RevealOnScroll>
                            <p
                                className="mb-8"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#6b7c6d",
                                }}
                            >
                                Studio
                            </p>
                        </RevealOnScroll>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {artist.studioImages.slice(0, 6).map((imgUrl, i) => (
                                <RevealOnScroll key={i} delay={i * 50}>
                                    <div
                                        className={`relative overflow-hidden ${i === 0 ? "col-span-2 md:col-span-2" : ""}`}
                                        style={{ aspectRatio: i === 0 ? "16/9" : "1/1" }}
                                    >
                                        <Image
                                            src={imgUrl}
                                            alt={`${name} studio ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes={i === 0 ? "66vw" : "33vw"}
                                        />
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
