"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

interface LightboxProps {
    artwork: Product;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export default function Lightbox({
    artwork,
    onClose,
    onPrev,
    onNext,
    hasPrev = false,
    hasNext = false,
}: LightboxProps) {
    const imgUrl = getProductImageUrl(artwork);
    const slug = artwork.slug ?? artwork.id;
    const medium = artwork.mediums?.[0]?.medium?.name ?? artwork.medium;

    // Lock body scroll + ESC closes
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
            if (e.key === "ArrowRight" && hasNext && onNext) onNext();
        };
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose, onPrev, onNext, hasPrev, hasNext]);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(10, 8, 6, 0.96)" }}
            role="dialog"
            aria-modal="true"
            aria-label={artwork.title}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors"
                style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                }}
                aria-label="Close"
            >
                ✕ Close
            </button>

            {/* Prev arrow */}
            {hasPrev && (
                <button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors select-none"
                    style={{ fontSize: "3.5rem", fontFamily: "serif", lineHeight: 1 }}
                    aria-label="Previous artwork"
                >
                    ‹
                </button>
            )}

            {/* Next arrow */}
            {hasNext && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors select-none"
                    style={{ fontSize: "3.5rem", fontFamily: "serif", lineHeight: 1 }}
                    aria-label="Next artwork"
                >
                    ›
                </button>
            )}

            {/* Main content */}
            <div className="flex flex-col items-center px-12 md:px-20 max-w-4xl w-full">
                {/* Artwork image */}
                <div
                    className="relative w-full overflow-hidden"
                    style={{ maxHeight: "65vh", aspectRatio: "4/3" }}
                >
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={artwork.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 90vw, 800px"
                            priority
                        />
                    ) : (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ backgroundColor: "#1c1917" }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    color: "#6b7c6d",
                                    fontSize: "1.5rem",
                                }}
                            >
                                {artwork.title}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info below image */}
                <div className="mt-6 text-center space-y-2">
                    <h2
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: "italic",
                            fontSize: "clamp(1.4rem, 3vw, 2rem)",
                            fontWeight: 300,
                            color: "#faf8f5",
                        }}
                    >
                        {artwork.title}
                    </h2>

                    <div
                        className="flex items-center justify-center gap-3 text-white/50"
                        style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                        }}
                    >
                        {artwork.yearCreated && <span>{artwork.yearCreated}</span>}
                        {medium && artwork.yearCreated && <span>·</span>}
                        {medium && <span>{medium}</span>}
                        {artwork.price > 0 && (
                            <>
                                <span>·</span>
                                <span style={{ color: "#d4a853" }}>${artwork.price.toLocaleString()}</span>
                            </>
                        )}
                    </div>

                    <div className="pt-3">
                        <Link
                            href={`/artworks/${slug}`}
                            className="inline-flex items-center gap-2 transition-colors"
                            style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: "0.65rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "#6b7c6d",
                            }}
                        >
                            → Full Detail
                        </Link>
                    </div>
                </div>
            </div>

            {/* Click backdrop to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
                aria-hidden="true"
            />
        </div>
    );
}
