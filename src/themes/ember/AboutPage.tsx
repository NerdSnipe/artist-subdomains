import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import { ink, coal, coalLight, smoke, smokeDark, emberMid, emberDeep, emberGradient } from "./palette";

export default function EmberAbout({ artist, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const photo = artist.bioPhoto ?? artist.profilePhoto ?? null;

    const tagItems = [artist.artStyle, artist.secondaryArtStyle, artist.medium, artist.secondaryMedium].filter(
        (v): v is string => !!v
    );

    return (
        <div style={{ backgroundColor: ink }}>
            {/* ── Intro ────────────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
                    {photo && (
                        <div className="md:col-span-2">
                            <div
                                className="relative aspect-[3/4] overflow-hidden"
                                style={{ backgroundColor: coal, clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
                            >
                                <Image src={photo} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                            </div>
                        </div>
                    )}

                    <div className={photo ? "md:col-span-3" : "md:col-span-5"}>
                        {(artist.city || artist.state || artist.country) && (
                            <p className="text-xs uppercase font-bold tracking-widest mb-5" style={{ color: emberMid, letterSpacing: "0.18em" }}>
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        )}
                        <h1 className="uppercase leading-[0.9] mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,6vw,4.4rem)", color: "#f6f1e8" }}>
                            {name}
                        </h1>

                        {artist.bio && (
                            <div className="text-base leading-loose whitespace-pre-line mb-8" style={{ color: "#d8cfc4" }}>
                                {artist.bio}
                            </div>
                        )}

                        {tagItems.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {tagItems.map((t, i) => (
                                    <span key={i} className="text-xs uppercase font-bold tracking-wide px-3 py-1.5" style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#e8dfd4" }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        {artist.artistStatement && (
                            <blockquote className="pl-6 py-1 my-8" style={{ borderLeft: `3px solid ${emberMid}` }}>
                                <p className="text-xl leading-relaxed" style={{ fontFamily: "var(--font-display)", color: "#f6f1e8" }}>
                                    &ldquo;{artist.artistStatement}&rdquo;
                                </p>
                                <cite className="block mt-4 text-xs uppercase font-bold tracking-widest not-italic" style={{ color: smokeDark, letterSpacing: "0.1em" }}>
                                    {name}, Artist Statement
                                </cite>
                            </blockquote>
                        )}

                        {artist.studioProcessDescription && (
                            <div className="mt-8">
                                <p className="text-xs uppercase font-bold tracking-widest mb-3" style={{ color: emberMid, letterSpacing: "0.16em" }}>
                                    Process
                                </p>
                                <p className="text-sm leading-loose" style={{ color: "#d8cfc4" }}>{artist.studioProcessDescription}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {tagItems.length > 0 && <Marquee items={tagItems} />}

            {/* ── Exhibitions Timeline ─────────────────────────────────── */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="py-24" style={{ backgroundColor: coal }}>
                    <div className="max-w-4xl mx-auto px-6 md:px-16">
                        <Reveal>
                            <h2 className="uppercase leading-none mb-14" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3rem)", color: "#f6f1e8" }}>
                                Exhibitions
                            </h2>
                        </Reveal>
                        <div className="relative pl-8" style={{ borderLeft: "2px solid rgba(255,255,255,0.12)" }}>
                            {artist.exhibitions.map((ex, i) => (
                                <Reveal key={i} delayMs={Math.min(i, 6) * 60}>
                                    <div className="relative mb-10 last:mb-0">
                                        <div
                                            className="absolute -left-[2.15rem] top-1.5 w-3.5 h-3.5 rotate-45"
                                            style={{ background: emberGradient }}
                                        />
                                        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                                            <span
                                                className="text-lg font-bold"
                                                style={{ fontFamily: "var(--font-display)", color: emberMid }}
                                            >
                                                {ex.year}
                                            </span>
                                            {ex.type && (
                                                <span className="text-xs uppercase font-bold tracking-widest" style={{ color: smokeDark, letterSpacing: "0.12em" }}>
                                                    {ex.type}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-base font-semibold mt-1" style={{ color: "#f6f1e8" }}>{ex.title}</p>
                                        {ex.location && <p className="text-sm mt-0.5" style={{ color: smoke }}>{ex.location}</p>}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Publications ─────────────────────────────────────────── */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6 md:px-16">
                        <Reveal>
                            <h2 className="uppercase leading-none mb-14" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3rem)", color: "#f6f1e8" }}>
                                Press &amp; Publications
                            </h2>
                        </Reveal>
                        <div className="space-y-6">
                            {artist.publications.map((pub, i) => (
                                <div key={i} className="flex gap-8 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                                    <span className="text-sm font-bold w-14 shrink-0 pt-0.5" style={{ color: emberMid }}>{pub.year}</span>
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: "#f6f1e8" }}>{pub.title}</p>
                                        {pub.publication && <p className="text-xs mt-1 uppercase tracking-wide" style={{ color: smokeDark }}>{pub.publication}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Gallery Representation ───────────────────────────────── */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="py-24" style={{ backgroundColor: coal }}>
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <Reveal>
                            <h2 className="uppercase leading-none mb-14" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3rem)", color: "#f6f1e8" }}>
                                Gallery Representation
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {artist.galleries.map((g, i) => (
                                <Reveal key={i} delayMs={(i % 3) * 80}>
                                    <div className="p-6" style={{ backgroundColor: coalLight, borderTop: `3px solid ${i % 2 === 0 ? emberMid : emberDeep}` }}>
                                        {g.photo && (
                                            <div className="relative aspect-video mb-4 overflow-hidden">
                                                <Image src={g.photo} alt={g.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                                            </div>
                                        )}
                                        {(g.link || g.url) ? (
                                            <a href={g.link ?? g.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-base transition-opacity duration-200 hover:opacity-70" style={{ color: "#f6f1e8" }}>
                                                {g.name}
                                            </a>
                                        ) : (
                                            <p className="font-semibold text-base" style={{ color: "#f6f1e8" }}>{g.name}</p>
                                        )}
                                        {(g.city || g.state) && (
                                            <p className="text-xs mt-1" style={{ color: smokeDark }}>{[g.city, g.state].filter(Boolean).join(", ")}</p>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Events ───────────────────────────────────────────────── */}
            {artist.events && artist.events.length > 0 && (
                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6 md:px-16">
                        <Reveal>
                            <h2 className="uppercase leading-none mb-14" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3rem)", color: "#f6f1e8" }}>
                                Upcoming Events
                            </h2>
                        </Reveal>
                        <div className="space-y-6">
                            {artist.events.map((event, i) => {
                                const eventImg = event.imageUrl ?? event.image ?? null;
                                const dateStr = event.startDate ?? event.date ?? null;
                                return (
                                    <Reveal key={i} delayMs={(i % 4) * 70}>
                                        <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6" style={{ backgroundColor: coal }}>
                                            {eventImg && (
                                                <div className="relative w-full sm:w-28 h-40 sm:h-28 shrink-0 overflow-hidden">
                                                    <Image src={eventImg} alt={event.title} fill className="object-cover" sizes="112px" />
                                                </div>
                                            )}
                                            <div>
                                                {dateStr && (
                                                    <p className="text-xs uppercase font-bold tracking-widest mb-1" style={{ color: emberMid, letterSpacing: "0.12em" }}>{dateStr}</p>
                                                )}
                                                <p className="text-base font-semibold mb-1" style={{ color: "#f6f1e8" }}>{event.title}</p>
                                                <p className="text-sm mb-2" style={{ color: smoke }}>{event.location}</p>
                                                {event.description && <p className="text-sm leading-relaxed" style={{ color: "#d8cfc4" }}>{event.description}</p>}
                                                {event.url && (
                                                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs font-bold uppercase tracking-widest pb-0.5 border-b-2" style={{ color: emberMid, borderColor: emberMid, letterSpacing: "0.08em" }}>
                                                        Learn More →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
