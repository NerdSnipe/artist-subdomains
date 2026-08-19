import { Anton, Inter } from "next/font/google";

/**
 * Anthem's type system: one huge, condensed, all-caps display face built for
 * short declarative statements ("BEAUTIFUL CHAOS.") paired with a clean,
 * highly-legible grotesk for everything else. No script/cursive anywhere —
 * that was the one hard rule this theme was built around.
 */
export const display = Anton({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-display",
    display: "swap",
});

export const body = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
    display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable}`;
