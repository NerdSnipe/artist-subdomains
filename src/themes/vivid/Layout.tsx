"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Music2, ArrowUpRight, Menu, X } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { fontVariables } from "./fonts";
import Marquee from "./Marquee";

export default function VividLayout({ children, artist }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const name = getArtistName(artist);
    const profileUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const links = [
        { href: "/", label: "Home" },
        { href: "/artworks", label: "Works" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    const socials = [
        { Icon: Instagram, href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : null, label: "Instagram" },
        { Icon: Facebook, href: artist.facebook ?? null, label: "Facebook" },
        { Icon: Twitter, href: artist.twitter ? `https://twitter.com/${artist.twitter.replace("@", "")}` : null, label: "X / Twitter" },
        { Icon: Linkedin, href: artist.linkedin ?? null, label: "LinkedIn" },
        { Icon: Music2, href: artist.tiktok ? `https://tiktok.com/@${artist.tiktok.replace("@", "")}` : null, label: "TikTok" },
        { Icon: Youtube, href: artist.youtube ?? null, label: "YouTube" },
    ].filter((s): s is { Icon: typeof Instagram; href: string; label: string } => !!s.href);

    const tickerItems = [
        artist.artStyle,
        artist.medium,
        artist.secondaryMedium,
        artist.acceptsCommissions && artist.acceptsCommissions !== "no" ? "Commissions Open" : null,
        [artist.city, artist.state].filter(Boolean).join(", ") || null,
        artist.verified ? "Verified Artist" : null,
    ].filter((v): v is string => !!v);

    return (
        <div
            className={`${fontVariables} min-h-screen flex flex-col antialiased`}
            style={{ backgroundColor: "var(--v-ink)", color: "var(--v-paper)", fontFamily: "var(--font-body)" }}
        >
            {/* Scoped default palette (pre-JS) + base tokens + grain texture */}
            <style>{`
                :root {
                    --v-ink: #08080b;
                    --v-ink-soft: #101014;
                    --v-paper: #f6f4ef;
                    --v-primary: #ff2f92;
                    --v-secondary: #7c5cff;
                    --v-tint: #ffe1f1;
                    --v-primary-rgb: 255, 47, 146;
                    --v-secondary-rgb: 124, 92, 255;
                    --v-on-primary: #0a0a0d;
                    --v-on-secondary: #ffffff;
                    --v-glow: rgba(255, 47, 146, 0.45);
                    --v-glow-soft: rgba(124, 92, 255, 0.35);
                }
                .vivid-grain {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 60;
                    opacity: 0.05;
                    mix-blend-mode: overlay;
                    background-image: radial-gradient(rgba(255,255,255,0.9) 0.6px, transparent 0.6px);
                    background-size: 3px 3px;
                }
                .vivid-underline {
                    position: relative;
                }
                .vivid-underline::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: -4px;
                    height: 2px;
                    width: 0%;
                    background: linear-gradient(90deg, var(--v-primary), var(--v-secondary));
                    transition: width 300ms cubic-bezier(0.16, 1, 0.3, 1);
                }
                .vivid-underline:hover::after,
                .vivid-underline[data-active="true"]::after {
                    width: 100%;
                }
                .vivid-btn-primary {
                    background: var(--v-primary);
                    color: var(--v-on-primary);
                    transition: background-color 400ms ease, transform 200ms ease, box-shadow 400ms ease;
                    box-shadow: 0 10px 30px -10px var(--v-glow);
                }
                .vivid-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 16px 40px -8px var(--v-glow);
                }
            `}</style>
            <div className="vivid-grain" />

            {/* ── Header ─────────────────────────────────────────────────── */}
            <header
                className="sticky top-0 z-50 border-b backdrop-blur-md"
                style={{ backgroundColor: "rgba(8,8,11,0.82)", borderColor: "rgba(255,255,255,0.08)" }}
            >
                <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between">
                    <Link
                        href="/"
                        className="leading-none tracking-tight uppercase"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: "var(--v-paper)" }}
                    >
                        {name}
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                data-active={pathname === l.href}
                                className="vivid-underline text-xs font-bold tracking-[0.18em] uppercase"
                                style={{ color: pathname === l.href ? "var(--v-paper)" : "rgba(246,244,239,0.65)" }}
                            >
                                {l.label}
                            </Link>
                        ))}
                        <a
                            href="https://www.artsdistrictusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest vivid-btn-primary"
                        >
                            Marketplace
                            <ArrowUpRight size={13} strokeWidth={2.5} />
                        </a>
                    </nav>

                    <button
                        className="md:hidden p-2 -mr-2"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={26} color="var(--v-paper)" /> : <Menu size={26} color="var(--v-paper)" />}
                    </button>
                </div>
            </header>

            {/* Mobile full-screen menu */}
            {menuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 flex flex-col justify-center px-8"
                    style={{ backgroundColor: "var(--v-ink)" }}
                >
                    <nav className="flex flex-col gap-1">
                        {links.map((l, i) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setMenuOpen(false)}
                                className="py-3 border-b uppercase leading-[1.05] transition-transform duration-200 hover:translate-x-2"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: "2.6rem",
                                    borderColor: "rgba(255,255,255,0.08)",
                                    color: i % 2 === 0 ? "var(--v-primary)" : "var(--v-paper)",
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                    {socials.length > 0 && (
                        <div className="flex gap-5 mt-10">
                            {socials.map(({ Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--v-paper)" }} aria-label={label}>
                                    <Icon size={22} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <main className="flex-1">{children}</main>

            {/* ── Footer ─────────────────────────────────────────────────── */}
            <footer className="mt-24" style={{ backgroundColor: "var(--v-ink-soft)" }}>
                {tickerItems.length > 0 && <Marquee items={tickerItems} />}

                <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <p
                                className="uppercase leading-[0.95] mb-4"
                                style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.2rem", color: "var(--v-paper)" }}
                            >
                                {name}
                            </p>
                            {artist.artistTagline && (
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.55)" }}>
                                    {artist.artistTagline}
                                </p>
                            )}
                            {socials.length > 0 && (
                                <div className="flex gap-4 mt-6">
                                    {socials.map(({ Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="transition-colors duration-200"
                                            style={{ color: "rgba(246,244,239,0.55)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v-primary)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.55)")}
                                        >
                                            <Icon size={19} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-xs uppercase font-bold tracking-[0.18em] mb-5" style={{ color: "var(--v-primary)" }}>
                                Navigate
                            </p>
                            <div className="flex flex-col gap-3">
                                {links.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="text-sm transition-colors duration-200"
                                        style={{ color: "rgba(246,244,239,0.65)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v-paper)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.65)")}
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase font-bold tracking-[0.18em] mb-5" style={{ color: "var(--v-primary)" }}>
                                Connect
                            </p>
                            <div className="flex flex-col gap-3">
                                {artist.email && (
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="text-sm transition-colors duration-200 break-all"
                                        style={{ color: "rgba(246,244,239,0.65)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v-paper)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.65)")}
                                    >
                                        {artist.email}
                                    </a>
                                )}
                                {(artist.city || artist.state) && (
                                    <p className="text-sm" style={{ color: "rgba(246,244,239,0.65)" }}>
                                        {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                                {artist.slug && (
                                    <a
                                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs mt-1 transition-colors duration-200"
                                        style={{ color: "rgba(246,244,239,0.4)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v-paper)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.4)")}
                                    >
                                        ArtsDistrictUSA Profile ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-12 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                        <p className="text-xs" style={{ color: "rgba(246,244,239,0.35)" }}>
                            &copy; {new Date().getFullYear()}{" "}
                            {profileUrl ? (
                                <a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(246,244,239,0.35)" }}>
                                    {name}
                                </a>
                            ) : (
                                name
                            )}. All rights reserved.
                        </p>
                        <span className="text-xs" style={{ color: "rgba(246,244,239,0.35)" }}>
                            A member of the{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200"
                                style={{ color: "rgba(246,244,239,0.35)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--v-paper)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.35)")}
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
