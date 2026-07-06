"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product, ProductImage } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";

interface Props {
    product: Product;
}

export default function ArtworkImageSwitcher({ product }: Props) {
    const images: ProductImage[] = [...(product.images ?? [])].sort(
        (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );

    const primaryUrl = getProductImageUrl(product);
    const [activeUrl, setActiveUrl] = useState<string>(primaryUrl);

    return (
        <div>
            <div
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{ minHeight: "60vh", maxHeight: "76vh", backgroundColor: "var(--v-ink-soft)" }}
            >
                {/* Ambient glow echoing the artwork's own palette behind the piece */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--v-glow), transparent 70%)" }}
                />

                {primaryUrl ? (
                    <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                        <Image
                            key={activeUrl}
                            src={activeUrl}
                            alt={product.title}
                            fill
                            className="object-contain vivid-artwork-fade"
                            priority
                            sizes="100vw"
                        />
                    </div>
                ) : (
                    <p
                        style={{ fontFamily: "var(--font-display)", color: "rgba(246,244,239,0.25)" }}
                        className="relative text-3xl md:text-5xl uppercase text-center px-6"
                    >
                        {product.title}
                    </p>
                )}
            </div>
            <style>{`
                .vivid-artwork-fade {
                    animation: vivid-artwork-in 500ms ease both;
                }
                @keyframes vivid-artwork-in {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>

            {images.length > 1 && (
                <div className="flex gap-2.5 mt-4 px-5 md:px-10 overflow-x-auto pb-2">
                    {images.map((img, i) => (
                        <button
                            key={img.id ?? i}
                            onClick={() => setActiveUrl(img.imageUrl)}
                            className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded-xl border-2 transition-all duration-200"
                            style={{
                                borderColor: activeUrl === img.imageUrl ? "var(--v-primary)" : "rgba(255,255,255,0.12)",
                                opacity: activeUrl === img.imageUrl ? 1 : 0.6,
                            }}
                            aria-label={img.caption ?? `View image ${i + 1}`}
                        >
                            <Image
                                src={img.imageUrl}
                                alt={img.caption ?? `${product.title} view ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
