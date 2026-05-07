"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

interface Props {
    artworks: Product[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function ImageLightbox({ artworks, currentIndex, onClose, onNext, onPrev }: Props) {
    const artwork = artworks[currentIndex];

    // Lock scroll
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Keyboard handler
    const handleKey = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    if (!artwork) return null;

    const imgUrl = getProductImageUrl(artwork);
    const medium = artwork.medium ?? artwork.mediums?.[0]?.medium.name;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/97 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Film grain on lightbox */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.05,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px 180px",
                }}
            />

            {/* Close */}
            <button
                className="absolute top-5 right-6 z-10 text-[#e8e8e8]/50 hover:text-[#a8884a] transition-colors text-3xl leading-none"
                onClick={onClose}
                aria-label="Close"
            >
                ×
            </button>

            {/* Counter */}
            <div
                className="absolute top-5 left-6 z-10 text-[9px] tracking-[0.3em] uppercase text-[#5a5a5a]"
                style={{ fontFamily: "'Courier New', monospace" }}
            >
                {currentIndex + 1} / {artworks.length}
            </div>

            {/* Prev */}
            {artworks.length > 1 && (
                <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-[#e8e8e8]/40 hover:text-[#a8884a] transition-colors text-4xl w-14 h-14 flex items-center justify-center"
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Previous"
                >
                    ◀
                </button>
            )}

            {/* Image + info */}
            <div
                className="relative z-10 flex flex-col items-center px-16 md:px-24"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            >
                <div className="relative" style={{ maxWidth: "90vw", maxHeight: "75vh" }}>
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={artwork.title}
                            width={1200}
                            height={900}
                            className="object-contain"
                            style={{ maxWidth: "90vw", maxHeight: "75vh", width: "auto", height: "auto" }}
                        />
                    ) : (
                        <div className="w-96 h-64 bg-[#1a1a1a] flex items-center justify-center">
                            <span className="text-[#3a3a3a] text-xs tracking-widest uppercase">No Image</span>
                        </div>
                    )}
                </div>

                {/* Info below image */}
                <div className="text-center mt-6 space-y-1">
                    <p
                        className="text-base tracking-[0.15em] italic text-[#e8e8e8]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {artwork.title}
                    </p>
                    {medium && (
                        <p
                            className="text-[9px] tracking-[0.3em] uppercase text-[#6a6a6a]"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            {medium}
                        </p>
                    )}
                    <p
                        className="text-[10px] tracking-[0.2em] text-[#a8884a]"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        ${artwork.price.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Next */}
            {artworks.length > 1 && (
                <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-[#e8e8e8]/40 hover:text-[#a8884a] transition-colors text-4xl w-14 h-14 flex items-center justify-center"
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Next"
                >
                    ▶
                </button>
            )}
        </div>
    );
}
