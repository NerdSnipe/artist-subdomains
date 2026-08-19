import Image from "next/image";
import type { ArtistProfile } from "@/types";
import Reveal from "./Reveal";

// "Gallery Representations" — the physical galleries carrying this artist's work, with photo
// + info cards. Data already exists in GHL (artist.galleries); this is the first-class
// treatment requested, closer to a photo card than a text link strip.
export default function AnthemGallerySection({ artist }: { artist: ArtistProfile }) {
    const galleries = artist.galleries ?? [];
    if (galleries.length === 0) return null;

    return (
        <section className="border-t-4 border-black bg-[#F7F4EC]">
            <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
                <Reveal className="mb-10 border-b-4 border-black pb-5">
                    <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-3">Where to Find the Work</p>
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Gallery Representations</h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {galleries.map((g, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <a
                                href={g.url ?? g.link ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] border-2 border-black overflow-hidden hover:bg-black transition-colors"
                            >
                                {g.photo && (
                                    <div className="relative h-full min-h-[140px] overflow-hidden border-r-2 border-black">
                                        <Image
                                            src={g.photo}
                                            alt={g.name}
                                            fill
                                            sizes="180px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-5 md:p-7 flex flex-col justify-center">
                                    <p className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl group-hover:text-[#F7F4EC]">
                                        {g.name}
                                    </p>
                                    {g.address && (
                                        <p className="mt-2 text-sm text-black/60 group-hover:text-[#F7F4EC]/70">
                                            {g.address}
                                            {(g.city || g.state) && `, ${[g.city, g.state].filter(Boolean).join(", ")}`}
                                        </p>
                                    )}
                                    <p className="mt-4 text-xs font-bold uppercase tracking-widest group-hover:text-[#FFDC00]">
                                        Visit Gallery →
                                    </p>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
