import { Instagram, Facebook, Twitter, Youtube, Linkedin, MapPin } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { ink, coal, smoke, emberMid, emberGradientSteep } from "./palette";

export default function EmberContact({ artist, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const acceptsCommissions = artist.acceptsCommissions && artist.acceptsCommissions !== "no";

    const socials = [
        { label: "Instagram", icon: Instagram, handle: artist.instagram, href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : "" },
        { label: "Facebook", icon: Facebook, handle: artist.facebook, href: artist.facebook ? `https://facebook.com/${artist.facebook.replace("@", "")}` : "" },
        { label: "Twitter / X", icon: Twitter, handle: artist.twitter, href: artist.twitter ? `https://twitter.com/${artist.twitter.replace("@", "")}` : "" },
        { label: "TikTok", icon: Instagram, handle: artist.tiktok, href: artist.tiktok ? `https://tiktok.com/@${artist.tiktok.replace("@", "")}` : "" },
        { label: "YouTube", icon: Youtube, handle: artist.youtube, href: artist.youtube ? `https://youtube.com/@${artist.youtube.replace("@", "")}` : "" },
        { label: "LinkedIn", icon: Linkedin, handle: artist.linkedin, href: artist.linkedin ? `https://linkedin.com/in/${artist.linkedin.replace("@", "")}` : "" },
    ].filter((s) => !!s.handle);

    return (
        <div style={{ backgroundColor: ink }}>
            {/* ── Header ───────────────────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 md:px-16 pt-20 pb-10">
                <h1 className="uppercase leading-[0.88] mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem,7vw,5.5rem)", color: "#f6f1e8" }}>
                    Let&rsquo;s Make
                    <br />
                    Something
                </h1>
                <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "#d8cfc4" }}>
                    Interested in a piece, chasing a commission, or just want to say what&rsquo;s up? Drop a line.
                </p>
                {(artist.city || artist.state) && (
                    <div className="flex items-center gap-2 mt-5">
                        <MapPin size={14} color={emberMid} />
                        <p className="text-sm" style={{ color: smoke }}>
                            {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                        </p>
                    </div>
                )}
            </section>

            <div className="max-w-5xl mx-auto px-6 md:px-16 pb-24">
                <div className="h-px mb-14" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                    {/* Direct contact */}
                    <div>
                        <p className="text-xs uppercase font-bold tracking-widest mb-8" style={{ color: emberMid, letterSpacing: "0.18em" }}>
                            Direct Contact
                        </p>
                        <div className="space-y-6">
                            {artist.email && (
                                <ContactRow label="Email">
                                    <a href={`mailto:${artist.email}`} className="font-semibold text-lg transition-opacity duration-200 hover:opacity-70" style={{ color: "#f6f1e8" }}>
                                        {artist.email}
                                    </a>
                                </ContactRow>
                            )}
                            {artist.phone && (
                                <ContactRow label="Phone">
                                    <a href={`tel:${artist.phone}`} className="font-semibold text-lg transition-opacity duration-200 hover:opacity-70" style={{ color: "#f6f1e8" }}>
                                        {artist.phone}
                                    </a>
                                </ContactRow>
                            )}
                            {artist.website && (
                                <ContactRow label="Website">
                                    <a href={artist.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg transition-opacity duration-200 hover:opacity-70 break-all" style={{ color: "#f6f1e8" }}>
                                        {artist.website}
                                    </a>
                                </ContactRow>
                            )}
                            {artist.slug && (
                                <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                                    <a
                                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
                                        style={{ color: emberMid, letterSpacing: "0.08em" }}
                                    >
                                        View on ArtsDistrictUSA →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Socials */}
                    {socials.length > 0 && (
                        <div>
                            <p className="text-xs uppercase font-bold tracking-widest mb-8" style={{ color: emberMid, letterSpacing: "0.18em" }}>
                                Follow Along
                            </p>
                            <div className="flex flex-col gap-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 py-3 px-4 transition-colors duration-200"
                                        style={{ backgroundColor: coal }}
                                    >
                                        <s.icon size={18} color={emberMid} />
                                        <span className="font-semibold text-sm transition-colors duration-200" style={{ color: "#f6f1e8" }}>
                                            @{s.handle!.replace("@", "")}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Commission CTA */}
                {acceptsCommissions && (
                    <div className="mt-16 p-10 md:p-14" style={{ background: emberGradientSteep, clipPath: "polygon(0 0, 100% 0, 100% 94%, 96% 100%, 0 100%)" }}>
                        <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: "rgba(10,9,8,0.6)", letterSpacing: "0.18em" }}>
                            Custom Work
                        </p>
                        <h2 className="uppercase leading-[0.9] mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3.2rem)", color: ink }}>
                            Commissions Open
                        </h2>
                        <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(10,9,8,0.8)" }}>
                            {artist.commissionDescription ?? "Custom, original work made to order — bold, personal, and built to live loud in your space."}
                        </p>
                        {artist.email && (
                            <a
                                href={`mailto:${artist.email}?subject=Commission Inquiry`}
                                className="inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-transform duration-300 hover:scale-[1.03]"
                                style={{ backgroundColor: ink, color: "#f6f1e8", letterSpacing: "0.1em" }}
                            >
                                Start the Conversation
                            </a>
                        )}
                    </div>
                )}

                {/* Studio Visit */}
                {artist.studioLocations && artist.studioLocations.length > 0 && (
                    <div className="mt-16 pt-14 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                        <p className="text-xs uppercase font-bold tracking-widest mb-8" style={{ color: emberMid, letterSpacing: "0.18em" }}>
                            Visit the Studio
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {artist.studioLocations.map((loc, i) => (
                                <div key={i} className="p-7" style={{ backgroundColor: coal }}>
                                    {loc.name && <p className="font-semibold text-base mb-2" style={{ color: "#f6f1e8" }}>{loc.name}</p>}
                                    <p className="text-sm" style={{ color: smoke }}>{loc.address}</p>
                                    <p className="text-sm" style={{ color: smoke }}>
                                        {loc.city}, {loc.state}{loc.zipCode ? ` ${loc.zipCode}` : ""}
                                    </p>
                                    {loc.directionsUrl && (
                                        <a href={loc.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-xs font-bold uppercase tracking-widest pb-0.5 border-b-2" style={{ color: emberMid, borderColor: emberMid, letterSpacing: "0.08em" }}>
                                            Get Directions →
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

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p className="text-xs uppercase font-semibold tracking-widest mb-1.5" style={{ color: "#6f6459", letterSpacing: "0.1em" }}>
                {label}
            </p>
            {children}
        </div>
    );
}
