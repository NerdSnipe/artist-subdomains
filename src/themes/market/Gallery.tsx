"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { ProductImage } from "@/types";

export default function Gallery({
    images,
    fallbackUrl,
    title,
    sold,
}: {
    images: ProductImage[];
    fallbackUrl: string;
    title: string;
    sold: boolean;
}) {
    const sources = images.length ? images.map((i) => i.imageUrl) : fallbackUrl ? [fallbackUrl] : [];
    const [active, setActive] = useState(0);
    const current = sources[active] ?? sources[0];

    return (
        <div>
            <div className="relative aspect-[4/5] bg-[#efe6d7] overflow-hidden">
                {current && (
                    <Image
                        key={current}
                        src={current}
                        alt={title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 45vw, 92vw"
                        className={clsx("object-cover animate-[fadeIn_0.4s_ease-out]", sold && "grayscale-[35%]")}
                    />
                )}
                {sold && (
                    <div className="absolute top-4 left-4 bg-[#241e19]/90 text-[#f8f2e9] text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5">
                        Collected
                    </div>
                )}
            </div>
            {sources.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {sources.map((src, i) => (
                        <button
                            key={src + i}
                            onClick={() => setActive(i)}
                            className={clsx(
                                "relative w-16 h-16 shrink-0 bg-[#efe6d7] overflow-hidden transition-opacity",
                                i === active ? "ring-2 ring-[#b2542e]" : "opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image src={src} alt={`${title} view ${i + 1}`} fill className="object-cover" />
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
