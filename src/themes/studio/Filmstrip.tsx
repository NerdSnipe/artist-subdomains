"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FilmstripProps {
    images: string[];
    altPrefix: string;
}

/**
 * Horizontal "behind the scenes in the studio" reel. Snap-scrolls natively
 * on touch devices; desktop gets hover-revealed arrow controls.
 */
export default function Filmstrip({ images, altPrefix }: FilmstripProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollBy = (direction: number) => {
        scrollerRef.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
    };

    return (
        <div className="relative group/filmstrip">
            <div
                ref={scrollerRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-6 px-6 md:-mx-10 md:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {images.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        className="relative shrink-0 snap-start w-[72vw] sm:w-[340px] aspect-[4/3] bg-neutral-900 overflow-hidden"
                    >
                        <Image
                            src={src}
                            alt={`${altPrefix} — frame ${i + 1}`}
                            fill
                            sizes="(min-width: 640px) 340px, 72vw"
                            className="object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover/filmstrip:grayscale-0 hover:scale-[1.04]"
                        />
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                        <span className="absolute bottom-2 left-2 font-[family-name:var(--font-studio-condensed)] text-[10px] tracking-[0.3em] uppercase text-neutral-200/80 bg-black/50 px-2 py-1 backdrop-blur-sm">
                            {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                        </span>
                    </div>
                ))}
            </div>

            {images.length > 2 && (
                <>
                    <button
                        type="button"
                        onClick={() => scrollBy(-1)}
                        aria-label="Scroll gallery left"
                        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-[#0a0908]/90 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-500 transition-colors duration-300 opacity-0 group-hover/filmstrip:opacity-100"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollBy(1)}
                        aria-label="Scroll gallery right"
                        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-[#0a0908]/90 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-500 transition-colors duration-300 opacity-0 group-hover/filmstrip:opacity-100"
                    >
                        <ChevronRight size={16} />
                    </button>
                </>
            )}
        </div>
    );
}
