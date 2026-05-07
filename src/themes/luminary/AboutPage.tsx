import Image from "next/image";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function LuminaryAboutPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

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
        <div>
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="border-b-2 border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-3">
                        Artist Profile
                    </p>
                    <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#1a1a1a]">
                        {name}
                    </h1>
                    {location && (
                        <p className="font-sans text-sm tracking-widest uppercase text-neutral-400 mt-4">
                            {location}
                        </p>
                    )}
                </div>
            </div>

            {/* ── Artist Statement Pull Quote ────────────────────────────────── */}
            {artist.artistStatement && (
                <section className="border-b-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-1">
                            <span
                                className="font-serif font-black text-8xl md:text-9xl leading-none text-[#0f2d6b] select-none"
                                aria-hidden="true"
                            >
                                &ldquo;
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-9">
                            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-black leading-[1.2] text-[#1a1a1a] italic mb-6">
                                {artist.artistStatement}
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-0.5 bg-[#0f2d6b]" />
                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-500">
                                    Artist Statement — {name}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Profile: Photo + Bio ──────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                    {/* Large profile photo */}
                    {(artist.bioPhoto ?? artist.profilePhoto) && (
                        <div className="md:col-span-4">
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                                <Image
                                    src={(artist.bioPhoto ?? artist.profilePhoto)!}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Bio text — columnar magazine style */}
                    <div className={`${(artist.bioPhoto ?? artist.profilePhoto) ? "md:col-span-8" : "md:col-span-12"}`}>
                        {artist.bio && (
                            <div className="mb-10">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                                    Biography
                                </p>
                                <div
                                    className="font-sans text-base text-neutral-700 leading-relaxed"
                                    style={{ columnCount: artist.bio.length > 400 ? 2 : 1, columnGap: "2.5rem" }}
                                >
                                    <p className="whitespace-pre-line">{artist.bio}</p>
                                </div>
                            </div>
                        )}

                        {/* Social links */}
                        {socials.length > 0 && (
                            <div className="border-t border-neutral-200 pt-6">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                                    Follow
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                                        >
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Exhibitions — Editorial Timeline ───────────────────────────── */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="border-t-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-10">
                            Exhibitions
                        </p>
                        <div className="space-y-0">
                            {artist.exhibitions.map((ex, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-12 gap-4 py-6 border-b border-neutral-100 group"
                                >
                                    {/* Year — large accent number */}
                                    <div className="col-span-3 md:col-span-2">
                                        <span className="font-serif font-black text-3xl md:text-4xl text-[#0f2d6b] leading-none">
                                            {ex.year}
                                        </span>
                                    </div>
                                    <div className="col-span-9 md:col-span-7 flex flex-col justify-center">
                                        <p className="font-serif font-black text-lg text-[#1a1a1a] leading-tight">
                                            {ex.title}
                                        </p>
                                        {ex.location && (
                                            <p className="font-sans text-sm text-neutral-500 mt-1">
                                                {ex.location}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-12 md:col-span-3 flex md:justify-end items-start pt-0.5">
                                        {ex.type && (
                                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase border border-neutral-300 text-neutral-400 px-2 py-1">
                                                {ex.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Publications — Bibliography Style ─────────────────────────── */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="border-t-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-10">
                            Publications &amp; Press
                        </p>
                        <div className="space-y-0 max-w-3xl">
                            {artist.publications.map((pub, i) => (
                                <div
                                    key={i}
                                    className="flex gap-6 py-5 border-b border-neutral-100"
                                >
                                    <span className="font-serif font-black text-xl text-[#0f2d6b] w-14 shrink-0 pt-0.5">
                                        {pub.year}
                                    </span>
                                    <div>
                                        <p className="font-serif font-black text-base text-[#1a1a1a]">
                                            {pub.title}
                                        </p>
                                        {pub.publication && (
                                            <p className="font-sans text-sm text-neutral-500 italic mt-0.5">
                                                {pub.publication}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Reviews — Editorial Pull Quotes ───────────────────────────── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="border-t-2 border-[#1a1a1a] bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-10">
                            What They&apos;re Saying
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {artist.reviews.map((review, i) => (
                                <div key={i} className="bg-white border-l-2 border-[#0f2d6b] p-6 md:p-8">
                                    <span
                                        className="font-serif font-black text-5xl leading-none text-[#0f2d6b] select-none block mb-3"
                                        aria-hidden="true"
                                    >
                                        &ldquo;
                                    </span>
                                    <blockquote className="font-serif text-lg md:text-xl font-black leading-[1.3] text-[#1a1a1a] italic mb-5">
                                        {review.text}
                                    </blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-0.5 bg-[#0f2d6b]" />
                                        <div>
                                            <p className="font-sans text-xs font-medium text-[#1a1a1a] tracking-wide">
                                                {review.author}
                                            </p>
                                            {review.role && (
                                                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5">
                                                    {review.role}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Gallery Representation ────────────────────────────────────── */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="border-t-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-8">
                            Gallery Representation
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {artist.galleries.map((g, i) => (
                                <div key={i} className="border border-neutral-200 p-5">
                                    {g.photo && (
                                        <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 mb-4">
                                            <Image src={g.photo} alt={g.name} fill className="object-cover" />
                                        </div>
                                    )}
                                    <p className="font-serif font-black text-base text-[#1a1a1a] mb-1">
                                        {(g.link ?? g.url) ? (
                                            <a
                                                href={g.link ?? g.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-[#0f2d6b] transition-colors"
                                            >
                                                {g.name}
                                            </a>
                                        ) : g.name}
                                    </p>
                                    {(g.city || g.state) && (
                                        <p className="font-sans text-xs tracking-widest uppercase text-neutral-400">
                                            {[g.city, g.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Studio Images ────────────────────────────────────────────── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="border-t-2 border-[#1a1a1a]">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-8">
                            Studio
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {artist.studioImages.slice(0, 6).map((imgUrl, i) => (
                                <div key={i} className={`relative overflow-hidden bg-neutral-100 ${i === 0 ? "col-span-2 md:col-span-2 aspect-[16/9]" : "aspect-square"}`}>
                                    <Image src={imgUrl} alt={`${name} studio ${i + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
