import { Anton, Inter } from "next/font/google";

/**
 * Wildfire type system: a heavy condensed grotesk for punchy display
 * headlines, paired with a clean, highly-legible grotesk for body copy.
 * Exposed as CSS variables so they cascade through the whole theme
 * without leaking into other themes.
 */
export const display = Anton({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-display",
    display: "swap",
});

export const body = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable}`;
