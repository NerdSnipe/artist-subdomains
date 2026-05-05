"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function MarketLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const links = [
        { href: "/artworks", label: "Shop" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
            {/* Top banner */}
            <div className="bg-stone-900 text-stone-100 text-center py-2 text-xs tracking-widest">
                Original Artworks by {name} — Shipping Available
            </div>

            <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-stone-500" />
                        <span className="font-semibold tracking-tight text-stone-900">{name}</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <a
                            href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm bg-stone-900 text-white px-4 py-1.5 hover:bg-stone-700 transition-colors"
                        >
                            Full Profile
                        </a>
                    </nav>

                    <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="md:hidden border-t border-stone-200 bg-white px-6 py-4 flex flex-col gap-4">
                        <Link href="/" className="text-sm text-stone-600 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
                        {links.map((l) => (
                            <Link key={l.href} href={l.href} className="text-sm text-stone-600 font-medium" onClick={() => setMenuOpen(false)}>{l.label}</Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-stone-900 text-stone-400 py-10 mt-16">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    <span>© {new Date().getFullYear()} {name}. All artwork rights reserved.</span>
                    <a href="https://www.artsdistrictusa.com" target="_blank" rel="noopener noreferrer" className="hover:text-stone-200">
                        Powered by ArtsDistrictUSA
                    </a>
                </div>
            </footer>
        </div>
    );
}
