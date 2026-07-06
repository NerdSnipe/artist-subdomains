import { Instagram, Facebook, Twitter, Youtube, Linkedin, Globe, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { SectionLabel } from "./ui";

export default function GalleryContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    const socials: { href: string; label: string; Icon: typeof Instagram }[] = [
        artist.instagram
            ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram", Icon: Instagram }
            : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook", Icon: Facebook } : null,
        artist.twitter
            ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "Twitter", Icon: Twitter }
            : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube", Icon: Youtube } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn", Icon: Linkedin } : null,
        artist.website ? { href: artist.website, label: "Website", Icon: Globe } : null,
    ].filter((s): s is { href: string; label: string; Icon: typeof Instagram } => !!s);

    const studioLocations = artist.studioLocations ?? [];

    return (
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="border-b border-[#E3DCCE] pb-10 mb-14">
                <SectionLabel>Get in Touch</SectionLabel>
                <h1 className="font-[family-name:var(--font-display)] italic text-4xl md:text-5xl mt-4 text-[#1B1812]">
                    Contact {name}
                </h1>
                {(artist.city || artist.state) && (
                    <p className="mt-4 text-[12px] tracking-[0.18em] uppercase text-[#8C8478]">
                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
                <div className="md:col-span-7 space-y-3">
                    {artist.email && (
                        <ContactRow icon={<Mail size={16} strokeWidth={1.5} />} label="Email">
                            <a href={`mailto:${artist.email}`} className="hover:text-[#1B1812] transition-colors">
                                {artist.email}
                            </a>
                        </ContactRow>
                    )}
                    {artist.phone && (
                        <ContactRow icon={<Phone size={16} strokeWidth={1.5} />} label="Phone">
                            <a href={`tel:${artist.phone}`} className="hover:text-[#1B1812] transition-colors">
                                {artist.phone}
                            </a>
                        </ContactRow>
                    )}
                    {artist.website && (
                        <ContactRow icon={<Globe size={16} strokeWidth={1.5} />} label="Website">
                            <a
                                href={artist.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#1B1812] transition-colors"
                            >
                                {artist.website.replace(/^https?:\/\//, "")}
                            </a>
                        </ContactRow>
                    )}

                    {studioLocations.length > 0 && (
                        <div className="pt-6 mt-6 border-t border-[#E3DCCE] space-y-5">
                            {studioLocations.map((loc, i) => (
                                <div key={i} className="flex gap-4">
                                    <MapPin size={16} strokeWidth={1.5} className="text-[#8C8478] mt-0.5 shrink-0" />
                                    <div>
                                        {loc.name && (
                                            <p className="text-[13px] font-medium text-[#1B1812]">{loc.name}</p>
                                        )}
                                        <p className="text-[13px] text-[#57514A]">
                                            {loc.address}, {loc.city}, {loc.state} {loc.zipCode ?? ""}
                                        </p>
                                        {loc.directionsUrl && (
                                            <a
                                                href={loc.directionsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-[#8C8478] hover:text-[#1B1812] mt-1"
                                            >
                                                Directions
                                                <ArrowUpRight size={12} strokeWidth={1.5} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {socials.length > 0 && (
                        <div className="pt-8 mt-8 border-t border-[#E3DCCE]">
                            <SectionLabel className="mb-4">Follow</SectionLabel>
                            <div className="flex gap-5">
                                {socials.map(({ href, label, Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="text-[#57514A] hover:text-[#1B1812] transition-colors"
                                    >
                                        <Icon size={18} strokeWidth={1.5} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {artist.slug && (
                        <div className="pt-8 mt-8 border-t border-[#E3DCCE]">
                            <a
                                href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-[#8C8478] hover:text-[#1B1812] underline decoration-[#E3DCCE] underline-offset-4"
                            >
                                View Full Profile on ArtsDistrictUSA
                                <ArrowUpRight size={12} strokeWidth={1.5} />
                            </a>
                        </div>
                    )}
                </div>

                <div className="md:col-span-5">
                    {artist.acceptsCommissions && artist.acceptsCommissions !== "no" && (
                        <div className="border border-[#E3DCCE] p-7 bg-[#F1ECE2]/40">
                            <SectionLabel className="mb-3">Commissions</SectionLabel>
                            <p className="text-[14px] leading-relaxed text-[#3A342A]">
                                {artist.commissionDescription ??
                                    "This artist accepts commission inquiries. Please reach out to discuss your project, timeline, and budget."}
                            </p>
                            {artist.priceRange && (
                                <p className="mt-4 text-[11px] tracking-[0.18em] uppercase text-[#8C8478]">
                                    Typical Range: {artist.priceRange}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ContactRow({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-4 py-3">
            <span className="text-[#8C8478]">{icon}</span>
            <span className="w-16 shrink-0 text-[10px] tracking-[0.18em] uppercase text-[#8C8478]">{label}</span>
            <span className="text-[14px] text-[#57514A]">{children}</span>
        </div>
    );
}
