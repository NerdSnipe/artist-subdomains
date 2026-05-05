import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function GalleryHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const activeWorks = artworks.filter((a) => a.status === "active").slice(0, 9);
    const heroImage = artist.coverPhoto ?? artist.profilePhoto ?? null;

    return (
        <div>
            {/* Hero */}
            <section className="relative h-[70vh] min-h-[480px] bg-neutral-100 overflow-hidden">
                {heroImage ? (
                    <Image
                        src={heroImage}
                        alt={name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-200" />
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                    <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase mb-4">
                        {name}
                    </h1>
                    {artist.artistTagline && (
                        <p className="text-lg md:text-xl font-light opacity-90 max-w-lg">
                            {artist.artistTagline}
                        </p>
                    )}
                    {artist.city && (
                        <p className="text-sm tracking-widest uppercase mt-3 opacity-70">
                            {artist.city}{artist.state ? `, ${artist.state}` : ""}
                        </p>
                    )}
                    <Link
                        href="/artworks"
                        className="mt-8 px-8 py-3 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-neutral-900 transition-colors"
                    >
                        View Works
                    </Link>
                </div>
            </section>

            {/* Featured artworks */}
            {activeWorks.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-xs tracking-widest uppercase text-neutral-400 mb-8">
                        Selected Works
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeWorks.map((artwork) => {
                            const imgUrl = getProductImageUrl(artwork);
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-square bg-neutral-100 overflow-hidden mb-3">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                    </div>
                                    <p className="text-sm font-light">{artwork.title}</p>
                                    <p className="text-sm text-neutral-400">${artwork.price.toLocaleString()}</p>
                                </Link>
                            );
                        })}
                    </div>
                    {artworks.filter((a) => a.status === "active").length > 9 && (
                        <div className="mt-10 text-center">
                            <Link
                                href="/artworks"
                                className="text-sm tracking-widest uppercase text-neutral-500 hover:text-neutral-900 underline"
                            >
                                View All Works
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* Bio snippet */}
            {artist.bio && (
                <section className="border-t border-neutral-100 py-16">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <p className="text-neutral-600 font-light leading-relaxed text-lg">
                            {artist.bio.slice(0, 300)}{artist.bio.length > 300 ? "…" : ""}
                        </p>
                        <Link
                            href="/about"
                            className="inline-block mt-6 text-sm tracking-widest uppercase text-neutral-400 hover:text-neutral-900 underline"
                        >
                            Read More
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
