import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import VerifiedBadge from "./VerifiedBadge";
import ScrollReveal from "./ScrollReveal";
import { sortByDateDesc } from "@/lib/cv-sort";

export default function ObsidianAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const photo = artist.bioPhoto ?? artist.profilePhoto ?? null;
    const bio = artist.bio ?? "";

    // Split bio into paragraphs for drop-cap treatment
    const paragraphs = bio.split(/\n+/).filter((p) => p.trim().length > 0);
    const firstParagraph = paragraphs[0] ?? "";
    const restParagraphs = paragraphs.slice(1);

    const languages = (artist.languages ?? []).filter(Boolean);

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Page header */}
            <div className="px-6 md:px-12 pt-16 pb-12 border-b border-[#c9a96e]/10">
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e]/50 mb-4 font-light">
                    The Artist
                </p>
                <h1 className="font-[family-name:var(--font-obsidian-display)] text-7xl md:text-9xl lg:text-[10rem] font-light tracking-[0.02em] uppercase text-[#f5f0eb] leading-none">
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
                                sizes="(min-width: 1024px) 50vw, 100vw"
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
                    <h2 className="font-[family-name:var(--font-obsidian-display)] text-4xl md:text-5xl font-light tracking-[0.03em] uppercase text-[#f5f0eb] mb-6 leading-tight">
                        {name}
                    </h2>

                    {artist.verified && <VerifiedBadge className="mb-6 self-start" />}

                    {(artist.city || artist.state || artist.country) && (
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#4a4540] mb-8">
                            {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                        </p>
                    )}

                    {artist.artistTagline && (
                        <p className="font-[family-name:var(--font-obsidian-display)] text-lg font-light text-[#c9a96e] tracking-wide italic mb-8 max-w-md">
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
                        {artist.priceRange && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-0.5">
                                    Price Range
                                </span>
                                <span className="text-xs text-[#6a6460] font-light">{artist.priceRange}</span>
                            </div>
                        )}
                        {languages.length > 0 && (
                            <div className="flex gap-4">
                                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-0.5">
                                    Languages
                                </span>
                                <span className="text-xs text-[#6a6460] font-light">{languages.join(", ")}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Bio with drop-cap */}
            {bio && (
                <ScrollReveal>
                    <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
                        <div className="prose-custom">
                            {firstParagraph && (
                                <p className="text-[#b0a89e] font-light leading-relaxed text-base md:text-lg mb-8">
                                    <span className="float-left font-[family-name:var(--font-obsidian-display)] text-7xl font-light text-[#c9a96e] leading-none mr-3 mt-2">
                                        {firstParagraph.charAt(0)}
                                    </span>
                                    {firstParagraph.slice(1)}
                                </p>
                            )}
                            {restParagraphs.map((para, i) => (
                                <p key={i} className="text-[#7a7470] font-light leading-relaxed text-base mb-6">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Artist statement */}
                        {artist.artistStatement && (
                            <blockquote className="mt-16 border-l-2 border-[#c9a96e]/40 pl-8 relative">
                                <span className="absolute -top-6 left-6 text-6xl text-[#c9a96e]/15 font-[family-name:var(--font-obsidian-display)] leading-none select-none">
                                    &ldquo;
                                </span>
                                <p className="font-[family-name:var(--font-obsidian-display)] text-xl md:text-2xl font-light text-[#c9a96e]/80 italic leading-relaxed tracking-wide">
                                    {artist.artistStatement}
                                </p>
                            </blockquote>
                        )}

                        {artist.studioProcessDescription && (
                            <div className="mt-16 border-t border-[#c9a96e]/10 pt-10">
                                <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]/50 mb-5 font-light">
                                    Process
                                </p>
                                <p className="text-[#7a7470] font-light leading-relaxed text-base">
                                    {artist.studioProcessDescription}
                                </p>
                            </div>
                        )}
                    </section>
                </ScrollReveal>
            )}

            {/* Exhibitions timeline */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <ScrollReveal>
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
                                {sortByDateDesc(artist.exhibitions, (ex) => ex.year).map((ex, i) => (
                                    <div key={i} className="flex gap-6 md:gap-10 group">
                                        <div className="md:w-16 shrink-0 text-right">
                                            <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/60 font-light">
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
                </ScrollReveal>
            )}

            {/* Published Book — luxury catalog item */}
            {artist.book && (
                <ScrollReveal>
                    <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                        <div className="flex items-center gap-6 mb-14">
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                The Monograph
                            </h3>
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-10 items-center rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10">
                            <div className="relative w-36 md:w-44 aspect-[3/4] shrink-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                                <Image src={artist.book.imageUrl} alt={artist.book.title} fill sizes="176px" className="object-cover" />
                                <div className="absolute inset-0 border border-[#c9a96e]/20" />
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="font-[family-name:var(--font-obsidian-display)] text-2xl md:text-3xl font-light text-[#f5f0eb] mb-3">
                                    {artist.book.title}
                                </h4>
                                <p className="text-sm font-light text-[#8a8278] leading-relaxed mb-5 max-w-lg">
                                    {artist.book.description}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-6 text-[9px] tracking-[0.2em] uppercase text-[#4a4540]">
                                    {artist.book.publisher && <span>{artist.book.publisher}</span>}
                                    {artist.book.format && <span>{artist.book.format}</span>}
                                    {artist.book.isbn && <span>ISBN {artist.book.isbn}</span>}
                                </div>
                                {artist.book.purchaseUrl && (
                                    <a
                                        href={artist.book.purchaseUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-[10px] tracking-[0.35em] uppercase px-7 py-3 border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-400"
                                    >
                                        {artist.book.purchaseLabel ?? "Acquire the Monograph"}
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* Publications */}
            {artist.publications && artist.publications.length > 0 && (
                <ScrollReveal>
                    <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                        <div className="flex items-center gap-6 mb-14">
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                Press & Publications
                            </h3>
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        </div>

                        <div className="space-y-6">
                            {sortByDateDesc(artist.publications, (pub) => pub.date).map((pub, i) => (
                                <div
                                    key={i}
                                    className="flex gap-8 border-b border-[#1a1a1a] pb-6 group hover:border-[#c9a96e]/10 transition-colors duration-300"
                                >
                                    <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/50 font-light w-12 shrink-0 pt-0.5">
                                        {pub.date}
                                    </span>
                                    <div>
                                        <p className="text-sm font-light text-[#c9c4be] tracking-wide">
                                            {pub.title}
                                        </p>
                                        {pub.description && (
                                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#4a4540] mt-1">
                                                {pub.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* Journal / Blog */}
            {artist.blogPosts && artist.blogPosts.length > 0 && (
                <ScrollReveal>
                    <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                        <div className="flex items-center gap-6 mb-14">
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                Journal
                            </h3>
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {artist.blogPosts.slice(0, 4).map((post, i) => {
                                const content = (
                                    <>
                                        {post.imageUrl && (
                                            <div className="relative w-20 h-20 shrink-0 bg-[#111] overflow-hidden">
                                                <Image src={post.imageUrl} alt={post.title} fill sizes="80px" className="object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-[9px] tracking-[0.25em] uppercase text-[#4a4540] mb-2">
                                                {post.date}
                                                {post.source ? ` · ${post.source}` : ""}
                                            </p>
                                            <p className="text-sm font-light text-[#c9c4be] group-hover:text-[#c9a96e] transition-colors duration-300 mb-1">
                                                {post.title}
                                            </p>
                                            {post.excerpt && (
                                                <p className="text-xs text-[#5a5550] font-light leading-relaxed line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                );
                                const wrapperClass =
                                    "group flex gap-5 border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 hover:border-[#c9a96e]/25 transition-colors duration-300";
                                return post.externalUrl ? (
                                    <a
                                        key={i}
                                        href={post.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={wrapperClass}
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={i} className={wrapperClass}>
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* Galleries */}
            {artist.galleries && artist.galleries.length > 0 && (
                <ScrollReveal>
                    <section className="border-t border-[#c9a96e]/10 px-6 md:px-12 py-16 max-w-5xl mx-auto">
                        <div className="flex items-center gap-6 mb-14">
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                Gallery Representation
                            </h3>
                            <span className="h-px flex-1 bg-[#c9a96e]/15" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {artist.galleries.map((g, i) => (
                                <div
                                    key={i}
                                    className="border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 hover:border-[#c9a96e]/20 transition-colors duration-400 group"
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
                </ScrollReveal>
            )}

            {/* Studio images */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <ScrollReveal>
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
                                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            )}
        </div>
    );
}
