"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ArtistProfile } from "@/types";
import { getProductImageUrl, getArtistName } from "@/lib/artist-api";

interface Props {
    artworks: Product[];
    artist: ArtistProfile;
}

const SLIDE_DURATION = 4000;

export default function HeroSlider({ artworks, artist }: Props) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const name = getArtistName(artist);

    const slides = artworks.filter((a) => !!getProductImageUrl(a));

    const advance = useCallback(() => {
        setCurrent((c) => (c + 1) % Math.max(slides.length, 1));
        setProgress(0);
    }, [slides.length]);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(advance, SLIDE_DURATION);
        return () => clearInterval(interval);
    }, [advance, slides.length]);

    // Progress bar animation
    useEffect(() => {
        if (slides.length <= 1) return;
        setProgress(0);
        const start = performance.now();
        let raf: number;
        const tick = (now: number) => {
            const elapsed = now - start;
            setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
            if (elapsed < SLIDE_DURATION) {
                raf = requestAnimationFrame(tick);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [current, slides.length]);

    if (slides.length === 0) {
        return (
            <div className="relative w-full h-screen bg-[#111] flex items-center justify-center">
                <p
                    style={{ fontFamily: "'DM Serif Display', serif", color: "var(--accent)" }}
                    className="text-6xl md:text-8xl font-bold"
                >
                    {name}
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden" style={{ height: "100svh" }}>
            {/* Artist name pill — always visible top-left */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href="/"
                    className="bg-white text-[#111] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full inline-block"
                >
                    {name}
                </Link>
            </div>

            {/* Slide track */}
            <div
                className="flex h-full"
                style={{
                    width: `${slides.length * 100}%`,
                    transform: `translateX(-${(current * 100) / slides.length}%)`,
                    transition: "transform 600ms cubic-bezier(0.77, 0, 0.175, 1)",
                }}
            >
                {slides.map((artwork, i) => {
                    const imgUrl = getProductImageUrl(artwork);
                    return (
                        <div
                            key={artwork.id}
                            className="relative flex-shrink-0"
                            style={{ width: `${100 / slides.length}%` }}
                        >
                            {imgUrl ? (
                                <Image
                                    src={imgUrl}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover"
                                    priority={i === 0}
                                    sizes="100vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-[#222]" />
                            )}
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

                            {/* Bottom-left artwork info */}
                            <div className="absolute bottom-20 left-8 right-8 md:left-14 md:right-auto md:max-w-xl">
                                <p className="text-xs font-bold tracking-widest uppercase text-white/60 mb-2">
                                    {artwork.medium ?? artwork.mediums?.[0]?.medium?.name ?? ""}
                                </p>
                                <h2
                                    style={{ fontFamily: "'DM Serif Display', serif" }}
                                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-4"
                                >
                                    {artwork.title}
                                </h2>
                                {artwork.yearCreated && (
                                    <p className="text-sm font-bold tracking-widest uppercase text-white/50">
                                        {artwork.yearCreated}
                                    </p>
                                )}
                                <Link
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className="mt-6 inline-block text-xs font-bold tracking-widest uppercase px-6 py-3 text-[#111]"
                                    style={{ backgroundColor: "var(--accent)" }}
                                >
                                    View Work
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Slide indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-14 left-8 md:left-14 z-10 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setCurrent(i); setProgress(0); }}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                                backgroundColor: i === current ? "var(--accent)" : "rgba(255,255,255,0.4)",
                                transform: i === current ? "scale(1.5)" : "scale(1)",
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Progress bar strip at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: "8px", backgroundColor: "rgba(255,255,255,0.15)" }}>
                <div
                    style={{
                        height: "100%",
                        width: `${progress * 100}%`,
                        backgroundColor: "var(--accent)",
                        transition: "none",
                    }}
                />
            </div>
        </div>
    );
}
