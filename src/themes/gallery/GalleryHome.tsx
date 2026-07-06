import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";
import { PullQuote, SectionHeading, SectionLabel, VerifiedBadge, WallLabel } from "./ui";

const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

export default function GalleryHome({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const activeWorks = artworks.filter((a) => a.status === "active");
    const featured = activeWorks[0];
    const grid = activeWorks.slice(1, 10);
    const heroFallback = artist.coverPhoto ?? artist.profilePhoto ?? null;
    const eyebrow = artist.artStyle ?? artist.medium ?? "Selected Work";
    const reviews = (artist.reviews ?? []).filter((r) => r.text?.trim()).slice(0, 2);
    const galleries = (artist.galleries ?? []).filter((g) => g.name).slice(0, 4);

    return (
        <div>
            {/* Hero — a single work hung on the wall, not a banner with text over it */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <SectionLabel>{eyebrow}</SectionLabel>
                        <h1 className="font-[family-name:var(--font-display)] italic text-[2.5rem] md:text-[3rem] leading-[1.08] mt-4 text-[#1B1812]">
                            {name}
                        </h1>
                        {artist.verified && <VerifiedBadge className="mt-4" />}
                        {artist.artistTagline && (
                            <p className="mt-5 text-[15px] leading-relaxed text-[#57514A] max-w-sm">
                                {artist.artistTagline}
                            </p>
                        )}
                        {(artist.city || artist.state) && (
                            <p className="mt-4 text-[11px] tracking-[0.22em] uppercase text-[#8C8478]">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <Link
                                href="/artworks"
                                className="group inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase bg-[#1B1812] text-[#F8F5EF] px-7 py-3.5 hover:bg-[#3A342A] transition-colors"
                            >
                                Enter the Collection
                                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/about"
                                className="text-[12px] tracking-[0.2em] uppercase text-[#57514A] hover:text-[#1B1812] underline decoration-[#E3DCCE] underline-offset-4 transition-colors"
                            >
                                About the Artist
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <div className="relative aspect-[4/3] md:aspect-[16/11] bg-[#F1ECE2] border border-[#E3DCCE]">
                            {featured ? (
                                <Image
                                    src={getProductImageUrl(featured)}
                                    alt={featured.title}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 66vw, 100vw"
                                    className="object-contain p-3 md:p-6"
                                />
                            ) : heroFallback ? (
                                <Image
                                    src={heroFallback}
                                    alt={name}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 66vw, 100vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] italic text-2xl text-[#B8AF9E]">
                                    {name}
                                </div>
                            )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#E3DCCE] flex items-baseline justify-between gap-4">
                            {featured ? (
                                <WallLabel product={featured} />
                            ) : (
                                <p className="font-[family-name:var(--font-sans)] text-[12px] text-[#8C8478]">
                                    {name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Works — a curated hang, not a uniform card grid */}
            {grid.length > 0 && (
                <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
                    <ScrollReveal>
                        <SectionHeading eyebrow="The Collection" title="Selected Works" />
                    </ScrollReveal>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 mt-12">
                        {grid.map((artwork, i) => {
                            const imgUrl = getProductImageUrl(artwork);
                            return (
                                <ScrollReveal key={artwork.id} delay={(i % 3) * 90}>
                                    <Link href={`/artworks/${artwork.slug ?? artwork.id}`} className="group block">
                                        <div
                                            className={`relative ${ASPECTS[i % ASPECTS.length]} bg-[#F1ECE2] overflow-hidden mb-4`}
                                        >
                                            {imgUrl ? (
                                                <Image
                                                    src={imgUrl}
                                                    alt={artwork.title}
                                                    fill
                                                    sizes="(min-width: 768px) 33vw, 50vw"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                />
                                            ) : (
                                                <div className="absolute inset-0" />
                                            )}
                                        </div>
                                        <WallLabel product={artwork} />
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                    {activeWorks.length > 10 && (
                        <div className="mt-14 text-center">
                            <Link
                                href="/artworks"
                                className="text-[11px] tracking-[0.22em] uppercase text-[#57514A] hover:text-[#1B1812] underline decoration-[#E3DCCE] underline-offset-4"
                            >
                                View the Full Collection
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* Artist statement excerpt */}
            {(artist.bio || artist.artistStatement) && (
                <section className="border-t border-[#E3DCCE]">
                    <ScrollReveal className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            <div className="md:col-span-4">
                                <SectionLabel>Statement</SectionLabel>
                                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl italic mt-4 text-[#1B1812]">
                                    In the Studio
                                </h2>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-[17px] md:text-lg leading-relaxed text-[#3A342A] font-light whitespace-pre-line">
                                    {(artist.artistStatement ?? artist.bio ?? "").slice(0, 420)}
                                    {(artist.artistStatement ?? artist.bio ?? "").length > 420 ? "…" : ""}
                                </p>
                                <Link
                                    href="/about"
                                    className="inline-block mt-6 text-[11px] tracking-[0.22em] uppercase text-[#57514A] hover:text-[#1B1812] underline decoration-[#E3DCCE] underline-offset-4"
                                >
                                    Read the Full Statement
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </section>
            )}

            {/* Critical reception */}
            {reviews.length > 0 && (
                <section className="border-t border-[#E3DCCE] bg-[#F1ECE2]/50">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
                        <ScrollReveal>
                            <SectionLabel className="mb-10">In the Press</SectionLabel>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                            {reviews.map((r, i) => (
                                <ScrollReveal key={i} delay={i * 120}>
                                    <PullQuote quote={r.text} author={r.author} role={r.role} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery representation */}
            {galleries.length > 0 && (
                <section className="border-t border-[#E3DCCE]">
                    <ScrollReveal className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
                        <SectionLabel className="mb-8">Represented By</SectionLabel>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            {galleries.map((g, i) => {
                                const link = g.link ?? g.url;
                                const label = (
                                    <span className="font-[family-name:var(--font-display)] italic text-xl text-[#1B1812]">
                                        {g.name}
                                    </span>
                                );
                                return (
                                    <div key={i}>
                                        {link ? (
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-[#57514A] transition-colors"
                                            >
                                                {label}
                                            </a>
                                        ) : (
                                            label
                                        )}
                                        {(g.city || g.state) && (
                                            <span className="block text-[11px] tracking-[0.15em] uppercase text-[#8C8478] mt-1">
                                                {[g.city, g.state].filter(Boolean).join(", ")}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollReveal>
                </section>
            )}

            {/* Closing CTA */}
            <section className="border-t border-[#E3DCCE]">
                <ScrollReveal className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 text-center">
                    <h2 className="font-[family-name:var(--font-display)] italic text-3xl md:text-4xl text-[#1B1812]">
                        Inquire About Available Work
                    </h2>
                    <p className="mt-4 text-[15px] text-[#8C8478] max-w-md mx-auto">
                        For pricing, availability, and commission requests, reach out directly.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block mt-8 text-[12px] tracking-[0.22em] uppercase border border-[#1B1812] text-[#1B1812] px-8 py-3.5 hover:bg-[#1B1812] hover:text-[#F8F5EF] transition-colors"
                    >
                        Get in Touch
                    </Link>
                </ScrollReveal>
            </section>
        </div>
    );
}
