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

    if (images.length <= 1) {
        return (
            <div className="relative w-full overflow-hidden bg-neutral-50" style={{ maxHeight: "70vh" }}>
                {primaryUrl ? (
                    <div className="relative" style={{ aspectRatio: "4/3" }}>
                        <Image
                            src={primaryUrl}
                            alt={product.title}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                        />
                    </div>
                ) : (
                    <div
                        className="w-full bg-neutral-100 flex items-center justify-center"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <p
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-3xl text-neutral-300"
                        >
                            {product.title}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {/* Main image */}
            <div
                className="relative w-full overflow-hidden bg-neutral-50"
                style={{ maxHeight: "70vh" }}
            >
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                    <Image
                        key={activeUrl}
                        src={activeUrl}
                        alt={product.title}
                        fill
                        className="object-contain"
                        priority
                        sizes="100vw"
                        style={{ transition: "opacity 200ms ease" }}
                    />
                </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-3 px-6 md:px-10 overflow-x-auto pb-2">
                {images.map((img, i) => (
                    <button
                        key={img.id ?? i}
                        onClick={() => setActiveUrl(img.imageUrl)}
                        className="relative flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all duration-150"
                        style={{
                            borderColor: activeUrl === img.imageUrl ? "var(--accent)" : "transparent",
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
        </div>
    );
}
