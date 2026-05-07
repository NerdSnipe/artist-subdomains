"use client";

interface MarqueeStripProps {
    name: string;
}

// Build a repeating segment for seamless infinite loop
function buildSegment(name: string): string {
    return `${name} · ${name} · ${name} ✦ ${name} · ${name} · ${name} ✦ `;
}

export default function MarqueeStrip({ name }: MarqueeStripProps) {
    const segment = buildSegment(name);

    return (
        <div
            className="w-full overflow-hidden py-5 border-t border-b border-stone-200"
            style={{ backgroundColor: "#faf8f5" }}
            aria-hidden="true"
        >
            <style>{`
                @keyframes chronicle-marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .chronicle-marquee-track {
                    display: inline-flex;
                    white-space: nowrap;
                    animation: chronicle-marquee 30s linear infinite;
                    will-change: transform;
                }
            `}</style>

            {/*
              DOM contains segment twice so when translateX(-50%) is reached
              it looks identical to the start → seamless loop.
            */}
            <div className="chronicle-marquee-track">
                <MarqueeText segment={segment} />
                <MarqueeText segment={segment} />
            </div>
        </div>
    );
}

function MarqueeText({ segment }: { segment: string }) {
    // Split on " · " to alternate ink ↔ sage color
    const parts = segment.split(" · ");
    return (
        <span
            style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 2.8vw, 2.25rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                lineHeight: 1,
            }}
        >
            {parts.map((part, idx) => (
                <span key={idx} style={{ color: idx % 2 === 0 ? "#1c1917" : "#6b7c6d" }}>
                    {idx > 0 ? " · " : ""}
                    {part}
                </span>
            ))}
        </span>
    );
}
