"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Instagram, Facebook, Twitter, Youtube, Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { fontVariables } from "./fonts";
import Marquee from "./Marquee";
import { ink, coal, emberMid, emberGradient, smoke } from "./palette";

export default function EmberLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const name = getArtistName(artist);
    const profileUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const links = [
        { href: `/`, label: "Home" },
        { href: `/artworks`, label: "Work" },
        { href: `/about`, label: "About" },
        { href: `/contact`, label: "Contact" },
    ];

    const tickerItems = [
        artist.artStyle,
        artist.secondaryArtStyle,
        artist.medium,
        artist.secondaryMedium,
        artist.acceptsCommissions && artist.acceptsCommissions !== "no" ? "Accepting Commissions" : null,
        [artist.city, artist.state].filter(Boolean).join(", ") || null,
    ].filter((v): v is string => !!v);

    const socialLinks = [
        { icon: Instagram, href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : null },
        { icon: Facebook, href: artist.facebook ? `https://facebook.com/${artist.facebook.replace("@", "")}` : null },
        { icon: Twitter, href: artist.twitter ? `https://twitter.com/${artist.twitter.replace("@", "")}` : null },
        { icon: Youtube, href: artist.youtube ? `https://youtube.com/@${artist.youtube.replace("@", "")}` : null },
    ].filter((s) => !!s.href) as { icon: typeof Instagram; href: string }[];

    return (
        <div
            className={`${fontVariables} min-h-screen flex flex-col`}
            style={{ backgroundColor: ink, color: "#f6f1e8", fontFamily: "var(--font-body)" }}
        >
            {/* ── Header ───────────────────────────────────────────────── */}
            <header
                className="sticky top-0 z-50 border-b backdrop-blur-sm"
                style={{ backgroundColor: "rgba(10,9,8,0.92)", borderColor: "rgba(255,90,31,0.25)" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                    <Link
                        href={`/`}
                        className="uppercase leading-none tracking-tight transition-transform duration-200 hover:-skew-x-3 inline-block"
                        style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "#f6f1e8" }}
                    >
                        {name}
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-9">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="group relative text-sm uppercase font-semibold tracking-widest py-1"
                                style={{ color: smoke, letterSpacing: "0.14em" }}
                            >
                                <span className="transition-colors duration-200 group-hover:text-[#f6f1e8]">{l.label}</span>
                                <span
                                    className="absolute -bottom-0.5 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-300"
                                    style={{ background: emberGradient }}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 -mr-2"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={26} color="#f6f1e8" /> : <Menu size={26} color="#f6f1e8" />}
                    </button>
                </div>
            </header>

            {/* Mobile full-screen menu */}
            {menuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 flex flex-col justify-center px-10"
                    style={{ backgroundColor: ink }}
                >
                    <nav className="flex flex-col gap-2">
                        {links.map((l, i) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setMenuOpen(false)}
                                className="uppercase leading-none py-3 border-b transition-transform duration-200 hover:translate-x-2"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "2.4rem",
                                    color: i % 2 === 0 ? "#f6f1e8" : undefined,
                                    backgroundImage: i % 2 !== 0 ? emberGradient : undefined,
                                    backgroundClip: i % 2 !== 0 ? "text" : undefined,
                                    WebkitBackgroundClip: i % 2 !== 0 ? "text" : undefined,
                                    WebkitTextFillColor: i % 2 !== 0 ? "transparent" : undefined,
                                    borderColor: "rgba(255,255,255,0.1)",
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                    {socialLinks.length > 0 && (
                        <div className="flex gap-5 mt-10">
                            {socialLinks.map(({ icon: Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: smoke }}>
                                    <Icon size={22} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <main className="flex-1">{children}</main>

            {/* ── Footer ───────────────────────────────────────────────── */}
            <footer className="mt-24" style={{ backgroundColor: coal }}>
                {tickerItems.length > 0 && <Marquee items={tickerItems} variant="ember" speedSeconds={24} />}

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <p
                                className="uppercase leading-none mb-3"
                                style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#f6f1e8" }}
                            >
                                {name}
                            </p>
                            {artist.artistTagline && (
                                <p className="text-sm leading-relaxed" style={{ color: smoke }}>
                                    {artist.artistTagline}
                                </p>
                            )}
                            {socialLinks.length > 0 && (
                                <div className="flex gap-4 mt-6">
                                    {socialLinks.map(({ icon: Icon, href }, i) => (
                                        <a
                                            key={i}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-colors duration-200 hover:text-[#ff5a1f]"
                                            style={{ color: smoke }}
                                        >
                                            <Icon size={19} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <p
                                className="text-xs uppercase font-bold tracking-widest mb-5"
                                style={{ color: emberMid, letterSpacing: "0.16em" }}
                            >
                                Navigate
                            </p>
                            <div className="flex flex-col gap-3">
                                {links.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="text-sm transition-colors duration-200 hover:text-[#f6f1e8]"
                                        style={{ color: smoke }}
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p
                                className="text-xs uppercase font-bold tracking-widest mb-5"
                                style={{ color: emberMid, letterSpacing: "0.16em" }}
                            >
                                Connect
                            </p>
                            <div className="flex flex-col gap-3">
                                {artist.email && (
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="text-sm transition-colors duration-200 hover:text-[#f6f1e8]"
                                        style={{ color: smoke }}
                                    >
                                        {artist.email}
                                    </a>
                                )}
                                {(artist.city || artist.state) && (
                                    <p className="text-sm" style={{ color: smoke }}>
                                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                                {artist.slug && (
                                    <a
                                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs mt-1 transition-colors duration-200 hover:text-[#f6f1e8]"
                                        style={{ color: "#6f6459" }}
                                    >
                                        ArtsDistrictUSA Profile
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-12 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                        <p className="text-xs" style={{ color: "#6f6459" }}>
                            &copy; {new Date().getFullYear()}{" "}
                            {profileUrl ? (
                                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#f6f1e8]">
                                    {name}
                                </a>
                            ) : (
                                name
                            )}. All rights reserved.
                        </p>
                        <span className="text-xs" style={{ color: "#6f6459" }}>
                            A member of the{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 hover:text-[#f6f1e8]"
                            >
                                Local Artist Marketplace
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
