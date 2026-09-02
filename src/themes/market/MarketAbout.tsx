import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import { sortByDateDesc } from "@/lib/cv-sort";

export default function MarketAbout({ artist, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const studioImages = artist.studioImages?.slice(0, 3) ?? [];

    return (
        <div>
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-14">
                    {artist.profilePhoto && (
                        <Reveal className="md:col-span-2">
                            <div className="relative aspect-[4/5]">
                                <div className="absolute -inset-3 border border-[#b2542e]/40 -z-10" />
                                <Image src={artist.profilePhoto} alt={name} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                            </div>
                        </Reveal>
                    )}
                    <Reveal delay={100} className={artist.profilePhoto ? "md:col-span-3" : "md:col-span-5 max-w-2xl"}>
                        <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-3">
                            The Artist
                        </p>
                        <h1 className="font-[family-name:var(--market-font-display)] text-4xl md:text-5xl text-[#241e19] mb-4">
                            {name}
                        </h1>
                        {artist.artistTagline && (
                            <p className="text-lg text-[#4a4038] mb-2">{artist.artistTagline}</p>
                        )}
                        {(artist.city || artist.state) && (
                            <p className="text-sm text-[#8a7d6e] uppercase tracking-wide mb-7">
                                {artist.city}{artist.city && artist.state ? ", " : ""}{artist.state}
                            </p>
                        )}
                        {artist.bio && (
                            <p className="text-[#4a4038] leading-relaxed whitespace-pre-line mb-6">{artist.bio}</p>
                        )}
                        {artist.artistStatement && (
                            <blockquote className="border-l-2 border-[#b2542e] pl-5 py-1 text-[#241e19] font-[family-name:var(--market-font-display)] italic text-xl leading-relaxed">
                                &ldquo;{artist.artistStatement}&rdquo;
                            </blockquote>
                        )}

                        <div className="flex flex-wrap gap-4 mt-9">
                            <Link
                                href="/artworks"
                                className="inline-flex items-center gap-2 bg-[#241e19] text-[#f8f2e9] px-7 py-3 text-sm font-semibold hover:bg-[#b2542e] transition-colors"
                            >
                                Shop the Collection <ArrowRight size={15} />
                            </Link>
                            {artist.slug && (
                                <a
                                    href={marketplaceArtistUrl(artist.slug)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center border border-[#241e19]/30 text-[#241e19] px-7 py-3 text-sm font-semibold hover:border-[#b2542e] hover:text-[#b2542e] transition-colors"
                                >
                                    Full ArtsDistrictUSA Profile
                                </a>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {(artist.studioProcessDescription || studioImages.length > 0) && (
                <section className="bg-[#efe6d7] py-20">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                        <Reveal>
                            <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-3">
                                In Process
                            </p>
                            <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-5">
                                {artist.studioSubtitle ?? "How the Work Comes to Life"}
                            </h2>
                            {artist.studioProcessDescription && (
                                <p className="text-[#4a4038] leading-relaxed whitespace-pre-line">
                                    {artist.studioProcessDescription}
                                </p>
                            )}
                        </Reveal>
                        {studioImages.length > 0 && (
                            <Reveal delay={100} className="grid grid-cols-2 gap-3">
                                {studioImages.map((src, i) => (
                                    <div
                                        key={src + i}
                                        className={`relative overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
                                    >
                                        <Image src={src} alt={`${name} studio process ${i + 1}`} fill sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover" />
                                    </div>
                                ))}
                            </Reveal>
                        )}
                    </div>
                </section>
            )}

            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Reveal>
                        <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-2">
                            Recognition
                        </p>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-10">
                            Exhibitions
                        </h2>
                    </Reveal>
                    <div className="space-y-0">
                        {sortByDateDesc(artist.exhibitions, (ex) => ex.year).map((ex, i) => (
                            <Reveal
                                key={i}
                                delay={i * 50}
                                className="grid grid-cols-[4.5rem_1fr] gap-6 py-5 border-b border-[#e3d5c1]"
                            >
                                <span className="font-[family-name:var(--market-font-display)] text-lg text-[#b2542e]">
                                    {ex.year}
                                </span>
                                <div>
                                    <p className="text-[#241e19] font-medium">{ex.title}</p>
                                    {ex.location && <p className="text-sm text-[#8a7d6e] mt-0.5">{ex.location}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {artist.milestones && artist.milestones.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Reveal>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-10">
                            Milestones
                        </h2>
                    </Reveal>
                    <div className="space-y-0">
                        {sortByDateDesc(artist.milestones, (m) => m.date).map((m, i) => (
                            <Reveal
                                key={i}
                                delay={i * 50}
                                className="grid grid-cols-[4.5rem_1fr] gap-6 py-5 border-b border-[#e3d5c1]"
                            >
                                <span className="font-[family-name:var(--market-font-display)] text-lg text-[#b2542e]">
                                    {m.date}
                                </span>
                                <div>
                                    <p className="text-[#241e19] font-medium">{m.title}</p>
                                    {m.description && <p className="text-sm text-[#8a7d6e] mt-0.5">{m.description}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {artist.careerNotes && artist.careerNotes.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Reveal>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-10">
                            Career Notes
                        </h2>
                    </Reveal>
                    <div className="space-y-0">
                        {sortByDateDesc(artist.careerNotes, (n) => n.date).map((n, i) => (
                            <Reveal
                                key={i}
                                delay={i * 50}
                                className="grid grid-cols-[4.5rem_1fr] gap-6 py-5 border-b border-[#e3d5c1]"
                            >
                                <span className="font-[family-name:var(--market-font-display)] text-lg text-[#b2542e]">
                                    {n.date}
                                </span>
                                <div>
                                    <p className="text-[#241e19] font-medium">{n.title}</p>
                                    {n.note && <p className="text-sm text-[#8a7d6e] mt-0.5">{n.note}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {artist.achievements && artist.achievements.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Reveal>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-10">
                            Achievements
                        </h2>
                    </Reveal>
                    <div className="space-y-0">
                        {sortByDateDesc(artist.achievements, (a) => a.date).map((a, i) => (
                            <Reveal
                                key={i}
                                delay={i * 50}
                                className="grid grid-cols-[4.5rem_1fr] gap-6 py-5 border-b border-[#e3d5c1]"
                            >
                                <span className="font-[family-name:var(--market-font-display)] text-lg text-[#b2542e]">
                                    {a.date}
                                </span>
                                <div>
                                    <p className="text-[#241e19] font-medium">{a.title}</p>
                                    {a.organization && <p className="text-sm text-[#8a7d6e] mt-0.5">{a.organization}</p>}
                                    {a.description && <p className="text-sm text-[#8a7d6e] mt-0.5">{a.description}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {artist.trainings && artist.trainings.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Reveal>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-10">
                            Training
                        </h2>
                    </Reveal>
                    <div className="space-y-0">
                        {sortByDateDesc(artist.trainings, (t) => t.date).map((t, i) => (
                            <Reveal
                                key={i}
                                delay={i * 50}
                                className="grid grid-cols-[4.5rem_1fr] gap-6 py-5 border-b border-[#e3d5c1]"
                            >
                                <span className="font-[family-name:var(--market-font-display)] text-lg text-[#b2542e]">
                                    {t.date}
                                </span>
                                <div>
                                    <p className="text-[#241e19] font-medium">{t.title}</p>
                                    {t.institution && <p className="text-sm text-[#8a7d6e] mt-0.5">{t.institution}</p>}
                                    {t.description && <p className="text-sm text-[#8a7d6e] mt-0.5">{t.description}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {artist.miscEvents && artist.miscEvents.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Reveal>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19] mb-10">
                            Misc
                        </h2>
                    </Reveal>
                    <div className="space-y-0">
                        {sortByDateDesc(artist.miscEvents, (e) => e.date).map((e, i) => (
                            <Reveal
                                key={i}
                                delay={i * 50}
                                className="grid grid-cols-[4.5rem_1fr] gap-6 py-5 border-b border-[#e3d5c1]"
                            >
                                <span className="font-[family-name:var(--market-font-display)] text-lg text-[#b2542e]">
                                    {e.date}
                                </span>
                                <div>
                                    <p className="text-[#241e19] font-medium">{e.title}</p>
                                    {e.description && <p className="text-sm text-[#8a7d6e] mt-0.5">{e.description}</p>}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {artist.publications && artist.publications.length > 0 && (
                <section className="bg-[#efe6d7] py-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <Reveal>
                            <h2 className="font-[family-name:var(--market-font-display)] text-2xl text-[#241e19] mb-8">
                                Press &amp; Publications
                            </h2>
                        </Reveal>
                        <div className="space-y-4">
                            {sortByDateDesc(artist.publications, (p) => p.date).map((p, i) => (
                                <Reveal
                                    key={i}
                                    delay={i * 50}
                                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                                >
                                    <span className="text-sm text-[#8a7d6e] w-14 shrink-0">{p.date}</span>
                                    <span className="text-[#241e19] font-medium">{p.title}</span>
                                    {p.description && <span className="text-sm text-[#8a7d6e]">— {p.description}</span>}
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
