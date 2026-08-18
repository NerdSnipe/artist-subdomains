import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import RevealOnScroll from "./RevealOnScroll";

const MONO = "'IBM Plex Mono', monospace";
const CORMORANT = "'Cormorant Garamond', serif";
const BASKERVILLE = "'Libre Baskerville', serif";

export default function ChronicleContactPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const commissionsOpen = artist.acceptsCommissions === "yes" || artist.acceptsCommissions === "true";

    const socials: { platform: string; handle: string; href: string }[] = [
        artist.instagram ? { platform: "Instagram", handle: `@${artist.instagram.replace("@", "")}`, href: `https://instagram.com/${artist.instagram.replace("@", "")}` } : null,
        artist.facebook ? { platform: "Facebook", handle: artist.facebook, href: artist.facebook.startsWith("http") ? artist.facebook : `https://facebook.com/${artist.facebook}` } : null,
        artist.twitter ? { platform: "X / Twitter", handle: `@${artist.twitter.replace("@", "")}`, href: `https://twitter.com/${artist.twitter.replace("@", "")}` } : null,
        artist.tiktok ? { platform: "TikTok", handle: `@${artist.tiktok.replace("@", "")}`, href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}` } : null,
        artist.pinterest ? { platform: "Pinterest", handle: artist.pinterest, href: artist.pinterest.startsWith("http") ? artist.pinterest : `https://pinterest.com/${artist.pinterest}` } : null,
        artist.youtube ? { platform: "YouTube", handle: artist.youtube, href: artist.youtube.startsWith("http") ? artist.youtube : `https://youtube.com/${artist.youtube}` } : null,
        artist.linkedin ? { platform: "LinkedIn", handle: artist.linkedin, href: artist.linkedin.startsWith("http") ? artist.linkedin : `https://linkedin.com/in/${artist.linkedin}` } : null,
    ].filter((s): s is { platform: string; handle: string; href: string } => s !== null);

    return (
        <div style={{ backgroundColor: "#faf8f5" }}>
            {/* ── Page Header ───────────────────────────────────────────────── */}
            <div className="border-b border-stone-200 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <p
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.6rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#6b7c6d",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Contact
                    </p>
                    <h1
                        style={{
                            fontFamily: CORMORANT,
                            fontStyle: "italic",
                            fontWeight: 300,
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            color: "#1c1917",
                            lineHeight: 0.98,
                        }}
                    >
                        {commissionsOpen ? "Commission a Work" : "Get in Touch"}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                {/* Left: Contact details + socials */}
                <div className="space-y-12">
                    {/* Contact details */}
                    <RevealOnScroll>
                        <div>
                            <p
                                className="mb-5"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "#9ca3af",
                                }}
                            >
                                Contact Details
                            </p>
                            <div className="space-y-3">
                                {artist.email && (
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: MONO,
                                                fontSize: "0.58rem",
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                color: "#9ca3af",
                                                marginBottom: "0.2rem",
                                            }}
                                        >
                                            Email
                                        </p>
                                        <a
                                            href={`mailto:${artist.email}`}
                                            style={{
                                                fontFamily: BASKERVILLE,
                                                fontSize: "0.95rem",
                                                color: "#1c1917",
                                                textDecoration: "none",
                                            }}
                                            className="hover:text-[#6b7c6d] transition-colors"
                                        >
                                            {artist.email}
                                        </a>
                                    </div>
                                )}
                                {artist.phone && (
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: MONO,
                                                fontSize: "0.58rem",
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                color: "#9ca3af",
                                                marginBottom: "0.2rem",
                                            }}
                                        >
                                            Phone
                                        </p>
                                        <a
                                            href={`tel:${artist.phone}`}
                                            style={{
                                                fontFamily: BASKERVILLE,
                                                fontSize: "0.95rem",
                                                color: "#1c1917",
                                                textDecoration: "none",
                                            }}
                                            className="hover:text-[#6b7c6d] transition-colors"
                                        >
                                            {artist.phone}
                                        </a>
                                    </div>
                                )}
                                {(artist.city || artist.state) && (
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: MONO,
                                                fontSize: "0.58rem",
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                color: "#9ca3af",
                                                marginBottom: "0.2rem",
                                            }}
                                        >
                                            Location
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: MONO,
                                                fontSize: "0.75rem",
                                                letterSpacing: "0.1em",
                                                color: "#1c1917",
                                            }}
                                        >
                                            {[artist.streetAddress, artist.city, artist.state, artist.zipCode, artist.country]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Social links */}
                    {socials.length > 0 && (
                        <RevealOnScroll delay={100}>
                            <div>
                                <p
                                    className="mb-5"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "#9ca3af",
                                    }}
                                >
                                    Social
                                </p>
                                <div className="space-y-3">
                                    {socials.map((s) => (
                                        <a
                                            key={s.platform}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "block",
                                                fontFamily: CORMORANT,
                                                fontStyle: "italic",
                                                fontSize: "1.1rem",
                                                color: "#1c1917",
                                                textDecoration: "none",
                                            }}
                                            className="hover:text-[#6b7c6d] transition-colors"
                                        >
                                            {s.platform}{" "}
                                            <span style={{ color: "#6b7c6d", fontStyle: "normal" }}>→</span>{" "}
                                            {s.handle}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    )}

                    {/* Studio locations */}
                    {artist.studioLocations && artist.studioLocations.length > 0 && (
                        <RevealOnScroll delay={150}>
                            <div>
                                <p
                                    className="mb-5"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "#9ca3af",
                                    }}
                                >
                                    Studio Locations
                                </p>
                                <div className="space-y-5">
                                    {artist.studioLocations.map((loc, i) => (
                                        <div key={i}>
                                            {loc.name && (
                                                <p
                                                    style={{
                                                        fontFamily: BASKERVILLE,
                                                        fontSize: "0.92rem",
                                                        color: "#1c1917",
                                                        marginBottom: "0.2rem",
                                                    }}
                                                >
                                                    {loc.name}
                                                </p>
                                            )}
                                            <p
                                                style={{
                                                    fontFamily: MONO,
                                                    fontSize: "0.62rem",
                                                    letterSpacing: "0.08em",
                                                    color: "#6b7c6d",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {[loc.address, loc.city, loc.state, loc.zipCode]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </p>
                                            {loc.directionsUrl && (
                                                <a
                                                    href={loc.directionsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-[#1c1917] transition-colors"
                                                    style={{
                                                        fontFamily: MONO,
                                                        fontSize: "0.58rem",
                                                        letterSpacing: "0.12em",
                                                        textTransform: "uppercase",
                                                        color: "#6b7c6d",
                                                        textDecoration: "none",
                                                        display: "inline-block",
                                                        marginTop: "0.3rem",
                                                    }}
                                                >
                                                    Get Directions →
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    )}
                </div>

                {/* Right: Commission block or editorial message */}
                <div>
                    {commissionsOpen ? (
                        <RevealOnScroll delay={80}>
                            <div
                                className="p-8 md:p-10"
                                style={{ backgroundColor: "#f0ede8", border: "1px solid #d4cfc9" }}
                            >
                                <p
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "#6b7c6d",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    Commissions
                                </p>
                                <h2
                                    style={{
                                        fontFamily: CORMORANT,
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        fontSize: "2.2rem",
                                        color: "#1c1917",
                                        lineHeight: 1.1,
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    Bespoke Work, Made for You
                                </h2>
                                <p
                                    style={{
                                        fontFamily: BASKERVILLE,
                                        fontSize: "0.9rem",
                                        lineHeight: 1.85,
                                        color: "#3d3733",
                                    }}
                                >
                                    {artist.commissionDescription ??
                                        `${name} accepts select commissions for original works. Each piece is crafted individually to suit the collector's vision. Reach out to discuss your ideas, budget, and timeline.`}
                                </p>
                                {artist.email && (
                                    <a
                                        href={`mailto:${artist.email}?subject=Commission Inquiry`}
                                        className="mt-8 inline-block transition-colors bg-[#1c1917] hover:bg-[#6b7c6d]"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.65rem",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: "#faf8f5",
                                            padding: "0.8rem 1.5rem",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Start a Conversation →
                                    </a>
                                )}
                            </div>
                        </RevealOnScroll>
                    ) : (
                        <RevealOnScroll delay={80}>
                            <div className="pt-2">
                                <p
                                    style={{
                                        fontFamily: BASKERVILLE,
                                        fontStyle: "italic",
                                        fontSize: "1.05rem",
                                        lineHeight: 1.85,
                                        color: "#3d3733",
                                        maxWidth: "36rem",
                                    }}
                                >
                                    {artist.bio?.slice(0, 220) ??
                                        `${name} welcomes inquiries about available works, collaborations, and press. Please reach out via email or through the social links provided.`}
                                    {artist.bio && artist.bio.length > 220 ? "…" : ""}
                                </p>

                                {artist.email && (
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="mt-8 inline-block transition-colors bg-[#1c1917] hover:bg-[#6b7c6d]"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.65rem",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: "#faf8f5",
                                            padding: "0.8rem 1.5rem",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Send a Message →
                                    </a>
                                )}
                            </div>
                        </RevealOnScroll>
                    )}
                </div>
            </div>
        </div>
    );
}
