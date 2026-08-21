"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Music2 } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { fontVariables } from "./fonts";

// Anchors: "In the Studio" and "Representations" point at sections living on the About
// ("Artist Story") page rather than being their own routes.
const BASE_NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/artworks", label: "Portfolio" },
    { href: "/about", label: "Artist Story" },
    { href: "/about#studio", label: "In the Studio" },
    { href: "/about#representations", label: "Representations" },
];
const COMMISSION_LINK = { href: "/contact#commission", label: "Commission" };

const FOOTER_LINKS = [
    { href: "/", label: "Home" },
    { href: "/artworks", label: "Portfolio" },
    { href: "/about", label: "Artist Story" },
    { href: "/contact", label: "Contact" },
];

export default function AnthemNoirLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const name = getArtistName(artist);
    const profileUrl = artist.slug ? marketplaceArtistUrl(artist.slug) : null;
    const isHome = pathname === "/";
    // Never point visitors at a Commission nav item if the artist has said they don't take them.
    const acceptsCommissions = Boolean(artist.acceptsCommissions) && artist.acceptsCommissions !== "no";
    const NAV_LINKS = acceptsCommissions ? [...BASE_NAV_LINKS, COMMISSION_LINK] : BASE_NAV_LINKS;

    useEffect(() => setMenuOpen(false), [pathname]);

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
        <div className={`${fontVariables} min-h-screen flex flex-col bg-[#0C0B09] text-[#E9DFC9] font-[family-name:var(--font-body)] antialiased`}>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                    overlay
                        ? "bg-gradient-to-b from-black/85 via-black/45 to-transparent border-b-0"
                        : "bg-[#0C0B09]/95 backdrop-blur-sm border-b-4 border-[#E9DFC9]"
                }`}
            >
                <div className="max-w-[1600px] mx-auto px-5 md:px-10 h-[88px] flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-[family-name:var(--font-display)] uppercase tracking-wide text-3xl md:text-4xl leading-none text-[#E9DFC9]"
                    >
                        {name}
                    </Link>

                    <nav className="hidden lg:flex items-center gap-7">
                        {NAV_LINKS.map((l) => {
                            const isActive = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href.split("#")[0]) && l.href.split("#")[0] !== "/";
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={`text-[15px] font-bold tracking-[0.1em] uppercase pb-1 border-b-2 transition-colors ${
                                        isActive
                                            ? "border-[#C9A227] text-[#E9DFC9]"
                                            : "border-transparent text-[#E9DFC9]/60 hover:text-[#E9DFC9] hover:border-[#E9DFC9]/60"
                                    }`}
                                >
                                    {l.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            className={`text-[14px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 transition-colors ${
                                overlay
                                    ? "bg-[#C9A227] text-[#0C0B09] hover:bg-[#E9DFC9]"
                                    : "bg-[#E9DFC9] text-[#0C0B09] hover:bg-[#C9A227]"
                            }`}
                        >
                            Contact
                        </Link>
                    </nav>

                    <button
                        type="button"
                        className="text-[#E9DFC9] lg:hidden"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                <nav
                    className={`lg:hidden overflow-hidden border-t-4 border-[#E9DFC9] bg-[#0C0B09] transition-[max-height] duration-300 ease-out ${
                        menuOpen ? "max-h-96" : "max-h-0 border-t-0"
                    }`}
                >
                    <div className="px-5 py-6 flex flex-col gap-5">
                        {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map((l) => (
                            <Link key={l.href} href={l.href} className="text-base font-bold tracking-[0.1em] uppercase text-[#E9DFC9]">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </header>

            <main className={isHome ? "flex-1" : "flex-1 pt-[88px]"}>{children}</main>

            <footer className="border-t-4 border-[#E9DFC9] bg-[#E9DFC9] text-[#0C0B09] mt-24">
                <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    <div>
                        <p className="font-[family-name:var(--font-display)] uppercase text-2xl mb-2">{name}</p>
                        {(artist.city || artist.state) && (
                            <p className="text-[12px] text-[#0C0B09]/60 tracking-wide uppercase">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
                        {FOOTER_LINKS.map((l) => (
                            <Link key={l.href} href={l.href} className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0C0B09]/70 hover:text-[#C9A227] transition-colors">
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="md:text-right">
                        {socials.length > 0 && (
                            <div className="flex gap-4 md:justify-end mb-4">
                                {socials.map(({ href, Icon, label }) => (
                                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-[#0C0B09]/80 hover:text-[#C9A227] transition-colors">
                                        <Icon size={18} strokeWidth={1.75} />
                                    </a>
                                ))}
                            </div>
                        )}
                        <p className="text-[11px] text-[#0C0B09]/60 tracking-wide">
                            © {new Date().getFullYear()}{" "}
                            {profileUrl ? (
                                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227]">
                                    {name}
                                </a>
                            ) : (
                                name
                            )}
                            . All rights reserved.
                        </p>
                        <p className="text-[11px] text-[#0C0B09]/40 mt-1 tracking-wide">
                            A founding member of the{" "}
                            <a href="https://www.artsdistrictusa.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#C9A227]">
                                ArtDistrictUSA Marketplace
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
