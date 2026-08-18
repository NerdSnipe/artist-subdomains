"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { Product, ArtistProfile } from "@/types";
import { getProductImageUrl, getArtistName } from "@/lib/artist-api";

interface Props {
    artworks: Product[];
    artist: ArtistProfile;
}

export default function HeroCarousel({ artworks, artist }: Props) {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [nameVisible, setNameVisible] = useState(false);
    const name = getArtistName(artist);

    const slides = artworks.filter((a) => getProductImageUrl(a));

    const goTo = useCallback((idx: number) => {
        if (animating || slides.length === 0) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent((idx + slides.length) % slides.length);
            setAnimating(false);
        }, 400);
    }, [animating, slides.length]);

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    // Auto-advance every 5s
    useEffect(() => {
        if (slides.length <= 1) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [next, slides.length]);

    // Fade artist name in on mount
    useEffect(() => {
        const t = setTimeout(() => setNameVisible(true), 300);
        return () => clearTimeout(t);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    if (slides.length === 0) {
        return (
            <div className="relative h-screen bg-[#0d0d0d] flex items-center justify-center">
                <h1
                    className="text-6xl md:text-8xl font-thin tracking-[0.3em] uppercase text-[#e8e8e8]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {name}
                </h1>
            </div>
        );
    }

    const slide = slides[current];
    const imgUrl = getProductImageUrl(slide);

    return (
        <div className="relative h-screen overflow-hidden bg-[#0d0d0d]">
            {/* Background image with Ken Burns */}
            <div
                key={current}
                className="absolute inset-0"
                style={{ opacity: animating ? 0 : 1, transition: "opacity 0.5s ease" }}
            >
                {imgUrl && (
                    <Image
                        src={imgUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority
                        style={{
                            animation: "kenburns 8s ease-out forwards",
                        }}
                    />
                )}
            </div>

            {/* Vignette: dark edges, lighter center (spotlight) */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)",
                }}
            />

            {/* Bottom gradient */}
            <div className="absolute bottom-0 inset-x-0 h-48 z-10 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

            {/* Film grain overlay on hero */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    opacity: 0.045,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px 180px",
                }}
            />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                {/* Artist name — fades in once */}
                <div
                    style={{
                        opacity: nameVisible ? 1 : 0,
                        transition: "opacity 1.4s ease",
                    }}
                >
                    <h1
                        className="text-6xl sm:text-8xl md:text-9xl font-thin tracking-[0.25em] uppercase text-[#e8e8e8] leading-none mb-8"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {name}
                    </h1>
                </div>

                {/* Slide title — animates in per slide */}
                <div
                    key={`title-${current}`}
                    style={{
                        animation: "fadeInUp 0.8s ease forwards",
                    }}
                    className="space-y-2"
                >
                    <p
                        className="text-[10px] tracking-[0.5em] uppercase text-[#a8884a]"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        {slide.medium ?? slide.mediums?.[0]?.medium?.name ?? "Fine Art"}
                    </p>
                    <p
                        className="text-lg md:text-xl font-light tracking-[0.15em] text-[#e8e8e8]/80 italic"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {slide.title}
                    </p>
                </div>
            </div>

            {/* Prev / Next arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-[#e8e8e8]/50 hover:text-[#a8884a] transition-colors duration-300 text-3xl select-none w-12 h-12 flex items-center justify-center"
                        aria-label="Previous"
                    >
                        ◀
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-[#e8e8e8]/50 hover:text-[#a8884a] transition-colors duration-300 text-3xl select-none w-12 h-12 flex items-center justify-center"
                        aria-label="Next"
                    >
                        ▶
                    </button>
                </>
            )}

            {/* Dot indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                                backgroundColor: i === current ? "#a8884a" : "rgba(232,232,232,0.25)",
                                transform: i === current ? "scale(1.5)" : "scale(1)",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
