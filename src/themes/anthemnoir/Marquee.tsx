"use client";

import { useEffect, useState } from "react";

// The stutter/jump some browsers show on marquees like this almost always comes from the
// display font finishing its late web-font swap mid-animation — the row's width changes
// under a percentage-based transform, so the loop visibly "jumps." Waiting for fonts to be
// ready before starting the animation removes that class of bug entirely; the doubled-content
// 0% -> -50% loop itself is already seamless once widths are stable.
export default function Marquee({ items, speedSeconds = 22 }: { items: string[]; speedSeconds?: number }) {
    const [ready, setReady] = useState(false);
    const doubled = [...items, ...items];

    useEffect(() => {
        if (typeof document === "undefined" || !("fonts" in document)) {
            setReady(true);
            return;
        }
        document.fonts.ready.then(() => setReady(true)).catch(() => setReady(true));
    }, []);

    return (
        <div className="overflow-hidden border-y-4 border-[#E9DFC9] bg-[#E9DFC9]">
            <div
                className="flex w-max py-3"
                style={{
                    animation: ready ? `anthemnoir-marquee ${speedSeconds}s linear infinite` : "none",
                    willChange: "transform",
                }}
            >
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className="mx-6 shrink-0 font-[family-name:var(--font-display)] uppercase tracking-wide text-[15px] text-[#0C0B09] flex items-center gap-6"
                    >
                        {item}
                        <span className="text-[#C9A227]">✦</span>
                    </span>
                ))}
            </div>
            <style>{`
                @keyframes anthemnoir-marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
            `}</style>
        </div>
    );
}
