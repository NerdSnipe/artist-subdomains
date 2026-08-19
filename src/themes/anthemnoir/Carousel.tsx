"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Real photo carousel. Priority is always artist-uploaded carouselImages (GHL Master-tier
// feature) — artwork images are only ever passed in as a fallback by the caller when an
// artist hasn't uploaded any carousel images of their own.
//
// `children` renders as an overlay on top of the rotating images — this is what lets the
// hero section BE the carousel (headline/CTAs sit on top of it) instead of the carousel
// being a separate strip below a static hero photo. `heightClassName` controls how tall the
// whole thing is; `overlay="hero"` uses a lighter, bottom-anchored scrim sized to just the
// text zone rather than darkening the full photo, `overlay="strip"` keeps the plain look
// used when the carousel appears as its own standalone section elsewhere.
export default function Carousel({
    images,
    alt,
    children,
    heightClassName = "aspect-[16/9] md:aspect-[21/9]",
    overlay = "strip",
}: {
    images: string[];
    alt: string;
    children?: React.ReactNode;
    heightClassName?: string;
    overlay?: "hero" | "strip" | "none";
}) {
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
        timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [count]);

    const pause = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
    const resume = () => {
        pause();
        if (count > 1) timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    };

    if (count === 0) return children ? <div className={`relative w-full ${heightClassName} bg-black`}>{children}</div> : null;

    return (
        <div
            className={`relative w-full ${heightClassName} overflow-hidden ${overlay === "strip" ? "border-y-4 border-[#E9DFC9]" : "border-b-4 border-[#E9DFC9]"} bg-black`}
            onMouseEnter={pause}
            onMouseLeave={resume}
        >
            {images.map((src, i) => (
                <div
                    key={src + i}
                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                    style={{ opacity: i === index ? 1 : 0, pointerEvents: "none" }}
                >
                    <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="100vw" className="object-cover" priority={i === 0} />
                </div>
            ))}

            {overlay === "hero" && (
                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />
            )}

            {children && <div className="absolute inset-0 z-10">{children}</div>}

            {count > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() => go(index - 1)}
                        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-[#E9DFC9] text-[#0C0B09] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-[#E9DFC9] hover:bg-[#C9A227] transition-colors"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => go(index + 1)}
                        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-[#E9DFC9] text-[#0C0B09] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-[#E9DFC9] hover:bg-[#C9A227] transition-colors"
                    >
                        <ChevronRight size={22} />
                    </button>

                    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to image ${i + 1}`}
                                onClick={() => go(i)}
                                className={`h-2 border border-[#E9DFC9] transition-all ${i === index ? "w-8 bg-[#C9A227]" : "w-2 bg-[#E9DFC9]/70"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
