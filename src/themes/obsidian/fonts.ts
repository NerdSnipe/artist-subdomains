import { Cormorant_Garamond, Jost } from "next/font/google";

/**
 * Display serif — used for large headlines, artist name, section titles.
 * Ultra-light/regular weights only to keep the "Vault" aesthetic refined, never bold.
 */
export const displayFont = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-obsidian-display",
    display: "swap",
});

/**
 * Thin geometric sans — used for labels, nav, body copy, tracked-out uppercase text.
 */
export const sansFont = Jost({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500"],
    variable: "--font-obsidian-sans",
    display: "swap",
});
