/**
 * Small, static decorative primitives shared across the Artisan theme —
 * a torn/deckled paper edge divider, a subtle grain overlay, and a
 * hand-finished picture frame wrapper for images.
 */
import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";

const TORN_EDGE_CLIP =
    "polygon(0% 8%, 3% 22%, 6% 4%, 9% 30%, 13% 12%, 16% 34%, 20% 2%, 24% 26%, 28% 10%, 32% 32%, 36% 6%, 40% 24%, 44% 0%, 48% 28%, 52% 14%, 56% 34%, 60% 4%, 64% 26%, 68% 10%, 72% 30%, 76% 2%, 80% 24%, 84% 12%, 88% 32%, 92% 6%, 96% 22%, 100% 8%, 100% 100%, 0% 100%)";

export function TornEdge({
    fill = "var(--paper)",
    flip = false,
    className = "",
}: {
    fill?: string;
    flip?: boolean;
    className?: string;
}) {
    return (
        <div
            aria-hidden
            className={clsx("h-8 w-full sm:h-12", flip && "rotate-180", className)}
            style={{ backgroundColor: fill, clipPath: TORN_EDGE_CLIP }}
        />
    );
}

const GRAIN_URL =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-multiply"
            style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat" }}
        />
    );
}

/** A slightly rotated, deckle-edged photo mount — the "pinned to the studio wall" look. */
export function StudioFrame({
    children,
    rotate = 0,
    className = "",
    style,
}: {
    children: ReactNode;
    rotate?: number;
    className?: string;
    style?: CSSProperties;
}) {
    return (
        <div
            className={clsx("relative bg-[var(--paper)] p-2 shadow-[0_10px_30px_-12px_rgba(54,42,32,0.35)] sm:p-2.5", className)}
            style={{ transform: `rotate(${rotate}deg)`, ...style }}
        >
            <div className="relative overflow-hidden border border-[var(--ink)]/10">{children}</div>
        </div>
    );
}
