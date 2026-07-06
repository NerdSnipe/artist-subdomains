import { Fraunces, Archivo } from "next/font/google";

/**
 * "The White Cube" typographic system:
 * - Fraunces: an elegant, slightly soft display serif for museum wall-label
 *   headlines and pull-quotes (used at both light display weights and italic).
 * - Archivo: a clean, neutral grotesk for body copy, labels and UI chrome.
 *
 * Both fonts are exposed as CSS variables so any element in the theme can
 * opt into either family via `font-[family-name:var(--font-display)]` /
 * `font-[family-name:var(--font-sans)]` without touching global Tailwind config.
 */
export const fraunces = Fraunces({
    subsets: ["latin"],
    variable: "--font-display",
    style: ["normal", "italic"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export const archivo = Archivo({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const galleryFontVariables = `${fraunces.variable} ${archivo.variable}`;
