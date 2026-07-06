import {
    Facebook,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Music2,
    Pin,
    Twitter,
    Youtube,
} from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";

export default function StudioContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const studioLocations = artist.studioLocations ?? [];

    interface SocialLink {
        href: string | null | undefined;
        Icon: typeof Instagram;
        name: string;
    }

    const socials: { href: string; Icon: typeof Instagram; name: string }[] = (
        [
            { href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : null, Icon: Instagram, name: "Instagram" },
            { href: artist.facebook ?? null, Icon: Facebook, name: "Facebook" },
            { href: artist.twitter ? `https://x.com/${artist.twitter.replace("@", "")}` : null, Icon: Twitter, name: "X / Twitter" },
            { href: artist.tiktok ? `https://tiktok.com/@${artist.tiktok.replace("@", "")}` : null, Icon: Music2, name: "TikTok" },
            { href: artist.pinterest ?? null, Icon: Pin, name: "Pinterest" },
            { href: artist.youtube ?? null, Icon: Youtube, name: "YouTube" },
            { href: artist.linkedin ?? null, Icon: Linkedin, name: "LinkedIn" },
        ] satisfies SocialLink[]
    ).filter((s): s is { href: string; Icon: typeof Instagram; name: string } => Boolean(s.href));

    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
            <ScrollReveal>
                <p className="mb-10 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                    Get in Touch
                </p>
                <h1 className="mb-3 font-[family-name:var(--font-studio-display)] text-4xl italic font-light leading-tight text-neutral-100 md:text-6xl">
                    {name}
                </h1>
                {(artist.city || artist.state) && (
                    <p className="mb-12 flex items-center gap-1.5 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.25em] text-neutral-600">
                        <MapPin size={12} /> {artist.city}
                        {artist.state ? `, ${artist.state}` : ""}
                    </p>
                )}
            </ScrollReveal>

            {artist.acceptsCommissions && artist.acceptsCommissions !== "no" && (
                <ScrollReveal delayMs={80}>
                    <div className="mb-10 border border-neutral-800/60 p-6">
                        <p className="mb-3 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-amber-100/70">
                            Commissions Open
                        </p>
                        <p className="font-[family-name:var(--font-studio-body)] text-sm font-light leading-relaxed text-neutral-400">
                            {artist.commissionDescription ?? "Commission inquiries are welcome — reach out below to start the conversation."}
                        </p>
                        {artist.priceRange && (
                            <p className="mt-3 font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-600">
                                Typical range: {artist.priceRange}
                            </p>
                        )}
                    </div>
                </ScrollReveal>
            )}

            <ScrollReveal delayMs={120}>
                <div className="space-y-5">
                    {artist.email && (
                        <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                            <span className="flex items-center gap-2 pt-0.5 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.2em] text-neutral-700">
                                <Mail size={13} /> Email
                            </span>
                            <a href={`mailto:${artist.email}`} className="font-[family-name:var(--font-studio-body)] text-sm text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-amber-100/90">
                                {artist.email}
                            </a>
                        </div>
                    )}
                    {artist.website && (
                        <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                            <span className="flex items-center gap-2 pt-0.5 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.2em] text-neutral-700">
                                <Globe size={13} /> Web
                            </span>
                            <a href={artist.website} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-studio-body)] text-sm text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-amber-100/90">
                                {artist.website}
                            </a>
                        </div>
                    )}
                    {artist.slug && (
                        <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                            <span className="pt-0.5 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.2em] text-neutral-700">Profile</span>
                            <a href={marketplaceArtistUrl(artist.slug)} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-studio-body)] text-sm text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-amber-100/90">
                                artsdistrictusa.com
                            </a>
                        </div>
                    )}
                </div>
            </ScrollReveal>

            {socials.length > 0 && (
                <ScrollReveal delayMs={160}>
                    <div className="mt-14 flex flex-wrap gap-3 border-t border-neutral-800/60 pt-10">
                        {socials.map(({ href, Icon, name: socialName }) => (
                            <a
                                key={socialName}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={socialName}
                                title={socialName}
                                className="flex h-11 w-11 items-center justify-center border border-neutral-800 text-neutral-500 transition-colors hover:border-amber-100/50 hover:text-amber-100/90"
                            >
                                <Icon size={17} />
                            </a>
                        ))}
                    </div>
                </ScrollReveal>
            )}

            {studioLocations.length > 0 && (
                <ScrollReveal delayMs={200}>
                    <div className="mt-14 border-t border-neutral-800/60 pt-10">
                        <p className="mb-6 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-700">
                            Visit the Studio
                        </p>
                        <div className="space-y-4">
                            {studioLocations.map((loc, i) => (
                                <div key={i} className="font-[family-name:var(--font-studio-body)] text-sm font-light text-neutral-400">
                                    {loc.name && <p className="mb-0.5 font-medium text-neutral-200">{loc.name}</p>}
                                    <p>{loc.address}, {loc.city}, {loc.state} {loc.zipCode}</p>
                                    {loc.directionsUrl && (
                                        <a href={loc.directionsUrl} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-widest text-neutral-600 underline hover:text-amber-100/80">
                                            Directions
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            )}
        </div>
    );
}
