import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";
import Filmstrip from "./Filmstrip";

const BENTO_PATTERN = [
    "col-span-6 md:col-span-4 md:row-span-2",
    "col-span-3 md:col-span-2",
    "col-span-3 md:col-span-2",
    "col-span-6 md:col-span-3",
    "col-span-6 md:col-span-3",
    "col-span-6",
];

export default function StudioHome({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const featured = active.slice(0, 7);
    const heroArtwork = featured[0] ?? active[0] ?? null;
    const heroImg = heroArtwork ? getProductImageUrl(heroArtwork) : (artist.coverPhoto ?? artist.bioPhoto ?? null);
    const bentoWorks = featured.slice(1, 7);

    const studioShots = Array.from(
        new Set([...(artist.studioImages ?? []), ...(artist.carouselImages ?? [])].filter(Boolean))
    ).slice(0, 10);

    const archive = (artist.soldArtworks ?? []).slice(0, 8);

    return (
        <div>
            <style>{`
                @keyframes studio-kenburns {
                    0% { transform: scale(1.02) translate3d(0,0,0); }
                    100% { transform: scale(1.12) translate3d(-1%, -1%, 0); }
                }
                @keyframes studio-glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.85; }
                }
                .studio-hero-img { animation: studio-kenburns 22s ease-in-out infinite alternate; }
                .studio-hero-spotlight { animation: studio-glow 8s ease-in-out infinite; }
            `}</style>

            {/* Cinematic hero with vignette + spotlight */}
            <section className="relative flex h-[92vh] min-h-[600px] w-full items-end overflow-hidden bg-neutral-950">
                {heroImg && (
                    <Image
                        src={heroImg}
                        alt={name}
                        fill
                        priority
                        className="studio-hero-img object-cover opacity-[0.55]"
                    />
                )}
                <div
                    className="studio-hero-spotlight pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(60% 55% at 50% 38%, rgba(255,235,205,0.16) 0%, rgba(10,9,8,0) 60%)",
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 50% 30%, transparent 30%, rgba(10,9,8,0.55) 78%, rgba(10,9,8,0.97) 100%)",
                    }}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0908] to-transparent" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
                    <p className="mb-5 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-amber-100/60">
                        Working Studio
                    </p>
                    <h1 className="font-[family-name:var(--font-studio-display)] text-[15vw] font-extralight italic leading-[0.92] tracking-tight text-neutral-50 sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                        {name}
                    </h1>
                    {artist.artistTagline && (
                        <p className="mt-6 max-w-xl font-[family-name:var(--font-studio-body)] text-lg font-light text-neutral-300 md:text-xl">
                            {artist.artistTagline}
                        </p>
                    )}
                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <Link
                            href="/artworks"
                            className="group inline-flex items-center gap-2 border-b border-neutral-100 pb-1 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.35em] text-neutral-100 transition-colors hover:border-amber-100/70 hover:text-amber-100/90"
                        >
                            View the Work
                            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="/about"
                            className="font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.35em] text-neutral-500 transition-colors hover:text-neutral-300"
                        >
                            About the Artist
                        </Link>
                    </div>
                </div>
            </section>

            {/* Inside the studio — filmstrip gallery */}
            {studioShots.length > 0 && (
                <section className="border-t border-neutral-800/60 py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-6 md:px-10">
                        <ScrollReveal>
                            <div className="mb-10 flex items-end justify-between gap-4">
                                <div>
                                    <p className="mb-3 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                                        In the Studio
                                    </p>
                                    <h2 className="font-[family-name:var(--font-studio-display)] text-3xl italic font-light text-neutral-100 md:text-5xl">
                                        Where the work gets made
                                    </h2>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delayMs={120}>
                            <Filmstrip images={studioShots} altPrefix={`${name} studio`} />
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* Process narrative */}
            {artist.studioProcessDescription && (
                <section className="border-t border-neutral-800/60 bg-gradient-to-b from-transparent via-neutral-900/20 to-transparent py-20 md:py-28">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[auto_1fr] md:gap-16 md:px-10">
                        <ScrollReveal>
                            <Quote size={40} className="text-amber-100/25" strokeWidth={1} />
                        </ScrollReveal>
                        <ScrollReveal delayMs={100}>
                            <p className="mb-6 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                                Process
                            </p>
                            <p className="max-w-3xl font-[family-name:var(--font-studio-display)] text-2xl font-light italic leading-relaxed text-neutral-200 md:text-4xl">
                                {artist.studioProcessDescription}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* Bento works grid */}
            {bentoWorks.length > 0 && (
                <section className="border-t border-neutral-800/60 py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-6 md:px-10">
                        <ScrollReveal>
                            <div className="mb-10 flex items-end justify-between gap-4">
                                <div>
                                    <p className="mb-3 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                                        Selected Works
                                    </p>
                                    <h2 className="font-[family-name:var(--font-studio-display)] text-3xl italic font-light text-neutral-100 md:text-5xl">
                                        Recent from the studio
                                    </h2>
                                </div>
                                <Link
                                    href="/artworks"
                                    className="hidden shrink-0 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-600 transition-colors hover:text-neutral-300 md:inline-block"
                                >
                                    All Works →
                                </Link>
                            </div>
                        </ScrollReveal>

                        <div className="grid auto-rows-[180px] grid-cols-6 gap-3 [grid-auto-flow:dense] md:auto-rows-[220px] md:gap-4">
                            {bentoWorks.map((artwork, i) => {
                                const img = getProductImageUrl(artwork);
                                const span = BENTO_PATTERN[i % BENTO_PATTERN.length];
                                return (
                                    <ScrollReveal key={artwork.id} delayMs={(i % 3) * 90} className={span}>
                                        <Link
                                            href={`/artworks/${artwork.slug ?? artwork.id}`}
                                            className="group relative block h-full w-full overflow-hidden bg-neutral-900"
                                        >
                                            {img && (
                                                <Image
                                                    src={img}
                                                    alt={artwork.title}
                                                    fill
                                                    sizes="(min-width: 768px) 33vw, 100vw"
                                                    className="object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                                                />
                                            )}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                <p className="font-[family-name:var(--font-studio-body)] text-sm font-medium text-neutral-50">
                                                    {artwork.title}
                                                </p>
                                                <p className="font-[family-name:var(--font-studio-condensed)] text-xs tracking-wide text-neutral-300">
                                                    ${artwork.price.toLocaleString()}
                                                </p>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>

                        <Link
                            href="/artworks"
                            className="mt-8 inline-block font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-600 transition-colors hover:text-neutral-300 md:hidden"
                        >
                            All Works →
                        </Link>
                    </div>
                </section>
            )}

            {/* Statement teaser */}
            {(artist.artistStatement || artist.bio) && (
                <section className="border-t border-neutral-800/60 py-20 md:py-28">
                    <ScrollReveal>
                        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
                            <p className="mb-6 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                                Artist Statement
                            </p>
                            <p className="font-[family-name:var(--font-studio-display)] text-2xl font-light italic leading-relaxed text-neutral-200 md:text-3xl">
                                &ldquo;{(artist.artistStatement ?? artist.bio ?? "").slice(0, 320)}
                                {(artist.artistStatement ?? artist.bio ?? "").length > 320 ? "…" : ""}&rdquo;
                            </p>
                            <Link
                                href="/about"
                                className="mt-8 inline-block border-b border-neutral-700 pb-1 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-500 transition-colors hover:border-amber-100/60 hover:text-amber-100/80"
                            >
                                Read the Full Story
                            </Link>
                        </div>
                    </ScrollReveal>
                </section>
            )}

            {/* Archive / track record */}
            {archive.length > 0 && (
                <section className="border-t border-neutral-800/60 py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-6 md:px-10">
                        <ScrollReveal>
                            <p className="mb-3 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                                Archive
                            </p>
                            <h2 className="mb-10 font-[family-name:var(--font-studio-display)] text-3xl italic font-light text-neutral-100 md:text-5xl">
                                Now in private collections
                            </h2>
                        </ScrollReveal>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                            {archive.map((piece, i) => (
                                <ScrollReveal key={piece.id ?? `${piece.title}-${i}`} delayMs={(i % 4) * 80}>
                                    <div className="group relative aspect-square overflow-hidden bg-neutral-900">
                                        {piece.image && (
                                            <Image
                                                src={piece.image}
                                                alt={piece.title}
                                                fill
                                                sizes="(min-width: 768px) 25vw, 50vw"
                                                className="object-cover opacity-45 grayscale transition-all duration-700 group-hover:opacity-80 group-hover:grayscale-0"
                                            />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                            <p className="truncate font-[family-name:var(--font-studio-body)] text-xs text-neutral-300">
                                                {piece.title}
                                            </p>
                                            {piece.year && (
                                                <p className="font-[family-name:var(--font-studio-condensed)] text-[10px] tracking-widest text-neutral-600">
                                                    {piece.year}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
