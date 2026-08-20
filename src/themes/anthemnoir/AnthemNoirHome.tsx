import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getHeroHeadline, getProductImageUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import Carousel from "./Carousel";
import AnthemNoirStudioSection from "./AnthemNoirStudioSection";
import AnthemNoirGallerySection from "./AnthemNoirGallerySection";

export default function AnthemNoirHome({ artist, artworks }: ThemePageProps) {
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
                    <div className="max-w-[1600px] mx-auto w-full px-5 md:px-10 pb-14 md:pb-20">
                        <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-4">
                            {artist.artistTagline ?? "Contemporary Artist"} · {artist.location}
                        </p>
                        <h1 className="font-[family-name:var(--font-display)] uppercase text-[#E9DFC9] drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] leading-[0.88] text-[15vw] md:text-[9vw] lg:text-[130px]">
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
                                className="inline-block bg-[#C9A227] text-[#0C0B09] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#E9DFC9] transition-colors"
                            >
                                View the Collection
                            </Link>
                            <Link
                                href="/contact#commission"
                                className="inline-block border-2 border-[#E9DFC9] text-[#E9DFC9] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 backdrop-blur-[2px] hover:bg-[#E9DFC9] hover:text-[#0C0B09] transition-colors"
                            >
                                Commission a Piece
                            </Link>
                        </div>
                    </div>
                </div>
            </Carousel>

            {tags.length > 0 && <Marquee items={tags} />}

            {featured.length > 0 && (
                <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
                    <Reveal className="flex items-end justify-between mb-10 border-b-4 border-[#E9DFC9] pb-5">
                        <div>
                            <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-3">Original Work</p>
                            <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Available Artwork</h2>
                        </div>
                        <Link href="/artworks" className="hidden md:inline text-sm font-bold uppercase tracking-widest hover:text-[#C9A227]">
                            View All →
                        </Link>
                    </Reveal>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {featured.map((art, i) => {
                            const img = getProductImageUrl(art);
                            return (
                                <Reveal key={art.id} delay={Math.min(i, 6) * 60}>
                                    <Link href={`/artworks/${art.slug ?? art.id}`} className="group block">
                                        <div className="relative aspect-[4/5] bg-black overflow-hidden border-2 border-[#E9DFC9]">
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
                                        <p className="text-xs text-[#C9A227] font-bold">${art.price.toLocaleString()}</p>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                    <Link href="/artworks" className="md:hidden mt-8 inline-block text-sm font-bold uppercase tracking-widest hover:text-[#C9A227]">
                        View All →
                    </Link>
                </section>
            )}

            {artist.description && (
                <section className="max-w-[1000px] mx-auto px-5 md:px-10 py-20 md:py-28 text-center border-t-4 border-[#E9DFC9]">
                    <Reveal>
                        <p className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-5xl leading-[1.15]">
                            {artist.studioSubtitle ??
                                "Las Vegas artist Rocky Asbury creates what can only be described as beautiful chaos — bold, layered explosions of color, texture, and raw energy that pull you in and refuse to let go."}
                        </p>
                    </Reveal>
                </section>
            )}

            {artist.artistStatement && (
                <section className="relative border-y-4 border-[#E9DFC9] py-24 md:py-32 overflow-hidden">
                    {artist.profilePhoto && (
                        <>
                            <Image src={artist.profilePhoto} alt={name} fill sizes="100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-[#0C0B09]/85" />
                        </>
                    )}
                    {!artist.profilePhoto && <div className="absolute inset-0 bg-[#E9DFC9]" />}
                    <Reveal className="relative max-w-[1150px] mx-auto px-5 md:px-10 text-center">
                        <p
                            className={`font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl lg:text-[32px] leading-[1.35] ${
                                artist.profilePhoto ? "text-[#E9DFC9] drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]" : "text-[#0C0B09]"
                            }`}
                        >
                            &ldquo;{artist.artistStatement}&rdquo;
                        </p>
                        <p
                            className={`mt-8 text-sm font-bold tracking-[0.2em] uppercase ${
                                artist.profilePhoto ? "text-[#C9A227]" : "text-[#8A6D1F]"
                            }`}
                        >
                            — {name}
                        </p>
                    </Reveal>
                </section>
            )}

            <AnthemNoirStudioSection artist={artist} />

            <AnthemNoirGallerySection artist={artist} />
        </div>
    );
}
