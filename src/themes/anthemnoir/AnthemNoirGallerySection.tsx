import Image from "next/image";
import { Instagram, Facebook, Music2 } from "lucide-react";
import type { ArtistProfile } from "@/types";
import { marketplaceArtistUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

const SOCIAL_BRANDS = [
    { key: "instagram" as const, Icon: Instagram, label: "Instagram", bg: "#E1306C" },
    { key: "facebook" as const, Icon: Facebook, label: "Facebook", bg: "#1877F2" },
    { key: "tiktok" as const, Icon: Music2, label: "TikTok", bg: "#25F4EE" },
];

export default function AnthemNoirGallerySection({ artist, id }: { artist: ArtistProfile; id?: string }) {
    const galleries = artist.galleries ?? [];
    const socials = SOCIAL_BRANDS.map((s) => ({ ...s, href: artist[s.key] })).filter(
        (s): s is (typeof SOCIAL_BRANDS)[number] & { href: string } => !!s.href
    );
    const marketplaceUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;
    if (galleries.length === 0 && socials.length === 0 && !marketplaceUrl) return null;

    return (
        <section id={id} className="border-t-4 border-[#E9DFC9] bg-[#0C0B09] scroll-mt-[100px]">
            <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
                <Reveal className="mb-10 border-b-4 border-[#E9DFC9] pb-5">
                    <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-3">Where to Find the Work</p>
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl">Gallery Representations</h2>
                </Reveal>

                {galleries.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {galleries.map((g, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <a
                                href={g.url ?? g.link ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] border-2 border-[#E9DFC9] overflow-hidden hover:bg-[#E9DFC9] transition-colors"
                            >
                                {g.photo && (
                                    <div className="relative h-full min-h-[140px] overflow-hidden border-r-2 border-[#E9DFC9]">
                                        <Image
                                            src={g.photo}
                                            alt={g.name}
                                            fill
                                            sizes="180px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-5 md:p-7 flex flex-col justify-center">
                                    <p className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl group-hover:text-[#0C0B09]">
                                        {g.name}
                                    </p>
                                    {g.address && (
                                        <p className="mt-2 text-sm text-[#E9DFC9]/60 group-hover:text-[#0C0B09]/70">
                                            {g.address}
                                            {(g.city || g.state) && `, ${[g.city, g.state].filter(Boolean).join(", ")}`}
                                        </p>
                                    )}
                                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#C9A227] group-hover:text-[#0C0B09]">
                                        Visit Gallery →
                                    </p>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
                )}

                {(socials.length > 0 || marketplaceUrl) && (
                    <Reveal delay={galleries.length * 100 + 100} className={galleries.length > 0 ? "mt-16 pt-12 border-t-2 border-[#E9DFC9]/30" : ""}>
                        <p className="text-lg md:text-xl mb-6 max-w-[560px]">
                            If you&apos;d like to see more of my artwork and studio life, look me up and follow along on:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {socials.map(({ key, Icon, label, bg, href }) => (
                                <a
                                    key={key}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 pr-5 border-2 border-[#E9DFC9] hover:border-[#C9A227] transition-colors"
                                >
                                    <span
                                        className="w-11 h-11 flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: bg }}
                                    >
                                        <Icon size={20} className="text-white" strokeWidth={2} />
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-wide">{label}</span>
                                </a>
                            ))}
                            {marketplaceUrl && (
                                // ADUSA marketplace profile — icon is the marketplace's own favicon until
                                // there's a dedicated brand mark to swap in.
                                <a
                                    href={marketplaceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 pr-5 border-2 border-[#E9DFC9] hover:border-[#C9A227] transition-colors"
                                >
                                    <span className="w-11 h-11 flex items-center justify-center shrink-0 bg-[#0C0B09] border border-[#E9DFC9]/40">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://www.artsdistrictusa.com/favicon.ico" alt="" width={22} height={22} />
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-wide">ADUSA</span>
                                </a>
                            )}
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
