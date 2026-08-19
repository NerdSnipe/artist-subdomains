import Image from "next/image";
import type { ArtistProfile } from "@/types";
import Reveal from "./Reveal";

export default function AnthemNoirStudioSection({ artist, id }: { artist: ArtistProfile; id?: string }) {
    const studioImgs = artist.studioImages ?? [];
    if (!artist.studioProcessDescription && studioImgs.length === 0) return null;

    // Pull the leading "THE PAINTING PROCESS"-style label out of the body copy (if the source
    // text opens with an all-caps run) so it renders as its own bold sub-headline rather than
    // getting buried as the first few words of a paragraph.
    const raw = artist.studioProcessDescription ?? "";
    const capsMatch = raw.match(/^([A-Z][A-Z\s]{4,40}[A-Z])\s+([\s\S]*)$/);
    const subheadline = capsMatch ? capsMatch[1].trim() : "The Painting Process";
    const bodyText = capsMatch ? capsMatch[2].trim() : raw;

    return (
        <section id={id} className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28 scroll-mt-[100px]">
            <Reveal className="mb-10 border-b-4 border-[#E9DFC9] pb-5 flex items-end justify-between">
                <div>
                    <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-3">The Process</p>
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Inside the Studio</h2>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
                {raw && (
                    <Reveal delay={60}>
                        <h3 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl mb-4 text-[#C9A227] tracking-wide">
                            {subheadline}
                        </h3>
                        <p className="text-lg leading-relaxed text-[#E9DFC9]/80">{bodyText}</p>
                    </Reveal>
                )}
                {studioImgs.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                        {studioImgs.map((src, i) => (
                            <Reveal key={i} delay={i * 60}>
                                <div className="relative aspect-square border-2 border-[#E9DFC9] overflow-hidden">
                                    <Image src={src} alt={`Studio ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
