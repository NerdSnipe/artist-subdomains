/**
 * Vivid's color engine.
 *
 * The theme's whole identity is "your artwork's colors tint the interface" —
 * this module is what makes that sophisticated instead of "one hex pasted
 * everywhere": it derives a small, harmonious, *legible* palette from a
 * product's `dominantColors`, clamps saturation/lightness into a usable
 * range, computes real WCAG contrast for text-on-color decisions, and
 * provides RGB-space interpolation so callers can animate between palettes
 * frame-by-frame instead of snapping.
 */

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface HSL {
    h: number; // 0-360
    s: number; // 0-1
    l: number; // 0-1
}

export interface VividPalette {
    /** The single most confident, vivid accent — buttons, links, glows. */
    primary: string;
    /** A harmonious counterpoint hue — secondary accents, gradients. */
    secondary: string;
    /** A soft, low-saturation tint of primary for large color washes. */
    tint: string;
    /** "primary" as an "r, g, b" triple string for use in rgba(var(--x), a). */
    primaryRgb: string;
    secondaryRgb: string;
    /** Best-contrast text color to place on top of a `primary` fill. */
    onPrimary: string;
    /** Best-contrast text color to place on top of a `secondary` fill. */
    onSecondary: string;
    /** Original swatches as reported by the API, for display purposes. */
    swatches: Array<{ name: string; hex: string }>;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function normalizeHex(hex: string): string {
    let h = hex.trim().replace(/^#/, "");
    if (h.length === 3) {
        h = h.split("").map((c) => c + c).join("");
    }
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return "808080";
    return h.toLowerCase();
}

export function hexToRgb(hex: string): RGB {
    const h = normalizeHex(hex);
    return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
    };
}

export function rgbToHex({ r, g, b }: RGB): string {
    const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h: number;
    switch (max) {
        case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)); break;
        case gn: h = (bn - rn) / d + 2; break;
        default: h = (rn - gn) / d + 4;
    }
    return { h: h * 60, s, l };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
    const hue2rgb = (p: number, q: number, t: number) => {
        let tt = t;
        if (tt < 0) tt += 1;
        if (tt > 1) tt -= 1;
        if (tt < 1 / 6) return p + (q - p) * 6 * tt;
        if (tt < 1 / 2) return q;
        if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
        return p;
    };
    if (s === 0) {
        const v = l * 255;
        return { r: v, g: v, b: v };
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hn = ((h % 360) + 360) % 360 / 360;
    return {
        r: hue2rgb(p, q, hn + 1 / 3) * 255,
        g: hue2rgb(p, q, hn) * 255,
        b: hue2rgb(p, q, hn - 1 / 3) * 255,
    };
}

export function hexToHsl(hex: string): HSL {
    return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSL): string {
    return rgbToHex(hslToRgb(hsl));
}

