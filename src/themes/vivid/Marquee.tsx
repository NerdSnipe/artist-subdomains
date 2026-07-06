interface MarqueeProps {
    items: string[];
    speedSeconds?: number;
}

/**
 * Infinite kinetic ticker — pure CSS keyframes, colored by the live palette
 * variables so it visibly participates in the artwork-driven color system.
 */
export default function Marquee({ items, speedSeconds = 22 }: MarqueeProps) {
    if (items.length === 0) return null;
    const track = [...items, ...items, ...items, ...items];

    return (
        <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-3">
            <div
                className="vivid-marquee-track flex items-center whitespace-nowrap"
                style={{ animationDuration: `${speedSeconds}s` }}
            >
                {track.map((item, i) => (
                    <span key={i} className="flex items-center">
                        <span
                            className="px-6 text-sm sm:text-base font-semibold uppercase tracking-wide"
                            style={{ fontFamily: "var(--font-display)", color: "var(--v-primary)" }}
                        >
                            {item}
                        </span>
                        <span
                            className="inline-block h-1.5 w-1.5 rotate-45 shrink-0"
                            style={{ backgroundColor: "var(--v-secondary)" }}
                        />
                    </span>
                ))}
            </div>
            <style>{`
                .vivid-marquee-track {
                    width: max-content;
                    animation-name: vivid-marquee-scroll;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                @keyframes vivid-marquee-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-25%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .vivid-marquee-track { animation: none; }
                }
            `}</style>
        </div>
    );
}
