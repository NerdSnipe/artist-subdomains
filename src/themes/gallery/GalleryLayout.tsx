"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function GalleryLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const links = [
        { href: "/", label: "Home" },
        { href: "/artworks", label: "Artworks" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
            <header className="border-b border-neutral-100 sticky top-0 z-50 bg-white">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-light tracking-widest uppercase">
                        {name}
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm tracking-wider uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <nav className="md:hidden border-t border-neutral-100 bg-white px-6 py-4 flex flex-col gap-4">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm tracking-wider uppercase text-neutral-600"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-neutral-100 py-10 mt-16">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
                    <span>© {new Date().getFullYear()} {name}</span>
                    {artist.city && artist.state && (
                        <span>{artist.city}, {artist.state}</span>
                    )}
                    <span>
                        Powered by{" "}
                        <a
                            href="https://www.artsdistrictusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-neutral-600"
                        >
                            ArtsDistrictUSA
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}
