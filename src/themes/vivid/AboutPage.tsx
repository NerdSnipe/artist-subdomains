import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { derivePalette } from "./color";
import DynamicColorProvider from "./DynamicColorProvider";
import HorizontalScrollStrip from "./HorizontalScrollStrip";
import Reveal from "./Reveal";
import { sortByDateDesc } from "@/lib/cv-sort";

export default function VividAboutPage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

    const activeWorks = artworks.filter((a) => a.status === "active");
    const initialPalette = derivePalette(activeWorks[0]?.dominantColors, activeWorks[0]?.id ?? artist.id);

    const coverPhoto = artist.coverPhoto ?? artist.profilePhoto ?? null;
    const profilePhoto = artist.bioPhoto ?? artist.profilePhoto ?? null;

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    const tags = [artist.artStyle, artist.secondaryArtStyle, artist.medium, artist.secondaryMedium].filter(
        (v): v is string => !!v
    );

    return (
        <DynamicColorProvider initialPalette={initialPalette}>
            <div>
                <section className="relative overflow-hidden" style={{ backgroundColor: "var(--v-ink)" }}>
                    {coverPhoto && (
                        <div className="absolute inset-0">
                            <Image src={coverPhoto} alt={name} fill className="object-cover opacity-25" priority />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--v-ink), rgba(8,8,11,0.5))" }} />
                        </div>
                    )}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(80% 60% at 10% 0%, var(--v-glow), transparent 60%)" }}
                    />
                    <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 py-24 md:py-36">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "var(--v-primary)" }}>
                            Artist Profile
                        </p>
                        <h1
                            style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                            className="text-6xl md:text-9xl uppercase leading-[0.88] mb-6"
                        >
                            {name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3">
                            {location && (
                                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(246,244,239,0.5)" }}>
                                    {location}
                                </span>
                            )}
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-bold tracking-widest uppercase border rounded-full px-3 py-1.5"
                                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--v-paper)" }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
                        {profilePhoto && (
                            <Reveal className="md:col-span-4">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--v-ink-soft)", boxShadow: "0 30px 60px -25px var(--v-glow)" }}>
                                    <Image src={profilePhoto} alt={name} fill className="object-cover" />
                                </div>
                            </Reveal>
                        )}

                        <Reveal delayMs={100} className={profilePhoto ? "md:col-span-8" : "md:col-span-12"}>
                            {artist.artistStatement && (
                                <div className="mb-8 pl-6 border-l-4" style={{ borderColor: "var(--v-primary)" }}>
                                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--v-paper)" }} className="text-2xl md:text-3xl leading-snug">
                                        &ldquo;{artist.artistStatement.slice(0, 320)}
                                        {artist.artistStatement.length > 320 ? "…" : ""}&rdquo;
                                    </p>
                                </div>
                            )}

                            {artist.bio && (
                                <div className="mb-10">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(246,244,239,0.4)" }}>
                                        Biography
                                    </p>
                                    <p className="text-[1.05rem] leading-[1.85] whitespace-pre-line" style={{ color: "rgba(246,244,239,0.75)" }}>
                                        {artist.bio}
                                    </p>
                                </div>
                            )}

                            {socials.length > 0 && (
                                <div className="border-t border-white/10 pt-6">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(246,244,239,0.4)" }}>Follow</p>
                                    <div className="flex flex-wrap gap-5">
                                        {socials.map((s) => (
                                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70" style={{ color: "var(--v-paper)" }}>
                                                {s.label} →
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Reveal>
                    </div>
                </section>

                {artist.studioProcessDescription && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "var(--v-primary)" }}>
                                    Process
                                </p>
                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--v-paper)" }} className="text-xl md:text-2xl leading-relaxed max-w-3xl">
                                    {artist.studioProcessDescription}
                                </p>
                            </Reveal>
                        </div>
                    </section>
                )}

                {artist.exhibitions && artist.exhibitions.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Exhibitions
                                </p>
                            </Reveal>
                            <div>
                                {sortByDateDesc(artist.exhibitions, (ex) => ex.year).map((ex, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="grid grid-cols-12 gap-4 py-6 border-b border-white/10">
                                            <div className="col-span-3 md:col-span-2">
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-3xl md:text-5xl leading-none">
                                                    {ex.year}
                                                </span>
                                            </div>
                                            <div className="col-span-9 md:col-span-7 flex flex-col justify-center">
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg md:text-xl leading-tight">
                                                    {ex.title}
                                                </p>
                                                {ex.location && <p className="text-sm mt-1" style={{ color: "rgba(246,244,239,0.5)" }}>{ex.location}</p>}
                                            </div>
                                            <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
                                                {ex.type && (
                                                    <span className="text-[10px] font-bold tracking-widest uppercase border rounded-full px-2.5 py-1" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(246,244,239,0.4)" }}>
                                                        {ex.type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.milestones && artist.milestones.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Milestones
                                </p>
                            </Reveal>
                            <div>
                                {sortByDateDesc(artist.milestones, (m) => m.date).map((m, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="grid grid-cols-12 gap-4 py-6 border-b border-white/10">
                                            <div className="col-span-3 md:col-span-2">
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-2xl md:text-3xl leading-none">
                                                    {m.date}
                                                </span>
                                            </div>
                                            <div className="col-span-9 md:col-span-10 flex flex-col justify-center">
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg md:text-xl leading-tight">
                                                    {m.title}
                                                </p>
                                                {m.description && <p className="text-sm mt-1" style={{ color: "rgba(246,244,239,0.5)" }}>{m.description}</p>}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.careerNotes && artist.careerNotes.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Career Notes
                                </p>
                            </Reveal>
                            <div>
                                {sortByDateDesc(artist.careerNotes, (n) => n.date).map((n, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="grid grid-cols-12 gap-4 py-6 border-b border-white/10">
                                            <div className="col-span-3 md:col-span-2">
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-2xl md:text-3xl leading-none">
                                                    {n.date}
                                                </span>
                                            </div>
                                            <div className="col-span-9 md:col-span-10 flex flex-col justify-center">
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg md:text-xl leading-tight">
                                                    {n.title}
                                                </p>
                                                {n.note && <p className="text-sm mt-1" style={{ color: "rgba(246,244,239,0.5)" }}>{n.note}</p>}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.achievements && artist.achievements.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Achievements
                                </p>
                            </Reveal>
                            <div>
                                {sortByDateDesc(artist.achievements, (a) => a.date).map((a, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="grid grid-cols-12 gap-4 py-6 border-b border-white/10">
                                            <div className="col-span-3 md:col-span-2">
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-2xl md:text-3xl leading-none">
                                                    {a.date}
                                                </span>
                                            </div>
                                            <div className="col-span-9 md:col-span-10 flex flex-col justify-center">
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg md:text-xl leading-tight">
                                                    {a.title}
                                                </p>
                                                {a.organization && (
                                                    <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--v-secondary)" }}>
                                                        {a.organization}
                                                    </p>
                                                )}
                                                {a.description && <p className="text-sm mt-1" style={{ color: "rgba(246,244,239,0.5)" }}>{a.description}</p>}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.trainings && artist.trainings.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Training
                                </p>
                            </Reveal>
                            <div>
                                {sortByDateDesc(artist.trainings, (t) => t.date).map((t, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="grid grid-cols-12 gap-4 py-6 border-b border-white/10">
                                            <div className="col-span-3 md:col-span-2">
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-2xl md:text-3xl leading-none">
                                                    {t.date}
                                                </span>
                                            </div>
                                            <div className="col-span-9 md:col-span-10 flex flex-col justify-center">
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg md:text-xl leading-tight">
                                                    {t.title}
                                                </p>
                                                {t.institution && (
                                                    <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--v-secondary)" }}>
                                                        {t.institution}
                                                    </p>
                                                )}
                                                {t.description && <p className="text-sm mt-1" style={{ color: "rgba(246,244,239,0.5)" }}>{t.description}</p>}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.miscEvents && artist.miscEvents.length > 0 && (
                    <section className="border-t border-white/10">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Misc
                                </p>
                            </Reveal>
                            <div>
                                {sortByDateDesc(artist.miscEvents, (e) => e.date).map((e, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="grid grid-cols-12 gap-4 py-6 border-b border-white/10">
                                            <div className="col-span-3 md:col-span-2">
                                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-primary)" }} className="text-2xl md:text-3xl leading-none">
                                                    {e.date}
                                                </span>
                                            </div>
                                            <div className="col-span-9 md:col-span-10 flex flex-col justify-center">
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg md:text-xl leading-tight">
                                                    {e.title}
                                                </p>
                                                {e.description && <p className="text-sm mt-1" style={{ color: "rgba(246,244,239,0.5)" }}>{e.description}</p>}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.studioImages && artist.studioImages.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-8">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "var(--v-primary)" }}>Studio</p>
                            </Reveal>
                        </div>
                        <Reveal delayMs={100}>
                            <HorizontalScrollStrip images={artist.studioImages} itemWidth={360} itemHeight={280} />
                        </Reveal>
                    </section>
                )}

                {artist.galleries && artist.galleries.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Gallery Representation
                                </p>
                            </Reveal>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {artist.galleries.map((g, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 60, 300)}>
                                        <div className="rounded-2xl p-6 border border-white/10" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                                            {g.photo && (
                                                <div className="relative aspect-[3/2] overflow-hidden rounded-xl mb-4">
                                                    <Image src={g.photo} alt={g.name} fill className="object-cover" />
                                                </div>
                                            )}
                                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg mb-1">
                                                {(g.link ?? g.url) ? (
                                                    <a href={g.link ?? g.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                                                        {g.name}
                                                    </a>
                                                ) : g.name}
                                            </p>
                                            {(g.city || g.state) && (
                                                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                    {[g.city, g.state].filter(Boolean).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.soldArtworks && artist.soldArtworks.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal className="mb-10">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--v-primary)" }}>
                                    Collected Works
                                </p>
                                <p className="text-base max-w-xl" style={{ color: "rgba(246,244,239,0.55)" }}>
                                    {artist.soldArtworksDescription ?? "A selection of previously sold, original pieces now in private collections."}
                                </p>
                            </Reveal>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {artist.soldArtworks.slice(0, 8).map((piece, i) => (
                                    <Reveal key={piece.id ?? i} delayMs={Math.min(i * 50, 300)}>
                                        <div>
                                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-2.5" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                                                <Image src={piece.image} alt={piece.title} fill className="object-cover" sizes="25vw" />
                                                <div className="absolute top-2.5 right-2.5 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md" style={{ backgroundColor: "rgba(8,8,11,0.7)", color: "var(--v-paper)" }}>
                                                    Sold
                                                </div>
                                            </div>
                                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-sm leading-tight">
                                                {piece.title}
                                            </p>
                                            {piece.year && (
                                                <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                    {piece.year}
                                                </p>
                                            )}
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.publications && artist.publications.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Publications &amp; Press
                                </p>
                            </Reveal>
                            <div className="max-w-3xl">
                                {sortByDateDesc(artist.publications, (pub) => pub.date).map((pub, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 50, 300)}>
                                        <div className="flex gap-6 py-5 border-b border-white/10">
                                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-secondary)" }} className="text-xl md:text-2xl w-16 shrink-0 pt-0.5">
                                                {pub.date}
                                            </span>
                                            <div>
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg">
                                                    {pub.title}
                                                </p>
                                                {pub.description && <p className="text-sm italic mt-0.5" style={{ color: "rgba(246,244,239,0.5)" }}>{pub.description}</p>}
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.blogPosts && artist.blogPosts.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Journal
                                </p>
                            </Reveal>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {artist.blogPosts.slice(0, 6).map((post, i) => {
                                    const content = (
                                        <div className="rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                                            {post.imageUrl && (
                                                <div className="relative aspect-[16/10]">
                                                    <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
                                                </div>
                                            )}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                    {post.date}
                                                </p>
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg leading-tight mb-2">
                                                    {post.title}
                                                </p>
                                                <p className="text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.55)" }}>
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                    return (
                                        <Reveal key={i} delayMs={Math.min(i * 60, 300)}>
                                            {post.externalUrl ? (
                                                <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full transition-transform hover:-translate-y-1">
                                                    {content}
                                                </a>
                                            ) : (
                                                content
                                            )}
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-16 md:py-24" style={{ background: "linear-gradient(135deg, var(--v-primary), var(--v-secondary))" }}>
                    <Reveal className="max-w-[1400px] mx-auto px-5 md:px-10 text-center">
                        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-on-primary)" }} className="text-4xl md:text-6xl uppercase mb-6">
                            Explore the Work
                        </h2>
                        <Link
                            href="/artworks"
                            className="inline-block text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-full transition-transform hover:-translate-y-0.5"
                            style={{ backgroundColor: "var(--v-ink)", color: "var(--v-paper)" }}
                        >
                            Browse All Works
                        </Link>
                    </Reveal>
                </section>
            </div>
        </DynamicColorProvider>
    );
}
