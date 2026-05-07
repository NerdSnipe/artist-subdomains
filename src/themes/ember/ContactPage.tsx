import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function EmberContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const acceptsCommissions = artist.acceptsCommissions && artist.acceptsCommissions !== "no";

    const socials: { label: string; handle: string | null | undefined; href: string }[] = [
        {
            label: "Instagram",
            handle: artist.instagram,
            href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : "",
        },
        {
            label: "Facebook",
            handle: artist.facebook,
            href: artist.facebook ? `https://facebook.com/${artist.facebook.replace("@", "")}` : "",
        },
        {
            label: "Twitter / X",
            handle: artist.twitter,
            href: artist.twitter ? `https://twitter.com/${artist.twitter.replace("@", "")}` : "",
        },
        {
            label: "TikTok",
            handle: artist.tiktok,
            href: artist.tiktok ? `https://tiktok.com/@${artist.tiktok.replace("@", "")}` : "",
        },
        {
            label: "Pinterest",
            handle: artist.pinterest,
            href: artist.pinterest ? `https://pinterest.com/${artist.pinterest.replace("@", "")}` : "",
        },
        {
            label: "YouTube",
            handle: artist.youtube,
            href: artist.youtube ? `https://youtube.com/@${artist.youtube.replace("@", "")}` : "",
        },
        {
            label: "LinkedIn",
            handle: artist.linkedin,
            href: artist.linkedin ? `https://linkedin.com/in/${artist.linkedin.replace("@", "")}` : "",
        },
    ].filter((s) => !!s.handle);

    return (
        <div style={{ backgroundColor: "#f7f3ee", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

            {/* ── Page header ─────────────────────────────────────────── */}
            <section className="max-w-4xl mx-auto px-8 pt-20 pb-10">
                <h1 className="font-serif leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#2c2925" }}>
                    Let&rsquo;s Connect
                </h1>
                <p className="text-base leading-loose italic max-w-xl" style={{ color: "#6b5f52" }}>
                    Whether you&rsquo;re interested in a piece, exploring a commission,
                    or simply want to say hello &mdash; I&rsquo;d love to hear from you.
                </p>
                {(artist.city || artist.state) && (
                    <p className="text-sm mt-4" style={{ color: "#a0907f" }}>
                        {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                    </p>
                )}
            </section>

            <div className="max-w-4xl mx-auto px-8 pb-24">
                {/* Warm divider */}
                <div className="h-px mb-12" style={{ backgroundColor: "#d9d0c4" }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

                    {/* Left: direct contact */}
                    <div>
                        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "#b5451b", letterSpacing: "0.14em" }}>
                            Direct Contact
                        </p>

                        <div className="space-y-6">
                            {artist.email && (
                                <div>
                                    <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: "#a0907f", letterSpacing: "0.1em" }}>
                                        Email
                                    </p>
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="font-serif text-base transition-opacity duration-200 hover:opacity-60"
                                        style={{ color: "#2c2925" }}
                                    >
                                        {artist.email}
                                    </a>
                                </div>
                            )}

                            {artist.phone && (
                                <div>
                                    <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: "#a0907f", letterSpacing: "0.1em" }}>
                                        Phone
                                    </p>
                                    <a
                                        href={`tel:${artist.phone}`}
                                        className="font-serif text-base transition-opacity duration-200 hover:opacity-60"
                                        style={{ color: "#2c2925" }}
                                    >
                                        {artist.phone}
                                    </a>
                                </div>
                            )}

                            {artist.website && (
                                <div>
                                    <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: "#a0907f", letterSpacing: "0.1em" }}>
                                        Website
                                    </p>
                                    <a
                                        href={artist.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-serif text-base transition-opacity duration-200 hover:opacity-60"
                                        style={{ color: "#2c2925" }}
                                    >
                                        {artist.website}
                                    </a>
                                </div>
                            )}

                            {artist.slug && (
                                <div className="pt-4 border-t" style={{ borderColor: "#e8e0d6" }}>
                                    <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: "#a0907f", letterSpacing: "0.1em" }}>
                                        Marketplace
                                    </p>
                                    <a
                                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm transition-opacity duration-200 hover:opacity-60"
                                        style={{ color: "#b5451b" }}
                                    >
                                        View on ArtsDistrictUSA &rarr;
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: social + commissions */}
                    <div>
                        {socials.length > 0 && (
                            <div className="mb-10">
                                <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "#b5451b", letterSpacing: "0.14em" }}>
                                    Follow Along
                                </p>
                                <div className="space-y-4">
                                    {socials.map((s) => (
                                        <div key={s.label}>
                                            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#a0907f", letterSpacing: "0.08em" }}>
                                                {s.label}
                                            </p>
                                            <a
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-serif text-sm transition-opacity duration-200 hover:opacity-60"
                                                style={{ color: "#2c2925" }}
                                            >
                                                @{s.handle!.replace("@", "")}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Commission CTA ───────────────────────────────────── */}
                {acceptsCommissions && (
                    <div
                        className="mt-16 p-10"
                        style={{ backgroundColor: "#b5451b" }}
                    >
                        <p
                            className="text-xs uppercase tracking-widest mb-4"
                            style={{ color: "rgba(247,243,238,0.7)", letterSpacing: "0.14em" }}
                        >
                            Custom Work
                        </p>
                        <h2 className="font-serif text-2xl mb-4" style={{ color: "#f7f3ee" }}>
                            Commissions Welcome
                        </h2>
                        <p className="text-base leading-loose mb-8 max-w-lg" style={{ color: "rgba(247,243,238,0.85)" }}>
                            {artist.commissionDescription ??
                                "I accept commissions for custom original works. Every piece is created with care and intention, made to live in your space for generations."}
                        </p>
                        {artist.email && (
                            <a
                                href={`mailto:${artist.email}?subject=Commission Inquiry`}
                                className="inline-block px-8 py-3 text-sm font-serif tracking-wide transition-all duration-300 hover:opacity-85"
                                style={{ backgroundColor: "#f7f3ee", color: "#b5451b" }}
                            >
                                Start a Conversation
                            </a>
                        )}
                    </div>
                )}

                {/* ── Studio Visit ─────────────────────────────────────── */}
                {artist.studioLocations && artist.studioLocations.length > 0 && (
                    <div className="mt-16 pt-12 border-t" style={{ borderColor: "#d9d0c4" }}>
                        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "#b5451b", letterSpacing: "0.14em" }}>
                            Visit the Studio
                        </p>
                        <div className="space-y-6">
                            {artist.studioLocations.map((loc, i) => (
                                <div key={i} className="p-8" style={{ backgroundColor: "#ede8e1" }}>
                                    {loc.name && (
                                        <p className="font-serif text-base mb-2" style={{ color: "#2c2925" }}>{loc.name}</p>
                                    )}
                                    <p className="text-sm" style={{ color: "#6b5f52" }}>{loc.address}</p>
                                    <p className="text-sm" style={{ color: "#6b5f52" }}>
                                        {loc.city}, {loc.state}{loc.zipCode ? ` ${loc.zipCode}` : ""}
                                    </p>
                                    {loc.directionsUrl && (
                                        <a
                                            href={loc.directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-4 text-xs border-b pb-px transition-opacity duration-200 hover:opacity-60"
                                            style={{ color: "#b5451b", borderColor: "#b5451b" }}
                                        >
                                            Get Directions &rarr;
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
