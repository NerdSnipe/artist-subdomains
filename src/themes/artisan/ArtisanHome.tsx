import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Quote } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import { StudioFrame, TornEdge } from "./decor";
import Reveal from "./Reveal";

export default function ArtisanHome({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const featured = active.slice(0, 5);
    const heroImage = artist.coverPhoto ?? artist.profilePhoto ?? artist.bioPhoto ?? null;

    const materialSet = new Set<string>();
    artworks.forEach((a) => a.materials?.forEach((m) => { if (m.material?.name) materialSet.add(m.material.name); }));
    const craftTags = [artist.medium, artist.secondaryMedium, artist.artStyle, artist.secondaryArtStyle]
        .filter((v): v is string => Boolean(v))
        .concat(Array.from(materialSet).slice(0, 4));
    const uniqueCraftTags = Array.from(new Set(craftTags)).slice(0, 6);

    const studioImages = (artist.studioImages ?? []).slice(0, 3);
    const hasProcess = Boolean(artist.studioProcessDescription) || studioImages.length > 0;
    const reviews = (artist.reviews ?? []).slice(0, 3);

    return (
        <div>
            {/* ---------- HERO ---------- */}
            <section className="relative overflow-hidden bg-[var(--sand-light)]">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
                    <Reveal>
                        <p
                            className="mb-4 text-2xl text-[var(--sage-dark)]"
                            style={{ fontFamily: "var(--font-script)" }}
                        >
                            Handmade{artist.city ? ` in ${artist.city}` : ""}
                        </p>
                        <h1
                            className="text-[2.75rem] italic leading-[1.05] text-[var(--ink)] sm:text-6xl"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {name}
                        </h1>
                        {artist.artistTagline && (
                            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">
                                {artist.artistTagline}
                            </p>
                        )}

                        {uniqueCraftTags.length > 0 && (
                            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                                {uniqueCraftTags.map((tag, i) => (
                                    <span key={tag} className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-[var(--sage-dark)]">
                                        {i > 0 && <span className="h-1 w-1 rounded-full bg-[var(--clay)]/60" aria-hidden />}
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="/artworks"
                                className="group inline-flex items-center gap-2 bg-[var(--clay)] px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--paper)] transition-colors hover:bg-[var(--clay-dark)]"
                            >
                                Explore the Work
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 border border-[var(--ink)]/25 px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)]/[0.03]"
                            >
                                Meet the Maker
                            </Link>
                        </div>
                    </Reveal>

                    {heroImage && (
                        <Reveal delay={150} className="mx-auto w-full max-w-sm md:mx-0">
                            <StudioFrame rotate={-1.5} className="w-full">
                                <div className="relative aspect-[4/5] w-full">
                                    <Image src={heroImage} alt={name} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" priority />
                                </div>
                            </StudioFrame>
                        </Reveal>
                    )}
                </div>
                <TornEdge fill="var(--paper)" />
            </section>

            {/* ---------- FEATURED WORK — editorial asymmetric grid ---------- */}
            {featured.length > 0 && (
                <section className="bg-[var(--paper)] py-20">
                    <div className="mx-auto max-w-6xl px-6">
                        <Reveal className="mb-10 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xl text-[var(--sage-dark)]" style={{ fontFamily: "var(--font-script)" }}>
                                    fresh from the studio
                                </p>
                                <h2 className="text-3xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                                    Recent Work
                                </h2>
                            </div>
                            {active.length > featured.length && (
                                <Link
                                    href="/artworks"
                                    className="hidden shrink-0 items-center gap-1.5 text-sm text-[var(--clay-dark)] underline-offset-4 hover:underline sm:flex"
                                >
                                    View full collection <ArrowRight size={14} />
                                </Link>
                            )}
                        </Reveal>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
                            {featured.map((artwork, i) => {
                                const img = getProductImageUrl(artwork);
                                const spanClass = i === 0 ? "col-span-2 row-span-2" : "col-span-1";
                                return (
                                    <Reveal key={artwork.id} delay={i * 80} className={spanClass}>
                                        <Link href={`/artworks/${artwork.slug ?? artwork.id}`} className="group block h-full">
                                            <div
                                                className={`relative w-full overflow-hidden bg-[var(--sand)] ${
                                                    i === 0 ? "aspect-[4/5] sm:aspect-square" : "aspect-square"
                                                }`}
                                            >
                                                {img && (
                                                    <Image
                                                        src={img}
                                                        alt={artwork.title}
                                                        fill
                                                        sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-[var(--ink)]/0 transition-colors group-hover:bg-[var(--ink)]/5" />
                                            </div>
                                            <p className="mt-3 text-sm text-[var(--ink)]">{artwork.title}</p>
                                            <p className="text-sm text-[var(--clay-dark)]">${artwork.price.toLocaleString()}</p>
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>

                        {active.length > featured.length && (
                            <div className="mt-10 text-center sm:hidden">
                                <Link href="/artworks" className="text-sm text-[var(--clay-dark)] underline-offset-4 hover:underline">
                                    View full collection →
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ---------- THE MAKING — process & studio, the emotional core ---------- */}
            {hasProcess && (
                <section className="relative bg-[var(--sage)]/[0.14]">
                    <TornEdge fill="var(--sage-dark)" className="opacity-[0.12]" />
                    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-20 md:grid-cols-2">
                        <Reveal className={studioImages.length === 0 ? "md:col-span-2 md:max-w-2xl md:mx-auto md:text-center" : ""}>
                            <div className="mb-4 inline-flex items-center gap-2 text-[var(--clay-dark)]">
                                <Hammer size={16} />
                                <span className="text-xs font-medium uppercase tracking-[0.16em]">By hand</span>
                            </div>
                            <h2 className="text-3xl italic text-[var(--ink)] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                                How It&rsquo;s Made
                            </h2>
                            {artist.studioProcessDescription && (
                                <p className="mt-5 whitespace-pre-line text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
                                    {artist.studioProcessDescription}
                                </p>
                            )}
                        </Reveal>

                        {studioImages.length > 0 && (
                            <Reveal delay={120}>
                                <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
                                    {studioImages.map((src, i) => (
                                        <StudioFrame
                                            key={src}
                                            rotate={i % 2 === 0 ? -2 : 2}
                                            className={i === 0 && studioImages.length > 1 ? "col-span-2" : ""}
                                        >
                                            <div className={`relative w-full ${i === 0 && studioImages.length > 1 ? "aspect-[16/10]" : "aspect-square"}`}>
                                                <Image src={src} alt={`${name} studio, view ${i + 1}`} fill sizes={i === 0 && studioImages.length > 1 ? "448px" : "224px"} className="object-cover" />
                                            </div>
                                        </StudioFrame>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>
                </section>
            )}

            {/* ---------- REVIEWS ---------- */}
            {reviews.length > 0 && (
                <section className="bg-[var(--paper)] py-20">
                    <div className="mx-auto max-w-5xl px-6">
                        <Reveal className="mb-12 text-center">
                            <p className="text-xl text-[var(--sage-dark)]" style={{ fontFamily: "var(--font-script)" }}>
                                kind words
                            </p>
                        </Reveal>
                        <div className={`grid grid-cols-1 gap-8 ${reviews.length > 1 ? "md:grid-cols-3" : "md:max-w-xl md:mx-auto"}`}>
                            {reviews.map((r, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <Quote size={20} className="mb-3 text-[var(--clay)]/50" />
                                    <p className="text-[0.98rem] italic leading-relaxed text-[var(--ink-soft)]">&ldquo;{r.text}&rdquo;</p>
                                    <p className="mt-4 text-sm text-[var(--ink)]">
                                        — {r.author}
                                        {r.role && <span className="text-[var(--ink-soft)]"> · {r.role}</span>}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- BIO TEASER ---------- */}
            {(artist.bio || artist.artistStatement) && (
                <section className="border-t border-[var(--ink)]/10 bg-[var(--sand)]/50 py-16">
                    <Reveal className="mx-auto max-w-2xl px-6 text-center">
                        <p className="text-[1.15rem] italic leading-relaxed text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                            &ldquo;{(artist.artistStatement ?? artist.bio ?? "").slice(0, 220)}
                            {(artist.artistStatement ?? artist.bio ?? "").length > 220 ? "…" : ""}&rdquo;
                        </p>
                        <Link
                            href="/about"
                            className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--clay-dark)] underline-offset-4 hover:underline"
                        >
                            Read the full story <ArrowRight size={14} />
                        </Link>
                    </Reveal>
                </section>
            )}
        </div>
    );
}
