"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { displayFont, bodyFont, scriptFont } from "./fonts";
import { GrainOverlay, TornEdge } from "./decor";

const PALETTE = {
    "--clay": "#bd5a3a",
    "--clay-dark": "#9c4830",
    "--clay-light": "#e7b199",
    "--sand": "#ece0c8",
    "--sand-light": "#f7f0e1",
    "--sage": "#7c8a68",
    "--sage-dark": "#5b6650",
    "--ink": "#33281e",
    "--ink-soft": "#6d5f4f",
    "--paper": "#faf5e9",
} as CSSProperties;

export default function ArtisanLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const links = [
        { href: "/", label: "Home" },
        { href: "/artworks", label: "The Work" },
        { href: "/about", label: "The Studio" },
        { href: "/contact", label: "Connect" },
    ];

    return (
        <div
            className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} relative flex min-h-screen flex-col bg-[var(--paper)] text-[var(--ink)] antialiased`}
            style={{ ...PALETTE, fontFamily: "var(--font-body)" }}
        >
            <GrainOverlay />

            <header className="sticky top-0 z-50 border-b border-[var(--ink)]/10 bg-[var(--paper)]/95 backdrop-blur-sm">
                <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                    <Link href="/" className="group flex flex-col leading-none">
                        <span
                            className="text-[1.55rem] italic tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--clay-dark)]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {name}
                        </span>
                        <span
                            className="mt-0.5 text-base text-[var(--sage-dark)]"
                            style={{ fontFamily: "var(--font-script)" }}
                        >
                            the atelier
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-9 md:flex">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)] transition-colors hover:text-[var(--clay-dark)]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        className="text-[var(--ink)] md:hidden"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="flex flex-col gap-1 border-t border-[var(--ink)]/10 bg-[var(--paper)] px-6 py-4 md:hidden">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="rounded-sm px-2 py-2.5 text-sm font-medium uppercase tracking-wide text-[var(--ink-soft)] hover:bg-[var(--sand)]/60 hover:text-[var(--clay-dark)]"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="relative z-0 flex-1">{children}</main>

            <TornEdge fill="var(--ink)" />
            <footer className="bg-[var(--ink)] py-12 text-[var(--sand)]/70">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center md:flex-row md:justify-between md:text-left">
                    <div>
                        <p className="text-lg italic text-[var(--sand)]" style={{ fontFamily: "var(--font-display)" }}>
                            {name}
                        </p>
                        <p className="mt-1 text-xs tracking-wide text-[var(--sand)]/50">
                            © {new Date().getFullYear()} · handmade, one piece at a time
                        </p>
                    </div>
                    <a
                        href="https://www.artsdistrictusa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-wide text-[var(--sand)]/50 underline-offset-4 transition-colors hover:text-[var(--sand)] hover:underline"
                    >
                        Website by ArtsDistrictUSA
                    </a>
                </div>
            </footer>
        </div>
    );
}
