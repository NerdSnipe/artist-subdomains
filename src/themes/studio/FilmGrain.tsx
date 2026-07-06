/**
 * Fixed, viewport-wide film-grain overlay. Pure SVG turbulence, no JS —
 * gives the whole theme a subtle analog-noise texture instead of the flat,
 * digital-clean look of a default template.
 */
export default function FilmGrain() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-overlay"
        >
            <svg width="100%" height="100%" preserveAspectRatio="none">
                <filter id="studio-film-grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#studio-film-grain)" />
            </svg>
        </div>
    );
}
