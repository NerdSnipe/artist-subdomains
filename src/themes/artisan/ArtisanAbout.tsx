import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function ArtisanAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-4xl mx-auto px-6 py-14" style={{ fontFamily: "'Georgia', serif" }}>
            <h1 className="text-3xl text-stone-700 mb-2"><em>My Story</em></h1>
            {artist.city && <p className="text-sm text-amber-700 mb-12">{artist.city}{artist.state ? `, ${artist.state}` : ""}</p>}

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
                {artist.bioPhoto && (
                    <div className="md:col-span-2 relative aspect-[3/4] bg-amber-100 border border-amber-200">
                        <Image src={artist.bioPhoto} alt={name} fill className="object-cover" />
                    </div>
                )}
                <div className={artist.bioPhoto ? "md:col-span-3" : "md:col-span-5"}>
                    <h2 className="text-2xl text-stone-700 mb-5"><em>{name}</em></h2>
                    {artist.bio && (
                        <p className="text-stone-600 leading-loose whitespace-pre-line">{artist.bio}</p>
                    )}
                    {artist.artistStatement && (
                        <blockquote className="mt-8 bg-amber-100 border-l-4 border-amber-400 px-5 py-4 text-stone-600 italic leading-relaxed">
                            &ldquo;{artist.artistStatement}&rdquo;
                        </blockquote>
                    )}
                </div>
            </div>

            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <div className="border-t border-amber-200 pt-10 mb-10">
                    <h3 className="text-xl text-stone-600 mb-6"><em>Exhibitions</em></h3>
                    <div className="space-y-3">
                        {artist.exhibitions.map((ex, i) => (
                            <div key={i} className="flex gap-6 text-sm">
                                <span className="text-amber-700 w-12 shrink-0">{ex.year}</span>
                                <span className="text-stone-600">{ex.title}{ex.location ? ` — ${ex.location}` : ""}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {artist.galleries && artist.galleries.length > 0 && (
                <div className="border-t border-amber-200 pt-10">
                    <h3 className="text-xl text-stone-600 mb-6"><em>Gallery Representation</em></h3>
                    <div className="space-y-2">
                        {artist.galleries.map((g, i) => (
                            <div key={i} className="text-sm text-stone-600">
                                {g.link || g.url ? (
                                    <a href={g.link ?? g.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">{g.name}</a>
                                ) : g.name}
                                {(g.city || g.state) && (
                                    <span className="text-amber-700 ml-2">{[g.city, g.state].filter(Boolean).join(", ")}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
