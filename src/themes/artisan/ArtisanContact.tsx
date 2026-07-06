import {
    ExternalLink,
    Facebook,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
    Youtube,
} from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import Reveal from "./Reveal";

export default function ArtisanContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const acceptsCommissions = Boolean(artist.acceptsCommissions) && artist.acceptsCommissions !== "no";

    const socials = [
        artist.instagram && { icon: Instagram, label: "Instagram", href: `https://instagram.com/${artist.instagram.replace("@", "")}`, text: `@${artist.instagram.replace("@", "")}` },
        artist.facebook && { icon: Facebook, label: "Facebook", href: artist.facebook, text: "Facebook" },
        artist.twitter && { icon: Twitter, label: "Twitter", href: artist.twitter, text: "Twitter" },
        artist.youtube && { icon: Youtube, label: "YouTube", href: artist.youtube, text: "YouTube" },
        artist.linkedin && { icon: Linkedin, label: "LinkedIn", href: artist.linkedin, text: "LinkedIn" },
        artist.pinterest && { icon: Globe, label: "Pinterest", href: artist.pinterest, text: "Pinterest" },
        artist.tiktok && { icon: Globe, label: "TikTok", href: artist.tiktok, text: "TikTok" },
    ].filter((s): s is { icon: typeof Instagram; label: string; href: string; text: string } => Boolean(s));

    const primaryLocation = artist.studioLocations?.[0];

    return (
        <div className="bg-[var(--paper)]">
            <div className="mx-auto max-w-3xl px-6 py-16">
                <Reveal>
                    <p className="text-xl text-[var(--sage-dark)]" style={{ fontFamily: "var(--font-script)" }}>
                        let&rsquo;s talk
                    </p>
                    <h1 className="text-4xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                        Connect with {name}
                    </h1>
                </Reveal>

                {acceptsCommissions && (
                    <Reveal delay={80} className="mt-10 border border-[var(--clay)]/30 bg-[var(--clay)]/[0.06] p-7">
                        <h2 className="text-xl italic text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                            Commissions Welcome
                        </h2>
                        <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                            {artist.commissionDescription ??
                                "I love creating custom, one-of-a-kind pieces. Reach out and let's talk about bringing your vision to life."}
                        </p>
                    </Reveal>
                )}

                <Reveal delay={140} className="mt-10 space-y-5">
                    {artist.email && (
                        <a
                            href={`mailto:${artist.email}`}
                            className="group flex items-center gap-4 border-b border-[var(--ink)]/10 pb-5 text-[var(--ink)] transition-colors hover:text-[var(--clay-dark)]"
                        >
                            <Mail size={18} className="shrink-0 text-[var(--clay)]" />
                            <span className="underline-offset-4 group-hover:underline">{artist.email}</span>
                        </a>
                    )}
                    {artist.phone && (
                        <a
                            href={`tel:${artist.phone}`}
                            className="group flex items-center gap-4 border-b border-[var(--ink)]/10 pb-5 text-[var(--ink)] transition-colors hover:text-[var(--clay-dark)]"
                        >
                            <Phone size={18} className="shrink-0 text-[var(--clay)]" />
                            <span className="underline-offset-4 group-hover:underline">{artist.phone}</span>
                        </a>
                    )}
                    {artist.website && (
                        <a
                            href={artist.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 border-b border-[var(--ink)]/10 pb-5 text-[var(--ink)] transition-colors hover:text-[var(--clay-dark)]"
                        >
                            <Globe size={18} className="shrink-0 text-[var(--clay)]" />
                            <span className="underline-offset-4 group-hover:underline">{artist.website}</span>
                        </a>
                    )}
                    {primaryLocation && (
                        <div className="flex items-start gap-4 border-b border-[var(--ink)]/10 pb-5 text-[var(--ink)]">
                            <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--clay)]" />
                            <span>
                                {primaryLocation.name ? `${primaryLocation.name} — ` : ""}
                                {primaryLocation.address}, {primaryLocation.city}, {primaryLocation.state}
                            </span>
                        </div>
                    )}
                </Reveal>

                {socials.length > 0 && (
                    <Reveal delay={200} className="mt-10">
                        <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]">Follow along</p>
                        <div className="flex flex-wrap gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-full border border-[var(--ink)]/15 px-4 py-2 text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--clay)]/60 hover:text-[var(--clay-dark)]"
                                >
                                    <s.icon size={15} />
                                    {s.text}
                                </a>
                            ))}
                        </div>
                    </Reveal>
                )}

                {artist.slug && (
                    <Reveal delay={240} className="mt-14 border-t border-[var(--ink)]/10 pt-6">
                        <a
                            href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-[var(--ink-soft)] underline-offset-4 hover:text-[var(--clay-dark)] hover:underline"
                        >
                            View full profile on ArtsDistrictUSA <ExternalLink size={12} />
                        </a>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
