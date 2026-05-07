"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

interface HorizontalGalleryProps {
    artworks: Product[];
}

export default function HorizontalGallery({ artworks }: HorizontalGalleryProps) {
    if (artworks.length === 0) return null;

    return (
        <div className="relative">
            <style>{`
                .chronicle-hgallery::-webkit-scrollbar {
                    height: 4px;
                }
                .chronicle-hgallery::-webkit-scrollbar-track {
                    background: transparent;
                }
                .chronicle-hgallery::-webkit-scrollbar-thumb {
                    background: #6b7c6d;
                    border-radius: 2px;
                }
                @media (max-width: 768px) {
                    .chronicle-hgallery::-webkit-scrollbar {
                        display: none;
                    }
                    .chronicle-hgallery {
                        scrollbar-width: none;
                    }
                }
            `}</style>

            <div
                className="chronicle-hgallery flex gap-5 overflow-x-auto pb-6"
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
                {/* Left padding sentinel */}
                <div className="shrink-0 w-6 md:w-16" />

                {artworks.map((artwork) => {
                    const imgUrl = getProductImageUrl(artwork);
                    const slug = artwork.slug ?? artwork.id;
                    const medium = artwork.mediums?.[0]?.medium?.name ?? artwork.medium;

                    return (
                        <article
                            key={artwork.id}
                            className="shrink-0 group"
                            style={{
                                scrollSnapAlign: "start",
                                width: "min(80vw, 480px)",
                            }}
                        >
                            {/* Card image */}
                            <div
                                className="relative overflow-hidden bg-stone-100"
                                style={{ aspectRatio: "3/4" }}
                            >
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={artwork.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 80vw, 480px"
                                    />
                                ) : (
                                    <div
                                        className="absolute inset-0"
                                        style={{ backgroundColor: "#e7e2dc" }}
                                    />
                                )}

                                {artwork.status === "sold" && (
                                    <div
                                        className="absolute top-3 right-3 px-2 py-0.5 text-white"
                                        style={{
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                            backgroundColor: "#1c1917",
                                        }}
                                    >
                                        Sold
                                    </div>
                                )}

                                {/* View arrow — top right */}
                                {artwork.status !== "sold" && (
                                    <Link
                                        href={`/artworks/${slug}`}
                                        className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            fontFamily: "'IBM Plex Mono', monospace",
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            backgroundColor: "rgba(28,25,23,0.75)",
                                        }}
                                    >
                                        → View
                                    </Link>
                                )}
                            </div>

                            {/* Caption */}
                            <div className="mt-3 px-1">
                                <Link href={`/artworks/${slug}`}>
                                    <h3
                                        className="leading-tight transition-colors duration-200 group-hover:text-[#6b7c6d]"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', serif",
                                            fontStyle: "italic",
                                            fontSize: "1.2rem",
                                            fontWeight: 400,
                                            color: "#1c1917",
                                        }}
                                    >
                                        {artwork.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                    {artwork.yearCreated && (
                                        <span
                                            style={{
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.65rem",
                                                letterSpacing: "0.12em",
                                                color: "#6b7c6d",
                                            }}
                                        >
                                            {artwork.yearCreated}
                                        </span>
                                    )}
                                    {medium && artwork.yearCreated && (
                                        <span style={{ color: "#9ca3af", fontSize: "0.65rem" }}>·</span>
                                    )}
                                    {medium && (
                                        <span
                                            style={{
                                                fontFamily: "'IBM Plex Mono', monospace",
                                                fontSize: "0.65rem",
                                                letterSpacing: "0.08em",
                                                color: "#9ca3af",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {medium}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}

                {/* Right padding sentinel with peek hint */}
                <div className="shrink-0 w-6 md:w-16" />
            </div>

            {/* Gradient fade on right edge — hints at more content */}
            <div
                className="pointer-events-none absolute top-0 right-0 bottom-6 w-24 hidden md:block"
                style={{ background: "linear-gradient(to left, #faf8f5 0%, transparent 100%)" }}
            />
        </div>
    );
}
