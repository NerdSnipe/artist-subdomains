import type { ThemePageProps } from "@/themes/types";
import ArtworksBrowser from "./ArtworksBrowser";

const CORMORANT = "'Cormorant Garamond', serif";
const MONO = "'IBM Plex Mono', monospace";

export default function ChronicleArtworksPage({ artworks }: ThemePageProps) {
    const visibleWorks = artworks.filter((a) => a.status !== "inactive");

    return (
        <div style={{ backgroundColor: "#faf8f5" }}>
            {/* ── Full-Bleed Page Header ─────────────────────────────────────── */}
            <div
                className="border-b border-stone-200 py-14 md:py-24 overflow-hidden relative"
                style={{ backgroundColor: "#faf8f5" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <p
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.6rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#6b7c6d",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Catalogue Raisonné
                    </p>
                    <h1
                        style={{
                            fontFamily: CORMORANT,
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(3.5rem, 9vw, 8rem)",
                            color: "#1c1917",
                            lineHeight: 0.95,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        The Collection
                    </h1>
                    <p
                        className="mt-5"
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.6rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#9ca3af",
                        }}
                    >
                        {visibleWorks.filter((w) => w.status === "active").length} available ·{" "}
                        {visibleWorks.filter((w) => w.status === "sold").length} sold
                    </p>
                </div>
            </div>

            {/* ── Filter + Grid (client) ─────────────────────────────────────── */}
            <ArtworksBrowser artworks={visibleWorks} />
        </div>
    );
}
