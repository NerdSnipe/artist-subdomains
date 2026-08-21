import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getHeroHeadline, getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import Carousel from "./Carousel";
import AnthemStudioSection from "./AnthemStudioSection";
import AnthemGallerySection from "./AnthemGallerySection";
import AnthemArtworkCard from "./AnthemArtworkCard";

export default function AnthemHome({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const featured = active.slice(0, 6);
    const headline = getHeroHeadline(artist);

    // Real GHL carousel images always win — artwork photos are only ever the fallback for
    // artists who haven't uploaded carousel images of their own. This same rotating carousel
    // now IS the hero (headline/CTAs render on top of it) rather than a separate strip below
    // a static hero photo.
    const heroImages = artist.carouselImages?.length
        ? artist.carouselImages
        : [artist.coverPhoto, ...active.slice(0, 4).map((a) => getProductImageUrl(a))].filter(
              (v): v is string => !!v
          );

    const tags = [artist.artStyle, artist.secondaryArtStyle, artist.artisticMedium ?? artist.medium, artist.location]
        .filter((v): v is string => !!v);

    return (
        <div>
            <Carousel images={heroImages} alt={name} heightClassName="min-h-[92vh]" overlay="hero">
                <div className="h-full flex items-end">
                    <div className="max-w-[1500px] mx-auto w-full px-5 md:px-10 pb-14 md:pb-20">
                        <p className="max-w-full md:max-w-[640px] text-[13px] font-bold tracking-[0.22em] uppercase text-[#FFDC00] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-4">
                            {artist.artistTagline ?? "Contemporary Artist"} · {artist.location}
                        </p>
                        <h1 className="font-[family-name:var(--font-display)] uppercase text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] leading-[0.88] text-[15vw] md:text-[9vw] lg:text-[130px]">
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
                                href="/contact#commission"
                                className="inline-block border-2 border-white text-white font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 backdrop-blur-[2px] hover:bg-white hover:text-black transition-colors"
                            >
                                Commission a Piece
                            </Link>
                        </div>
                    </div>
                </div>
            </Carousel>

            {tags.length > 0 && <Marquee items={tags} />}

            {/* ── Available Artwork (before About-style content, per feedback) ─────── */}
            {featured.length > 0 && (
                <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
                    <Reveal className="flex items-end justify-between mb-10 border-b-4 border-black pb-5">
                        <div>
                            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">Original Fine Art Catalog</p>
                            <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Available Artwork</h2>
                        </div>
                        <Link href="/artworks" className="hidden md:inline text-sm font-bold uppercase tracking-widest hover:text-[#E62828]">
                            Explore All My Artwork →
                        </Link>
                    </Reveal>
                    {/* Masonry, same treatment as the artworks page: full image visible (no forced
                        crop), each card's aspect-ratio matched to its real physical proportions. */}
                    <div className="columns-2 md:columns-3 gap-6 [column-fill:_balance]">
                        {featured.map((art, i) => (
                            <Reveal key={art.id} delay={Math.min(i, 6) * 60} className="break-inside-avoid mb-6 block">
                                <AnthemArtworkCard art={art} priority={i < 3} />
                            </Reveal>
                        ))}
                    </div>
                    <Link href="/artworks" className="md:hidden mt-8 inline-block text-sm font-bold uppercase tracking-widest hover:text-[#E62828]">
                        Explore All My Artwork →
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
                <section className="relative border-y-4 border-black py-24 md:py-32 overflow-hidden">
                    {artist.profilePhoto && (
                        <>
                            <Image src={artist.profilePhoto} alt={name} fill sizes="100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-black/85" />
                        </>
                    )}
                    {!artist.profilePhoto && <div className="absolute inset-0 bg-black" />}
                    <Reveal className="relative max-w-[1150px] mx-auto px-5 md:px-10 text-center">
                        <p className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl lg:text-[32px] leading-[1.35] text-[#F7F4EC] drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
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
