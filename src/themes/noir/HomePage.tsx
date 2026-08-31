import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import HeroCarousel from "./HeroCarousel";

export default function NoirHomePage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const carouselArtworks = artworks.filter((a) => a.status === "active").slice(0, 8);
    const featuredWorks = artworks.filter((a) => a.status !== "inactive").slice(0, 6);

    return (
        <div className="bg-[#0d0d0d]">
            {/* ── Hero Carousel ── */}
            <HeroCarousel artworks={carouselArtworks} artist={artist} />

            {/* ── Selected Works ── */}
            {featuredWorks.length > 0 && (
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex items-center gap-6 mb-14">
                        <span
                            className="h-px flex-1"
                            style={{ background: "linear-gradient(to right, transparent, #a8884a40)" }}
                        />
                        <h2
                            className="text-[9px] tracking-[0.6em] uppercase text-[#a8884a]"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Selected Works
                        </h2>
                        <span
                            className="h-px flex-1"
                            style={{ background: "linear-gradient(to left, transparent, #a8884a40)" }}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
                        {featuredWorks.map((artwork, idx) => {
                            const imgUrl = getProductImageUrl(artwork);
                            const isSold = artwork.status === "sold";
                            // Alternate: odd cards taller for masonry feel
                            const tall = idx % 3 === 1;
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group relative overflow-hidden block bg-[#111]"
                                    style={{ aspectRatio: tall ? "3/4" : "4/5" }}
                                >
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={artwork.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#1a1a1a]" />
                                    )}

                                    {/* Default vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/70 via-transparent to-transparent" />

                                    {/* Spotlight on hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: "radial-gradient(ellipse at center, rgba(168,136,74,0.08) 0%, rgba(0,0,0,0.3) 100%)",
                                        }}
                                    />

                                    {/* Slide-up title overlay */}
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0d0d0d]/96 via-[#0d0d0d]/60 to-transparent p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <p
                                            className="text-sm tracking-[0.15em] text-[#e8e8e8] mb-1 italic"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {artwork.title}
                                        </p>
                                        {!isSold && (
                                            <p
                                                className="text-[9px] tracking-[0.3em] uppercase text-[#a8884a]"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                ${artwork.price.toLocaleString()}
                                            </p>
                                        )}
                                        {isSold && (
                                            <p
                                                className="text-[9px] tracking-[0.3em] uppercase text-[#8b0000]/80"
                                                style={{ fontFamily: "'Courier New', monospace" }}
                                            >
                                                Acquired
                                            </p>
                                        )}
                                    </div>

                                    {/* Gold border reveal */}
                                    <div className="absolute inset-0 border border-[#a8884a]/0 group-hover:border-[#a8884a]/30 transition-colors duration-500" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/artworks"
                            className="inline-block text-[9px] tracking-[0.5em] uppercase text-[#6a6a6a] hover:text-[#a8884a] transition-colors duration-300 border-b border-[#6a6a6a]/30 hover:border-[#a8884a]/50 pb-1"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            View Complete Works
                        </Link>
                    </div>
                </section>
            )}

            {/* ── Artist Statement ── */}
            {(artist.artistStatement || artist.bio) && (
                <section className="py-24 border-t border-[#a8884a]/15 bg-[#0a0a0a] relative overflow-hidden">
                    {/* Grain */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            opacity: 0.04,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "180px 180px",
                        }}
                    />
                    <div className="max-w-2xl mx-auto px-6 md:px-12 text-center relative z-10">
                        {/* Gold rule above */}
                        <div className="h-px w-16 bg-[#a8884a]/60 mx-auto mb-8" />
                        <p
                            className="text-[9px] tracking-[0.6em] uppercase text-[#a8884a]/70 mb-8"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Artist Statement
                        </p>
                        <blockquote
                            className="text-xl md:text-2xl font-light italic leading-relaxed text-[#c8c8c8]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            &ldquo;{artist.artistStatement ?? (artist.bio ? artist.bio.slice(0, 350) + (artist.bio.length > 350 ? "…" : "") : "")}&rdquo;
                        </blockquote>
                        {/* Gold rule below */}
                        <div className="h-px w-16 bg-[#a8884a]/60 mx-auto mt-8 mb-6" />
                        <Link
                            href="/about"
                            className="text-[9px] tracking-[0.4em] uppercase text-[#5a5a5a] hover:text-[#a8884a] transition-colors duration-300"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            About the Artist
                        </Link>
                    </div>
                </section>
            )}

            {/* ── Studio Strip (marquee) ── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="py-16 border-t border-[#a8884a]/10 overflow-hidden">
                    <p
                        className="text-center text-[9px] tracking-[0.6em] uppercase text-[#4a4a4a] mb-8"
                        style={{ fontFamily: "'Courier New', monospace" }}
                    >
                        Studio
                    </p>
                    <div className="flex" style={{ animation: "marquee 28s linear infinite" }}>
                        {[...artist.studioImages, ...artist.studioImages].map((imgUrl, i) => (
                            <div key={i} className="relative flex-shrink-0 w-64 h-40 mx-2 overflow-hidden">
                                <Image
                                    src={imgUrl}
                                    alt={`Studio ${i + 1}`}
                                    fill
                                    sizes="256px"
                                    className="object-cover opacity-50 hover:opacity-80 transition-opacity duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Reviews ── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="py-24 border-t border-[#a8884a]/15 bg-[#0a0a0a]">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-6 mb-16">
                            <span className="h-px flex-1 bg-[#a8884a]/10" />
                            <h2
                                className="text-[9px] tracking-[0.5em] uppercase text-[#a8884a]"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                They Say
                            </h2>
                            <span className="h-px flex-1 bg-[#a8884a]/10" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {artist.reviews.slice(0, 3).map((review, i) => (
                                <div
                                    key={i}
                                    className="border-l-2 border-[#8b0000]/60 pl-6 py-2 bg-[#111]/50"
                                >
                                    <p
                                        className="text-[#c0c0c0] italic leading-relaxed text-sm mb-5 font-light"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <p
                                        className="text-[9px] tracking-[0.3em] uppercase text-[#a8884a]/80"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        — {review.author}
                                    </p>
                                    {review.role && (
                                        <p
                                            className="text-[8px] tracking-[0.2em] uppercase text-[#4a4a4a] mt-1"
                                            style={{ fontFamily: "'Courier New', monospace" }}
                                        >
                                            {review.role}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="py-24 border-t border-[#a8884a]/15 text-center">
                <p
                    className="text-[9px] tracking-[0.5em] uppercase text-[#a8884a]/50 mb-4"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    Acquisitions &amp; Inquiries
                </p>
                <h3
                    className="text-3xl md:text-4xl font-thin tracking-[0.2em] uppercase text-[#e8e8e8] mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {name}
                </h3>
                <Link
                    href="/contact"
                    className="inline-block px-10 py-4 border border-[#a8884a]/50 text-[9px] tracking-[0.5em] uppercase text-[#a8884a] hover:bg-[#a8884a]/10 hover:border-[#a8884a] transition-all duration-400"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    Get in Touch
                </Link>
            </section>
        </div>
    );
}
