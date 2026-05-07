import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import DynamicColorProvider from "./DynamicColorProvider";

export default function VividContactPage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

    const activeWorks = artworks.filter((a) => a.status !== "inactive");
    const accent = activeWorks.find((a) => a.status === "active")?.dominantColors?.[0]?.hex ?? "#FF4D00";

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div>
            <DynamicColorProvider accent={accent} />

            {/* ── Black top section ───────────────────────────────────────── */}
            <section className="bg-[#111] py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
                        Get in Touch
                    </p>
                    <h1
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                        className="text-6xl md:text-9xl font-bold text-white leading-[0.9] mb-6"
                    >
                        {name}
                    </h1>
                    {artist.artistTagline && (
                        <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
                            {artist.artistTagline}
                        </p>
                    )}
                </div>
            </section>

            {/* ── Contact details white section ───────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {/* Left: Contact info */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-6">
                            Contact Details
                        </p>
                        <div className="space-y-5">
                            {artist.email && (
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">Email</p>
                                    <a
                                        href={`mailto:${artist.email}`}
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-2xl font-bold text-[#111] hover:opacity-60 transition-opacity"
                                    >
                                        {artist.email}
                                    </a>
                                </div>
                            )}
                            {artist.phone && (
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">Phone</p>
                                    <a
                                        href={`tel:${artist.phone}`}
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-2xl font-bold text-[#111] hover:opacity-60 transition-opacity"
                                    >
                                        {artist.phone}
                                    </a>
                                </div>
                            )}
                            {location && (
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">Location</p>
                                    <p
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-2xl font-bold text-[#111]"
                                    >
                                        {location}
                                    </p>
                                </div>
                            )}
                            {artist.website && (
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">Website</p>
                                    <a
                                        href={artist.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="text-xl font-bold text-[#111] hover:opacity-60 transition-opacity"
                                    >
                                        {artist.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Social links */}
                    {socials.length > 0 && (
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-6">
                                Social
                            </p>
                            <div className="space-y-4">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontFamily: "'DM Serif Display', serif" }}
                                        className="flex items-center justify-between text-2xl font-bold text-[#111] border-b border-neutral-100 pb-4 hover:opacity-60 transition-opacity group"
                                    >
                                        <span>{s.label}</span>
                                        <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Commission CTA ───────────────────────────────────────────── */}
            {artist.acceptsCommissions && (
                <section className="py-16 md:py-24" style={{ backgroundColor: "var(--accent)" }}>
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <p className="text-xs font-bold tracking-widest uppercase text-white/60 mb-4">
                            Commissions Open
                        </p>
                        <h2
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-2xl"
                        >
                            Commission an Original Work
                        </h2>
                        {artist.commissionDescription && (
                            <p className="text-white/80 text-base max-w-xl leading-relaxed mb-8">
                                {artist.commissionDescription}
                            </p>
                        )}
                        {artist.email && (
                            <a
                                href={`mailto:${artist.email}?subject=Commission Inquiry`}
                                className="inline-block bg-white text-[#111] text-sm font-bold tracking-widest uppercase px-10 py-4 hover:bg-[#111] hover:text-white transition-colors duration-150"
                            >
                                Start a Commission →
                            </a>
                        )}
                    </div>
                </section>
            )}

            {/* ── Studio locations ─────────────────────────────────────────── */}
            {artist.studioLocations && artist.studioLocations.length > 0 && (
                <section className="border-t-4 border-black py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <p className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: "var(--accent)" }}>
                            Studio Locations
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {artist.studioLocations.map((loc, i) => (
                                <div key={i} className="border-2 border-black p-6">
                                    {loc.name && (
                                        <p
                                            style={{ fontFamily: "'DM Serif Display', serif" }}
                                            className="text-xl font-bold text-[#111] mb-2"
                                        >
                                            {loc.name}
                                        </p>
                                    )}
                                    <p className="text-sm text-neutral-600">{loc.address}</p>
                                    <p className="text-sm text-neutral-600">
                                        {loc.city}, {loc.state} {loc.zipCode ?? ""}
                                    </p>
                                    {loc.directionsUrl && (
                                        <a
                                            href={loc.directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] font-bold tracking-widest uppercase mt-3 inline-block hover:opacity-60 transition-opacity"
                                            style={{ color: "var(--accent)" }}
                                        >
                                            Get Directions →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Marketplace link ─────────────────────────────────────────── */}
            <section className="bg-[#111] py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-between gap-6">
                    <p
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                        className="text-2xl md:text-3xl font-bold text-white"
                    >
                        Ready to collect?
                    </p>
                    <Link
                        href="/artworks"
                        className="inline-block text-sm font-bold tracking-widest uppercase px-8 py-4 text-[#111]"
                        style={{ backgroundColor: "var(--accent)" }}
                    >
                        Browse Works →
                    </Link>
                </div>
            </section>
        </div>
    );
}
