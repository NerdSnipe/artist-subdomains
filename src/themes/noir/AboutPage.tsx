import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";
import { sortByDateDesc } from "@/lib/cv-sort";

export default function NoirAboutPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const profileImg = artist.bioPhoto ?? artist.profilePhoto ?? null;

    return (
        <div className="bg-[#0d0d0d] min-h-screen">
            {/* Hero: profile photo, 50vh, heavy overlay, name huge */}
            <div className="relative h-[50vh] overflow-hidden">
                {profileImg ? (
                    <Image
                        src={profileImg}
                        alt={name}
                        fill
                        sizes="100vw"
                        className="object-cover object-top"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#111]" />
                )}

                {/* Heavy dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/30 via-[#0d0d0d]/50 to-[#0d0d0d]/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/60 via-transparent to-[#0d0d0d]/60" />

                {/* Film grain */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.05,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "180px 180px",
                    }}
                />

                {/* Name over photo */}
                <div className="absolute inset-0 flex items-end justify-center pb-10 z-10">
                    <div className="text-center">
                        <h1
                            className="text-5xl sm:text-7xl md:text-8xl font-thin tracking-[0.25em] uppercase text-[#e8e8e8] leading-none"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {name}
                        </h1>
                        {artist.artistTagline && (
                            <p
                                className="mt-4 text-sm tracking-[0.25em] italic text-[#a8884a]/80"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {artist.artistTagline}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
                {/* Bio — multi-column dark layout */}
                {artist.bio && (
                    <ScrollReveal className="mb-20">
                        <div className="flex items-center gap-6 mb-10">
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                            <h2
                                className="text-[8px] tracking-[0.6em] uppercase text-[#a8884a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Biography
                            </h2>
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                        </div>
                        <div
                            className="text-base leading-relaxed text-[#b0b0b0] font-light italic"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                columnCount: 1,
                            }}
                        >
                            {artist.bio.split("\n\n").map((para, i) => (
                                <p key={i} className="mb-5">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {/* Exhibitions — gold timeline */}
                {artist.exhibitions && artist.exhibitions.length > 0 && (
                    <ScrollReveal className="mb-20" delay={100}>
                        <div className="flex items-center gap-6 mb-12">
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                            <h2
                                className="text-[8px] tracking-[0.6em] uppercase text-[#a8884a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Exhibitions
                            </h2>
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                        </div>
                        <div className="relative pl-8">
                            {/* Gold vertical timeline line */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#a8884a]/50 via-[#a8884a]/20 to-transparent" />

                            <div className="space-y-10">
                                {sortByDateDesc(artist.exhibitions, (ex) => ex.year).map((ex, i) => (
                                    <div key={i} className="relative group">
                                        {/* Gold dot */}
                                        <div className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-[#a8884a]/60 group-hover:bg-[#a8884a] transition-colors duration-300 -translate-x-0.5" />

                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                                            <span
                                                className="text-[10px] tracking-[0.4em] uppercase text-[#a8884a] shrink-0 w-14"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                {ex.year}
                                            </span>
                                            <div>
                                                <p
                                                    className="text-sm italic text-[#e8e8e8] mb-0.5"
                                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                                >
                                                    {ex.title}
                                                </p>
                                                <p
                                                    className="text-[9px] tracking-[0.2em] uppercase text-[#5a5a5a]"
                                                    style={{ fontFamily: "'Courier New', monospace" }}
                                                >
                                                    {ex.location}
                                                    {ex.type && ` · ${ex.type}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* Publications */}
                {artist.publications && artist.publications.length > 0 && (
                    <ScrollReveal className="mb-20" delay={150}>
                        <div className="flex items-center gap-6 mb-12">
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                            <h2
                                className="text-[8px] tracking-[0.6em] uppercase text-[#a8884a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Publications
                            </h2>
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                        </div>
                        <div className="space-y-4">
                            {sortByDateDesc(artist.publications, (pub) => pub.date).map((pub, i) => (
                                <p
                                    key={i}
                                    className="text-xs text-[#6a6a6a] leading-relaxed"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    <span className="text-[#a8884a]/70">{pub.date}</span>
                                    {" — "}
                                    <span className="italic text-[#8a8a8a]">{pub.title}</span>
                                    {pub.description && (
                                        <span className="text-[#5a5a5a]">, {pub.description}</span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {/* Studio images gallery */}
                {artist.studioImages && artist.studioImages.length > 0 && (
                    <ScrollReveal className="mb-20" delay={100}>
                        <div className="flex items-center gap-6 mb-12">
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                            <h2
                                className="text-[8px] tracking-[0.6em] uppercase text-[#a8884a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Studio
                            </h2>
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#1a1a1a]">
                            {artist.studioImages.map((imgUrl, i) => (
                                <div key={i} className="relative aspect-square overflow-hidden group">
                                    <Image
                                        src={imgUrl}
                                        alt={`Studio ${i + 1}`}
                                        fill
                                        sizes="(min-width: 768px) 33vw, 50vw"
                                        className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 border border-[#a8884a]/0 group-hover:border-[#a8884a]/20 transition-colors duration-500" />
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {/* Events */}
                {artist.events && artist.events.length > 0 && (
                    <ScrollReveal className="mb-20" delay={100}>
                        <div className="flex items-center gap-6 mb-12">
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                            <h2
                                className="text-[8px] tracking-[0.6em] uppercase text-[#a8884a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Events
                            </h2>
                            <span className="h-px flex-1 bg-[#a8884a]/15" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sortByDateDesc(artist.events, (event) => event.startDate ?? event.date).map((event, i) => {
                                const dateStr = event.startDate ?? event.date ?? null;
                                return (
                                    <div
                                        key={i}
                                        className="border border-[#a8884a]/20 p-6 hover:border-[#a8884a]/50 transition-colors duration-300 bg-[#0a0a0a]"
                                    >
                                        <p
                                            className="text-sm italic text-[#e8e8e8] mb-2"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {event.title}
                                        </p>
                                        {dateStr && (
                                            <p
                                                className="text-[8px] tracking-[0.3em] uppercase text-[#a8884a]/70 mb-1"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                {dateStr}
                                            </p>
                                        )}
                                        <p
                                            className="text-[9px] tracking-[0.2em] uppercase text-[#5a5a5a]"
                                            style={{ fontFamily: "'Courier New', monospace" }}
                                        >
                                            {event.location}
                                        </p>
                                        {event.description && (
                                            <p
                                                className="text-xs text-[#6a6a6a] mt-3 leading-relaxed"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                {event.description}
                                            </p>
                                        )}
                                        {(event.url) && (
                                            <a
                                                href={event.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-3 text-[8px] tracking-[0.3em] uppercase text-[#a8884a]/60 hover:text-[#a8884a] transition-colors duration-300"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                Details →
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
}
