import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Vivid's type system: a heavy, geometric, maximalist display face for
 * headlines paired with a clean, highly-legible grotesk for body copy so
 * huge type never sacrifices readability. Exposed as CSS variables scoped
 * to this theme only (applied on the root wrapper in Layout.tsx).
 */
export const display = Unbounded({
    subsets: ["latin"],
    weight: ["500", "700", "900"],
    variable: "--font-display",
    display: "swap",
});

export const body = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
    display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable}`;
