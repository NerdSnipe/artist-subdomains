import { ArrowUpRight, Instagram, Mail, MapPin } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

export default function MarketContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const acceptsCommissions = Boolean(artist.acceptsCommissions && artist.acceptsCommissions !== "no");
    const location = [artist.city, artist.state].filter(Boolean).join(", ");

    const links = [
        artist.email && { label: artist.email, href: `mailto:${artist.email}`, Icon: Mail },
        artist.instagram && {
            label: `@${artist.instagram.replace("@", "")}`,
            href: `https://instagram.com/${artist.instagram.replace("@", "")}`,
            Icon: Instagram,
        },
        artist.website && { label: artist.website.replace(/^https?:\/\//, ""), href: artist.website, Icon: ArrowUpRight },
    ].filter(Boolean) as { label: string; href: string; Icon: typeof Mail }[];

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <Reveal className="max-w-xl mb-14">
                <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-3">
                    Get In Touch
                </p>
                <h1 className="font-[family-name:var(--market-font-display)] text-4xl text-[#241e19] mb-4">
                    Let&rsquo;s Talk
                </h1>
                <p className="text-[#6b5d4f] leading-relaxed">
                    Questions about a piece, shipping, or working together on something custom — reach {name} directly
                    below.
                </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                {acceptsCommissions && (
                    <Reveal className="md:col-span-5 bg-[#f0d9c5] p-8">
                        <p className="text-xs tracking-[0.2em] uppercase text-[#8f3f1f] font-semibold mb-3">
                            Commissions Open
                        </p>
                        <p className="text-[#5a4a3a] leading-relaxed max-w-2xl">
                            {artist.commissionDescription ??
                                `${name} accepts custom commission requests — email or send a message on Instagram to discuss your vision, timeline, and budget.`}
                        </p>
                    </Reveal>
                )}

                <Reveal delay={80} className="md:col-span-3 bg-[#faf6ee] border border-[#e3d5c1] p-8">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#8a7d6e] font-semibold mb-6">
                        Direct Contact
                    </p>
                    {links.length > 0 ? (
                        <div className="space-y-5">
                            {links.map(({ label, href, Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-[#241e19] font-medium hover:text-[#b2542e] transition-colors group"
                                >
                                    <span className="w-9 h-9 flex items-center justify-center border border-[#e3d5c1] group-hover:border-[#b2542e] transition-colors shrink-0">
                                        <Icon size={15} />
                                    </span>
                                    {label}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-[#8a7d6e]">
                            Contact details aren&rsquo;t listed yet — reach out via the full profile below.
                        </p>
                    )}
                    {location && (
                        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#e3d5c1] text-sm text-[#8a7d6e]">
                            <MapPin size={15} className="text-[#b2542e]" />
                            {location}
                        </div>
                    )}
                </Reveal>

                <Reveal
                    delay={140}
                    className="md:col-span-2 bg-[#241e19] p-8 flex flex-col justify-between"
                >
                    <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-[#e8c9ae] font-semibold mb-4">
                            Full Profile
                        </p>
                        <p className="text-sm text-[#c9bcaa] leading-relaxed mb-6">
                            See {name}&rsquo;s complete portfolio, reviews, and past work on ArtsDistrictUSA.
                        </p>
                    </div>
                    {artist.slug && (
                        <a
                            href={marketplaceArtistUrl(artist.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#f8f2e9] border-b-2 border-[#b2542e] pb-0.5 w-fit hover:text-[#e8c9ae] transition-colors"
                        >
                            View Profile <ArrowUpRight size={14} />
                        </a>
                    )}
                </Reveal>
            </div>
        </div>
    );
}
