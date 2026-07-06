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
                .vivid-hstrip-${scrollbarId}::-webkit-scrollbar { height: 5px; }
                .vivid-hstrip-${scrollbarId}::-webkit-scrollbar-track { background: rgba(255,255,255,0.06); }
                .vivid-hstrip-${scrollbarId}::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, var(--v-primary), var(--v-secondary));
                    border-radius: 3px;
                }
                .vivid-hstrip-${scrollbarId} { scrollbar-color: var(--v-primary) rgba(255,255,255,0.06); scrollbar-width: thin; }
                .vivid-hstrip-item {
                    transition: transform 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms ease;
                }
                .vivid-hstrip-item:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px -16px var(--v-glow);
                }
            `}</style>
            {label && (
                <p
                    className="text-xs font-bold tracking-[0.18em] uppercase mb-4 px-5 md:px-10"
                    style={{ color: "var(--v-primary)" }}
                >
                    {label}
                </p>
            )}
            <div
                className={`vivid-hstrip-${scrollbarId} flex gap-4 overflow-x-auto pb-4 px-5 md:px-10`}
                style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="vivid-hstrip-item relative flex-shrink-0 overflow-hidden rounded-2xl"
                        style={{
                            width: itemWidth,
                            height: itemHeight,
                            scrollSnapAlign: "start",
                            backgroundColor: "var(--v-ink-soft)",
                        }}
                    >
                        <Image
                            src={src}
                            alt={`${label ?? "Image"} ${i + 1}`}
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
