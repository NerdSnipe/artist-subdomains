"use client";

import { useState } from "react";
import Link from "next/link";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import MarqueeStrip from "./MarqueeStrip";

const MONO = "'IBM Plex Mono', monospace";
const CORMORANT = "'Cormorant Garamond', serif";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/artworks", label: "Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function ChronicleLayout({ children, artist }: ThemeLayoutProps) {
    const name = getArtistName(artist);
    const [menuOpen, setMenuOpen] = useState(false);

    const socials: { platform: string; handle: string; href: string }[] = [
        artist.instagram
            ? { platform: "Instagram", handle: `@${artist.instagram.replace("@", "")}`, href: `https://instagram.com/${artist.instagram.replace("@", "")}` }
            : null,
        artist.facebook
            ? { platform: "Facebook", handle: artist.facebook, href: artist.facebook.startsWith("http") ? artist.facebook : `https://facebook.com/${artist.facebook}` }
            : null,
        artist.twitter
            ? { platform: "X / Twitter", handle: `@${artist.twitter.replace("@", "")}`, href: `https://twitter.com/${artist.twitter.replace("@", "")}` }
            : null,
        artist.tiktok
            ? { platform: "TikTok", handle: `@${artist.tiktok.replace("@", "")}`, href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}` }
            : null,
        artist.pinterest
            ? { platform: "Pinterest", handle: artist.pinterest, href: artist.pinterest.startsWith("http") ? artist.pinterest : `https://pinterest.com/${artist.pinterest}` }
            : null,
        artist.youtube
            ? { platform: "YouTube", handle: artist.youtube, href: artist.youtube.startsWith("http") ? artist.youtube : `https://youtube.com/${artist.youtube}` }
            : null,
        artist.linkedin
            ? { platform: "LinkedIn", handle: artist.linkedin, href: artist.linkedin.startsWith("http") ? artist.linkedin : `https://linkedin.com/in/${artist.linkedin}` }
            : null,
    ].filter((s): s is { platform: string; handle: string; href: string } => s !== null);

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#faf8f5", color: "#1c1917" }}
        >
            {/* ── Sticky Nav ─────────────────────────────────────────────── */}
            <header
                className="sticky top-0 z-50 border-b border-stone-200"
                style={{ backgroundColor: "#faf8f5" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    {/* Artist name — Cormorant italic */}
                    <Link
                        href="/"
                        style={{
                            fontFamily: CORMORANT,
                            fontStyle: "italic",
                            fontSize: "1.35rem",
                            fontWeight: 400,
                            color: "#1c1917",
                            letterSpacing: "0.02em",
                            textDecoration: "none",
                        }}
                    >
                        {name}
                    </Link>

                    {/* Desktop nav — IBM Plex Mono small uppercase with · separators */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((l, i) => (
                            <span key={l.href} className="flex items-center">
                                {i > 0 && (
                                    <span
                                        className="mx-3"
                                        style={{
                                            fontFamily: MONO,
                                            fontSize: "0.6rem",
                                            color: "#d4cfc9",
                                        }}
                                    >
                                        ·
                                    </span>
                                )}
                                <Link
                                    href={l.href}
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "#6b7c6d",
                                        textDecoration: "none",
                                        transition: "color 0.2s",
                                    }}
                                    className="hover:text-[#1c1917]"
                                >
                                    {l.label}
                                </Link>
                            </span>
                        ))}
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-1"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className="block w-6 h-px transition-all"
                            style={{
                                backgroundColor: "#1c1917",
                                transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none",
                            }}
                        />
                        <span
                            className="block w-6 h-px transition-all"
                            style={{
                                backgroundColor: "#1c1917",
                                opacity: menuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="block w-6 h-px transition-all"
                            style={{
                                backgroundColor: "#1c1917",
                                transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
                            }}
                        />
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div
                        className="md:hidden border-t border-stone-200 px-6 py-8"
                        style={{ backgroundColor: "#faf8f5" }}
                    >
                        <nav className="flex flex-col gap-6">
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        fontFamily: CORMORANT,
                                        fontStyle: "italic",
                                        fontSize: "2rem",
                                        fontWeight: 300,
                                        color: "#1c1917",
                                        textDecoration: "none",
                                    }}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            {/* ── Main Content ────────────────────────────────────────────── */}
            <main className="flex-1">{children}</main>

            {/* ── Marquee above footer ─────────────────────────────────────── */}
            <MarqueeStrip name={name} />

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <footer
                className="border-t border-stone-200"
                style={{ backgroundColor: "#faf8f5" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Col 1: Artist name + bio snippet */}
                    <div>
                        <p
                            style={{
                                fontFamily: CORMORANT,
                                fontStyle: "italic",
                                fontSize: "1.4rem",
                                fontWeight: 400,
                                color: "#1c1917",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {name}
                        </p>
                        {artist.bio && (
                            <p
                                style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: "0.8rem",
                                    lineHeight: 1.65,
                                    color: "#6b7c6d",
                                    marginTop: "0.5rem",
                                }}
                            >
                                {artist.bio.slice(0, 120)}
                                {artist.bio.length > 120 ? "…" : ""}
                            </p>
                        )}
                        {(artist.city || artist.state) && (
                            <p
                                className="mt-3"
                                style={{
                                    fontFamily: MONO,
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "#9ca3af",
                                }}
                            >
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    {/* Col 2: Nav links */}
                    <div>
                        <p
                            className="mb-5"
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.6rem",
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "#9ca3af",
                            }}
                        >
                            Navigate
                        </p>
                        <nav className="flex flex-col gap-3">
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    style={{
                                        fontFamily: "'Libre Baskerville', serif",
                                        fontSize: "0.85rem",
                                        color: "#1c1917",
                                        textDecoration: "none",
                                    }}
                                    className="hover:text-[#6b7c6d] transition-colors"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Col 3: Social links written out fully */}
                    <div>
                        {socials.length > 0 && (
                            <>
                                <p
                                    className="mb-5"
                                    style={{
                                        fontFamily: MONO,
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: "#9ca3af",
                                    }}
                                >
                                    Follow
                                </p>
                                <div className="flex flex-col gap-2.5 mb-8">
                                    {socials.map((s) => (
                                        <a
                                            key={s.platform}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontFamily: CORMORANT,
                                                fontStyle: "italic",
                                                fontSize: "1rem",
                                                color: "#1c1917",
                                                textDecoration: "none",
                                            }}
                                            className="hover:text-[#6b7c6d] transition-colors"
                                        >
                                            {s.platform}{" "}
                                            <span style={{ color: "#6b7c6d", fontStyle: "normal" }}>
                                                →
                                            </span>{" "}
                                            {s.handle}
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}

                        <p
                            style={{
                                fontFamily: MONO,
                                fontSize: "0.58rem",
                                letterSpacing: "0.1em",
                                color: "#9ca3af",
                            }}
                        >
                            © {new Date().getFullYear()} {name}. Powered by{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-[#6b7c6d]"
                            >
                                ArtsDistrictUSA
                            </a>
                        </p>
                    </div>
                </div>

                <div className="border-t border-stone-100">
                    <div
                        className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between"
                        style={{
                            fontFamily: MONO,
                            fontSize: "0.55rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#c8c3bb",
                        }}
                    >
                        <span>{name} — Chronicle</span>
                        <span>ArtsDistrictUSA</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
