"use client";

import Link from "next/link";
import { useState } from "react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function EmberLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);

    const links = [
        { href: `/`, label: "Home" },
        { href: `/artworks`, label: "Works" },
        { href: `/about`, label: "About" },
        { href: `/contact`, label: "Contact" },
    ];

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f7f3ee", color: "#2c2925", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* Navigation */}
            <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: "#f7f3ee", borderColor: "#e8e0d6" }}>
                <div className="max-w-6xl mx-auto px-8 h-18 flex items-center justify-between" style={{ height: "4.5rem" }}>
                    <Link
                        href={`/`}
                        className="font-serif text-lg leading-tight transition-opacity duration-200 hover:opacity-70"
                        style={{ color: "#2c2925" }}
                    >
                        {name}
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm relative group transition-colors duration-200"
                                style={{ color: "#6b5f52", fontFamily: "'Georgia', serif", letterSpacing: "0.02em" }}
                            >
                                {l.label}
                                <span
                                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                                    style={{ backgroundColor: "#b5451b" }}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        style={{ color: "#6b5f52" }}
                    >
                        <span
                            className="block w-5 h-px transition-all duration-200"
                            style={{
                                backgroundColor: "#6b5f52",
                                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                            }}
                        />
                        <span
                            className="block w-5 h-px transition-all duration-200"
                            style={{
                                backgroundColor: "#6b5f52",
                                opacity: menuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="block w-5 h-px transition-all duration-200"
                            style={{
                                backgroundColor: "#6b5f52",
                                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                            }}
                        />
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <nav
                        className="md:hidden border-t px-8 py-6 flex flex-col gap-5"
                        style={{ backgroundColor: "#f7f3ee", borderColor: "#e8e0d6" }}
                    >
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm transition-colors duration-200"
                                style={{ color: "#6b5f52", fontFamily: "'Georgia', serif" }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="mt-24 border-t" style={{ backgroundColor: "#ede8e1", borderColor: "#d9d0c4" }}>
                <div className="max-w-6xl mx-auto px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Artist name + tagline */}
                        <div>
                            <p className="font-serif text-xl mb-3" style={{ color: "#2c2925" }}>{name}</p>
                            {artist.artistTagline && (
                                <p className="text-sm leading-relaxed italic" style={{ color: "#8a7a6e" }}>{artist.artistTagline}</p>
                            )}
                            {(artist.city || artist.state) && (
                                <p className="text-xs mt-3" style={{ color: "#a0907f" }}>
                                    {[artist.city, artist.state].filter(Boolean).join(", ")}
                                </p>
                            )}
                        </div>

                        {/* Navigation */}
                        <div>
                            <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "#b5451b", letterSpacing: "0.12em" }}>Navigate</p>
                            <div className="flex flex-col gap-3">
                                {links.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="text-sm transition-colors duration-200 hover:opacity-70"
                                        style={{ color: "#6b5f52" }}
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "#b5451b", letterSpacing: "0.12em" }}>Connect</p>
                            <div className="flex flex-col gap-3">
                                {artist.email && (
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="text-sm transition-colors duration-200 hover:opacity-70"
                                        style={{ color: "#6b5f52" }}
                                    >
                                        {artist.email}
                                    </a>
                                )}
                                {artist.instagram && (
                                    <a
                                        href={`https://instagram.com/${artist.instagram.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm transition-colors duration-200 hover:opacity-70"
                                        style={{ color: "#6b5f52" }}
                                    >
                                        Instagram
                                    </a>
                                )}
                                {artist.slug && (
                                    <a
                                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs transition-colors duration-200 hover:opacity-70"
                                        style={{ color: "#a0907f" }}
                                    >
                                        ArtsDistrictUSA Profile
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3" style={{ borderColor: "#d9d0c4" }}>
                        <p className="text-xs" style={{ color: "#a0907f" }}>
                            &copy; {new Date().getFullYear()} {name}. All rights reserved.
                        </p>
                        <a
                            href="https://www.artsdistrictusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs transition-colors duration-200 hover:opacity-70"
                            style={{ color: "#a0907f" }}
                        >
                            Powered by ArtsDistrictUSA
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
