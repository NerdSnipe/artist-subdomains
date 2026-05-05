import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function MarketHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active").slice(0, 8);

    return (
        <div>
            {/* Hero — split layout */}
            <section className="bg-white border-b border-stone-100">
                <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Original Artwork</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">{name}</h1>
                        {artist.artistTagline && (
                            <p className="text-stone-500 text-lg mb-6">{artist.artistTagline}</p>
                        )}
                        {artist.city && (
                            <p className="text-sm text-stone-400 mb-8">
                                Based in {artist.city}{artist.state ? `, ${artist.state}` : ""}
                            </p>
                        )}
                        <Link
                            href={`/${domain}/artworks`}
                            className="inline-block bg-stone-900 text-white px-8 py-3 text-sm font-semibold hover:bg-stone-700 transition-colors"
                        >
                            Shop All Works
                        </Link>
                    </div>
                    {artist.profilePhoto && (
                        <div className="relative aspect-square bg-stone-100 max-w-sm mx-auto md:mx-0">
                            <Image src={artist.profilePhoto} alt={name} fill className="object-cover" />
                        </div>
                    )}
                </div>
            </section>

            {/* Product grid */}
            {active.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-stone-900">Available Works</h2>
                        <Link href={`/${domain}/artworks`} className="text-sm text-stone-500 hover:text-stone-900 underline">
                            View all →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {active.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/${domain}/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group bg-white border border-stone-100 hover:border-stone-300 transition-colors block"
                                >
                                    <div className="relative aspect-square bg-stone-50 overflow-hidden">
                                        {img && (
                                            <Image
                                                src={img}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover group-hover:scale-103 transition-transform duration-300"
                                            />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm font-semibold text-stone-900 leading-tight mb-1">{artwork.title}</p>
                                        {artwork.dimensions && (
                                            <p className="text-xs text-stone-400 mb-2">
                                                {artwork.dimensions.width}″ × {artwork.dimensions.height}″
                                            </p>
                                        )}
                                        <p className="text-base font-bold text-stone-900">${artwork.price.toLocaleString()}</p>
                                        {artwork.salePrice && (
                                            <p className="text-xs text-red-600 font-semibold">Sale: ${artwork.salePrice.toLocaleString()}</p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Trust strip */}
            <section className="bg-white border-t border-stone-100 py-8 mt-6">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="text-sm font-semibold text-stone-900">Original Works</p>
                        <p className="text-xs text-stone-400 mt-1">Every piece is one-of-a-kind</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-stone-900">Secure Purchase</p>
                        <p className="text-xs text-stone-400 mt-1">Handled through ArtDistrictUSA</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-stone-900">Artist Direct</p>
                        <p className="text-xs text-stone-400 mt-1">Commission inquiries welcome</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
