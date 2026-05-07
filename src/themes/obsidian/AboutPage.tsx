import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function ObsidianAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const photo = artist.bioPhoto ?? artist.profilePhoto ?? null;
    const bio = artist.bio ?? "";

    // Split bio into paragraphs for drop-cap treatment
    const paragraphs = bio.split(/\n+/).filter((p) => p.trim().length > 0);
    const firstParagraph = paragraphs[0] ?? "";
    const restParagraphs = paragraphs.slice(1);

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Page header */}
            <div className="px-6 md:px-12 pt-16 pb-12 border-b border-[#c9a96e]/10">
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e]/50 mb-4 font-light">
                    The Artist
                </p>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-thin tracking-[0.25em] uppercase text-[#f5f0eb] leading-none">
                    About
                </h1>
            </div>

            {/* Hero: photo + name */}
            <section className="flex flex-col lg:flex-row border-b border-[#c9a96e]/10">
                {/* Photo: half screen */}
                <div className="lg:w-1/2 relative">
                    <div className="aspect-[3/4] lg:aspect-auto lg:min-h-[70vh] relative">
                        {photo ? (
                            <Image
                                src={photo}
                                alt={name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[#111]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/30 lg:to-[#0a0a0a]/60" />
                    </div>
                </div>

                {/* Name / intro panel */}
                <div className="lg:w-1/2 px-8 md:px-14 lg:px-16 py-16 flex flex-col justify-center border-l border-[#c9a96e]/10">
                    <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a96e]/40 mb-6 font-light">
                        {artist.medium ?? artist.artStyle ?? "Artist"}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-thin tracking-[0.2em] uppercase text-[#f5f0eb] mb-6 leading-tight">
                        {name}
                    </h2>

                    {(artist.city || artist.state || artist.country) && (
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#4a4540] mb-8">
                            {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                        </p>
                    )}

                    {artist.artistTagline && (
                        <p className="text-base font-thin text-[#c9a96e] tracking-wide italic mb-8 max-w-md">
                            {artist.artistTagline}
                        </p>
                    )}

                    <div className="h-px w-16 bg-[#c9a96e]/40 mb-8" />

                    {/* Quick facts */}
                    <div className="space-y-3">
                        {artist.experience && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-0.5">
                                    Experience
                                </span>
                                <span className="text-xs text-[#6a6460] font-light">{artist.experience}</span>
                            </div>
                        )}
                        {artist.artStyle && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-0.5">
                                    Style
                                </span>
                                <span className="text-xs text-[#6a6460] font-light">{artist.artStyle}</span>
                            </div>
                        )}
                        {artist.medium && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-0.5">
                                    Medium
                                </span>
                                <span className="text-xs text-[#6a6460] font-light">{artist.medium}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Bio with drop-cap */}
            {bio && (
                <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
                    <div className="prose-custom">
                        {firstParagraph && (
                            <p className="text-[#b0a89e] font-thin leading-relaxed text-base md:text-lg mb-8">
                                <span className="float-left text-7xl font-thin text-[#c9a96e] leading-none mr-3 mt-2">
                                    {firstParagraph.charAt(0)}
                                </span>
                                {firstParagraph.slice(1)}
                            </p>
                        )}
                        {restParagraphs.map((para, i) => (
                            <p key={i} className="text-[#7a7470] font-thin leading-relaxed text-base mb-6">
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Artist statement */}
                    {artist.artistStatement && (
                        <blockquote className="mt-16 border-l-2 border-[#c9a96e]/40 pl-8 relative">
                            <span className="absolute -top-6 left-6 text-6xl text-[#c9a96e]/15 font-serif leading-none select-none">
                                &ldquo;
                            </span>
                            <p className="text-lg md:text-xl font-thin text-[#c9a96e]/80 italic leading-relaxed tracking-wide">
                                {artist.artistStatement}
                            </p>
                        </blockquote>
                    )}
                </section>
            )}

            {/* Exhibitions timeline */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                    <div className="flex items-center gap-6 mb-14">
                        <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                            Exhibitions
                        </h3>
                        <span className="h-px flex-1 bg-[#c9a96e]/15" />
                    </div>

                    <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-[#c9a96e]/15 hidden md:block" />

                        <div className="space-y-8">
                            {artist.exhibitions.map((ex, i) => (
                                <div key={i} className="flex gap-6 md:gap-10 group">
                                    <div className="md:w-16 shrink-0 text-right">
                                        <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/60 font-thin">
                                            {ex.year}
                                        </span>
                                    </div>
                                    {/* Timeline dot */}
                                    <div className="hidden md:flex items-start justify-center w-8 shrink-0 relative">
                                        <div className="w-2 h-2 rounded-full bg-[#c9a96e]/30 group-hover:bg-[#c9a96e] transition-colors duration-300 mt-1 z-10" />
                                    </div>
                                    <div className="flex-1 pb-6 border-b border-[#1a1a1a] group-hover:border-[#c9a96e]/10 transition-colors duration-300">
                                        <p className="text-sm font-light text-[#d4cfc9] tracking-wide mb-1">
                                            {ex.title}
                                        </p>
                                        {ex.location && (
                                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#4a4540]">
                                                {ex.location}
                                            </p>
                                        )}
                                        {ex.type && (
                                            <span className="inline-block mt-2 text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/40 border border-[#c9a96e]/20 px-2 py-0.5">
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

            {/* Publications */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                    <div className="flex items-center gap-6 mb-14">
                        <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                            Press & Publications
                        </h3>
                        <span className="h-px flex-1 bg-[#c9a96e]/15" />
                    </div>

                    <div className="space-y-6">
                        {artist.publications.map((pub, i) => (
                            <div
                                key={i}
                                className="flex gap-8 border-b border-[#1a1a1a] pb-6 group hover:border-[#c9a96e]/10 transition-colors duration-300"
                            >
                                <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/50 font-thin w-12 shrink-0 pt-0.5">
                                    {pub.year}
                                </span>
                                <div>
                                    <p className="text-sm font-light text-[#c9c4be] tracking-wide">
                                        {pub.title}
                                    </p>
                                    {pub.publication && (
                                        <p className="text-[10px] tracking-[0.15em] uppercase text-[#4a4540] mt-1">
                                            {pub.publication}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Galleries */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                    <div className="flex items-center gap-6 mb-14">
                        <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                            Gallery Representation
                        </h3>
                        <span className="h-px flex-1 bg-[#c9a96e]/15" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {artist.galleries.map((g, i) => (
                            <div
                                key={i}
                                className="border border-[#1a1a1a] p-6 hover:border-[#c9a96e]/20 transition-colors duration-400 group"
                            >
                                {g.link || g.url ? (
                                    <a
                                        href={g.link ?? g.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-light text-[#c9c4be] tracking-wide group-hover:text-[#c9a96e] transition-colors duration-300"
                                    >
                                        {g.name}
                                    </a>
                                ) : (
                                    <p className="text-sm font-light text-[#c9c4be] tracking-wide">{g.name}</p>
                                )}
                                {(g.city || g.state) && (
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#4a4540] mt-2">
                                        {[g.city, g.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Studio images */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="border-t border-[#c9a96e]/10 py-16">
                    <div className="px-6 md:px-12 mb-12 max-w-5xl mx-auto">
                        <div className="flex items-center gap-6">
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                In the Studio
                            </h3>
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#1a1a1a]">
                        {artist.studioImages.slice(0, 8).map((img, i) => (
                            <div key={i} className="relative aspect-square bg-[#111] overflow-hidden group">
                                <Image
                                    src={img}
                                    alt={`Studio ${i + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
