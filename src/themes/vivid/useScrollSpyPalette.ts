"use client";

import { useCallback, useEffect, useRef } from "react";
import { useVividPalette } from "./DynamicColorProvider";
import { derivePalette, type VividPalette } from "./color";

interface SpyEntry {
    id: string;
    dominantColors: Array<{ name: string; hex: string }> | null | undefined;
}

/**
 * Tracks which registered artwork card is most centered in the viewport as
 * the user scrolls, and smoothly retints the whole interface to match it.
 * This is what makes Vivid's color system react to *scrolling through* a
 * body of work, not just clicking or hovering one thing at a time.
 */
export function useScrollSpyPalette() {
    const { setPalette } = useVividPalette();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const ratiosRef = useRef<Map<string, number>>(new Map());
    const paletteCacheRef = useRef<Map<string, VividPalette>>(new Map());
    const activeIdRef = useRef<string | null>(null);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = (entry.target as HTMLElement).dataset.vividSpyId;
                    if (!id) continue;
                    ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
                }
                if (frameRef.current) cancelAnimationFrame(frameRef.current);
                frameRef.current = requestAnimationFrame(() => {
                    let bestId: string | null = null;
                    let bestRatio = 0;
                    ratiosRef.current.forEach((ratio, id) => {
                        if (ratio > bestRatio) {
                            bestRatio = ratio;
                            bestId = id;
                        }
                    });
                    if (bestId && bestId !== activeIdRef.current && bestRatio > 0.15) {
                        activeIdRef.current = bestId;
                        const palette = paletteCacheRef.current.get(bestId);
                        if (palette) setPalette(palette, bestId);
                    }
                });
            },
            { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1], rootMargin: "-15% 0px -35% 0px" }
        );
        return () => {
            observerRef.current?.disconnect();
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [setPalette]);

    const register = useCallback((el: HTMLElement | null, entry: SpyEntry) => {
        if (!el) return;
        el.dataset.vividSpyId = entry.id;
        paletteCacheRef.current.set(entry.id, derivePalette(entry.dominantColors, entry.id));
        observerRef.current?.observe(el);
    }, []);

    const unregister = useCallback((el: HTMLElement | null) => {
        if (!el) return;
        observerRef.current?.unobserve(el);
    }, []);

    const triggerImmediate = useCallback(
        (entry: SpyEntry) => {
            const palette = derivePalette(entry.dominantColors, entry.id);
            paletteCacheRef.current.set(entry.id, palette);
            activeIdRef.current = entry.id;
            setPalette(palette, entry.id);
        },
        [setPalette]
    );

    return { register, unregister, triggerImmediate };
}
