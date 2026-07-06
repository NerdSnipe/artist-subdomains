import { Fraunces, Inter } from "next/font/google";

export const displayFont = Fraunces({
    subsets: ["latin"],
    variable: "--market-font-display",
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
    display: "swap",
});

export const bodyFont = Inter({
    subsets: ["latin"],
    variable: "--market-font-body",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});
