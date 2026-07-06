/**
 * Wildfire palette — high-contrast charcoal/black grounded with an
 * ember orange → red gradient. Centralized here so every page in the
 * theme stays visually consistent.
 */
export const ink = "#0a0908";
export const coal = "#161310";
export const coalLight = "#221d18";
export const paper = "#f6f1e8";
export const smoke = "#a89a8c";
export const smokeDark = "#6f6459";
export const emberLight = "#ffb14a";
export const emberMid = "#ff5a1f";
export const emberDeep = "#d81a2a";

export const emberGradient = `linear-gradient(115deg, ${emberLight} 0%, ${emberMid} 55%, ${emberDeep} 100%)`;
export const emberGradientSteep = `linear-gradient(135deg, ${emberLight} 0%, ${emberMid} 45%, ${emberDeep} 100%)`;
export const emberText = {
    backgroundImage: emberGradient,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
} as const;
