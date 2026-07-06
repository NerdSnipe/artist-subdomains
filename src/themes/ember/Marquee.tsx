import { ink, emberMid } from "./palette";

interface MarqueeProps {
    items: string[];
    speedSeconds?: number;
    variant?: "dark" | "ember";
}

/**
 * Infinite scrolling ticker strip, pure CSS keyframe animation (no deps).
 * Content is duplicated so the loop reads seamlessly.
 */
export default function Marquee({ items, speedSeconds = 28, variant = "dark" }: MarqueeProps) {
    if (items.length === 0) return null;

    const bg = variant === "ember" ? emberMid : ink;
    const fg = variant === "ember" ? ink : "#f6f1e8";
    const dotColor = variant === "ember" ? ink : emberMid;

    const track = [...items, ...items, ...items];

    return (
        <div
            className="relative overflow-hidden border-y"
            style={{ backgroundColor: bg, borderColor: "rgba(255,255,255,0.08)" }}
        >
            <div className="ember-marquee-track flex items-center whitespace-nowrap py-3.5" style={{ animationDuration: `${speedSeconds}s` }}>
                {track.map((item, i) => (
                    <span key={i} className="flex items-center">
                        <span
                            className="font-[var(--font-display)] uppercase tracking-wide text-sm sm:text-base px-6"
                            style={{ color: fg }}
                        >
                            {item}
                        </span>
                        <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: dotColor }} />
                    </span>
                ))}
            </div>
            <style>{`
                .ember-marquee-track {
                    width: max-content;
                    animation-name: ember-marquee-scroll;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                @keyframes ember-marquee-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.3333%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ember-marquee-track { animation: none; }
                }
            `}</style>
        </div>
    );
}
