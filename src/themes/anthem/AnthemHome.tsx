import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getHeroHeadline, getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import Carousel from "./Carousel";
import AnthemStudioSection from "./AnthemStudioSection";
import AnthemGallerySection from "./AnthemGallerySection";

export default function AnthemHome({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const featured = active.slice(0, 6);
    const heroImage = artist.coverPhoto ?? (active[0] ? getProductImageUrl(active[0]) : undefined);
    const headline = getHeroHeadline(artist);

    // Real GHL carousel images always win. Artwork photos are only ever used as a fallback,
    // for artists who haven't uploaded carousel images of their own.
    const carouselImages = artist.carouselImages?.length
        ? artist.carouselImages
        : active.slice(0, 4).map((a) => getProductImageUrl(a)).filter(Boolean);

    const tags = [artist.artStyle, artist.secondaryArtStyle, artist.artisticMedium ?? artist.medium, artist.location]
        .filter((v): v is string => !!v);

    return (
        <div>
            {/* ── Statement Hero (nav overlays this as a translucent dark strip) ───────── */}
            <section className="relative min-h-[92vh] flex items-end border-b-4 border-black overflow-hidden">
                {heroImage && (
                    <Image
                        src={heroImage}
                        alt={name}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                <div className="relative z-10 max-w-[1500px] mx-auto w-full px-5 md:px-10 pb-14 md:pb-20">
                    <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#FFDC00] mb-4">
                        {artist.artistTagline ?? "Contemporary Artist"} · {artist.location}
                    </p>
                    <h1 className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.88] text-[15vw] md:text-[9vw] lg:text-[130px]">
                        {headline[0]}
                        {headline[1] && (
                            <>
                                <br />
                                {headline[1]}
                            </>
                        )}
                    </h1>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/artworks"
                            className="inline-block bg-[#FFDC00] text-black font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-white transition-colors"
                        >
                            View the Collection
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-block border-2 border-white text-white font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-white hover:text-black transition-colors"
                        >
                            Commission a Piece
                        </Link>
                    </div>
                </div>
            </section>

            {tags.length > 0 && <Marquee items={tags} />}

            {/* ── Photo Carousel ─────────────────────────────────────────── */}
            {carouselImages.length > 0 && <Carousel images={carouselImages} alt={name} />}

            {/* ── Available Artwork (before About-style content, per feedback) ─────── */}
            {featured.length > 0 && (
                <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
                    <Reveal className="flex items-end justify-between mb-10 border-b-4 border-black pb-5">
                        <div>
                            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">Original Work</p>
                            <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Available Artwork</h2>
                        </div>
                        <Link href="/artworks" className="hidden md:inline text-sm font-bold uppercase tracking-widest hover:text-[#E62828]">
                            View All →
                        </Link>
                    </Reveal>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {featured.map((art, i) => {
                            const img = getProductImageUrl(art);
                            return (
                                <Reveal key={art.id} delay={Math.min(i, 6) * 60}>
                                    <Link href={`/artworks/${art.slug ?? art.id}`} className="group block">
                                        <div className="relative aspect-[4/5] bg-black overflow-hidden border-2 border-black">
                                            {img && (
                                                <Image
                                                    src={img}
                                                    alt={art.title}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}
                                        </div>
                                        <p className="mt-3 font-bold uppercase text-sm tracking-wide">{art.title}</p>
                                        <p className="text-xs text-black/60">${art.price.toLocaleString()}</p>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                    <Link href="/artworks" className="md:hidden mt-8 inline-block text-sm font-bold uppercase tracking-widest hover:text-[#E62828]">
                        View All →
                    </Link>
                </section>
            )}

            {/* ── Preamble ───────────────────────────────────────────────── */}
            {artist.description && (
                <section className="max-w-[1000px] mx-auto px-5 md:px-10 py-20 md:py-28 text-center border-t-4 border-black">
                    <Reveal>
                        <p className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-5xl leading-[1.15]">
                            {artist.studioSubtitle ??
                                "Las Vegas artist Rocky Asbury creates what can only be described as beautiful chaos — bold, layered explosions of color, texture, and raw energy that pull you in and refuse to let go."}
                        </p>
                    </Reveal>
                </section>
            )}

            {/* ── Quote ──────────────────────────────────────────────────── */}
            {artist.artistStatement && (
                <section className="bg-black text-[#F7F4EC] border-y-4 border-black py-24 md:py-32">
                    <Reveal className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
                        <p className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-5xl lg:text-6xl leading-[1.1]">
                            &ldquo;{artist.artistStatement}&rdquo;
                        </p>
                        <p className="mt-8 text-sm font-bold tracking-[0.2em] uppercase text-[#FFDC00]">— {name}</p>
                    </Reveal>
                </section>
            )}

            {/* ── Inside the Studio ─────────────────────────────────────── */}
            <AnthemStudioSection artist={artist} />

            {/* ── Gallery Representations ───────────────────────────────── */}
            <AnthemGallerySection artist={artist} />
        </div>
    );
}
