"use client";

import Link from "next/link";
import { useState } from "react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function LuminaryLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);

    const links = [
        { href: `/${domain}`, label: "Home" },
        { href: `/${domain}/artworks`, label: "Works" },
        { href: `/${domain}/about`, label: "About" },
        { href: `/${domain}/contact`, label: "Contact" },
    ];

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a] flex flex-col">
            {/* Masthead */}
            <header className="sticky top-0 z-50 bg-white">
                {/* Top strip */}
                <div className="border-b-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
                        {/* Artist name — bold serif */}
                        <Link
                            href={`/${domain}`}
                            className="font-serif font-black text-xl md:text-2xl tracking-tight text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                        >
                            {name}
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="text-xs font-sans tracking-[0.15em] uppercase text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-1"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all ${menuOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-b border-[#1a1a1a] bg-white px-6 py-6">
                        <nav className="flex flex-col gap-5">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="font-serif text-2xl font-black text-[#1a1a1a] hover:text-[#0f2d6b]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t-2 border-[#1a1a1a] mt-24">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Col 1: Artist */}
                    <div>
                        <p className="font-serif font-black text-2xl mb-2">{name}</p>
                        {artist.artistTagline && (
                            <p className="text-sm text-neutral-500 font-sans leading-relaxed mb-3 italic">
                                {artist.artistTagline}
                            </p>
                        )}
                        {(artist.city || artist.state) && (
                            <p className="text-xs tracking-widest uppercase text-neutral-400">
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    {/* Col 2: Navigation */}
                    <div>
                        <p className="text-xs tracking-[0.15em] uppercase font-sans mb-4 text-neutral-400">Navigate</p>
                        <nav className="flex flex-col gap-2">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Col 3: Social + Credits */}
                    <div>
                        {socials.length > 0 && (
                            <>
                                <p className="text-xs tracking-[0.15em] uppercase font-sans mb-4 text-neutral-400">Follow</p>
                                <div className="flex flex-col gap-2 mb-6">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                                        >
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                        <p className="text-xs text-neutral-400">
                            &copy; {new Date().getFullYear()} {name}. Powered by{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-[#0f2d6b]"
                            >
                                ArtsDistrictUSA
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom rule with issue number styling */}
                <div className="border-t border-neutral-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 font-sans">
                            {name} — Contemporary Art
                        </span>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 font-sans">
                            Luminary Theme
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
