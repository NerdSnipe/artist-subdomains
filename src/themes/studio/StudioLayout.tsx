"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function StudioLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const links = [
        { href: "/", label: "Studio" },
        { href: "/artworks", label: "Works" },
        { href: "/about", label: "Artist" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
            <header className="border-b border-neutral-800 sticky top-0 z-50 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">
                    <Link href="/" className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-100">
                        {name}
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-100 transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="md:hidden text-neutral-400"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="md:hidden border-t border-neutral-800 bg-neutral-950 px-8 py-5 flex flex-col gap-5">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-xs tracking-widest uppercase text-neutral-400"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-neutral-800 py-8 mt-20">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-600 tracking-widest uppercase">
                    <span>© {new Date().getFullYear()} {name}</span>
                    <a
                        href="https://www.artsdistrictusa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-400"
                    >
                        ArtsDistrictUSA
                    </a>
                </div>
            </footer>
        </div>
    );
}
