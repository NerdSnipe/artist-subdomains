import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import VerifiedBadge from "./VerifiedBadge";
import ScrollReveal from "./ScrollReveal";

export default function ObsidianHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const heroImage = artist.coverPhoto ?? artist.profilePhoto ?? null;
    const featuredWorks = artworks
        .filter((a) => a.status !== "inactive")
        .slice(0, 6);
    const activeWorks = artworks.filter((a) => a.status === "active");
    const gallery = (artist.carouselImages ?? []).filter(Boolean).slice(0, 8);

    return (
        <div className="bg-[#0a0a0a]">
            {/* ── Hero ── */}
            <section className="relative h-screen min-h-[600px] overflow-hidden">
                {heroImage ? (
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt={name}
                            fill
                            className="object-cover obsidian-kenburns"
                            priority
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#161412,_#0a0a0a)]" />
                )}
                {/* Layered dark overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/85" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    {artist.verified && <VerifiedBadge className="mb-8" />}

                    {(artist.city || artist.country) && (
                        <p className="text-[10px] tracking-[0.45em] uppercase text-[#c9a96e]/70 mb-8 font-light">
                            {[artist.city, artist.state, artist.country].filter(Boolean).join(" · ")}
                        </p>
                    )}

                    <h1 className="font-[family-name:var(--font-obsidian-display)] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light tracking-[0.05em] uppercase text-[#f5f0eb] mb-6 leading-[0.95]">
                        {name}
                    </h1>

                    {artist.artistTagline && (
                        <p className="text-sm md:text-base font-light tracking-[0.2em] text-[#c9a96e] max-w-xl mb-12">
                            {artist.artistTagline}
                        </p>
                    )}

                    {!artist.artistTagline && artist.artStyle && (
                        <p className="text-sm font-light tracking-[0.2em] text-[#c9a96e] max-w-xl mb-12 uppercase">
                            {artist.artStyle}
                        </p>
                    )}

                    <Link
                        href={`/artworks`}
                        className="group inline-flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-[#f5f0eb]/70 hover:text-[#c9a96e] transition-colors duration-500 mt-4"
                    >
                        <span className="h-px w-8 bg-[#c9a96e]/50 group-hover:w-16 transition-all duration-500" />
                        View Works
                        <span className="h-px w-8 bg-[#c9a96e]/50 group-hover:w-16 transition-all duration-500" />
                    </Link>
                </div>

                {/* Bottom fade into page */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                <style>{`
                    @keyframes obsidianKenBurns {
                        0% { transform: scale(1) translate3d(0, 0, 0); }
                        100% { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
                    }
                    .obsidian-kenburns {
                        animation: obsidianKenBurns 22s ease-out forwards;
                        will-change: transform;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .obsidian-kenburns { animation: none; }
                    }
                `}</style>
            </section>

            {/* ── Selected Works ── */}
            {featuredWorks.length > 0 && (
                <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
                    <ScrollReveal>
                        <div className="flex items-center gap-6 mb-16">
                            <span className="h-px flex-1 bg-[#c9a96e]/20" />
                            <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                Selected Works
                            </h2>
                            <span className="h-px flex-1 bg-[#c9a96e]/20" />
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
                        {featuredWorks.map((artwork, i) => {
                            const imgUrl = getProductImageUrl(artwork);
                            const isSold = artwork.status === "sold";
                            return (
                                <ScrollReveal key={artwork.id} delayMs={(i % 3) * 120}>
                                    <Link
                                        href={`/artworks/${artwork.slug ?? artwork.id}`}
                                        className="group relative aspect-[4/5] bg-[#111] overflow-hidden block"
                                    >
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[#1a1a1a]" />
                                        )}

                                        {/* Default dark overlay */}
                                        <div className="absolute inset-0 bg-[#0a0a0a]/30 group-hover:bg-[#0a0a0a]/10 transition-colors duration-500" />

                                        {/* Reveal panel on hover */}
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-transparent p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] font-light mb-1">
                                                {artwork.title}
                                            </p>
                                            {!isSold && (
                                                <p className="text-[10px] tracking-[0.15em] text-[#8a8278]">
                                                    ${artwork.price.toLocaleString()}
                                                </p>
                                            )}
                                            {isSold && (
                                                <p className="text-[10px] tracking-[0.25em] uppercase text-[#7a4a3a]">
                                                    Sold
                                                </p>
                                            )}
                                        </div>

                                        {/* Gold border on hover */}
                                        <div className="absolute inset-0 border border-[#c9a96e]/0 group-hover:border-[#c9a96e]/40 transition-colors duration-500" />
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {activeWorks.length > 6 && (
                        <div className="text-center mt-16">
                            <Link
                                href={`/artworks`}
                                className="inline-block text-[10px] tracking-[0.4em] uppercase text-[#8a8278] hover:text-[#c9a96e] transition-colors duration-300 border-b border-[#8a8278]/30 hover:border-[#c9a96e]/50 pb-1"
                            >
                                View Complete Works
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* ── Artist Statement ── */}
            {(artist.artistStatement || artist.bio) && (
                <ScrollReveal>
                    <section className="py-24 border-t border-[#c9a96e]/10">
                        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
                            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]/60 mb-10 font-light">
                                Statement
                            </p>
                            <blockquote className="relative">
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-7xl text-[#c9a96e]/15 font-[family-name:var(--font-obsidian-display)] leading-none select-none">
                                    &ldquo;
                                </span>
                                <p className="font-[family-name:var(--font-obsidian-display)] text-xl md:text-2xl font-light tracking-wide leading-relaxed text-[#d4cfc9] italic">
                                    {artist.artistStatement ?? (artist.bio ? artist.bio.slice(0, 400) + (artist.bio.length > 400 ? "…" : "") : "")}
                                </p>
                            </blockquote>
                            <div className="mt-10">
                                <Link
                                    href={`/about`}
                                    className="text-[10px] tracking-[0.35em] uppercase text-[#6a6460] hover:text-[#c9a96e] transition-colors duration-300"
                                >
                                    About the Artist
                                </Link>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ── Gallery strip (carousel images) ── */}
            {gallery.length > 0 && (
                <ScrollReveal>
                    <section className="py-24 border-t border-[#c9a96e]/10 bg-[#0d0d0d]">
                        <div className="px-6 md:px-12 mb-12 max-w-7xl mx-auto">
                            <div className="flex items-center gap-6">
                                <span className="h-px flex-1 bg-[#c9a96e]/15" />
                                <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                    From the Studio
                                </h2>
                                <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-4 snap-x snap-mandatory">
                            {gallery.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative w-[70vw] sm:w-[38vw] lg:w-[24vw] aspect-[4/5] shrink-0 snap-center bg-[#111] overflow-hidden border border-white/5"
                                >
                                    <Image
                                        src={src}
                                        alt={`${name} gallery image ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ── Published Book (luxury catalog) ── */}
            {artist.book && (
                <ScrollReveal>
                    <section className="py-24 border-t border-[#c9a96e]/10">
                        <div className="max-w-5xl mx-auto px-6 md:px-12">
                            <div className="flex items-center gap-6 mb-16">
                                <span className="h-px flex-1 bg-[#c9a96e]/15" />
                                <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                    The Monograph
                                </h2>
                                <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12">
                                <div className="relative w-40 md:w-56 aspect-[3/4] shrink-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                                    <Image
                                        src={artist.book.imageUrl}
                                        alt={artist.book.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 border border-[#c9a96e]/20" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="font-[family-name:var(--font-obsidian-display)] text-3xl md:text-4xl font-light text-[#f5f0eb] mb-4">
                                        {artist.book.title}
                                    </h3>
                                    <p className="text-sm font-light text-[#8a8278] leading-relaxed mb-6 max-w-lg">
                                        {artist.book.description}
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 mb-8 text-[10px] tracking-[0.2em] uppercase text-[#4a4540]">
                                        {artist.book.publisher && <span>{artist.book.publisher}</span>}
                                        {artist.book.format && <span>{artist.book.format}</span>}
                                        {artist.book.isbn && <span>ISBN {artist.book.isbn}</span>}
                                    </div>
                                    {artist.book.purchaseUrl && (
                                        <a
                                            href={artist.book.purchaseUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-[10px] tracking-[0.4em] uppercase px-8 py-3.5 border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-400"
                                        >
                                            {artist.book.purchaseLabel ?? "Acquire the Monograph"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ── Reviews / They Say ── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <ScrollReveal>
                    <section className="py-24 border-t border-[#c9a96e]/10 bg-[#0d0d0d]">
                        <div className="max-w-5xl mx-auto px-6 md:px-12">
                            <div className="flex items-center gap-6 mb-16">
                                <span className="h-px flex-1 bg-[#c9a96e]/15" />
                                <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-light">
                                    They Say
                                </h2>
                                <span className="h-px flex-1 bg-[#c9a96e]/15" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {artist.reviews.slice(0, 3).map((review, i) => (
                                    <div
                                        key={i}
                                        className="rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6"
                                    >
                                        <p className="text-[#b0a89e] font-light leading-relaxed text-sm mb-6 italic">
                                            &ldquo;{review.text}&rdquo;
                                        </p>
                                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a96e]/70">
                                            {review.author}
                                        </p>
                                        {review.role && (
                                            <p className="text-[9px] tracking-[0.2em] uppercase text-[#4a4540] mt-1">
                                                {review.role}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ── Contact CTA ── */}
            <section className="py-24 border-t border-[#c9a96e]/10 text-center">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e]/50 mb-6 font-light">
                    Acquisitions & Inquiries
                </p>
                <h3 className="font-[family-name:var(--font-obsidian-display)] text-3xl md:text-4xl font-light tracking-[0.05em] uppercase text-[#f5f0eb] mb-8">
                    Collect Original Work
                </h3>
                <Link
                    href={`/contact`}
                    className="inline-block text-[10px] tracking-[0.4em] uppercase px-10 py-4 border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-400"
                >
                    Get in Touch
                </Link>
            </section>
        </div>
    );
}
