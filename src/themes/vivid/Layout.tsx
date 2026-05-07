import Link from "next/link";
import type { ThemeLayoutProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function VividLayout({ children, artist }: ThemeLayoutProps) {
    const name = getArtistName(artist);

    const links = [
        { href: `/`, label: "Home" },
        { href: `/artworks`, label: "Works" },
        { href: `/about`, label: "About" },
        { href: `/contact`, label: "Contact" },
    ];

    const socials: { href: string; label: string }[] = [
        artist.instagram ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, label: "Facebook" } : null,
        artist.twitter ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter" } : null,
        artist.linkedin ? { href: artist.linkedin, label: "LinkedIn" } : null,
        artist.tiktok ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok" } : null,
        artist.youtube ? { href: artist.youtube, label: "YouTube" } : null,
        artist.pinterest ? { href: artist.pinterest, label: "Pinterest" } : null,
    ].filter((s): s is { href: string; label: string } => s !== null);

    return (
        <div className="min-h-screen bg-white text-[#111] flex flex-col" style={{ fontFamily: "'Space Mono', monospace" }}>
            {/* Default CSS variable — DynamicColorProvider overrides this client-side */}
            <style>{`
                :root { --accent: #FF4D00; }
                a:hover { transition: color 150ms, background-color 150ms, border-color 150ms; }
                .vivid-accent-hover:hover { color: var(--accent) !important; }
                .vivid-border-hover:hover { border-color: var(--accent) !important; }
            `}</style>

            {/* ── Nav ─────────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                        className="font-bold text-xl md:text-2xl tracking-tight text-[#111] hover:opacity-70 transition-opacity"
                    >
                        {name}
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-xs font-bold tracking-widest uppercase text-[#111] vivid-accent-hover"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile: just show links inline, small */}
                    <nav className="md:hidden flex items-center gap-4">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[10px] font-bold tracking-widest uppercase text-[#111] vivid-accent-hover"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <footer className="bg-[#111] text-white mt-16">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <p
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                            className="text-4xl md:text-5xl font-bold text-white mb-3"
                        >
                            {name}
                        </p>
                        {(artist.city || artist.state) && (
                            <p className="text-xs tracking-widest uppercase text-white/40">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs tracking-widest uppercase text-white/40 mb-4 font-bold">Navigate</p>
                        <nav className="flex flex-col gap-3">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        {socials.length > 0 && (
                            <>
                                <p className="text-xs tracking-widest uppercase text-white/40 mb-4 font-bold">Follow</p>
                                <div className="flex flex-col gap-3 mb-6">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                                        >
                                            {s.label} →
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                        <p className="text-xs text-white/30">
                            &copy; {new Date().getFullYear()} {name}. Powered by{" "}
                            <a
                                href="https://www.artsdistrictusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white transition-colors"
                            >
                                ArtsDistrictUSA
                            </a>
                        </p>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
                        <span className="text-[10px] tracking-widest uppercase text-white/20">
                            {name} — Vivid Theme
                        </span>
                        <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                            Contemporary Art
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
