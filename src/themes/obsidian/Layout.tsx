"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { displayFont, sansFont } from "./fonts";

export default function ObsidianLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const profileUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;

    const links = [
        { href: `/`, label: "Home" },
        { href: `/artworks`, label: "Works" },
        { href: `/about`, label: "About" },
        { href: `/contact`, label: "Contact" },
    ];

    const socials: { href: string; label: string }[] = [
        artist.instagram
            ? {
                  href: `https://instagram.com/${artist.instagram.replace("@", "")}`,
                  label: "Instagram",
              }
            : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter
            ? {
                  href: `https://twitter.com/${artist.twitter.replace("@", "")}`,
                  label: "Twitter",
              }
            : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div
            className={`${displayFont.variable} ${sansFont.variable} min-h-screen bg-[#0a0a0a] text-[#f5f0eb] flex flex-col font-[family-name:var(--font-obsidian-sans)]`}
        >
            {/* Ambient vignette texture */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,110,0.05),transparent_60%)]" />

            {/* Nav */}
            <header className="sticky top-0 z-50 bg-[#0a0a0a]/75 backdrop-blur-xl border-b border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    {/* Mobile hamburger — left side */}
                    <button
                        className="md:hidden text-[#c9a96e] hover:text-[#f5f0eb] transition-colors"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    {/* Artist name — centered */}
                    <Link
                        href={`/`}
                        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 text-sm md:text-base font-[family-name:var(--font-obsidian-display)] font-medium tracking-[0.35em] uppercase text-[#c9a96e] hover:text-[#f5f0eb] transition-colors whitespace-nowrap"
                    >
                        {name}
                        {artist.verified && (
                            <ShieldCheck size={14} strokeWidth={1.5} className="hidden sm:inline-block text-[#c9a96e]/70" />
                        )}
                    </Link>

                    {/* Desktop nav — right side */}
                    <nav className="hidden md:flex items-center gap-10 ml-auto">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[10px] tracking-[0.25em] uppercase text-[#8a8278] hover:text-[#c9a96e] transition-colors duration-300"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile spacer to balance hamburger */}
                    <div className="md:hidden w-6" />
                </div>

                {/* Gold rule */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />

                {/* Mobile menu */}
                {menuOpen && (
                    <nav className="md:hidden bg-[#0f0f0f] border-b border-[#c9a96e]/20 px-6 py-6 flex flex-col gap-5">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[11px] tracking-[0.3em] uppercase text-[#8a8278] hover:text-[#c9a96e] transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="relative z-10 flex-1">{children}</main>

            {/* Footer */}
            <footer className="relative z-10 mt-24 border-t border-[#c9a96e]/20 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] font-thin mb-1">
                                {name}
                            </p>
                            {(artist.city || artist.state) && (
                                <p className="text-[10px] tracking-[0.2em] uppercase text-[#4a4540]">
                                    {[artist.city, artist.state].filter(Boolean).join(", ")}
                                </p>
                            )}
                        </div>

                        {socials.length > 0 && (
                            <div className="flex items-center gap-6">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] tracking-[0.2em] uppercase text-[#4a4540] hover:text-[#c9a96e] transition-colors duration-300"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        <div className="text-center md:text-right">
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#2a2520]">
                                © {new Date().getFullYear()}{" "}
                                {profileUrl ? (
                                    <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a4540] transition-colors">
                                        {name}
                                    </a>
                                ) : (
                                    name
                                )}
                            </p>
                            <p className="text-[10px] tracking-[0.15em] uppercase text-[#2a2520]">
                                A member of the{" "}
                                <a
                                    href="https://www.artsdistrictusa.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#4a4540] transition-colors"
                                >
                                    Local Artist Marketplace
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
