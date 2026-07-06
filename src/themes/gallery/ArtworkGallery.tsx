"use client";

import Image from "next/image";
import { useState } from "react";

interface ArtworkGalleryProps {
    images: string[];
    alt: string;
    soldBadge?: boolean;
}

/**
 * Museum-style single-work display: one large image in a mat/frame, with a
 * slim thumbnail rail beneath when a work has multiple photographs.
 */
export default function ArtworkGallery({ images, alt, soldBadge = false }: ArtworkGalleryProps) {
    const gallery = images.length > 0 ? images : [""];
    const [active, setActive] = useState(0);
    const src = gallery[active];

    return (
        <div>
            <div className="relative aspect-[4/5] bg-[#F1ECE2] border border-[#E3DCCE]">
                {src ? (
                    <Image
                        key={src}
                        src={src}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-contain p-4 md:p-6 animate-[fadeIn_0.5s_ease]"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-sans)] text-[11px] tracking-[0.2em] uppercase text-[#8C8478]">
                        Image unavailable
                    </div>
                )}
                {soldBadge && (
                    <div className="absolute top-4 right-4 bg-[#1B1812] text-[#F8F5EF] text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                        Sold
                    </div>
                )}
            </div>

            {gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                    {gallery.map((img, i) => (
                        <button
                            key={img + i}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`View image ${i + 1} of ${alt}`}
                            className={`relative shrink-0 w-16 h-16 border transition-colors ${
                                active === i ? "border-[#1B1812]" : "border-[#E3DCCE] hover:border-[#B8AF9E]"
                            }`}
                        >
                            {img && (
                                <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
