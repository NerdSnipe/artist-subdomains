import localFont from "next/font/local";
import { Inter } from "next/font/google";

/**
 * Anthem Noir's type system: the real Handel Gothic D Bold — the client's own font file —
 * as the bold, geometric, all-caps display face, paired with a clean, highly-legible
 * grotesk for everything else. No script/cursive anywhere — that was the one hard rule
 * this theme family was built around.
 */
export const display = localFont({
    src: "./fonts-local/HandelGothicDBold.otf",
    weight: "700",
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
