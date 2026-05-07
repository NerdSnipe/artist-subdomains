import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function EmberHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const featured = artworks.filter((a) => a.status === "active").slice(0, 6);
    const coverImg = artist.coverPhoto ?? artist.profilePhoto ?? null;

    return (
        <div style={{ backgroundColor: "#f7f3ee", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative" style={{ minHeight: "88vh" }}>
                {/* Cover image — right ~70% of viewport */}
                <div className="absolute inset-0 md:left-[28%] overflow-hidden">
                    {coverImg ? (
                        <Image
                            src={coverImg}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 72vw"
                        />
                    ) : (
                        <div className="w-full h-full" style={{ backgroundColor: "#d9cfc5" }} />
                    )}
                    {/* Gradient fade on left side so text reads cleanly */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to right, #f7f3ee 0%, #f7f3ee 18%, rgba(247,243,238,0.6) 45%, transparent 70%)",
                        }}
                    />
                    {/* Gradient fade at bottom */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-40"
                        style={{ background: "linear-gradient(to top, #f7f3ee, transparent)" }}
                    />
                </div>

                {/* Artist name — lower-left, overlapping into the image */}
                <div className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 pb-16 md:pb-24" style={{ minHeight: "88vh" }}>
                    <div className="max-w-xl">
                        {(artist.city || artist.state) && (
                            <p
                                className="text-xs tracking-widest uppercase mb-4"
                                style={{ color: "#b5451b", letterSpacing: "0.14em" }}
                            >
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                        <h1
                            className="font-serif leading-tight mb-4"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#2c2925" }}
                        >
                            {name}
                        </h1>
                        {artist.artistTagline && (
                            <p
                                className="text-lg italic leading-relaxed mb-8"
                                style={{ color: "#6b5f52", maxWidth: "36rem" }}
                            >
                                {artist.artistTagline}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/${domain}/artworks`}
                                className="inline-block px-8 py-3 text-sm font-serif tracking-wide transition-all duration-300"
                                style={{ backgroundColor: "#b5451b", color: "#f7f3ee" }}
                            >
                                View Works
                            </Link>
                            <Link
                                href={`/${domain}/about`}
                                className="inline-block px-8 py-3 text-sm font-serif tracking-wide border transition-all duration-300 hover:opacity-70"
                                style={{ borderColor: "#2c2925", color: "#2c2925" }}
                            >
                                The Artist
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Featured Works ───────────────────────────────────────── */}
            {featured.length > 0 && (
                <section className="max-w-6xl mx-auto px-8 py-24">
                    {/* Section header with warm divider */}
                    <div className="flex items-center gap-6 mb-14">
                        <h2 className="font-serif text-3xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                            Selected Works
                        </h2>
                        <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featured.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <Link
                                    key={artwork.id}
                                    href={`/${domain}/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group block"
                                >
                                    {/* Matted card */}
                                    <div
                                        className="relative overflow-hidden transition-all duration-300 group-hover:shadow-lg mb-4"
                                        style={{
                                            backgroundColor: "#ede8e1",
                                            padding: "1rem",
                                            boxShadow: "0 1px 4px rgba(44,41,37,0.08)",
                                        }}
                                    >
                                        <div className="relative aspect-[4/5]" style={{ backgroundColor: "#d9cfc5" }}>
                                            {img ? (
                                                <Image
                                                    src={img}
                                                    alt={artwork.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full" style={{ backgroundColor: "#d9cfc5" }} />
                                            )}
                                            {artwork.status === "sold" && (
                                                <div
                                                    className="absolute top-3 left-3 px-2.5 py-1 text-xs tracking-widest"
                                                    style={{ backgroundColor: "#b5451b", color: "#f7f3ee", letterSpacing: "0.1em" }}
                                                >
                                                    Sold
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="font-serif text-base mb-1" style={{ color: "#2c2925" }}>{artwork.title}</p>
                                    {artwork.medium && (
                                        <p className="text-xs mb-1" style={{ color: "#8a7a6e" }}>{artwork.medium}</p>
                                    )}
                                    <p className="text-sm" style={{ color: "#b5451b" }}>
                                        ${artwork.price.toLocaleString()}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>

                    {artworks.filter((a) => a.status === "active").length > 6 && (
                        <div className="mt-14 text-center">
                            <Link
                                href={`/${domain}/artworks`}
                                className="inline-block text-sm font-serif border-b pb-0.5 transition-all duration-200 hover:opacity-60"
                                style={{ color: "#b5451b", borderColor: "#b5451b" }}
                            >
                                The full collection &rarr;
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* ── Artist Statement ─────────────────────────────────────── */}
            {artist.artistStatement && (
                <section className="py-20" style={{ backgroundColor: "#ede8e1" }}>
                    <div className="max-w-3xl mx-auto px-8">
                        <blockquote
                            className="border-l-4 pl-8 py-2"
                            style={{ borderColor: "#b5451b" }}
                        >
                            <p
                                className="font-serif text-xl leading-loose italic mb-6"
                                style={{ color: "#2c2925" }}
                            >
                                &ldquo;{artist.artistStatement}&rdquo;
                            </p>
                            <cite className="text-sm not-italic" style={{ color: "#8a7a6e" }}>
                                &mdash; {name}
                            </cite>
                        </blockquote>
                    </div>
                </section>
            )}

            {/* ── From the Studio ──────────────────────────────────────── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="max-w-6xl mx-auto px-8 py-24">
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                            From the Studio
                        </h2>
                        <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {artist.studioImages.slice(0, 3).map((img, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#d9cfc5" }}>
                                <Image
                                    src={img}
                                    alt={`Studio image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Reviews ──────────────────────────────────────────────── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="py-20" style={{ backgroundColor: "#ede8e1" }}>
                    <div className="max-w-5xl mx-auto px-8">
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="font-serif text-2xl whitespace-nowrap" style={{ color: "#2c2925" }}>
                                Collector Voices
                            </h2>
                            <div className="flex-1 h-px" style={{ backgroundColor: "#d4a5a5", opacity: 0.6 }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {artist.reviews.slice(0, 4).map((review, i) => (
                                <div
                                    key={i}
                                    className="p-8"
                                    style={{
                                        backgroundColor: "#f7f3ee",
                                        boxShadow: "0 1px 4px rgba(44,41,37,0.06)",
                                    }}
                                >
                                    <p
                                        className="font-serif text-base leading-loose italic mb-6"
                                        style={{ color: "#2c2925" }}
                                    >
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <div>
                                        <p className="text-sm font-serif" style={{ color: "#2c2925" }}>{review.author}</p>
                                        {review.role && (
                                            <p className="text-xs mt-0.5" style={{ color: "#a0907f" }}>{review.role}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Bio Teaser ───────────────────────────────────────────── */}
            {artist.bio && !artist.artistStatement && (
                <section className="py-20" style={{ backgroundColor: "#ede8e1" }}>
                    <div className="max-w-2xl mx-auto px-8 text-center">
                        <p
                            className="font-serif text-lg leading-loose italic mb-8"
                            style={{ color: "#2c2925" }}
                        >
                            &ldquo;{artist.bio.slice(0, 300)}{artist.bio.length > 300 ? "…" : ""}&rdquo;
                        </p>
                        <Link
                            href={`/${domain}/about`}
                            className="inline-block text-sm border-b pb-0.5 transition-all duration-200 hover:opacity-60"
                            style={{ color: "#b5451b", borderColor: "#b5451b" }}
                        >
                            More about {name} &rarr;
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
}
