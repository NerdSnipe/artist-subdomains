"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { displayFont, bodyFont } from "./fonts";
import GlowBlob from "./GlowBlob";

export default function LuminaryLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const name = getArtistName(artist);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const links = [
        { href: `/`, label: "Home" },
        { href: `/artworks`, label: "Gallery" },
        { href: `/about`, label: "About" },
        { href: `/contact`, label: "Contact" },
    ];

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div
            className={`luminary-root ${displayFont.variable} ${bodyFont.variable} relative flex min-h-screen flex-col overflow-x-clip bg-[#fffcfa] text-[#3a3240] font-sans antialiased`}
        >
            {/* Scoped font remap — keeps existing font-serif / font-sans utilities but
                points them at this theme's own type system without touching globals.css */}
            <style>{`
                .luminary-root.font-sans, .luminary-root .font-sans { font-family: var(--luminary-font-body), ui-sans-serif, system-ui, sans-serif; }
                .luminary-root .font-serif { font-family: var(--luminary-font-display), ui-serif, Georgia, serif; }
                @keyframes luminary-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(2%, -3%) scale(1.05); }
                }
                .luminary-drift { animation: luminary-drift 22s ease-in-out infinite; }
                .luminary-drift-slow { animation: luminary-drift 30s ease-in-out infinite reverse; }
            `}</style>

            {/* Ambient background halos, fixed so they gently persist across scroll */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <GlowBlob className="luminary-drift -top-32 -left-24 h-[26rem] w-[26rem]" colors={["#fbd7ea", "#f6e6ff"]} opacity={0.5} />
                <GlowBlob className="luminary-drift-slow top-1/3 -right-32 h-[28rem] w-[28rem]" colors={["#d7e6ff", "#e6f7f1"]} opacity={0.45} />
                <GlowBlob className="luminary-drift bottom-0 left-1/4 h-[24rem] w-[24rem]" colors={["#fff0da", "#fde3ef"]} opacity={0.4} />
            </div>

            {/* Header */}
            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled ? "bg-white/70 shadow-[0_1px_0_0_rgba(58,50,64,0.06)] backdrop-blur-xl" : "bg-transparent"
                }`}
            >
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
                    <Link href="/" className="font-serif text-2xl italic tracking-tight text-[#3a3240] transition-colors hover:text-[#a9769f]">
                        {name}
                    </Link>

                    <nav className="hidden items-center gap-10 md:flex">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-[#6b6470] transition-colors hover:text-[#a9769f]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`block h-px w-6 bg-[#3a3240] transition-all duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
                        <span className={`block h-px w-6 bg-[#3a3240] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile menu */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-out md:hidden ${
                        menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="flex flex-col gap-1 border-t border-[#3a3240]/10 bg-white/90 px-6 py-6 backdrop-blur-xl">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="py-2.5 font-serif text-2xl italic text-[#3a3240] transition-colors hover:text-[#a9769f]"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="relative mt-32 border-t border-[#3a3240]/10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3 md:px-10">
                    <div>
                        <p className="font-serif text-2xl italic text-[#3a3240]">{name}</p>
                        {artist.artistTagline && (
                            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-[#7a7280]">{artist.artistTagline}</p>
                        )}
                        {(artist.city || artist.state) && (
                            <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#a9769f]">
                                {[artist.city, artist.state, artist.country].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#3a3240]/40">Explore</p>
                        <nav className="flex flex-col gap-2.5">
                            {links.map((l) => (
                                <Link key={l.href} href={l.href} className="font-sans text-sm text-[#6b6470] transition-colors hover:text-[#a9769f]">
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        {socials.length > 0 && (
                            <>
                                <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#3a3240]/40">Follow Along</p>
                                <div className="flex flex-col gap-2.5">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-sans text-sm text-[#6b6470] transition-colors hover:text-[#a9769f]"
                                        >
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="border-t border-[#3a3240]/10">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-center md:flex-row md:px-10 md:text-left">
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#3a3240]/35">
                            &copy; {new Date().getFullYear()} {name}
                        </span>
                        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#3a3240]/35">
                            Site by{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-[#e3c9dd] underline-offset-4 transition-colors hover:text-[#a9769f]"
                            >
                                ArtsDistrictUSA
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
