import { Fraunces, Barlow, Barlow_Condensed } from "next/font/google";

/**
 * "The Loft" type system:
 * - Fraunces (extralight/italic optical serif) carries all display headlines —
 *   cinematic, editorial, slightly melancholic.
 * - Barlow Condensed handles nav, labels, captions and metadata in tracked
 *   uppercase, the way gallery wall text and film slates are set.
 * - Barlow (same superfamily, normal width) carries body copy so long-form
 *   text stays warm and legible against the near-black backdrop.
 */
export const displayFont = Fraunces({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-studio-display",
    display: "swap",
});

export const condensedFont = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-studio-condensed",
    display: "swap",
});

export const bodyFont = Barlow({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-studio-body",
    display: "swap",
});
