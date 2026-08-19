"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Music2 } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { fontVariables } from "./fonts";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/artworks", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function AnthemLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const name = getArtistName(artist);
    const profileUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;
    const isHome = pathname === "/";

    useEffect(() => setMenuOpen(false), [pathname]);

    // On the homepage the nav floats as a translucent dark strip over the top of the hero
    // photo until the user scrolls past it, then it becomes the normal solid cream bar.
    // Interior pages (no full-bleed hero) always use the solid bar.
    useEffect(() => {
        if (!isHome) {
            setScrolled(true);
            return;
        }
        const onScroll = () => setScrolled(window.scrollY > 120);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    const overlay = isHome && !scrolled;

    const socials: { href: string; Icon: typeof Instagram; label: string }[] = [
        artist.instagram ? { href: artist.instagram, Icon: Instagram, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, Icon: Facebook, label: "Facebook" } : null,
        artist.tiktok ? { href: artist.tiktok, Icon: Music2, label: "TikTok" } : null,
    ].filter((s): s is { href: string; Icon: typeof Instagram; label: string } => !!s);

    return (
        <div className={`${fontVariables} min-h-screen flex flex-col bg-[#F7F4EC] text-black font-[family-name:var(--font-body)] antialiased`}>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                    overlay
                        ? "bg-gradient-to-b from-black/75 via-black/35 to-transparent border-b-0"
                        : "bg-[#F7F4EC]/95 backdrop-blur-sm border-b-4 border-black"
                }`}
            >
                <div className="max-w-[1500px] mx-auto px-5 md:px-10 h-[76px] flex items-center justify-between">
                    <Link
                        href="/"
                        className={`font-[family-name:var(--font-display)] uppercase tracking-tight text-2xl md:text-[28px] leading-none transition-colors ${
                            overlay ? "text-white" : "text-black"
                        }`}
                    >
                        {name}
                    </Link>

                    <nav className="hidden md:flex items-center gap-9">
                        {NAV_LINKS.map((l) => {
                            const isActive = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={`text-[13px] font-bold tracking-[0.14em] uppercase pb-1 border-b-2 transition-colors ${
                                        overlay
                                            ? isActive
                                                ? "border-[#FFDC00] text-white"
                                                : "border-transparent text-white/70 hover:text-white hover:border-white/60"
                                            : isActive
                                              ? "border-[#E62828] text-black"
                                              : "border-transparent text-black/60 hover:text-black hover:border-black"
                                    }`}
                                >
                                    {l.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            className={`text-[12px] font-bold tracking-[0.14em] uppercase px-4 py-2 transition-colors ${
                                overlay
                                    ? "bg-[#FFDC00] text-black hover:bg-white"
                                    : "bg-black text-[#FFDC00] hover:bg-[#E62828] hover:text-black"
                            }`}
                        >
                            Commission
                        </Link>
                    </nav>

                    <button
                        type="button"
                        className={overlay ? "text-white md:hidden" : "text-black md:hidden"}
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav
                    className={`md:hidden overflow-hidden border-t-4 border-black bg-[#F7F4EC] transition-[max-height] duration-300 ease-out ${
                        menuOpen ? "max-h-72" : "max-h-0 border-t-0"
                    }`}
                >
                    <div className="px-5 py-6 flex flex-col gap-5">
                        {NAV_LINKS.map((l) => (
                            <Link key={l.href} href={l.href} className="text-sm font-bold tracking-[0.14em] uppercase text-black">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </header>

            <main className={isHome ? "flex-1" : "flex-1 pt-[76px]"}>{children}</main>

            <footer className="border-t-4 border-black bg-black text-[#F7F4EC] mt-24">
                <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    <div>
                        <p className="font-[family-name:var(--font-display)] uppercase text-2xl mb-2">{name}</p>
                        {(artist.city || artist.state) && (
                            <p className="text-[12px] text-[#F7F4EC]/60 tracking-wide uppercase">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
                        {NAV_LINKS.map((l) => (
                            <Link key={l.href} href={l.href} className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#F7F4EC]/70 hover:text-[#FFDC00] transition-colors">
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="md:text-right">
                        {socials.length > 0 && (
                            <div className="flex gap-4 md:justify-end mb-4">
                                {socials.map(({ href, Icon, label }) => (
                                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#F7F4EC]/80 hover:text-[#FFDC00] transition-colors">
                                        <Icon size={18} strokeWidth={1.75} />
                                    </a>
                                ))}
                            </div>
                        )}
                        <p className="text-[11px] text-[#F7F4EC]/60 tracking-wide">
                            © {new Date().getFullYear()}{" "}
                            {profileUrl ? (
                                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFDC00]">
                                    {name}
                                </a>
                            ) : (
                                name
                            )}
                            . All rights reserved.
                        </p>
                        <p className="text-[11px] text-[#F7F4EC]/40 mt-1 tracking-wide">
                            A founding member of the{" "}
                            <a href="https://www.artsdistrictusa.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#FFDC00]">
                                ArtDistrictUSA Marketplace
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
