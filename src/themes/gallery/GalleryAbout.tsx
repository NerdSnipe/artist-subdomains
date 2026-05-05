import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function GalleryAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-xs tracking-widest uppercase text-neutral-400 mb-10">About</h1>

            {/* Bio photo + statement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {artist.bioPhoto && (
                    <div className="relative aspect-[3/4] bg-neutral-100">
                        <Image
                            src={artist.bioPhoto}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className={artist.bioPhoto ? "" : "md:col-span-2"}>
                    <h2 className="text-2xl font-light mb-6">{name}</h2>
                    {artist.city && (
                        <p className="text-sm text-neutral-400 tracking-wide mb-6">
                            {artist.city}{artist.state ? `, ${artist.state}` : ""}
                        </p>
                    )}
                    {artist.bio && (
                        <p className="text-neutral-600 font-light leading-relaxed whitespace-pre-line">
                            {artist.bio}
                        </p>
                    )}
                    {artist.artistStatement && (
                        <blockquote className="mt-8 pl-4 border-l-2 border-neutral-200 text-neutral-500 italic font-light leading-relaxed">
                            {artist.artistStatement}
                        </blockquote>
                    )}
                </div>
            </div>

            {/* Exhibitions */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-xs tracking-widest uppercase text-neutral-400 mb-6 border-t border-neutral-100 pt-8">
                        Exhibitions
                    </h3>
                    <div className="space-y-3">
                        {artist.exhibitions.map((ex, i) => (
                            <div key={i} className="flex gap-6 text-sm">
                                <span className="text-neutral-400 w-12 shrink-0">{ex.year}</span>
                                <span className="font-light">
                                    {ex.title}
                                    {ex.location ? ` — ${ex.location}` : ""}
                                    {ex.type ? (
                                        <span className="ml-2 text-neutral-400 text-xs uppercase tracking-wide">
                                            {ex.type}
                                        </span>
                                    ) : null}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Publications */}
            {artist.publications && artist.publications.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-xs tracking-widest uppercase text-neutral-400 mb-6 border-t border-neutral-100 pt-8">
                        Publications
                    </h3>
                    <div className="space-y-3">
                        {artist.publications.map((pub, i) => (
                            <div key={i} className="flex gap-6 text-sm">
                                <span className="text-neutral-400 w-12 shrink-0">{pub.year}</span>
                                <span className="font-light">
                                    {pub.title}
                                    {pub.publication ? ` — ${pub.publication}` : ""}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Galleries represented */}
            {artist.galleries && artist.galleries.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-xs tracking-widest uppercase text-neutral-400 mb-6 border-t border-neutral-100 pt-8">
                        Gallery Representation
                    </h3>
                    <div className="space-y-2">
                        {artist.galleries.map((g, i) => (
                            <div key={i} className="text-sm font-light">
                                {g.link || g.url ? (
                                    <a
                                        href={g.link ?? g.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-neutral-600"
                                    >
                                        {g.name}
                                    </a>
                                ) : (
                                    g.name
                                )}
                                {(g.city || g.state) && (
                                    <span className="text-neutral-400 ml-2">
                                        {[g.city, g.state].filter(Boolean).join(", ")}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
