import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";
import { PullQuote, SectionLabel, VerifiedBadge } from "./ui";
import { sortByDateDesc } from "@/lib/cv-sort";

export default function GalleryAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const portrait = artist.bioPhoto ?? artist.profilePhoto ?? null;
    const statement = artist.artistStatement ?? null;
    const bio = artist.bio ?? null;
    const exhibitions = sortByDateDesc(artist.exhibitions ?? [], (e) => e.year);
    const soloShows = exhibitions.filter((e) => e.type === "solo");
    const groupShows = exhibitions.filter((e) => e.type !== "solo");
    const publications = sortByDateDesc(artist.publications ?? [], (p) => p.date);
    const reviews = (artist.reviews ?? []).filter((r) => r.text?.trim());
    const galleries = artist.galleries ?? [];
    const studioImages = artist.studioImages ?? [];
    const milestones = sortByDateDesc(artist.milestones ?? [], (m) => m.date);
    const careerNotes = sortByDateDesc(artist.careerNotes ?? [], (n) => n.date);
    const achievements = sortByDateDesc(artist.achievements ?? [], (a) => a.date);
    const trainings = sortByDateDesc(artist.trainings ?? [], (t) => t.date);
    const miscEvents = sortByDateDesc(artist.miscEvents ?? [], (e) => e.date);

    return (
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
            {/* Header */}
            <div className="border-b border-[#E3DCCE] pb-10 mb-14">
                <SectionLabel>About the Artist</SectionLabel>
                <h1 className="font-[family-name:var(--font-display)] italic text-4xl md:text-5xl mt-4 text-[#1B1812]">
                    {name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                    {(artist.city || artist.state) && (
                        <p className="text-[12px] tracking-[0.18em] uppercase text-[#8C8478]">
                            {[artist.city, artist.state].filter(Boolean).join(", ")}
                        </p>
                    )}
                    {artist.verified && <VerifiedBadge />}
                </div>
            </div>

            {/* Portrait + statement */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                {portrait && (
                    <div className="md:col-span-4">
                        <div className="relative aspect-[3/4] bg-[#F1ECE2] border border-[#E3DCCE]">
                            <Image src={portrait} alt={name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                        </div>
                    </div>
                )}
                <div className={portrait ? "md:col-span-8" : "md:col-span-12 max-w-3xl"}>
                    {bio && (
                        <p className="text-[16px] md:text-[17px] leading-relaxed text-[#3A342A] font-light whitespace-pre-line">
                            {bio}
                        </p>
                    )}
                    {statement && (
                        <blockquote className="mt-8 pl-6 border-l border-[#1B1812]">
                            <p className="font-[family-name:var(--font-display)] italic text-xl leading-relaxed text-[#1B1812]">
                                &ldquo;{statement}&rdquo;
                            </p>
                            <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-[#8C8478]">Artist Statement</p>
                        </blockquote>
                    )}
                    {artist.medium && (
                        <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 pt-6 border-t border-[#E3DCCE]">
                            <div>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8478]">Medium</p>
                                <p className="text-[13px] text-[#3A342A] mt-1">
                                    {[artist.medium, artist.secondaryMedium].filter(Boolean).join(", ")}
                                </p>
                            </div>
                            {artist.artStyle && (
                                <div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8478]">Style</p>
                                    <p className="text-[13px] text-[#3A342A] mt-1">
                                        {[artist.artStyle, artist.secondaryArtStyle].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            )}
                            {artist.languages && artist.languages.length > 0 && (
                                <div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C8478]">Languages</p>
                                    <p className="text-[13px] text-[#3A342A] mt-1">{artist.languages.join(", ")}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Curriculum Vitae */}
            {(soloShows.length > 0 || groupShows.length > 0 || publications.length > 0) && (
                <ScrollReveal className="mb-20">
                    <SectionLabel className="mb-8">Curriculum Vitae</SectionLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {soloShows.length > 0 && (
                            <CvSection title="Solo Exhibitions" items={soloShows.map((e) => ({ year: e.year, text: e.title, sub: e.location }))} />
                        )}
                        {groupShows.length > 0 && (
                            <CvSection title="Group Exhibitions" items={groupShows.map((e) => ({ year: e.year, text: e.title, sub: e.location }))} />
                        )}
                        {publications.length > 0 && (
                            <CvSection title="Publications" items={publications.map((p) => ({ year: p.date ?? "", text: p.title, sub: p.description }))} />
                        )}
                    </div>
                </ScrollReveal>
            )}

            {/* Milestones / Career Notes / Achievements / Training / Misc */}
            {(milestones.length > 0 ||
                careerNotes.length > 0 ||
                achievements.length > 0 ||
                trainings.length > 0 ||
                miscEvents.length > 0) && (
                <ScrollReveal className="mb-20 pt-16 border-t border-[#E3DCCE]">
                    <SectionLabel className="mb-8">Career Timeline</SectionLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {milestones.length > 0 && (
                            <CvSection title="Milestones" items={milestones.map((m) => ({ year: m.date, text: m.title, sub: m.description }))} />
                        )}
                        {careerNotes.length > 0 && (
                            <CvSection title="Career Notes" items={careerNotes.map((n) => ({ year: n.date, text: n.title, sub: n.note }))} />
                        )}
                        {achievements.length > 0 && (
                            <CvSection
                                title="Achievements"
                                items={achievements.map((a) => ({
                                    year: a.date,
                                    text: a.title,
                                    sub: [a.organization, a.description].filter(Boolean).join(" — "),
                                }))}
                            />
                        )}
                        {trainings.length > 0 && (
                            <CvSection
                                title="Training"
                                items={trainings.map((t) => ({
                                    year: t.date,
                                    text: t.title,
                                    sub: [t.institution, t.description].filter(Boolean).join(" — "),
                                }))}
                            />
                        )}
                        {miscEvents.length > 0 && (
                            <CvSection title="Misc" items={miscEvents.map((e) => ({ year: e.date, text: e.title, sub: e.description }))} />
                        )}
                    </div>
                </ScrollReveal>
            )}

            {/* Critical reception */}
            {reviews.length > 0 && (
                <ScrollReveal className="mb-20 pt-16 border-t border-[#E3DCCE]">
                    <SectionLabel className="mb-10">Critical Reception</SectionLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {reviews.map((r, i) => (
                            <PullQuote key={i} quote={r.text} author={r.author} role={r.role} />
                        ))}
                    </div>
                </ScrollReveal>
            )}

            {/* Studio process */}
            {artist.studioProcessDescription && (
                <ScrollReveal className="mb-20 pt-16 border-t border-[#E3DCCE]">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-4">
                            <SectionLabel>Process</SectionLabel>
                            <h2 className="font-[family-name:var(--font-display)] italic text-3xl mt-4 text-[#1B1812]">
                                In the Studio
                            </h2>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-[15px] leading-relaxed text-[#57514A] whitespace-pre-line">
                                {artist.studioProcessDescription}
                            </p>
                        </div>
                    </div>
                    {studioImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-10">
                            {studioImages.slice(0, 6).map((img, i) => (
                                <div key={i} className="relative aspect-[4/3] bg-[#F1ECE2]">
                                    <Image src={img} alt={`Studio view ${i + 1}`} fill sizes="33vw" className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollReveal>
            )}

            {/* Gallery representation */}
            {galleries.length > 0 && (
                <ScrollReveal className="mb-20 pt-16 border-t border-[#E3DCCE]">
                    <SectionLabel className="mb-10">Gallery Representation</SectionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {galleries.map((g, i) => {
                            const link = g.link ?? g.url;
                            return (
                                <div key={i}>
                                    {g.photo && (
                                        <div className="relative aspect-[4/3] bg-[#F1ECE2] mb-4 border border-[#E3DCCE]">
                                            <Image src={g.photo} alt={g.name} fill sizes="33vw" className="object-cover" />
                                        </div>
                                    )}
                                    <p className="font-[family-name:var(--font-display)] italic text-lg text-[#1B1812]">
                                        {g.name}
                                    </p>
                                    {(g.city || g.state || g.address) && (
                                        <p className="text-[12px] text-[#8C8478] mt-1">
                                            {g.address ? g.address + ", " : ""}
                                            {[g.city, g.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}
                                    {link && (
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 text-[11px] tracking-[0.18em] uppercase text-[#57514A] hover:text-[#1B1812] underline decoration-[#E3DCCE] underline-offset-4"
                                        >
                                            Visit
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </ScrollReveal>
            )}

            {/* Monograph / book */}
            {artist.book && (
                <ScrollReveal className="pt-16 border-t border-[#E3DCCE]">
                    <SectionLabel className="mb-10">Monograph</SectionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-10 items-start">
                        {artist.book.imageUrl && (
                            <div className="relative aspect-[3/4] bg-[#F1ECE2] border border-[#E3DCCE] max-w-[200px]">
                                <Image src={artist.book.imageUrl} alt={artist.book.title} fill sizes="200px" className="object-cover" />
                            </div>
                        )}
                        <div>
                            <p className="font-[family-name:var(--font-display)] italic text-2xl text-[#1B1812]">
                                {artist.book.title}
                            </p>
                            {(artist.book.publisher || artist.book.format) && (
                                <p className="text-[12px] text-[#8C8478] mt-2 tracking-wide">
                                    {[artist.book.publisher, artist.book.format].filter(Boolean).join(" · ")}
                                </p>
                            )}
                            {artist.book.description && (
                                <p className="text-[14px] leading-relaxed text-[#57514A] mt-4">{artist.book.description}</p>
                            )}
                            {artist.book.purchaseUrl && (
                                <a
                                    href={artist.book.purchaseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-5 text-[12px] tracking-[0.2em] uppercase border border-[#1B1812] text-[#1B1812] px-6 py-3 hover:bg-[#1B1812] hover:text-[#F8F5EF] transition-colors"
                                >
                                    {artist.book.purchaseLabel ?? "Purchase"}
                                </a>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            )}
        </div>
    );
}

function CvSection({
    title,
    items,
}: {
    title: string;
    items: { year: string; text: string; sub?: string }[];
}) {
    return (
        <div>
            <h3 className="font-[family-name:var(--font-display)] italic text-xl text-[#1B1812] mb-5">{title}</h3>
            <div className="space-y-3.5">
                {items.map((item, i) => (
                    <div key={i} className="grid grid-cols-[52px_1fr] gap-4 text-[13px]">
                        <span className="text-[#8C8478] tracking-wide pt-0.5">{item.year}</span>
                        <span className="text-[#3A342A] leading-relaxed">
                            {item.text}
                            {item.sub && <span className="text-[#8C8478]"> — {item.sub}</span>}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
