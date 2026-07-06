"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { mixPalette, withAlpha, type VividPalette } from "./color";

interface VividColorContextValue {
    /**
     * Request a smooth transition of the whole interface's accent palette.
     * `key` de-dupes rapid repeat calls for the same artwork (e.g. from both
     * a scroll-spy and a hover) so we don't restart the animation pointlessly.
     */
    setPalette: (palette: VividPalette, key?: string) => void;
}

const VividColorContext = createContext<VividColorContextValue | null>(null);

export function useVividPalette(): VividColorContextValue {
    const ctx = useContext(VividColorContext);
    if (!ctx) {
        // Graceful no-op fallback so components can be used outside the
        // provider (e.g. in isolation) without crashing.
        return { setPalette: () => {} };
    }
    return ctx;
}

const TRANSITION_MS = 700;

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

function applyPalette(el: HTMLElement, p: VividPalette) {
    el.style.setProperty("--v-primary", p.primary);
    el.style.setProperty("--v-secondary", p.secondary);
    el.style.setProperty("--v-tint", p.tint);
    el.style.setProperty("--v-primary-rgb", p.primaryRgb);
    el.style.setProperty("--v-secondary-rgb", p.secondaryRgb);
    el.style.setProperty("--v-on-primary", p.onPrimary);
    el.style.setProperty("--v-on-secondary", p.onSecondary);
    el.style.setProperty("--v-glow", withAlpha(p.primary, 0.45));
    el.style.setProperty("--v-glow-soft", withAlpha(p.secondary, 0.35));
}

interface Props {
    initialPalette: VividPalette;
    children?: ReactNode;
}

/**
 * Owns the theme's living color state. Rather than snapping a CSS variable
 * instantly (the old behavior), this animates every channel in RGB space
 * across ~700ms with an ease-out curve via requestAnimationFrame, so moving
 * between hero slides, hovering/scrolling through artworks, etc. all feel
 * like the interface is smoothly "breathing" the new color rather than
 * flashing it.
 */
export default function DynamicColorProvider({ initialPalette, children }: Props) {
    const fromRef = useRef<VividPalette>(initialPalette);
    const toRef = useRef<VividPalette>(initialPalette);
    const rafRef = useRef<number | null>(null);
    const startRef = useRef<number>(0);
    const lastKeyRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        const root = document.documentElement;
        applyPalette(root, initialPalette);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setPalette = useCallback((palette: VividPalette, key?: string) => {
        if (key && key === lastKeyRef.current) return;
        lastKeyRef.current = key;

        const root = document.documentElement;
        fromRef.current = toRef.current;
        toRef.current = palette;
        startRef.current = performance.now();

        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const tick = (now: number) => {
            const elapsed = now - startRef.current;
            const t = Math.min(elapsed / TRANSITION_MS, 1);
            const eased = easeOutCubic(t);
            const blended = mixPalette(fromRef.current, toRef.current, eased);
            applyPalette(root, blended);
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                rafRef.current = null;
            }
        };
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    const value = useMemo(() => ({ setPalette }), [setPalette]);

    return <VividColorContext.Provider value={value}>{children}</VividColorContext.Provider>;
}
