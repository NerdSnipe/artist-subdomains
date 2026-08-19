import Image from "next/image";
import type { ArtistProfile } from "@/types";
import Reveal from "./Reveal";

export default function AnthemNoirGallerySection({ artist, id }: { artist: ArtistProfile; id?: string }) {
    const galleries = artist.galleries ?? [];
    if (galleries.length === 0) return null;

    return (
        <section id={id} className="border-t-4 border-[#E9DFC9] bg-[#0C0B09] scroll-mt-[100px]">
            <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
                <Reveal className="mb-10 border-b-4 border-[#E9DFC9] pb-5">
                    <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-3">Where to Find the Work</p>
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Gallery Representations</h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {galleries.map((g, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <a
                                href={g.url ?? g.link ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] border-2 border-[#E9DFC9] overflow-hidden hover:bg-[#E9DFC9] transition-colors"
                            >
                                {g.photo && (
                                    <div className="relative h-full min-h-[140px] overflow-hidden border-r-2 border-[#E9DFC9]">
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
                                    <p className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl group-hover:text-[#0C0B09]">
                                        {g.name}
                                    </p>
                                    {g.address && (
                                        <p className="mt-2 text-sm text-[#E9DFC9]/60 group-hover:text-[#0C0B09]/70">
                                            {g.address}
                                            {(g.city || g.state) && `, ${[g.city, g.state].filter(Boolean).join(", ")}`}
                                        </p>
                                    )}
                                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#C9A227] group-hover:text-[#0C0B09]">
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
