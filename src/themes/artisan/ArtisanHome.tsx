import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function ArtisanHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const featured = artworks.filter((a) => a.status === "active").slice(0, 6);

    return (
        <div style={{ fontFamily: "'Georgia', serif" }}>
            {/* Warm hero */}
            <section className="bg-amber-100 border-b border-amber-200">
                <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-xs text-amber-700 tracking-widest uppercase mb-4">Handcrafted with intention</p>
                        <h1 className="text-4xl md:text-5xl text-stone-800 leading-tight mb-4">
                            <em>{name}</em>
                        </h1>
                        {artist.artistTagline && (
                            <p className="text-stone-600 text-lg mb-6 leading-relaxed">{artist.artistTagline}</p>
                        )}
                        {artist.city && (
                            <p className="text-sm text-amber-700 mb-8">
                                {artist.city}{artist.state ? `, ${artist.state}` : ""}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/artworks"
                                className="inline-block bg-stone-800 text-amber-50 px-7 py-3 text-sm hover:bg-stone-700 transition-colors"
                            >
                                Explore Gallery
                            </Link>
                            <Link
                                href="/about"
                                className="inline-block border border-stone-400 text-stone-600 px-7 py-3 text-sm hover:border-stone-700 transition-colors"
                            >
                                My Story
                            </Link>
                        </div>
                    </div>
                    {(artist.profilePhoto || artist.coverPhoto) && (
                        <div className="relative aspect-[4/5] bg-amber-200 max-w-sm mx-auto md:mx-0">
                            <Image
                                src={(artist.coverPhoto ?? artist.profilePhoto)!}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Featured works — staggered grid */}
            {featured.length > 0 && (
                <section className="max-w-5xl mx-auto px-6 py-16">
                    <h2 className="text-2xl text-stone-700 mb-10">
                        <em>Recent Work</em>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {featured.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-[4/5] bg-amber-100 overflow-hidden mb-3 border border-amber-200">
                                        {img && (
                                            <Image
                                                src={img}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover group-hover:scale-103 transition-transform duration-500"
                                            />
                                        )}
                                    </div>
                                    <p className="text-stone-700 text-sm">{artwork.title}</p>
                                    <p className="text-amber-700 text-sm mt-0.5">${artwork.price.toLocaleString()}</p>
                                </Link>
                            );
                        })}
                    </div>
                    {artworks.filter((a) => a.status === "active").length > 6 && (
                        <div className="mt-10 text-center">
                            <Link
                                href="/artworks"
                                className="text-sm text-amber-700 hover:text-stone-800 underline"
                            >
                                See the full gallery →
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* Bio snippet */}
            {artist.bio && (
                <section className="bg-amber-100 border-y border-amber-200 py-14">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <p className="text-stone-600 leading-relaxed text-lg italic">
                            &ldquo;{artist.bio.slice(0, 280)}{artist.bio.length > 280 ? "…" : ""}&rdquo;
                        </p>
                        <Link href="/about" className="inline-block mt-6 text-sm text-amber-700 hover:text-stone-800 underline">
                            Read my story →
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
