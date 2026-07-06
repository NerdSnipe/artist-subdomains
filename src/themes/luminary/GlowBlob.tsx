interface GlowBlobProps {
    className?: string;
    colors?: [string, string];
    opacity?: number;
}

/**
 * A soft, blurred, pure-CSS radial-gradient "halo" shape.
 * No images required — purely decorative, aria-hidden, and pointer-events-none
 * so it never interferes with content or accessibility.
 */
export default function GlowBlob({
    className = "",
    colors = ["#f3d9ff", "#d9e8ff"],
    opacity = 0.55,
}: GlowBlobProps) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
            style={{
                background: `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]} 55%, transparent 75%)`,
                opacity,
            }}
        />
    );
}
