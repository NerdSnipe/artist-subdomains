"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { displayFont, condensedFont, bodyFont } from "./fonts";
import FilmGrain from "./FilmGrain";

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
        <div
            className={`${displayFont.variable} ${condensedFont.variable} ${bodyFont.variable} relative flex min-h-screen flex-col bg-[#0a0908] text-neutral-100 font-[family-name:var(--font-studio-body)] antialiased`}
        >
            <FilmGrain />

            <header className="sticky top-0 z-50 border-b border-neutral-800/60 bg-[#0a0908]/85 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
                    <Link
                        href="/"
                        className="font-[family-name:var(--font-studio-condensed)] text-sm font-semibold uppercase tracking-[0.25em] text-neutral-100"
                    >
                        {name}
                    </Link>

                    <nav className="hidden items-center gap-10 md:flex">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-[family-name:var(--font-studio-condensed)] text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 transition-colors duration-300 hover:text-amber-100/90"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        type="button"
                        className="text-neutral-400 md:hidden"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="flex flex-col gap-6 border-t border-neutral-800/60 bg-[#0a0908] px-6 py-6 md:hidden">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.3em] text-neutral-400"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="mt-24 border-t border-neutral-800/60 py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 font-[family-name:var(--font-studio-condensed)] text-[11px] uppercase tracking-[0.25em] text-neutral-600 md:flex-row md:px-10">
                    <span>© {new Date().getFullYear()} {name}</span>
                    <a
                        href="https://www.artsdistrictusa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-neutral-400"
                    >
                        Site by ArtsDistrictUSA
                    </a>
                </div>
            </footer>
        </div>
    );
}
