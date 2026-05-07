"use client";

import Image from "next/image";
import { useId } from "react";

interface Props {
    images: string[];
    label?: string;
    itemWidth?: number;
    itemHeight?: number;
}

export default function HorizontalScrollStrip({
    images,
    label,
    itemWidth = 320,
    itemHeight = 240,
}: Props) {
    const scrollbarId = useId().replace(/:/g, "");

    if (!images || images.length === 0) return null;

    return (
        <div>
            <style>{`
                .vivid-hstrip-${scrollbarId}::-webkit-scrollbar {
                    height: 6px;
                }
                .vivid-hstrip-${scrollbarId}::-webkit-scrollbar-track {
                    background: #f0f0f0;
                }
                .vivid-hstrip-${scrollbarId}::-webkit-scrollbar-thumb {
                    background: var(--accent);
                    border-radius: 3px;
                }
                .vivid-hstrip-${scrollbarId} {
                    scrollbar-color: var(--accent) #f0f0f0;
                    scrollbar-width: thin;
                }
            `}</style>
            {label && (
                <p className="text-xs font-bold tracking-widest uppercase text-[#111] mb-4 px-6 md:px-10">
                    {label}
                </p>
            )}
            <div
                className={`vivid-hstrip-${scrollbarId} flex gap-3 overflow-x-auto pb-4 px-6 md:px-10`}
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="relative flex-shrink-0 overflow-hidden bg-neutral-100"
                        style={{
                            width: itemWidth,
                            height: itemHeight,
                            scrollSnapAlign: "start",
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Image ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes={`${itemWidth}px`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
