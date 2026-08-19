import Image from "next/image";
import type { ArtistProfile } from "@/types";
import Reveal from "./Reveal";

// Shared "Inside the Studio" section — process text + studio photos. Used on both the
// homepage (prominent, per feedback: this is what makes an artist interesting) and the
// About page, so the two never drift out of sync.
export default function AnthemStudioSection({ artist }: { artist: ArtistProfile }) {
    const studioImgs = artist.studioImages ?? [];
    if (!artist.studioProcessDescription && studioImgs.length === 0) return null;

    return (
        <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
            <Reveal className="mb-10 border-b-4 border-black pb-5 flex items-end justify-between">
                <div>
                    <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">The Process</p>
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Inside the Studio</h2>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start">
                {artist.studioProcessDescription && (
                    <Reveal delay={60}>
                        <p className="text-lg leading-relaxed text-black/80">{artist.studioProcessDescription}</p>
                    </Reveal>
                )}
                {studioImgs.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                        {studioImgs.slice(0, 4).map((src, i) => (
                            <Reveal key={i} delay={i * 60} className={i === 0 ? "col-span-2" : ""}>
                                <div className={`relative border-2 border-black overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}>
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
