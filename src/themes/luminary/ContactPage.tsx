import { ArrowUpRight, Mail, MapPin, Globe } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import GlowBlob from "./GlowBlob";
import Reveal from "./Reveal";
import { Kicker, PillButton } from "./ui";

export default function LuminaryContactPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

    const socials: { href: string; label: string; handle: string }[] = [
        artist.instagram
            ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram", handle: `@${artist.instagram.replace("@", "")}` }
            : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook", handle: "facebook.com" } : null,
        artist.twitter
            ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter", handle: `@${artist.twitter.replace("@", "")}` }
            : null,
        artist.tiktok
            ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok", handle: `@${artist.tiktok.replace("@", "")}` }
            : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest", handle: "pinterest.com" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube", handle: "youtube.com" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn", handle: "linkedin.com" } : null,
    ].filter((s): s is { href: string; label: string; handle: string } => s !== null);

    const acceptsCommissions = !!artist.acceptsCommissions && artist.acceptsCommissions !== "no";

    return (
        <div>
            <section className="relative overflow-hidden px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
                <GlowBlob className="-top-24 left-1/3 h-[26rem] w-[26rem]" colors={["#fbe3f2", "#e3ecff"]} opacity={0.5} />
                <Reveal className="relative mx-auto max-w-7xl">
                    <Kicker>Say Hello</Kicker>
                    <h1 className="mt-5 font-serif text-5xl italic text-[#3a3240] sm:text-6xl md:text-7xl">
                        Let&rsquo;s Connect
                    </h1>
                </Reveal>
            </section>

            <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
                <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
                    {/* ── Contact Info ─────────────────────────────────────── */}
                    <Reveal className="md:col-span-5">
                        <p className="font-serif text-2xl italic text-[#3a3240]">{name}</p>
                        {location && (
                            <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-[#a9769f]">{location}</p>
                        )}

                        <div className="mt-9 space-y-6">
                            {artist.email && (
                                <a href={`mailto:${artist.email}`} className="group flex items-start gap-4">
                                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#a9769f]" />
                                    <div>
                                        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#a39aa0]">Email</p>
                                        <p className="mt-0.5 font-sans text-[15px] text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                            {artist.email}
                                        </p>
                                    </div>
                                </a>
                            )}
                            {artist.website && (
                                <a href={artist.website} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                                    <Globe className="mt-0.5 h-5 w-5 shrink-0 text-[#a9769f]" />
                                    <div>
                                        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#a39aa0]">Website</p>
                                        <p className="mt-0.5 font-sans text-[15px] text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                            {artist.website.replace(/^https?:\/\//, "")}
                                        </p>
                                    </div>
                                </a>
                            )}
                            {artist.slug && (
                                <a
                                    href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-4"
                                >
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#a9769f]" />
                                    <div>
                                        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#a39aa0]">Marketplace</p>
                                        <p className="mt-0.5 inline-flex items-center gap-1 font-sans text-[15px] text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                            ArtsDistrictUSA Profile <ArrowUpRight className="h-3.5 w-3.5" />
                                        </p>
                                    </div>
                                </a>
                            )}
                        </div>

                        {socials.length > 0 && (
                            <div className="mt-10 border-t border-[#3a3240]/10 pt-8">
                                <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.16em] text-[#a39aa0]">Social</p>
                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-sans text-sm text-[#6b6470] transition-colors hover:text-[#a9769f]"
                                        >
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Reveal>

                    {/* ── Commission / CTA ─────────────────────────────────── */}
                    <Reveal className="relative md:col-span-7" delay={120}>
                        {acceptsCommissions ? (
                            <div className="relative overflow-hidden bg-white/70 p-8 shadow-[0_20px_50px_-20px_rgba(58,50,64,0.25)] backdrop-blur-sm md:p-12">
                                <GlowBlob className="-right-16 -top-16 h-64 w-64 -z-10" colors={["#f6e3fb", "#fdeadb"]} opacity={0.6} />
                                <Kicker>Open for Commissions</Kicker>
                                <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240] sm:text-4xl">
                                    Commission a Piece
                                </h2>
                                <p className="mt-6 font-sans text-[15px] leading-relaxed text-[#6b6470]">
                                    {artist.commissionDescription ??
                                        `${name} welcomes commission inquiries for original works. Each piece is a personal collaboration — reach out to share your vision, timeline, and budget.`}
                                </p>
                                <ul className="mt-7 space-y-3">
                                    {["Tailored to your space and story", "Direct collaboration with the artist", "Thoughtfully packaged and shipped"].map((item) => (
                                        <li key={item} className="flex items-start gap-3 font-sans text-sm text-[#6b6470]">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#f3b6d0] to-[#b6c8f3]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                {artist.email && (
                                    <PillButton href={`mailto:${artist.email}?subject=Commission Inquiry`} external className="mt-9">
                                        Submit an Inquiry
                                    </PillButton>
                                )}
                            </div>
                        ) : (
                            <div className="relative overflow-hidden bg-white/70 p-8 shadow-[0_20px_50px_-20px_rgba(58,50,64,0.2)] backdrop-blur-sm md:p-12">
                                <GlowBlob className="-right-16 -top-16 h-64 w-64 -z-10" colors={["#e3ecff", "#f6e3fb"]} opacity={0.5} />
                                <Kicker>Available Works</Kicker>
                                <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Explore the Gallery</h2>
                                <p className="mt-6 font-sans text-[15px] leading-relaxed text-[#6b6470]">
                                    Browse original works and prints available now. All inquiries and purchases are handled securely through ArtsDistrictUSA.
                                </p>
                                <PillButton href="/artworks" variant="outline" className="mt-9">
                                    View All Works
                                </PillButton>
                            </div>
                        )}

                        {artist.artistTagline && (
                            <div className="mt-10 border-l border-[#e3c9dd] pl-6">
                                <p className="font-serif text-xl italic leading-snug text-[#3a3240]">
                                    &ldquo;{artist.artistTagline}&rdquo;
                                </p>
                                <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-[#a39aa0]">— {name}</p>
                            </div>
                        )}
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
