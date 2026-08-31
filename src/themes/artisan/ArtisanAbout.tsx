import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { StudioFrame } from "./decor";
import Reveal from "./Reveal";
import { sortByDateDesc } from "@/lib/cv-sort";

interface TimelineEntry {
    year: string;
    label: string;
    detail?: string;
    kind: "exhibition" | "publication";
}

export default function ArtisanAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    const craftTags = [artist.medium, artist.secondaryMedium, artist.artStyle, artist.secondaryArtStyle].filter(
        (v): v is string => Boolean(v)
    );

    const timeline: TimelineEntry[] = sortByDateDesc(
        [
            ...(artist.exhibitions ?? []).map((e) => ({
                year: e.year,
                label: e.title,
                detail: [e.type === "solo" ? "Solo" : e.type === "group" ? "Group" : null, e.location].filter(Boolean).join(" — "),
                kind: "exhibition" as const,
            })),
            ...(artist.publications ?? []).map((p) => ({
                year: p.date ?? "",
                label: p.title,
                detail: p.description,
                kind: "publication" as const,
            })),
        ],
        (entry) => entry.year
    );

    const studioImages = (artist.studioImages ?? []).slice(0, 4);

    return (
        <div className="bg-[var(--paper)]">
            {/* ---------- INTRO ---------- */}
            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-14">
                    {artist.bioPhoto && (
                        <Reveal className="md:col-span-2">
                            <StudioFrame rotate={-1.5} className="mx-auto w-full max-w-xs md:mx-0">
                                <div className="relative aspect-[3/4] w-full">
                                    <Image src={artist.bioPhoto} alt={name} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                                </div>
                            </StudioFrame>
                        </Reveal>
                    )}
                    <Reveal delay={80} className={artist.bioPhoto ? "md:col-span-3" : "md:col-span-5"}>
                        <p className="text-xl text-[var(--sage-dark)]" style={{ fontFamily: "var(--font-script)" }}>
                            the maker behind the work
                        </p>
                        <h1 className="text-4xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                            {name}
                        </h1>
                        {artist.city && (
                            <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--ink-soft)]">
                                <MapPin size={14} className="text-[var(--clay)]" />
                                {artist.city}
                                {artist.state ? `, ${artist.state}` : ""}
                            </p>
                        )}

                        {craftTags.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                                {craftTags.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-[var(--sage-dark)]/25 px-3 py-1 text-xs uppercase tracking-wide text-[var(--sage-dark)]"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        {artist.bio && (
                            <p className="mt-7 whitespace-pre-line text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
                                {artist.bio}
                            </p>
                        )}

                        {artist.artistStatement && (
                            <blockquote className="mt-8 border-l-2 border-[var(--clay)] pl-5 italic leading-relaxed text-[var(--ink)]">
                                &ldquo;{artist.artistStatement}&rdquo;
                            </blockquote>
                        )}
                    </Reveal>
                </div>
            </section>

            {/* ---------- PROCESS / STUDIO ---------- */}
            {(artist.studioProcessDescription || studioImages.length > 0) && (
                <section className="bg-[var(--sage)]/[0.14] py-16">
                    <div className="mx-auto max-w-6xl px-6">
                        <Reveal className="mb-10 max-w-2xl">
                            <h2 className="text-3xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                In the Studio
                            </h2>
                            {artist.studioProcessDescription && (
                                <p className="mt-4 whitespace-pre-line leading-relaxed text-[var(--ink-soft)]">
                                    {artist.studioProcessDescription}
                                </p>
                            )}
                        </Reveal>
                        {studioImages.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {studioImages.map((src, i) => (
                                    <Reveal key={src} delay={i * 90}>
                                        <StudioFrame rotate={i % 2 === 0 ? -1.5 : 1.5}>
                                            <div className="relative aspect-square w-full">
                                                <Image src={src} alt={`${name} studio, view ${i + 1}`} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
                                            </div>
                                        </StudioFrame>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ---------- TIMELINE: exhibitions + publications ---------- */}
            {timeline.length > 0 && (
                <section className="mx-auto max-w-3xl px-6 py-16">
                    <Reveal>
                        <h2 className="mb-10 text-3xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                            Exhibitions &amp; Press
                        </h2>
                    </Reveal>
                    <div className="space-y-0 divide-y divide-[var(--ink)]/10">
                        {timeline.map((entry, i) => (
                            <Reveal key={i} delay={Math.min(i * 40, 300)} className="flex gap-6 py-4">
                                <span className="w-14 shrink-0 pt-0.5 text-sm text-[var(--clay-dark)]">{entry.year}</span>
                                <div>
                                    <p className="text-[var(--ink)]">{entry.label}</p>
                                    {entry.detail && <p className="text-sm text-[var(--ink-soft)]">{entry.detail}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ---------- GALLERY REPRESENTATION ---------- */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="border-t border-[var(--ink)]/10 bg-[var(--sand)]/50 py-16">
                    <div className="mx-auto max-w-3xl px-6">
                        <Reveal>
                            <h2 className="mb-8 text-3xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                Represented By
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {artist.galleries.map((g, i) => (
                                <Reveal key={i} delay={i * 60} className="border border-[var(--ink)]/10 bg-[var(--paper)] p-5">
                                    {g.link || g.url ? (
                                        <a
                                            href={g.link ?? g.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-[var(--ink)] underline-offset-4 hover:text-[var(--clay-dark)] hover:underline"
                                        >
                                            {g.name} <ExternalLink size={13} />
                                        </a>
                                    ) : (
                                        <p className="text-[var(--ink)]">{g.name}</p>
                                    )}
                                    {(g.city || g.state) && (
                                        <p className="mt-1 text-sm text-[var(--ink-soft)]">{[g.city, g.state].filter(Boolean).join(", ")}</p>
                                    )}
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- STUDIO LOCATIONS ---------- */}
            {artist.studioLocations && artist.studioLocations.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-3xl px-6">
                        <Reveal>
                            <h2 className="mb-8 text-3xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                Visit the Studio
                            </h2>
                        </Reveal>
                        <div className="space-y-5">
                            {artist.studioLocations.map((loc, i) => (
                                <Reveal key={i} delay={i * 60} className="flex items-start gap-3">
                                    <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--clay)]" />
                                    <div>
                                        {loc.name && <p className="text-[var(--ink)]">{loc.name}</p>}
                                        <p className="text-sm text-[var(--ink-soft)]">
                                            {loc.address}, {loc.city}, {loc.state} {loc.zipCode ?? ""}
                                        </p>
                                        {loc.directionsUrl && (
                                            <a
                                                href={loc.directionsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--clay-dark)] underline-offset-4 hover:underline"
                                            >
                                                Get directions <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- BOOK ---------- */}
            {artist.book && (
                <section className="border-t border-[var(--ink)]/10 bg-[var(--sand)]/50 py-16">
                    <Reveal className="mx-auto grid max-w-3xl grid-cols-1 gap-8 px-6 sm:grid-cols-[auto_1fr] sm:items-center">
                        <StudioFrame rotate={-1.5} className="mx-auto w-40">
                            <div className="relative aspect-[3/4] w-full">
                                <Image src={artist.book.imageUrl} alt={artist.book.title} fill sizes="160px" className="object-cover" />
                            </div>
                        </StudioFrame>
                        <div>
                            <p className="text-sm uppercase tracking-wide text-[var(--sage-dark)]">Published Work</p>
                            <h3 className="mt-1 text-2xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                {artist.book.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{artist.book.description}</p>
                            {artist.book.purchaseUrl && (
                                <a
                                    href={artist.book.purchaseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--clay-dark)] underline-offset-4 hover:underline"
                                >
                                    {artist.book.purchaseLabel ?? "Get the book"} <ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </Reveal>
                </section>
            )}

            <div className="py-4" />
            <div className="mx-auto max-w-3xl px-6 pb-16 text-center">
                <Link href="/contact" className="text-sm text-[var(--clay-dark)] underline-offset-4 hover:underline">
                    Get in touch →
                </Link>
            </div>
        </div>
    );
}
