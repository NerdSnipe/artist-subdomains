import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function MarketAbout({ artist, domain }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-stone-900 mb-8">About {name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                {artist.profilePhoto && (
                    <div className="relative aspect-square bg-stone-100">
                        <Image src={artist.profilePhoto} alt={name} fill className="object-cover" />
                    </div>
                )}
                <div className={artist.profilePhoto ? "md:col-span-2" : "md:col-span-3"}>
                    {artist.city && (
                        <p className="text-sm text-stone-400 mb-4">
                            {artist.city}{artist.state ? `, ${artist.state}` : ""}
                        </p>
                    )}
                    {artist.bio && (
                        <p className="text-stone-600 leading-relaxed mb-6 whitespace-pre-line">{artist.bio}</p>
                    )}
                    {artist.artistStatement && (
                        <blockquote className="border-l-4 border-stone-900 pl-4 text-stone-500 italic leading-relaxed">
                            {artist.artistStatement}
                        </blockquote>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <Link
                    href="/artworks"
                    className="inline-block bg-stone-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-stone-700 transition-colors"
                >
                    Shop All Works
                </Link>
                {artist.slug && (
                    <a
                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-stone-300 text-stone-600 px-6 py-2.5 text-sm font-semibold hover:border-stone-600 transition-colors"
                    >
                        Full ArtsDistrictUSA Profile →
                    </a>
                )}
            </div>

            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <div className="border-t border-stone-100 mt-12 pt-10">
                    <h2 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">Exhibitions</h2>
                    <div className="space-y-3">
                        {artist.exhibitions.map((ex, i) => (
                            <div key={i} className="flex gap-6 text-sm">
                                <span className="text-stone-400 w-12 shrink-0">{ex.year}</span>
                                <span className="text-stone-600">{ex.title}{ex.location ? ` — ${ex.location}` : ""}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
