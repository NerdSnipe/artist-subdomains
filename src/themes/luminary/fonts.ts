import { Fraunces, Nunito_Sans } from "next/font/google";

/**
 * "Halo" typography system for the Luminary theme.
 * Fraunces (light-weight, italic-capable display serif) pairs with
 * Nunito Sans (soft, humanist, highly legible body sans).
 *
 * Both fonts are exposed as CSS variables and scoped to this theme only —
 * see the `.luminary-root` override block rendered in Layout.tsx, which
 * remaps the standard Tailwind `font-serif` / `font-sans` utilities to
 * these variables without touching the shared globals.css file.
 */
export const displayFont = Fraunces({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--luminary-font-display",
    display: "swap",
});

export const bodyFont = Nunito_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--luminary-font-body",
    display: "swap",
});
