"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function ArtisanLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const links = [
        { href: "/", label: "Home" },
        { href: "/artworks", label: "Gallery" },
        { href: "/about", label: "My Story" },
        { href: "/contact", label: "Connect" },
    ];

    return (
        <div className="min-h-screen bg-amber-50 text-stone-800 flex flex-col" style={{ fontFamily: "'Georgia', serif" }}>
            <header className="bg-amber-50 border-b border-amber-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg text-stone-700" style={{ fontFamily: "'Georgia', serif" }}>
                        <em>{name}</em>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <button className="md:hidden text-stone-500" onClick={() => setMenuOpen((v) => !v)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="md:hidden border-t border-amber-200 bg-amber-50 px-6 py-5 flex flex-col gap-5">
                        {links.map((l) => (
                            <Link key={l.href} href={l.href} className="text-sm text-stone-600" onClick={() => setMenuOpen(false)}>
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-stone-800 text-amber-100/60 py-10 mt-16">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
                    <em>© {new Date().getFullYear()} {name}</em>
                    <a href="https://artdistrictusa.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100 text-xs">
                        ArtDistrictUSA
                    </a>
                </div>
            </footer>
        </div>
    );
}
