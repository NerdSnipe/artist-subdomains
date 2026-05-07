"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ArtistProfile } from "@/types";
import { getArtistName } from "@/lib/artist-api";

interface HeroParallaxProps {
    artist: ArtistProfile;
}

export default function HeroParallax({ artist }: HeroParallaxProps) {
    const nameRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const name = getArtistName(artist);
    const coverPhoto = artist.coverPhoto ?? artist.profilePhoto ?? null;
    const location = [artist.city, artist.state].filter(Boolean).join(", ");

    // Classic parallax: name translates up at 0.5× scroll speed
    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current !== null) return;
            rafRef.current = requestAnimationFrame(() => {
                if (nameRef.current) {
                    const scrollY = window.scrollY;
                    nameRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
                    nameRef.current.style.opacity = String(Math.max(0, 1 - scrollY / 400));
                }
                rafRef.current = null;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: "100svh", minHeight: "560px" }}
        >
            {/* Background image */}
            {coverPhoto ? (
                <Image
                    src={coverPhoto}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            ) : (
                <div className="absolute inset-0" style={{ backgroundColor: "#1c1917" }} />
            )}

            {/* Warm dark overlay */}
            <div
                className="absolute inset-0"
                style={{ background: "rgba(28, 25, 23, 0.52)" }}
            />

            {/* Centered text — parallax target */}
            <div
                ref={nameRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                style={{ willChange: "transform, opacity" }}
            >
                <h1
                    className="text-white leading-none tracking-tight"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "clamp(3.5rem, 10vw, 10vw)",
                    }}
                >
                    {name}
                </h1>

                <div
                    className="mt-6 flex items-center gap-3 text-white/60"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                    {location && <span>{location}</span>}
                    {location && artist.createdAt && <span>·</span>}
                    {artist.createdAt && (
                        <span>Est. {new Date(artist.createdAt).getFullYear()}</span>
                    )}
                </div>

                {/* Scroll hint */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                    <span>Scroll</span>
                    <span className="animate-bounce">↓</span>
                </div>
            </div>
        </section>
    );
}
