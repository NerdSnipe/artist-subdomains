"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { getProductImageUrl } from "@/lib/artist-api";
import { derivePalette } from "./color";
import { useVividPalette } from "./DynamicColorProvider";
import { useScrollSpyPalette } from "./useScrollSpyPalette";

interface Props {
    works: Product[];
}

/**
 * Asymmetric featured-work grid whose cards register with the shared
 * scroll-spy so the interface's accent palette follows the user down the
 * page — the same color system driving the hero also drives this section.
 */
export default function FeaturedGrid({ works }: Props) {
    const { setPalette } = useVividPalette();
    const { register } = useScrollSpyPalette();

    if (works.length === 0) return null;

    const [first, second, ...rest] = works;
    const smalls = rest.slice(0, 4);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            {first && (() => {
                const img = getProductImageUrl(first);
                const palette = derivePalette(first.dominantColors, first.id);
                return (
                    <Link
                        ref={(el) => register(el, { id: first.id, dominantColors: first.dominantColors })}
                        href={`/artworks/${first.slug ?? first.id}`}
                        className="col-span-12 md:col-span-7 group block"
                        style={{ gridRow: "span 2" }}
                        onMouseEnter={() => setPalette(palette, first.id)}
                    >
                        <div
                            className="relative overflow-hidden rounded-2xl h-full"
                            style={{ minHeight: "420px", backgroundColor: "var(--v-ink-soft)" }}
                        >
                            {img ? (
                                <Image
                                    src={img}
                                    alt={first.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                    sizes="(max-width: 768px) 100vw, 58vw"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0" style={{ backgroundColor: "var(--v-ink-soft)" }} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-7">
                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }} className="text-2xl md:text-3xl leading-tight">
                                    {first.title}
                                </p>
                                <p className="text-sm font-bold mt-2" style={{ color: "var(--v-primary)" }}>
                                    ${first.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })()}

            {second && (() => {
                const img = getProductImageUrl(second);
                const palette = derivePalette(second.dominantColors, second.id);
                return (
                    <Link
                        ref={(el) => register(el, { id: second.id, dominantColors: second.dominantColors })}
                        href={`/artworks/${second.slug ?? second.id}`}
                        className="col-span-12 md:col-span-5 group block"
                        onMouseEnter={() => setPalette(palette, second.id)}
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                            {img ? (
                                <Image
                                    src={img}
                                    alt={second.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    sizes="(max-width: 768px) 100vw, 42vw"
                                />
                            ) : (
                                <div className="absolute inset-0" style={{ backgroundColor: "var(--v-ink-soft)" }} />
                            )}
                        </div>
                        <div className="pt-3">
                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-lg">
                                {second.title}
                            </p>
                            <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: "var(--v-primary)" }}>
                                ${second.price.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                );
            })()}

            {smalls.map((work) => {
                const img = getProductImageUrl(work);
                const palette = derivePalette(work.dominantColors, work.id);
                return (
                    <Link
                        key={work.id}
                        ref={(el) => register(el, { id: work.id, dominantColors: work.dominantColors })}
                        href={`/artworks/${work.slug ?? work.id}`}
                        className="col-span-6 md:col-span-3 group block"
                        onMouseEnter={() => setPalette(palette, work.id)}
                    >
                        <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                            {img ? (
                                <Image
                                    src={img}
                                    alt={work.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    sizes="25vw"
                                />
                            ) : (
                                <div className="absolute inset-0" style={{ backgroundColor: "var(--v-ink-soft)" }} />
                            )}
                        </div>
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-sm mt-2.5">
                            {work.title}
                        </p>
                        <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: "var(--v-primary)" }}>
                            ${work.price.toLocaleString()}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
}
