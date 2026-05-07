"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, ProductImage } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

interface ArtworkImageGalleryProps {
    product: Product;
}

export default function ArtworkImageGallery({ product }: ArtworkImageGalleryProps) {
    const primaryUrl = getProductImageUrl(product);
    const images: ProductImage[] = [...(product.images ?? [])].sort(
        (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );

    const [activeUrl, setActiveUrl] = useState<string>(primaryUrl);
    const [activeCaption, setActiveCaption] = useState<string | null>(
        images.find((i) => i.isPrimary)?.caption ?? images[0]?.caption ?? null
    );
    const [fading, setFading] = useState(false);

    const handleThumbClick = (img: ProductImage) => {
        if (img.imageUrl === activeUrl) return;
        setFading(true);
        setTimeout(() => {
            setActiveUrl(img.imageUrl);
            setActiveCaption(img.caption ?? null);
            setFading(false);
        }, 220);
    };

    return (
        <div>
            {/* Main image */}
            <div
                className="relative w-full overflow-hidden bg-stone-100"
                style={{ aspectRatio: "4/3", maxHeight: "70vh" }}
            >
                {activeUrl ? (
                    <Image
                        src={activeUrl}
                        alt={product.title}
                        fill
                        className="object-contain"
                        priority
                        style={{
                            transition: "opacity 0.22s ease",
                            opacity: fading ? 0 : 1,
                        }}
                        sizes="(max-width: 768px) 100vw, 70vw"
                    />
                ) : (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "#e7e2dc" }}
                    >
                        <span
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "1.5rem",
                                color: "#9ca3af",
                            }}
                        >
                            {product.title}
                        </span>
                    </div>
                )}

                {product.status === "sold" && (
                    <div
                        className="absolute top-4 right-4 px-3 py-1 text-white"
                        style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.65rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            backgroundColor: "#1c1917",
                        }}
                    >
                        Sold
                    </div>
                )}
            </div>

            {/* Caption */}
            {activeCaption && (
                <p
                    className="mt-2 text-center"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontSize: "0.9rem",
                        color: "#6b7c6d",
                    }}
                >
                    {activeCaption}
                </p>
            )}

            {/* Thumbnail strip — only shown when multiple images */}
            {images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <button
                            key={img.id ?? i}
                            onClick={() => handleThumbClick(img)}
                            className="shrink-0 relative overflow-hidden transition-all duration-200"
                            style={{
                                width: 72,
                                height: 72,
                                border: `2px solid ${activeUrl === img.imageUrl ? "#6b7c6d" : "transparent"}`,
                                outline: "none",
                            }}
                            aria-label={img.caption ?? `View ${i + 1}`}
                        >
                            <Image
                                src={img.imageUrl}
                                alt={img.caption ?? `${product.title} view ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="72px"
                                style={{ opacity: activeUrl === img.imageUrl ? 1 : 0.65 }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
