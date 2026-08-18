"use client";

import Link from "next/link";
import { useState } from "react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";

// SVG grain filter data URI
const GRAIN_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  .noir-grain::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 180px 180px;
  }

  .noir-grain-section::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 180px 180px;
  }

  @keyframes kenburns {
    from { transform: scale(1) translateX(0) translateY(0); }
    to   { transform: scale(1.08) translateX(-1%) translateY(-1%); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .noir-fade-in { animation: fadeIn 1.4s ease forwards; }
  .noir-fade-up { animation: fadeInUp 0.8s ease forwards; }

  .scroll-reveal {
    opacity: 0;
    transform: translateY(2rem);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .noir-card:hover .noir-overlay-title {
    transform: translateY(0);
    opacity: 1;
  }

  .film-pill {
    width: 12px;
    height: 8px;
    border-radius: 1px;
    display: inline-block;
    border: 1px solid currentColor;
  }
`;

export default function NoirLayout({ children, artist }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const profileUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "Twitter" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div className="noir-grain min-h-screen bg-[#0d0d0d] text-[#e8e8e8] flex flex-col">
            <style dangerouslySetInnerHTML={{ __html: GRAIN_STYLE }} />

            {/* Fixed Nav */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#a8884a]/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    {/* Artist name — left, Playfair italic */}
                    <Link
                        href="/"
                        className="text-sm tracking-widest text-[#e8e8e8] hover:text-[#a8884a] transition-colors duration-500"
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    >
                        {name}
                    </Link>

                    {/* Desktop nav — right, Courier New dots */}
                    <nav className="hidden md:flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase"
                        style={{ fontFamily: "'Courier New', monospace" }}>
                        <span className="text-[#a8884a]/50">·</span>
                        {[
                            { href: "/", label: "Home" },
                            { href: "/artworks", label: "Works" },
                            { href: "/about", label: "About" },
                            { href: "/contact", label: "Contact" },
                        ].map((l) => (
                            <span key={l.href} className="flex items-center gap-1">
                                <Link
                                    href={l.href}
                                    className="px-2 py-1 text-[#8a8a8a] hover:text-[#e8e8e8] transition-colors duration-300"
                                >
                                    {l.label}
                                </Link>
                                <span className="text-[#a8884a]/50">·</span>
                            </span>
                        ))}
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-[#a8884a] hover:text-[#e8e8e8] transition-colors p-1"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <nav className="md:hidden bg-black/95 border-t border-[#a8884a]/15 px-6 py-6 flex flex-col gap-5">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/artworks", label: "Works" },
                            { href: "/about", label: "About" },
                            { href: "/contact", label: "Contact" },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[11px] tracking-[0.35em] uppercase text-[#8a8a8a] hover:text-[#a8884a] transition-colors"
                                style={{ fontFamily: "'Courier New', monospace" }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            {/* Page offset for fixed nav */}
            <div className="h-16" />

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-black border-t border-[#a8884a]/15 mt-24">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-center">
                    <p
                        className="text-[9px] tracking-[0.5em] uppercase text-[#4a4a4a] mb-3"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        {name}
                        {artist.city ? ` · ${artist.city}` : ""}
                        {` · ${new Date().getFullYear()}`}
                    </p>
                    {socials.length > 0 && (
                        <div className="flex items-center justify-center gap-5 mb-4">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[9px] tracking-[0.2em] uppercase text-[#3a3a3a] hover:text-[#a8884a] transition-colors duration-300"
                                    style={{ fontFamily: "'Courier New', monospace" }}
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    )}
                    <p
                        className="text-[8px] tracking-[0.2em] uppercase text-[#2a2a2a]"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        © {new Date().getFullYear()}{" "}
                        {profileUrl ? (
                            <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#a8884a]">
                                {name}
                            </a>
                        ) : (
                            name
                        )}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
