import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import Image from "next/image";

interface SocialEntry {
    href: string;
    label: string;
    handle: string;
}

export default function ObsidianContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    const socials: SocialEntry[] = [
        artist.instagram
            ? {
                  href: `https://instagram.com/${artist.instagram.replace("@", "")}`,
                  label: "Instagram",
                  handle: `@${artist.instagram.replace("@", "")}`,
              }
            : null,
        artist.facebook
            ? { href: artist.facebook, label: "Facebook", handle: "Facebook" }
            : null,
        artist.twitter
            ? {
                  href: `https://twitter.com/${artist.twitter.replace("@", "")}`,
                  label: "Twitter / X",
                  handle: `@${artist.twitter.replace("@", "")}`,
              }
            : null,
        artist.tiktok
            ? {
                  href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`,
                  label: "TikTok",
                  handle: `@${artist.tiktok.replace("@", "")}`,
              }
            : null,
        artist.youtube
            ? { href: artist.youtube, label: "YouTube", handle: "YouTube" }
            : null,
        artist.pinterest
            ? { href: artist.pinterest, label: "Pinterest", handle: "Pinterest" }
            : null,
        artist.linkedin
            ? { href: artist.linkedin, label: "LinkedIn", handle: "LinkedIn" }
            : null,
    ].filter((s): s is SocialEntry => s !== null);

    const acceptsCommissions =
        artist.acceptsCommissions && artist.acceptsCommissions !== "no";

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* Page header */}
            <div className="px-6 md:px-12 pt-16 pb-12 border-b border-[#c9a96e]/10">
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e]/50 mb-4 font-light">
                    Reach Out
                </p>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-thin tracking-[0.25em] uppercase text-[#f5f0eb] leading-none">
                    Contact
                </h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Artist info */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-thin tracking-[0.2em] uppercase text-[#f5f0eb] mb-2">
                            {name}
                        </h2>

                        {(artist.city || artist.state || artist.country) && (
                            <p className="text-[10px] tracking-[0.3em] uppercase text-[#4a4540] mb-10">
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        )}

                        <div className="h-px w-16 bg-[#c9a96e]/40 mb-10" />

                        {/* Contact details */}
                        <div className="space-y-5 mb-12">
                            {artist.email && (
                                <div className="group flex gap-6 items-start">
                                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-1">
                                        Email
                                    </span>
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="text-sm font-thin text-[#8a8278] group-hover:text-[#c9a96e] transition-colors duration-300 border-b border-[#2a2520] hover:border-[#c9a96e]/40 pb-0.5"
                                    >
                                        {artist.email}
                                    </a>
                                </div>
                            )}

                            {artist.website && (
                                <div className="group flex gap-6 items-start">
                                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#3a3530] w-20 shrink-0 pt-1">
                                        Website
                                    </span>
                                    <a
                                        href={artist.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-thin text-[#8a8278] hover:text-[#c9a96e] transition-colors duration-300 border-b border-[#2a2520] hover:border-[#c9a96e]/40 pb-0.5 break-all"
                                    >
                                        {artist.website}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Social links */}
                        {socials.length > 0 && (
                            <div>
                                <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a3530] mb-5">
                                    Follow
                                </p>
                                <div className="space-y-4">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between border-b border-[#1a1a1a] pb-4 hover:border-[#c9a96e]/20 transition-colors duration-300"
                                        >
                                            <span className="text-[10px] tracking-[0.25em] uppercase text-[#4a4540] group-hover:text-[#c9a96e] transition-colors duration-300">
                                                {s.label}
                                            </span>
                                            <span className="text-[10px] text-[#2a2520] group-hover:text-[#6a6460] transition-colors duration-300 flex items-center gap-2">
                                                {s.handle}
                                                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ArtsDistrictUSA profile */}
                        {artist.slug && (
                            <div className="mt-12 border-t border-[#c9a96e]/10 pt-8">
                                <a
                                    href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#3a3530] hover:text-[#c9a96e]/60 transition-colors duration-300"
                                >
                                    View Profile on ArtsDistrictUSA
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Right: Commission panel + studio info */}
                    <div>
                        {/* Commission status — prominently displayed */}
                        <div
                            className={`mb-10 p-8 border ${
                                acceptsCommissions
                                    ? "border-[#c9a96e]/30 bg-[#c9a96e]/5"
                                    : "border-[#2a2520] bg-[#0d0d0d]"
                            }`}
                        >
                            <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e]/50 mb-3 font-light">
                                Commission Status
                            </p>
                            <p
                                className={`text-lg font-thin tracking-[0.15em] uppercase mb-4 ${
                                    acceptsCommissions ? "text-[#c9a96e]" : "text-[#4a4540]"
                                }`}
                            >
                                {acceptsCommissions
                                    ? "Currently Accepting Commissions"
                                    : "Commissions Closed"}
                            </p>
                            {acceptsCommissions && (
                                <p className="text-sm font-thin text-[#7a7470] leading-relaxed">
                                    {artist.commissionDescription ??
                                        "This artist welcomes commission inquiries. Reach out by email to begin a conversation about your bespoke work."}
                                </p>
                            )}
                        </div>

                        {/* Studio locations */}
                        {artist.studioLocations && artist.studioLocations.length > 0 && (
                            <div className="mb-10">
                                <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a3530] mb-5">
                                    Studio
                                </p>
                                <div className="space-y-5">
                                    {artist.studioLocations.map((loc, i) => (
                                        <div key={i} className="border border-[#1a1a1a] p-5 hover:border-[#c9a96e]/15 transition-colors duration-300">
                                            {loc.name && (
                                                <p className="text-sm font-light text-[#c9c4be] mb-1">{loc.name}</p>
                                            )}
                                            <p className="text-[10px] text-[#4a4540] font-thin">
                                                {loc.address}, {loc.city}, {loc.state}
                                                {loc.zipCode ? ` ${loc.zipCode}` : ""}
                                            </p>
                                            {loc.directionsUrl && (
                                                <a
                                                    href={loc.directionsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block mt-3 text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors duration-300"
                                                >
                                                    Get Directions →
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Events */}
                        {artist.events && artist.events.length > 0 && (
                            <div>
                                <p className="text-[9px] tracking-[0.35em] uppercase text-[#3a3530] mb-5">
                                    Upcoming
                                </p>
                                <div className="space-y-5">
                                    {artist.events.slice(0, 3).map((event, i) => {
                                        const dateStr = event.startDate ?? event.date;
                                        return (
                                            <div
                                                key={i}
                                                className="border-l border-[#c9a96e]/20 pl-5 hover:border-[#c9a96e]/50 transition-colors duration-300"
                                            >
                                                {dateStr && (
                                                    <p className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/50 mb-1">
                                                        {dateStr}
                                                    </p>
                                                )}
                                                <p className="text-sm font-light text-[#c9c4be]">{event.title}</p>
                                                {event.location && (
                                                    <p className="text-[10px] text-[#4a4540] mt-1 uppercase tracking-wider">
                                                        {event.location}
                                                    </p>
                                                )}
                                                {event.description && (
                                                    <p className="text-[10px] text-[#3a3530] mt-2 font-thin leading-relaxed">
                                                        {event.description}
                                                    </p>
                                                )}
                                                {event.url && (
                                                    <a
                                                        href={event.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-2 text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors"
                                                    >
                                                        Learn More →
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
