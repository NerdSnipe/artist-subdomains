import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import DynamicColorProvider from "./DynamicColorProvider";

export default function VividAboutPage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

    const activeWorks = artworks.filter((a) => a.status !== "inactive");
    const accent = activeWorks.find((a) => a.status === "active")?.dominantColors?.[0]?.hex ?? "#FF4D00";

    const coverPhoto = artist.coverPhoto ?? artist.profilePhoto ?? null;

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div>
            <DynamicColorProvider accent={accent} />

            {/* ── Header: full-bleed black band with artist name ───────────── */}
            <section className="relative bg-[#111] overflow-hidden">
                {coverPhoto && (
                    <div className="absolute inset-0">
                        <Image
                            src={coverPhoto}
                            alt={name}
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                    </div>
                )}
                <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
                        Artist Profile
                    </p>
                    <h1
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                        className="text-6xl md:text-9xl font-bold text-white leading-[0.9] mb-4"
                    >
                        {name}
                    </h1>
                    {location && (
                        <p className="text-sm font-bold tracking-widest uppercase text-white/40 mt-4">
                            {location}
                        </p>
                    )}
                </div>
            </section>

            {/* ── Bio ─────────────────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
                    {/* Profile photo */}
                    {(artist.bioPhoto ?? artist.profilePhoto) && (
                        <div className="md:col-span-4">
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border-4 border-black">
                                <Image
                                    src={(artist.bioPhoto ?? artist.profilePhoto)!}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className={`${(artist.bioPhoto ?? artist.profilePhoto) ? "md:col-span-8" : "md:col-span-12"}`}>
                        {artist.artistStatement && (
                            <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "var(--accent)" }}>
                                <p
                                    style={{ fontFamily: "'DM Serif Display', serif" }}
                                    className="text-2xl md:text-3xl font-bold italic text-[#111] leading-snug"
                                >
                                    &ldquo;{artist.artistStatement.slice(0, 300)}
                                    {artist.artistStatement.length > 300 ? "…" : ""}&rdquo;
                                </p>
                            </div>
                        )}

                        {artist.bio && (
                            <div className="mb-10">
                                <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">
                                    Biography
                                </p>
                                <p
                                    className="text-[1.05rem] text-neutral-700 leading-[1.8] whitespace-pre-line"
                                >
                                    {artist.bio}
                                </p>
                            </div>
                        )}

                        {socials.length > 0 && (
                            <div className="border-t-2 border-black pt-6">
                                <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4">Follow</p>
                                <div className="flex flex-wrap gap-4">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold tracking-widest uppercase text-[#111] hover:opacity-60 transition-opacity"
                                        >
                                            {s.label} →
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Exhibition timeline ──────────────────────────────────────── */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="border-t-4 border-black">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
                        <p className="text-xs font-bold tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
                            Exhibitions
                        </p>
                        <div>
                            {artist.exhibitions.map((ex, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-12 gap-4 py-6 border-b border-neutral-100"
                                >
                                    <div className="col-span-3 md:col-span-2">
                                        <span
                                            style={{ fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}
                                            className="text-4xl md:text-5xl font-bold leading-none"
                                        >
                                            {ex.year}
                                        </span>
                                    </div>
                                    <div className="col-span-9 md:col-span-7 flex flex-col justify-center">
                                        <p
                                            style={{ fontFamily: "'DM Serif Display', serif" }}
                                            className="text-xl font-bold text-[#111] leading-tight"
                                        >
                                            {ex.title}
                                        </p>
                                        {ex.location && (
                                            <p className="text-sm text-neutral-500 mt-1">{ex.location}</p>
                                        )}
                                    </div>
                                    <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
                                        {ex.type && (
                                            <span className="text-[10px] font-bold tracking-widest uppercase border-2 border-neutral-300 text-neutral-400 px-2 py-1">
                                                {ex.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Studio images with organic rotation ─────────────────────── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="border-t-4 border-black py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <p className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--accent)" }}>
                            Studio
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {artist.studioImages.slice(0, 6).map((imgUrl, i) => (
                                <div
                                    key={i}
                                    className="relative overflow-hidden bg-neutral-100"
                                    style={{
                                        aspectRatio: i === 0 ? "16/9" : "1",
                                        gridColumn: i === 0 ? "span 2" : undefined,
                                        transform: i % 2 === 1 ? "rotate(-1deg)" : i % 3 === 2 ? "rotate(0.5deg)" : "none",
                                    }}
                                >
                                    <Image
                                        src={imgUrl}
                                        alt={`${name} studio ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Events ──────────────────────────────────────────────────── */}
            {artist.events && artist.events.length > 0 && (
                <section className="border-t-4 border-black py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <p className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--accent)" }}>
                            Events
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {artist.events.slice(0, 6).map((event, i) => (
                                <div
                                    key={i}
                                    className="border-t-4 p-5"
                                    style={{ borderColor: "var(--accent)" }}
                                >
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-2">
                                        {event.date ?? event.startDate ?? "Upcoming"}
                                    </p>
                                    <p
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-xl font-bold text-[#111] leading-tight mb-1"
                                    >
                                        {event.title}
                                    </p>
                                    {event.location && (
                                        <p className="text-xs text-neutral-500 mb-2">{event.location}</p>
                                    )}
                                    {event.description && (
                                        <p className="text-xs text-neutral-400 leading-relaxed">
                                            {event.description.slice(0, 120)}
                                            {event.description.length > 120 ? "…" : ""}
                                        </p>
                                    )}
                                    {event.url && (
                                        <a
                                            href={event.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] font-bold tracking-widest uppercase mt-3 inline-block hover:opacity-60 transition-opacity"
                                            style={{ color: "var(--accent)" }}
                                        >
                                            Details →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Galleries ────────────────────────────────────────────────── */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="border-t-4 border-black py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <p className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--accent)" }}>
                            Gallery Representation
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {artist.galleries.map((g, i) => (
                                <div key={i} className="border-2 border-black p-5">
                                    {g.photo && (
                                        <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 mb-4">
                                            <Image src={g.photo} alt={g.name} fill className="object-cover" />
                                        </div>
                                    )}
                                    <p
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-xl font-bold text-[#111] mb-1"
                                    >
                                        {(g.link ?? g.url) ? (
                                            <a
                                                href={g.link ?? g.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:opacity-60 transition-opacity"
                                            >
                                                {g.name}
                                            </a>
                                        ) : g.name}
                                    </p>
                                    {(g.city || g.state) && (
                                        <p className="text-xs font-bold tracking-widest uppercase text-neutral-400">
                                            {[g.city, g.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Publications ─────────────────────────────────────────────── */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="border-t-4 border-black py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <p className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--accent)" }}>
                            Publications &amp; Press
                        </p>
                        <div className="space-y-0 max-w-3xl">
                            {artist.publications.map((pub, i) => (
                                <div key={i} className="flex gap-6 py-5 border-b border-neutral-100">
                                    <span
                                        style={{ fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}
                                        className="text-2xl font-bold w-16 shrink-0 pt-0.5"
                                    >
                                        {pub.year}
                                    </span>
                                    <div>
                                        <p
                                            style={{ fontFamily: "'DM Serif Display', serif" }}
                                            className="text-lg font-bold text-[#111]"
                                        >
                                            {pub.title}
                                        </p>
                                        {pub.publication && (
                                            <p className="text-sm text-neutral-500 italic mt-0.5">{pub.publication}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="py-16" style={{ backgroundColor: "var(--accent)" }}>
                <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
                    <h2
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Explore the Work
                    </h2>
                    <Link
                        href="/artworks"
                        className="inline-block bg-white text-[#111] text-sm font-bold tracking-widest uppercase px-10 py-4 hover:bg-[#111] hover:text-white transition-colors duration-150"
                    >
                        Browse All Works
                    </Link>
                </div>
            </section>
        </div>
    );
}