/** WCAG relative luminance. */
export function relativeLuminance({ r, g, b }: RGB): number {
    const lin = (c: number) => {
        const cs = c / 255;
        return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(hexA: string, hexB: string): number {
    const la = relativeLuminance(hexToRgb(hexA));
    const lb = relativeLuminance(hexToRgb(hexB));
    const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
    return (lighter + 0.05) / (darker + 0.05);
}

/** Best-contrast near-black or near-white text for a given background. */
export function bestTextColor(bgHex: string, dark = "#0a0a0d", light = "#fbfaf7"): string {
    const contrastDark = contrastRatio(bgHex, dark);
    const contrastLight = contrastRatio(bgHex, light);
    return contrastLight >= contrastDark ? light : dark;
}

/** Linear-interpolate two hex colors in RGB space, t in [0,1]. */
export function mixHex(a: string, b: string, t: number): string {
    const ra = hexToRgb(a);
    const rb = hexToRgb(b);
    const tt = clamp(t, 0, 1);
    return rgbToHex({
        r: ra.r + (rb.r - ra.r) * tt,
        g: ra.g + (rb.g - ra.g) * tt,
        b: ra.b + (rb.b - ra.b) * tt,
    });
}

export function tint(hex: string, amount: number): string {
    return mixHex(hex, "#ffffff", amount);
}

export function shade(hex: string, amount: number): string {
    return mixHex(hex, "#000000", amount);
}

export function withAlpha(hex: string, alpha: number): string {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${clamp(alpha, 0, 1)})`;
}

export function toRgbTriple(hex: string): string {
    const { r, g, b } = hexToRgb(hex);
    return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
}

/**
 * Pull a raw hex into a "vivid but usable" range — saturated enough to feel
 * alive, but never so dark it disappears or so light it washes out and
 * breaks contrast math. This is the guard rail that keeps arbitrary artwork
 * colors from producing an unreadable interface.
 */
export function toAccentSafe(hex: string): string {
    const hsl = hexToHsl(hex);
    return hslToHex({
        h: hsl.h,
        s: clamp(hsl.s, 0.5, 0.92),
        l: clamp(hsl.l, 0.4, 0.62),
    });
}

/** Curated fallback seed hues, used only when a product has no dominantColors. */
const FALLBACK_SEEDS = [
    "#ff2f92", // magenta
    "#00e5c7", // aqua
    "#7c5cff", // violet
    "#ffb800", // amber
    "#ff4d3d", // vermillion
    "#2ee6a6", // spring green
    "#4f8bff", // electric blue
    "#f4478c", // hot pink
];

function hashSeed(seed: string): number {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return h;
}

/**
 * Derive a full, harmonious, legible palette from a product's dominantColors
 * (or a deterministic fallback keyed by `seed` when none exist), so every
 * artwork — even sparsely-tagged ones — still tints the site with intention
 * rather than falling back to a single generic brand color.
 */
export function derivePalette(
    dominantColors: Array<{ name: string; hex: string }> | null | undefined,
    seed = "vivid"
): VividPalette {
    const swatches = (dominantColors ?? []).filter((c) => /^#?[0-9a-fA-F]{3,6}$/.test(c.hex));

    let primaryHex: string;
    let secondaryHex: string | null = null;

    if (swatches.length > 0) {
        // Prefer the most "alive" swatch — saturated, and not too close to
        // pure black/white — over blindly taking index 0.
        const scored = swatches
            .map((c) => {
                const hsl = hexToHsl(c.hex);
                const vividness = hsl.s * (1 - Math.abs(hsl.l - 0.5) * 1.1);
                return { hex: c.hex, hsl, vividness };
            })
            .sort((a, b) => b.vividness - a.vividness);

        primaryHex = scored[0].hex;
        const primaryHsl = scored[0].hsl;

        // Look for a second swatch with a meaningfully different hue for a
        // real two-tone palette instead of near-duplicate accents.
        const candidate = scored.slice(1).find((c) => {
            const diff = Math.abs(c.hsl.h - primaryHsl.h);
            return Math.min(diff, 360 - diff) > 35;
        });
        secondaryHex = candidate?.hex ?? null;
    } else {
        const idx = hashSeed(seed) % FALLBACK_SEEDS.length;
        primaryHex = FALLBACK_SEEDS[idx];
    }

    const primary = toAccentSafe(primaryHex);
    const primaryHsl = hexToHsl(primary);

    // Split-complementary-ish secondary when we don't have a real second
    // swatch — energetic but still harmonious with the primary.
    const secondary = toAccentSafe(
        secondaryHex ?? hslToHex({ h: primaryHsl.h + 150, s: primaryHsl.s, l: primaryHsl.l })
    );

    const tintColor = tint(primary, 0.86);

    return {
        primary,
        secondary,
        tint: tintColor,
        primaryRgb: toRgbTriple(primary),
        secondaryRgb: toRgbTriple(secondary),
        onPrimary: bestTextColor(primary),
        onSecondary: bestTextColor(secondary),
        swatches: swatches.length > 0 ? swatches : [{ name: "Signature", hex: primary }],
    };
}

export function mixPalette(a: VividPalette, b: VividPalette, t: number): VividPalette {
    const tt = clamp(t, 0, 1);
    const primary = mixHex(a.primary, b.primary, tt);
    const secondary = mixHex(a.secondary, b.secondary, tt);
    const tintColor = mixHex(a.tint, b.tint, tt);
    return {
        primary,
        secondary,
        tint: tintColor,
        primaryRgb: toRgbTriple(primary),
        secondaryRgb: toRgbTriple(secondary),
        onPrimary: tt < 0.5 ? a.onPrimary : b.onPrimary,
        onSecondary: tt < 0.5 ? a.onSecondary : b.onSecondary,
        swatches: tt < 0.5 ? a.swatches : b.swatches,
    };
}
