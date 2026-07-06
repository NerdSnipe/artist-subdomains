import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { derivePalette } from "./color";
import DynamicColorProvider from "./DynamicColorProvider";
import Reveal from "./Reveal";

export default function VividContactPage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

    const activeWorks = artworks.filter((a) => a.status === "active");
    const initialPalette = derivePalette(activeWorks[0]?.dominantColors, activeWorks[0]?.id ?? artist.id);

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    const acceptingCommissions = !!artist.acceptsCommissions && artist.acceptsCommissions !== "no";

    return (
        <DynamicColorProvider initialPalette={initialPalette}>
            <div>
                <section className="relative overflow-hidden py-24 md:py-36" style={{ backgroundColor: "var(--v-ink)" }}>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(70% 60% at 85% 0%, var(--v-glow), transparent 60%)" }}
                    />
                    <div className="relative max-w-[1400px] mx-auto px-5 md:px-10">
                        <Reveal>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "var(--v-primary)" }}>
                                Get in Touch
                            </p>
                            <h1
                                style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-paper)" }}
                                className="text-6xl md:text-9xl uppercase leading-[0.88] mb-6"
                            >
                                {name}
                            </h1>
                            {artist.artistTagline && (
                                <p className="text-lg md:text-xl max-w-xl leading-relaxed" style={{ color: "rgba(246,244,239,0.6)" }}>
                                    {artist.artistTagline}
                                </p>
                            )}
                        </Reveal>
                    </div>
                </section>

                <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
                        <Reveal>
                            <p className="text-xs font-bold tracking-widest uppercase mb-7" style={{ color: "rgba(246,244,239,0.4)" }}>
                                Contact Details
                            </p>
                            <div className="space-y-6">
                                {artist.email && <Detail label="Email" href={`mailto:${artist.email}`} value={artist.email} />}
                                {artist.phone && <Detail label="Phone" href={`tel:${artist.phone}`} value={artist.phone} />}
                                {location && <Detail label="Location" value={location} />}
                                {artist.website && <Detail label="Website" href={artist.website} value={artist.website} external />}
                            </div>
                        </Reveal>

                        {socials.length > 0 && (
                            <Reveal delayMs={100}>
                                <p className="text-xs font-bold tracking-widest uppercase mb-7" style={{ color: "rgba(246,244,239,0.4)" }}>
                                    Social
                                </p>
                                <div className="space-y-4">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }}
                                            className="flex items-center justify-between text-xl md:text-2xl border-b border-white/10 pb-4 group transition-opacity hover:opacity-70"
                                        >
                                            <span>{s.label}</span>
                                            <span className="text-base transition-transform group-hover:translate-x-1" style={{ color: "var(--v-primary)" }}>→</span>
                                        </a>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>
                </section>

                {acceptingCommissions && (
                    <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--v-primary), var(--v-secondary))" }}>
                        <Reveal className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--v-on-primary)", opacity: 0.75 }}>
                                Commissions Open
                            </p>
                            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--v-on-primary)" }} className="text-4xl md:text-6xl uppercase mb-6 max-w-2xl leading-[0.95]">
                                Commission an Original Work
                            </h2>
                            {artist.commissionDescription && (
                                <p className="text-base max-w-xl leading-relaxed mb-8" style={{ color: "var(--v-on-primary)", opacity: 0.85 }}>
                                    {artist.commissionDescription}
                                </p>
                            )}
                            {artist.email && (
                                <a
                                    href={`mailto:${artist.email}?subject=Commission Inquiry`}
                                    className="inline-block text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-full transition-transform hover:-translate-y-0.5"
                                    style={{ backgroundColor: "var(--v-ink)", color: "var(--v-paper)" }}
                                >
                                    Start a Commission →
                                </a>
                            )}
                        </Reveal>
                    </section>
                )}

                {artist.studioLocations && artist.studioLocations.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Studio Locations
                                </p>
                            </Reveal>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {artist.studioLocations.map((loc, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 60, 300)}>
                                        <div className="rounded-2xl p-6 border border-white/10" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                                            {loc.name && (
                                                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-xl mb-2">
                                                    {loc.name}
                                                </p>
                                            )}
                                            <p className="text-sm" style={{ color: "rgba(246,244,239,0.6)" }}>{loc.address}</p>
                                            <p className="text-sm" style={{ color: "rgba(246,244,239,0.6)" }}>
                                                {loc.city}, {loc.state} {loc.zipCode ?? ""}
                                            </p>
                                            {loc.directionsUrl && (
                                                <a
                                                    href={loc.directionsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] font-bold tracking-widest uppercase mt-3 inline-block"
                                                    style={{ color: "var(--v-primary)" }}
                                                >
                                                    Get Directions →
                                                </a>
                                            )}
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {artist.events && artist.events.length > 0 && (
                    <section className="border-t border-white/10 py-16">
                        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                            <Reveal>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10" style={{ color: "var(--v-primary)" }}>
                                    Where to Find {name.split(" ")[0]}
                                </p>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {artist.events.slice(0, 3).map((event, i) => (
                                    <Reveal key={i} delayMs={Math.min(i * 60, 300)}>
                                        <div className="rounded-2xl p-6 border-t-4" style={{ borderColor: "var(--v-secondary)", backgroundColor: "var(--v-ink-soft)" }}>
                                            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(246,244,239,0.4)" }}>
                                                {event.date ?? event.startDate ?? "Upcoming"}
                                            </p>
                                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-xl leading-tight mb-2">
                                                {event.title}
                                            </p>
                                            {event.location && <p className="text-sm mb-2" style={{ color: "rgba(246,244,239,0.55)" }}>{event.location}</p>}
                                            {event.url && (
                                                <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-widest uppercase mt-1 inline-block" style={{ color: "var(--v-primary)" }}>
                                                    Details →
                                                </a>
                                            )}
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-12" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                    <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-wrap items-center justify-between gap-6">
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-2xl md:text-3xl">
                            Ready to collect?
                        </p>
                        <Link
                            href="/artworks"
                            className="inline-block text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full vivid-btn-primary"
                        >
                            Browse Works →
                        </Link>
                    </div>
                </section>
            </div>
        </DynamicColorProvider>
    );
}

function Detail({ label, value, href, external }: { label: string; value: string; href?: string; external?: boolean }) {
    const content = (
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--v-paper)" }} className="text-xl md:text-2xl break-all">
            {value}
        </p>
    );
    return (
        <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(246,244,239,0.4)" }}>{label}</p>
            {href ? (
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="inline-block transition-opacity hover:opacity-70">
                    {content}
                </a>
            ) : (
                content
            )}
        </div>
    );
}
