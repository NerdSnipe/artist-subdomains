import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function StudioAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-7xl mx-auto px-8 py-16">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-600 mb-16">Artist</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                {artist.bioPhoto && (
                    <div className="relative aspect-[4/5] bg-neutral-900">
                        <Image src={artist.bioPhoto} alt={name} fill className="object-cover opacity-80" />
                    </div>
                )}
                <div className={artist.bioPhoto ? "" : "lg:col-span-2 max-w-3xl"}>
                    <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-neutral-100 mb-6">{name}</h1>
                    {artist.city && (
                        <p className="text-xs tracking-[0.2em] uppercase text-neutral-600 mb-8">
                            {artist.city}{artist.state ? `, ${artist.state}` : ""}
                        </p>
                    )}
                    {artist.bio && (
                        <p className="text-neutral-400 font-light leading-relaxed whitespace-pre-line">{artist.bio}</p>
                    )}
                    {artist.artistStatement && (
                        <blockquote className="mt-10 border-l border-neutral-700 pl-6 text-neutral-500 italic font-light leading-relaxed">
                            {artist.artistStatement}
                        </blockquote>
                    )}
                </div>
            </div>

            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <div className="border-t border-neutral-800 pt-12 mb-12">
                    <p className="text-xs tracking-[0.3em] uppercase text-neutral-700 mb-8">Exhibitions</p>
                    <div className="space-y-4 max-w-2xl">
                        {artist.exhibitions.map((ex, i) => (
                            <div key={i} className="grid grid-cols-[60px_1fr] gap-6 text-sm">
                                <span className="text-neutral-700">{ex.year}</span>
                                <span className="text-neutral-400 font-light">
                                    {ex.title}{ex.location ? ` — ${ex.location}` : ""}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
