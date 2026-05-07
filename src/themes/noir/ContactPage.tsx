import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function NoirContactPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const commissionsOpen = artist.acceptsCommissions === "yes" || artist.acceptsCommissions === "open";

    const socials: { platform: string; handle: string; href: string }[] = [
        artist.instagram
            ? {
                  platform: "Instagram",
                  handle: artist.instagram,
                  href: `https://instagram.com/${artist.instagram.replace("@", "")}`,
              }
            : null,
        artist.facebook
            ? { platform: "Facebook", handle: artist.facebook, href: artist.facebook }
            : null,
        artist.twitter
            ? {
                  platform: "Twitter",
                  handle: artist.twitter,
                  href: `https://twitter.com/${artist.twitter.replace("@", "")}`,
              }
            : null,
        artist.tiktok
            ? {
                  platform: "TikTok",
                  handle: artist.tiktok,
                  href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`,
              }
            : null,
        artist.youtube ? { platform: "YouTube", handle: "Channel", href: artist.youtube } : null,
        artist.pinterest
            ? { platform: "Pinterest", handle: artist.pinterest, href: artist.pinterest }
            : null,
        artist.linkedin
            ? { platform: "LinkedIn", handle: artist.linkedin, href: artist.linkedin }
            : null,
    ].filter((s): s is { platform: string; handle: string; href: string } => s !== null);

    return (
        <div className="bg-[#0d0d0d] min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-24 px-6">
            {/* Film grain */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px 180px",
                }}
            />

            {/* Subtle radial spotlight */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(168,136,74,0.04) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 max-w-lg w-full text-center">
                {/* Artist name large */}
                <h1
                    className="text-5xl md:text-6xl font-thin italic tracking-[0.2em] text-[#e8e8e8] mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {name}
                </h1>

                {/* Tagline */}
                {artist.artistTagline && (
                    <p
                        className="text-xs tracking-[0.3em] uppercase text-[#a8884a]/70 mb-12"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        {artist.artistTagline}
                    </p>
                )}

                <div className="h-px w-12 bg-[#a8884a]/50 mx-auto mb-12" />

                {/* Commission CTA — glowing gold box */}
                {commissionsOpen && (
                    <div
                        className="mb-12 border border-[#a8884a]/50 px-8 py-6 bg-[#a8884a]/5"
                        style={{
                            boxShadow: "0 0 24px rgba(168,136,74,0.12), 0 0 48px rgba(168,136,74,0.05), inset 0 0 24px rgba(168,136,74,0.03)",
                        }}
                    >
                        <p
                            className="text-[8px] tracking-[0.5em] uppercase text-[#a8884a]/70 mb-3"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Commissions
                        </p>
                        <p
                            className="text-sm italic text-[#e8e8e8] mb-4 leading-relaxed"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {artist.commissionDescription ?? "Currently accepting commission inquiries. Reach out to discuss your vision."}
                        </p>
                        {artist.email && (
                            <a
                                href={`mailto:${artist.email}`}
                                className="inline-block text-[9px] tracking-[0.4em] uppercase text-[#a8884a] hover:text-[#e8e8e8] transition-colors duration-300"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Inquire →
                            </a>
                        )}
                    </div>
                )}

                {/* Contact details */}
                <div className="space-y-4 mb-12">
                    {artist.email && (
                        <div>
                            <p
                                className="text-[8px] tracking-[0.4em] uppercase text-[#4a4a4a] mb-1"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Email
                            </p>
                            <a
                                href={`mailto:${artist.email}`}
                                className="text-sm text-[#8a8a8a] hover:text-[#a8884a] transition-colors duration-300 italic"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {artist.email}
                            </a>
                        </div>
                    )}

                    {artist.phone && (
                        <div>
                            <p
                                className="text-[8px] tracking-[0.4em] uppercase text-[#4a4a4a] mb-1"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Phone
                            </p>
                            <a
                                href={`tel:${artist.phone}`}
                                className="text-sm text-[#8a8a8a] hover:text-[#a8884a] transition-colors duration-300"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                {artist.phone}
                            </a>
                        </div>
                    )}

                    {(artist.city || artist.state) && (
                        <div>
                            <p
                                className="text-[8px] tracking-[0.4em] uppercase text-[#4a4a4a] mb-1"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                Location
                            </p>
                            <p
                                className="text-sm text-[#8a8a8a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        </div>
                    )}
                </div>

                {/* Studio locations */}
                {artist.studioLocations && artist.studioLocations.length > 0 && (
                    <div className="mb-12 border-t border-[#1a1a1a] pt-8">
                        <p
                            className="text-[8px] tracking-[0.5em] uppercase text-[#a8884a]/60 mb-6"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Studio
                        </p>
                        {artist.studioLocations.map((loc, i) => (
                            <div key={i} className="mb-4">
                                {loc.name && (
                                    <p
                                        className="text-xs text-[#6a6a6a] uppercase tracking-wider"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        {loc.name}
                                    </p>
                                )}
                                <p
                                    className="text-xs text-[#5a5a5a]"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {loc.address}, {loc.city}, {loc.state}
                                    {loc.zipCode ? ` ${loc.zipCode}` : ""}
                                </p>
                                {loc.directionsUrl && (
                                    <a
                                        href={loc.directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[8px] tracking-[0.3em] uppercase text-[#a8884a]/50 hover:text-[#a8884a] transition-colors duration-300 mt-1 inline-block"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        Directions →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Social links */}
                {socials.length > 0 && (
                    <div className="border-t border-[#1a1a1a] pt-8">
                        <p
                            className="text-[8px] tracking-[0.5em] uppercase text-[#4a4a4a] mb-6"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Social
                        </p>
                        <div className="space-y-3">
                            {socials.map((s) => (
                                <div key={s.platform} className="flex justify-center items-baseline gap-3">
                                    <span
                                        className="text-[8px] tracking-[0.3em] uppercase text-[#3a3a3a] w-20 text-right"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        {s.platform}
                                    </span>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm italic text-[#6a6a6a] hover:text-[#a8884a] transition-colors duration-300"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {s.handle}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
