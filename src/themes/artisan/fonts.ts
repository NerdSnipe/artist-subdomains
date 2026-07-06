import { Fraunces, Work_Sans, Caveat } from "next/font/google";

// Warm literary serif for headlines — optical sizing gives it a handset,
// slightly irregular letterform character rather than a stiff digital serif.
export const displayFont = Fraunces({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
    display: "swap",
});

// Friendly humanist sans for all body copy — legible at small sizes.
export const bodyFont = Work_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

// Handwritten accent, used sparingly for small eyebrow labels / taglines only.
export const scriptFont = Caveat({
    subsets: ["latin"],
    variable: "--font-script",
    weight: ["500", "600", "700"],
    display: "swap",
});
