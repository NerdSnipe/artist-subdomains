import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import Reveal from "./Reveal";
import AnthemNoirStudioSection from "./AnthemNoirStudioSection";
import AnthemNoirGallerySection from "./AnthemNoirGallerySection";

export default function AnthemNoirAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div>
            <section className="border-b-4 border-[#E9DFC9] bg-[#0C0B09]">
                <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                    <Reveal>
                        <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-4">About the Artist</p>
                        <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl leading-[0.92] mb-8">
                            {name}
                        </h1>
                        {artist.bio && (
                            <p className="text-lg leading-relaxed text-[#E9DFC9]/80 whitespace-pre-line first-letter:font-[family-name:var(--font-display)] first-letter:text-6xl first-letter:leading-[0.8] first-letter:float-left first-letter:pr-3 first-letter:pt-1 first-letter:text-[#C9A227]">
                                {artist.bio}
                            </p>
                        )}
                    </Reveal>
                    {artist.profilePhoto && (
                        <Reveal delay={120}>
                            <div className="relative aspect-[4/5] border-2 border-[#E9DFC9] overflow-hidden">
                                <Image src={artist.profilePhoto} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {artist.artistStatement && (
                <section className="bg-[#E9DFC9] text-[#0C0B09] border-b-4 border-[#E9DFC9] py-20 md:py-28">
                    <Reveal className="max-w-[1150px] mx-auto px-5 md:px-10 text-center">
                        <p className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl lg:text-[32px] leading-[1.35]">
                            &ldquo;{artist.artistStatement}&rdquo;
                        </p>
                    </Reveal>
                </section>
            )}

            <AnthemNoirStudioSection artist={artist} id="studio" />

            {(artist.exhibitions?.length || artist.reviews?.length) && (
                <section className="border-t-4 border-[#E9DFC9] bg-[#0C0B09]">
                    <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16">
                        {artist.exhibitions && artist.exhibitions.length > 0 && (
                            <div>
                                <h3 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-6 border-b-4 border-[#E9DFC9] pb-3">
                                    Exhibitions
                                </h3>
                                <ul className="space-y-4">
                                    {artist.exhibitions.map((ex, i) => (
                                        <li key={i} className="flex gap-4 text-sm">
                                            <span className="font-bold shrink-0">{ex.year}</span>
                                            <span className="text-[#E9DFC9]/80">
                                                {ex.title} — {ex.location}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {artist.reviews && artist.reviews.length > 0 && (
                            <div>
                                <h3 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-6 border-b-4 border-[#E9DFC9] pb-3">
                                    What People Say
                                </h3>
                                <div className="space-y-6">
                                    {artist.reviews.map((r, i) => (
                                        <blockquote key={i} className="text-[#E9DFC9]/80 italic">
                                            &ldquo;{r.text}&rdquo;
                                            <footer className="not-italic text-xs font-bold uppercase tracking-widest mt-2">— {r.author}</footer>
                                        </blockquote>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <AnthemNoirGallerySection artist={artist} id="representations" />
        </div>
    );
}
