import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, BookOpen, MapPin, Quote } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";

export default function StudioAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const chips = [artist.medium, artist.secondaryMedium, artist.artStyle, artist.secondaryArtStyle].filter(
        (v): v is string => Boolean(v)
    );
    const galleries = artist.galleries ?? [];
    const reviews = artist.reviews ?? [];
    const publications = artist.publications ?? [];
    const studioLocations = artist.studioLocations ?? [];

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <p className="mb-12 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600 md:mb-16">
                The Artist
            </p>

            <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
                {artist.bioPhoto && (
                    <ScrollReveal>
                        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                            <Image src={artist.bioPhoto} alt={name} fill className="object-cover" sizes="420px" />
                            <div
                                className="pointer-events-none absolute inset-0"
                                style={{ background: "linear-gradient(180deg, transparent 60%, rgba(10,9,8,0.55) 100%)" }}
                            />
                        </div>
                    </ScrollReveal>
                )}
                <ScrollReveal delayMs={100} className={artist.bioPhoto ? "" : "max-w-3xl"}>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <h1 className="font-[family-name:var(--font-studio-display)] text-4xl italic font-light leading-tight text-neutral-100 md:text-6xl">
                            {name}
                        </h1>
                        {artist.verified && (
                            <span className="inline-flex items-center gap-1.5 border border-amber-100/25 px-2.5 py-1 font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-widest text-amber-100/80">
                                <BadgeCheck size={12} /> Verified Artist
                            </span>
                        )}
                    </div>
                    {(artist.city || artist.state) && (
                        <p className="mb-6 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.25em] text-neutral-600">
                            {artist.city}
                            {artist.state ? `, ${artist.state}` : ""}
                        </p>
                    )}
                    {chips.length > 0 && (
                        <div className="mb-8 flex flex-wrap gap-2">
                            {chips.map((c) => (
                                <span
                                    key={c}
                                    className="border border-neutral-800 px-3 py-1 font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-500"
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    )}
                    {artist.bio && (
                        <p className="whitespace-pre-line font-[family-name:var(--font-studio-body)] font-light leading-relaxed text-neutral-400">
                            {artist.bio}
                        </p>
                    )}
                    {artist.artistStatement && (
                        <blockquote className="mt-10 border-l border-neutral-700 pl-6 font-[family-name:var(--font-studio-display)] italic font-light leading-relaxed text-neutral-300">
                            {artist.artistStatement}
                        </blockquote>
                    )}
                    {artist.languages && artist.languages.length > 0 && (
                        <p className="mt-8 font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-700">
                            Speaks {artist.languages.join(" · ")}
                        </p>
                    )}
                </ScrollReveal>
            </div>

            {artist.book && (
                <ScrollReveal>
                    <div className="mb-20 grid grid-cols-1 gap-8 border-t border-neutral-800/60 pt-14 sm:grid-cols-[160px_1fr]">
                        <div className="relative aspect-[3/4] w-full max-w-[160px] overflow-hidden bg-neutral-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
                            <Image src={artist.book.imageUrl} alt={artist.book.title} fill className="object-cover" sizes="160px" />
                        </div>
                        <div>
                            <p className="mb-3 flex items-center gap-2 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                                <BookOpen size={13} /> Published Work
                            </p>
                            <h3 className="mb-2 font-[family-name:var(--font-studio-display)] text-2xl italic font-light text-neutral-100 md:text-3xl">
                                {artist.book.title}
                            </h3>
                            {artist.book.publisher && (
                                <p className="mb-4 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-widest text-neutral-600">
                                    {artist.book.publisher}
                                    {artist.book.format ? ` · ${artist.book.format}` : ""}
                                </p>
                            )}
                            <p className="mb-5 max-w-xl font-[family-name:var(--font-studio-body)] font-light leading-relaxed text-neutral-400">
                                {artist.book.description}
                            </p>
                            {artist.book.purchaseUrl && (
                                <a
                                    href={artist.book.purchaseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block border-b border-neutral-700 pb-1 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-400 transition-colors hover:border-amber-100/60 hover:text-amber-100/90"
                                >
                                    {artist.book.purchaseLabel ?? "Purchase"}
                                </a>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <ScrollReveal>
                    <div className="mb-20 border-t border-neutral-800/60 pt-14">
                        <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                            Exhibitions
                        </p>
                        <div className="max-w-2xl space-y-4">
                            {artist.exhibitions.map((ex, i) => (
                                <div key={i} className="grid grid-cols-[70px_1fr] gap-6 border-b border-neutral-900 pb-4 text-sm">
                                    <span className="font-[family-name:var(--font-studio-condensed)] tracking-widest text-neutral-700">{ex.year}</span>
                                    <span className="font-[family-name:var(--font-studio-body)] font-light text-neutral-400">
                                        {ex.title}
                                        {ex.location ? ` — ${ex.location}` : ""}
                                        {ex.type && (
                                            <span className="ml-2 font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-widest text-neutral-700">
                                                {ex.type}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {publications.length > 0 && (
                <ScrollReveal>
                    <div className="mb-20 border-t border-neutral-800/60 pt-14">
                        <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                            Press &amp; Publications
                        </p>
                        <div className="max-w-2xl space-y-4">
                            {publications.map((p, i) => (
                                <div key={i} className="grid grid-cols-[70px_1fr] gap-6 border-b border-neutral-900 pb-4 text-sm">
                                    <span className="font-[family-name:var(--font-studio-condensed)] tracking-widest text-neutral-700">{p.year}</span>
                                    <span className="font-[family-name:var(--font-studio-body)] font-light text-neutral-400">
                                        {p.title}
                                        {p.publication ? ` — ${p.publication}` : ""}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {galleries.length > 0 && (
                <ScrollReveal>
                    <div className="mb-20 border-t border-neutral-800/60 pt-14">
                        <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                            Represented By
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {galleries.map((g, i) => {
                                const href = g.link ?? g.url;
                                const cardClass =
                                    "group block border border-neutral-800/60 p-5 transition-colors hover:border-neutral-600";
                                const cardContent = (
                                    <>
                                        {g.photo && (
                                            <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-neutral-900">
                                                <Image src={g.photo} alt={g.name} fill className="object-cover opacity-80 transition-opacity group-hover:opacity-100" sizes="360px" />
                                            </div>
                                        )}
                                        <p className="font-[family-name:var(--font-studio-body)] text-sm font-medium text-neutral-100">{g.name}</p>
                                        {(g.city || g.state) && (
                                            <p className="mt-1 flex items-center gap-1.5 font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-600">
                                                <MapPin size={11} /> {g.city}
                                                {g.state ? `, ${g.state}` : ""}
                                            </p>
                                        )}
                                    </>
                                );
                                return href ? (
                                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                                        {cardContent}
                                    </a>
                                ) : (
                                    <div key={i} className={cardClass}>
                                        {cardContent}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {reviews.length > 0 && (
                <ScrollReveal>
                    <div className="mb-20 border-t border-neutral-800/60 pt-14">
                        <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                            In Their Words
                        </p>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {reviews.map((r, i) => (
                                <div key={i}>
                                    <Quote size={22} className="mb-3 text-amber-100/25" strokeWidth={1} />
                                    <p className="mb-4 font-[family-name:var(--font-studio-display)] italic font-light leading-relaxed text-neutral-300">
                                        {r.text}
                                    </p>
                                    <p className="font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-widest text-neutral-600">
                                        {r.author}
                                        {r.role ? ` — ${r.role}` : ""}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {studioLocations.length > 0 && (
                <ScrollReveal>
                    <div className="border-t border-neutral-800/60 pt-14">
                        <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                            Studio Locations
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {studioLocations.map((loc, i) => (
                                <div key={i} className="border border-neutral-800/60 p-5">
                                    {loc.name && (
                                        <p className="mb-1 font-[family-name:var(--font-studio-body)] text-sm font-medium text-neutral-100">{loc.name}</p>
                                    )}
                                    <p className="font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-widest text-neutral-600">
                                        {loc.address}, {loc.city}, {loc.state} {loc.zipCode}
                                    </p>
                                    {loc.directionsUrl && (
                                        <Link
                                            href={loc.directionsUrl}
                                            target="_blank"
                                            className="mt-3 inline-block font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-500 underline decoration-neutral-700 hover:text-amber-100/80"
                                        >
                                            Get Directions
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}
        </div>
    );
}
