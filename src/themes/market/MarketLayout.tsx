"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Menu,
    X,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Pin,
    Linkedin,
    Music2,
} from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { displayFont, bodyFont } from "./fonts";

const NAV_LINKS = [
    { href: "/artworks", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function MarketLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);

    const socials = [
        { href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : null, Icon: Instagram, label: "Instagram" },
        { href: artist.facebook ?? null, Icon: Facebook, label: "Facebook" },
        { href: artist.twitter ?? null, Icon: Twitter, label: "Twitter" },
        { href: artist.pinterest ?? null, Icon: Pin, label: "Pinterest" },
        { href: artist.tiktok ?? null, Icon: Music2, label: "TikTok" },
        { href: artist.youtube ?? null, Icon: Youtube, label: "YouTube" },
        { href: artist.linkedin ?? null, Icon: Linkedin, label: "LinkedIn" },
    ].filter((s) => s.href);

    return (
        <div
            className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-[#f8f2e9] text-[#241e19] flex flex-col font-[family-name:var(--market-font-body)] antialiased`}
        >
            <div className="bg-[#241e19] text-[#e9dcc8] text-center py-2 px-4 text-[11px] tracking-[0.18em] uppercase">
                Original artwork, shipped direct from the studio
            </div>

            <header className="border-b border-[#e3d5c1] bg-[#f8f2e9]/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex flex-col leading-none">
                        <span className="font-[family-name:var(--market-font-display)] text-xl tracking-tight text-[#241e19]">
                            {name}
                        </span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[#b2542e] mt-1">
                            The Shop
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-9">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm text-[#4a4038] hover:text-[#b2542e] transition-colors font-medium"
                            >
                                {l.label}
                            </Link>
                        ))}
                        {artist.slug && (
                            <a
                                href={marketplaceArtistUrl(artist.slug)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm bg-[#241e19] text-[#f8f2e9] px-5 py-2.5 hover:bg-[#b2542e] transition-colors font-medium"
                            >
                                Full Profile
                            </a>
                        )}
                    </nav>

                    <button
                        className="md:hidden text-[#241e19]"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="md:hidden border-t border-[#e3d5c1] bg-[#f8f2e9] px-6 py-5 flex flex-col gap-4">
                        <Link href="/" className="text-sm text-[#4a4038] font-medium" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm text-[#4a4038] font-medium"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                        {artist.slug && (
                            <a
                                href={marketplaceArtistUrl(artist.slug)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#b2542e] font-semibold"
                            >
                                Full Profile →
                            </a>
                        )}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-[#241e19] text-[#c9bcaa] pt-14 pb-8 mt-24">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    <div>
                        <p className="font-[family-name:var(--market-font-display)] text-xl text-[#f8f2e9] mb-2">
                            {name}
                        </p>
                        {artist.artistTagline && (
                            <p className="text-sm leading-relaxed max-w-xs">{artist.artistTagline}</p>
                        )}
                        {(artist.city || artist.state) && (
                            <p className="text-xs text-[#8a7d6e] mt-3 tracking-wide uppercase">
                                {artist.city}{artist.city && artist.state ? ", " : ""}{artist.state}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f8f2e9] mb-4">
                            Explore
                        </p>
                        <div className="flex flex-col gap-2.5 text-sm">
                            {NAV_LINKS.map((l) => (
                                <Link key={l.href} href={l.href} className="hover:text-[#f8f2e9] transition-colors w-fit">
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f8f2e9] mb-4">
                            Connect
                        </p>
                        {socials.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {socials.map(({ href, Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 flex items-center justify-center border border-[#4a4038] hover:border-[#b2542e] hover:text-[#b2542e] transition-colors"
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        ) : (
                            artist.email && (
                                <a href={`mailto:${artist.email}`} className="text-sm hover:text-[#f8f2e9] transition-colors">
                                    {artist.email}
                                </a>
                            )
                        )}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#4a4038]/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#8a7d6e]">
                    <span>© {new Date().getFullYear()} {name}. All artwork rights reserved.</span>
                    <a
                        href="https://www.artsdistrictusa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#f8f2e9] transition-colors"
                    >
                        Powered by ArtsDistrictUSA
                    </a>
                </div>
            </footer>
        </div>
    );
}
