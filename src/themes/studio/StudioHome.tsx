import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function StudioHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const featured = artworks.filter((a) => a.status === "active").slice(0, 6);
    const heroArtwork = featured[0] ?? null;
    const heroImg = heroArtwork ? getProductImageUrl(heroArtwork) : (artist.coverPhoto ?? null);

    return (
        <div>
            {/* Full-bleed editorial hero */}
            <section className="relative h-screen bg-neutral-900 overflow-hidden">
                {heroImg && (
                    <Image
                        src={heroImg}
                        alt={name}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                )}
                <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-16 max-w-7xl mx-auto">
                    <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">Artist Studio</p>
                    <h1 className="text-5xl md:text-8xl font-extralight tracking-tight text-neutral-100 leading-none mb-6">
                        {name}
                    </h1>
                    {artist.artistTagline && (
                        <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mb-8">
                            {artist.artistTagline}
                        </p>
                    )}
                    <div className="flex gap-6">
                        <Link
                            href="/artworks"
                            className="text-xs tracking-[0.3em] uppercase text-neutral-100 border-b border-neutral-100 pb-0.5 hover:border-neutral-400 hover:text-neutral-400 transition-colors"
                        >
                            View Works
                        </Link>
                        <Link
                            href="/about"
                            className="text-xs tracking-[0.3em] uppercase text-neutral-500 border-b border-neutral-700 pb-0.5 hover:border-neutral-400 hover:text-neutral-400 transition-colors"
                        >
                            About
                        </Link>
                    </div>
                </div>
            </section>

            {/* Works grid — asymmetric editorial layout */}
            {featured.length > 1 && (
                <section className="max-w-7xl mx-auto px-8 py-20">
                    <div className="flex items-center justify-between mb-10">
                        <p className="text-xs tracking-[0.3em] uppercase text-neutral-600">Selected Works</p>
                        <Link
                            href="/artworks"
                            className="text-xs tracking-[0.3em] uppercase text-neutral-600 hover:text-neutral-300"
                        >
                            All Works →
                        </Link>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        {featured.slice(1).map((artwork, i) => {
                            const img = getProductImageUrl(artwork);
                            const isLarge = i === 0 || i === 3;
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className={`group block ${isLarge ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5"}`}
                                >
                                    <div className="relative bg-neutral-900 overflow-hidden"
                                        style={{ aspectRatio: isLarge ? "16/9" : "4/3" }}>
                                        {img && (
                                            <Image
                                                src={img}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            />
                                        )}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-xs text-neutral-500 tracking-wide">{artwork.title}</p>
                                        <p className="text-xs text-neutral-700">${artwork.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Bio strip */}
            {artist.bio && (
                <section className="border-t border-neutral-800 py-16">
                    <div className="max-w-3xl mx-auto px-8">
                        <p className="text-neutral-400 font-light leading-relaxed text-lg">
                            {artist.bio.slice(0, 400)}{artist.bio.length > 400 ? "…" : ""}
                        </p>
                        <Link
                            href="/about"
                            className="inline-block mt-6 text-xs tracking-[0.3em] uppercase text-neutral-600 hover:text-neutral-300 border-b border-neutral-800 pb-0.5"
                        >
                            About the Artist
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
