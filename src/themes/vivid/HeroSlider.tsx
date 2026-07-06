"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ArtistProfile } from "@/types";
import { getProductImageUrl, getArtistName } from "@/lib/artist-api";
import { derivePalette } from "./color";
import { useVividPalette } from "./DynamicColorProvider";

interface Props {
    artworks: Product[];
    artist: ArtistProfile;
}

const SLIDE_DURATION = 6000;

export default function HeroSlider({ artworks, artist }: Props) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const name = getArtistName(artist);
    const { setPalette } = useVividPalette();

    const slides = useMemo(() => artworks.filter((a) => !!getProductImageUrl(a)), [artworks]);
    const palettes = useMemo(
        () => slides.map((s) => derivePalette(s.dominantColors, s.id)),
        [slides]
    );

    const advance = useCallback(() => {
        setCurrent((c) => (c + 1) % Math.max(slides.length, 1));
        setProgress(0);
    }, [slides.length]);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(advance, SLIDE_DURATION);
        return () => clearInterval(interval);
    }, [advance, slides.length]);

    useEffect(() => {
        if (slides.length <= 1) return;
        setProgress(0);
        const start = performance.now();
        let raf: number;
        const tick = (now: number) => {
            const elapsed = now - start;
            setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
            if (elapsed < SLIDE_DURATION) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [current, slides.length]);

    useEffect(() => {
        const palette = palettes[current];
        if (palette) setPalette(palette, `hero-${slides[current]?.id ?? current}`);
    }, [current, palettes, slides, setPalette]);

    if (slides.length === 0) {
        return (
            <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: "92vh", backgroundColor: "var(--v-ink)" }}>
                <div className="vivid-hero-blob" style={{ background: "var(--v-primary)" }} />
                <p
                    style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                    className="relative text-5xl md:text-8xl uppercase text-center px-6"
                >
                    {name}
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden" style={{ height: "94svh", backgroundColor: "var(--v-ink)" }}>
            <style>{`
                .vivid-hero-blob {
                    position: absolute;
                    width: 60vw;
                    height: 60vw;
                    border-radius: 9999px;
                    filter: blur(90px);
                    opacity: 0.35;
                    top: 10%;
                    left: 20%;
                    animation: vivid-float 16s ease-in-out infinite;
                }
                @keyframes vivid-float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(4%, 6%) scale(1.1); }
                }
                .vivid-slide-img {
                    transition: opacity 900ms ease, transform 7000ms linear;
                }
            `}</style>

            {/* Ambient color wash behind everything, tied to live palette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(120% 90% at 15% 0%, var(--v-glow), transparent 60%)" }}
            />

            <div className="absolute top-6 left-5 md:left-8 z-20">
                <Link
                    href="/"
                    className="text-xs font-bold tracking-[0.18em] uppercase rounded-full px-4 py-2 inline-block backdrop-blur-md"
                    style={{ backgroundColor: "rgba(8,8,11,0.5)", color: "var(--v-paper)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                    {name}
                </Link>
            </div>

            {/* Crossfading slide stack */}
            {slides.map((artwork, i) => {
                const imgUrl = getProductImageUrl(artwork);
                const isActive = i === current;
                return (
                    <div
                        key={artwork.id}
                        className="absolute inset-0 vivid-slide-img"
                        style={{
                            opacity: isActive ? 1 : 0,
                            zIndex: isActive ? 10 : 0,
                            pointerEvents: isActive ? "auto" : "none",
                        }}
                        aria-hidden={!isActive}
                    >
                        <div className="relative w-full h-full">
                            {imgUrl ? (
                                <Image
                                    src={imgUrl}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover"
                                    style={{ transform: isActive ? "scale(1.06)" : "scale(1)" }}
                                    priority={i === 0}
                                    sizes="100vw"
                                />
                            ) : (
                                <div className="absolute inset-0" style={{ backgroundColor: "var(--v-ink-soft)" }} />
                            )}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(8,8,11,0.92) 0%, rgba(8,8,11,0.35) 45%, rgba(8,8,11,0.15) 100%)",
                                }}
                            />

                            <div className="absolute bottom-24 left-5 right-5 md:left-10 md:right-auto md:max-w-2xl">
                                <p
                                    className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                                    style={{ color: "var(--v-primary)" }}
                                >
                                    {artwork.mediums?.[0]?.medium?.name ?? artwork.medium ?? "Original Work"}
                                    {artwork.yearCreated ? ` · ${artwork.yearCreated}` : ""}
                                </p>
                                <h2
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.92] mb-6"
                                >
                                    {artwork.title}
                                </h2>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <Link
                                        href={`/artworks/${artwork.slug ?? artwork.id}`}
                                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-full vivid-btn-primary"
                                    >
                                        View Work
                                    </Link>
                                    {artwork.status !== "sold" && (
                                        <span
                                            className="text-sm font-bold tracking-wide"
                                            style={{ color: "var(--v-paper)" }}
                                        >
                                            ${artwork.price.toLocaleString()}
                                        </span>
                                    )}
                                    {artwork.status === "sold" && (
                                        <span
                                            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                                            style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--v-paper)" }}
                                        >
                                            Sold
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {slides.length > 1 && (
                <div className="absolute bottom-9 left-5 md:left-10 z-20 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{
                                width: i === current ? 28 : 10,
                                backgroundColor: i === current ? "var(--v-primary)" : "rgba(255,255,255,0.3)",
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <div
                    style={{
                        height: "100%",
                        width: `${progress * 100}%`,
                        background: "linear-gradient(90deg, var(--v-primary), var(--v-secondary))",
                    }}
                />
            </div>
        </div>
    );
}
