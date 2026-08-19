"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Real photo carousel. Priority is always artist-uploaded carouselImages (GHL Master-tier
// feature) — artwork images are only ever passed in as a fallback by the caller when an
// artist hasn't uploaded any carousel images of their own.
export default function Carousel({ images, alt }: { images: string[]; alt: string }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const count = images.length;

    const go = useCallback(
        (next: number) => {
            setIndex(((next % count) + count) % count);
        },
        [count]
    );

    useEffect(() => {
        if (count <= 1) return;
        timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [count]);

    const pause = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
    const resume = () => {
        pause();
        if (count > 1) timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    };

    if (count === 0) return null;

    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border-y-4 border-black bg-black" onMouseEnter={pause} onMouseLeave={resume}>
            {images.map((src, i) => (
                <div
                    key={src + i}
                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                    style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
                >
                    <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="100vw" className="object-cover" priority={i === 0} />
                </div>
            ))}

            {count > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() => go(index - 1)}
                        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-[#F7F4EC] text-black w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-black hover:bg-[#FFDC00] transition-colors"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => go(index + 1)}
                        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-[#F7F4EC] text-black w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-black hover:bg-[#FFDC00] transition-colors"
                    >
                        <ChevronRight size={22} />
                    </button>

                    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to image ${i + 1}`}
                                onClick={() => go(i)}
                                className={`h-2 border border-black transition-all ${i === index ? "w-8 bg-[#FFDC00]" : "w-2 bg-[#F7F4EC]/80"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
