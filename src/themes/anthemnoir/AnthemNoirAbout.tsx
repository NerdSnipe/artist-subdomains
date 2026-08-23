import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import Reveal from "./Reveal";
import AnthemNoirStudioSection from "./AnthemNoirStudioSection";
import AnthemNoirGallerySection from "./AnthemNoirGallerySection";

// Real GHL bio text is often authored as "<subtitle line>\nArtist Biography\n<body>" — when a
// standalone "Artist Biography" line is present, pull it out so it can be styled as its own
// gold all-caps label instead of just sitting in the paragraph as plain text.
function splitBio(bio: string): { subtitle: string | null; body: string } {
    const match = bio.match(/^([\s\S]*?)^[ \t]*Artist Biography[ \t]*$\n?([\s\S]*)$/im);
    if (!match) return { subtitle: null, body: bio };
    return { subtitle: match[1].trim(), body: match[2].trim() };
}

export default function AnthemNoirAbout({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const { subtitle, body } = artist.bio ? splitBio(artist.bio) : { subtitle: null, body: "" };
    // A floated multi-line drop cap is what was making the first letter drift down into the
    // second line — different browsers resolve float + leading differently once the text wraps.
    // An enlarged inline first letter (no float) gets the same flourish without that bug.
    const dropCap =
        "first-letter:font-[family-name:var(--font-display)] first-letter:text-5xl first-letter:mr-1 first-letter:align-[-0.08em] first-letter:text-[#C9A227]";

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
                            <div className="text-lg leading-relaxed text-[#E9DFC9]/80">
                                {subtitle ? (
                                    <>
                                        <p className={dropCap}>{subtitle}</p>
                                        <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-[#C9A227]">Artist Biography</p>
                                        <p className="mt-4 whitespace-pre-line">{body}</p>
                                    </>
                                ) : (
                                    <p className={`whitespace-pre-line ${dropCap}`}>{body}</p>
                                )}
                            </div>
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
                <section className="relative border-b-4 border-[#E9DFC9] py-20 md:py-28 overflow-hidden">
                    {artist.profilePhoto ? (
                        <>
                            <Image src={artist.profilePhoto} alt={name} fill sizes="100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-[#0C0B09]/85" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-[#E9DFC9]" />
                    )}
                    <Reveal
                        className={`relative max-w-[1150px] mx-auto px-5 md:px-10 text-center ${
                            artist.profilePhoto ? "text-[#E9DFC9] drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]" : "text-[#0C0B09]"
                        }`}
                    >
                        <p className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl lg:text-[32px] leading-[1.35]">
                            &ldquo;{artist.artistStatement}&rdquo;
                        </p>
                        <p className={`mt-8 text-sm font-bold tracking-[0.2em] uppercase ${artist.profilePhoto ? "text-[#C9A227]" : "text-[#8A6D1F]"}`}>
                            — {name}
                        </p>
                    </Reveal>
                </section>
            )}

            <AnthemNoirStudioSection artist={artist} id="studio" />

            {Boolean(artist.exhibitions?.length || artist.reviews?.length) && (
                <section className="border-t-4 border-[#E9DFC9] bg-[#0C0B09]">
                    <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16">
                        {artist.exhibitions && artist.exhibitions.length > 0 && (
                            <div>
                                <h3 className="font-[family-name:var(--font-display)] uppercase text-3xl mb-6 border-b-4 border-[#E9DFC9] pb-3">
                                    Exhibitions
                                </h3>
                                {/* Modest vertical timeline — gold year + diamond marker, deliberately kept
                                    small (not a giant display-font year) per explicit feedback. */}
                                <div className="relative pl-7 border-l-2 border-[#E9DFC9]/20">
                                    {/* Most recently entered first — matches how artists actually think
                                        about their own CV (newest/current show up top). */}
                                    {[...artist.exhibitions].reverse().map((ex, i) => (
                                        <Reveal key={i} delay={Math.min(i, 6) * 60} className="relative pb-8 last:pb-0">
                                            <span className="absolute -left-[1.97rem] top-1.5 w-3 h-3 rotate-45 bg-[#C9A227] border border-[#E9DFC9]/30" />
                                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                                <span className="font-[family-name:var(--font-display)] text-lg text-[#C9A227]">
                                                    {ex.year}
                                                </span>
                                                {ex.type && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E9DFC9]/40 border border-[#E9DFC9]/20 rounded-full px-2 py-0.5">
                                                        {ex.type}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 font-bold text-[#E9DFC9] text-sm">{ex.title}</p>
                                            {ex.location && <p className="text-sm text-[#E9DFC9]/50">{ex.location}</p>}
                                        </Reveal>
                                    ))}
                                </div>
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
