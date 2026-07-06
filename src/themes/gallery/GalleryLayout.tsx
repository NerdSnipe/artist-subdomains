"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Youtube, Globe } from "lucide-react";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import { galleryFontVariables } from "./fonts";
import { VerifiedBadge } from "./ui";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/artworks", label: "Collection" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function GalleryLayout({ children, artist, domain }: ThemeLayoutProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const name = getArtistName(artist);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const socials: { href: string; Icon: typeof Instagram }[] = [
        artist.instagram
            ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, Icon: Instagram }
            : null,
        artist.facebook ? { href: artist.facebook, Icon: Facebook } : null,
        artist.youtube ? { href: artist.youtube, Icon: Youtube } : null,
        artist.website ? { href: artist.website, Icon: Globe } : null,
    ].filter((s): s is { href: string; Icon: typeof Instagram } => !!s);

    return (
        <div
            className={`${galleryFontVariables} min-h-screen flex flex-col bg-[#F8F5EF] text-[#1B1812] font-[family-name:var(--font-sans)] antialiased`}
        >
            <header className="sticky top-0 z-50 bg-[#F8F5EF]/95 backdrop-blur-sm border-b border-[#E3DCCE]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-[family-name:var(--font-display)] text-xl md:text-[22px] italic tracking-tight text-[#1B1812]"
                    >
                        {name}
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        {NAV_LINKS.map((l) => {
                            const isActive = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
                            return (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={`relative text-[11px] tracking-[0.22em] uppercase pb-1 transition-colors ${
                                        isActive ? "text-[#1B1812]" : "text-[#8C8478] hover:text-[#1B1812]"
                                    }`}
                                >
                                    {l.label}
                                    <span
                                        className={`absolute left-0 -bottom-0.5 h-px bg-[#1B1812] transition-all duration-300 ${
                                            isActive ? "w-full" : "w-0"
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        type="button"
                        className="md:hidden text-[#1B1812]"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </button>
                </div>

                <nav
                    className={`md:hidden overflow-hidden border-t border-[#E3DCCE] bg-[#F8F5EF] transition-[max-height] duration-300 ease-out ${
                        menuOpen ? "max-h-64" : "max-h-0 border-t-0"
                    }`}
                >
                    <div className="px-6 py-5 flex flex-col gap-5">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[13px] tracking-[0.2em] uppercase text-[#57514A]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-[#E3DCCE] mt-24">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div>
                        <p className="font-[family-name:var(--font-display)] italic text-lg text-[#1B1812] mb-2">
                            {name}
                        </p>
                        {artist.verified && <VerifiedBadge />}
                        {(artist.city || artist.state) && (
                            <p className="text-[12px] text-[#8C8478] mt-2 tracking-wide">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[11px] tracking-[0.2em] uppercase text-[#8C8478] hover:text-[#1B1812] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="md:text-right">
                        {socials.length > 0 && (
                            <div className="flex gap-4 md:justify-end mb-4">
                                {socials.map(({ href, Icon }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#8C8478] hover:text-[#1B1812] transition-colors"
                                        aria-label="Social link"
                                    >
                                        <Icon size={16} strokeWidth={1.5} />
                                    </a>
                                ))}
                            </div>
                        )}
                        <p className="text-[11px] text-[#8C8478] tracking-wide">
                            © {new Date().getFullYear()} {name}. All rights reserved.
                        </p>
                        <p className="text-[11px] text-[#B8AF9E] mt-1 tracking-wide">
                            Site by{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-[#E3DCCE] underline-offset-2 hover:text-[#8C8478]"
                            >
                                ArtsDistrictUSA
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
