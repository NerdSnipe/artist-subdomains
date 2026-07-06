import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import GlowBlob from "./GlowBlob";
import Reveal from "./Reveal";
import { Kicker, PillButton } from "./ui";

export default function LuminaryAboutPage({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");
    const photo = artist.bioPhoto ?? artist.profilePhoto;

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
            {/* ── Header + Portrait ────────────────────────────────────────── */}
            <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
                <GlowBlob className="-top-20 left-0 h-96 w-96" colors={["#fbe3f2", "#e3ecff"]} opacity={0.5} />
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-10">
                    <Reveal className="md:col-span-7 lg:col-span-6">
                        <Kicker>Artist Profile</Kicker>
                        <h1 className="mt-5 font-serif text-5xl italic leading-[1.05] text-[#3a3240] sm:text-6xl md:text-7xl">
                            {name}
                        </h1>
                        {location && (
                            <p className="mt-5 font-sans text-xs uppercase tracking-[0.22em] text-[#a9769f]">{location}</p>
                        )}
                        {artist.artistTagline && (
                            <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-[#6b6470]">
                                {artist.artistTagline}
                            </p>
                        )}
                        {socials.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
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
                        )}
                    </Reveal>

                    {photo && (
                        <Reveal className="relative md:col-span-5 lg:col-span-6" delay={150}>
                            <div className="relative mx-auto max-w-sm md:max-w-none">
                                <GlowBlob className="-inset-8 -z-10" colors={["#f6e3fb", "#d7e6ff"]} opacity={0.55} />
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-3 shadow-[0_30px_60px_-15px_rgba(58,50,64,0.22)]">
                                    <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                        <Image src={photo} alt={name} fill className="object-cover" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* ── Artist Statement ─────────────────────────────────────────── */}
            {artist.artistStatement && (
                <section className="relative py-4 md:py-8">
                    <Reveal className="mx-auto max-w-3xl px-6 text-center md:px-10">
                        <span aria-hidden="true" className="font-serif text-6xl italic text-[#d9b9d1]">
                            &ldquo;
                        </span>
                        <blockquote className="-mt-4 font-serif text-2xl italic leading-relaxed text-[#3a3240] sm:text-3xl">
                            {artist.artistStatement}
                        </blockquote>
                    </Reveal>
                </section>
            )}

            {/* ── Biography ────────────────────────────────────────────────── */}
            {artist.bio && (
                <section className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal>
                        <Kicker>Biography</Kicker>
                        <p className="mt-6 whitespace-pre-line font-sans text-[16px] leading-[1.9] text-[#4d4650]">
                            {artist.bio}
                        </p>
                    </Reveal>
                </section>
            )}

            {/* ── Studio Process ───────────────────────────────────────────── */}
            {artist.studioProcessDescription && (
                <section className="relative overflow-hidden py-16 md:py-24">
                    <GlowBlob className="right-0 top-1/2 h-80 w-80 -translate-y-1/2" colors={["#fdeadb", "#f6e3fb"]} opacity={0.4} />
                    <Reveal className="relative mx-auto max-w-3xl px-6 md:px-10">
                        <Kicker>{artist.studioSubtitle ?? "In the Studio"}</Kicker>
                        <p className="mt-6 whitespace-pre-line font-sans text-[16px] leading-[1.9] text-[#4d4650]">
                            {artist.studioProcessDescription}
                        </p>
                    </Reveal>
                </section>
            )}

            {/* ── Studio Images ─────────────────────────────────────────────── */}
            {artist.studioImages && artist.studioImages.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-10">
                        <Kicker>Studio</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">A peek behind the easel</h2>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                        {artist.studioImages.slice(0, 6).map((imgUrl, i) => (
                            <Reveal
                                key={i}
                                delay={(i % 3) * 90}
                                className={i === 0 ? "col-span-2 md:col-span-2" : ""}
                            >
                                <div className={`relative overflow-hidden bg-white p-1.5 shadow-[0_14px_30px_-18px_rgba(58,50,64,0.22)] ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}>
                                    <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                        <Image src={imgUrl} alt={`${name} studio ${i + 1}`} fill className="object-cover" />
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Book ─────────────────────────────────────────────────────── */}
            {artist.book && (
                <section className="relative overflow-hidden py-16 md:py-24">
                    <GlowBlob className="left-0 top-0 h-80 w-80" colors={["#e3ecff", "#fbe3f2"]} opacity={0.45} />
                    <Reveal className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12 md:px-10">
                        <div className="md:col-span-4">
                            <div className="relative aspect-[3/4] overflow-hidden bg-white p-3 shadow-[0_25px_50px_-15px_rgba(58,50,64,0.25)]">
                                <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                    <Image src={artist.book.imageUrl} alt={artist.book.title} fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-8">
                            <Kicker>Published Work</Kicker>
                            <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240] sm:text-4xl">{artist.book.title}</h2>
                            <p className="mt-5 font-sans text-[15px] leading-relaxed text-[#6b6470]">{artist.book.description}</p>
                            <p className="mt-4 font-sans text-xs uppercase tracking-[0.14em] text-[#a39aa0]">
                                {[artist.book.publisher, artist.book.format].filter(Boolean).join(" · ")}
                            </p>
                            {artist.book.purchaseUrl && (
                                <PillButton href={artist.book.purchaseUrl} external className="mt-6">
                                    {artist.book.purchaseLabel ?? "Get the Book"}
                                </PillButton>
                            )}
                        </div>
                    </Reveal>
                </section>
            )}

            {/* ── Exhibitions ──────────────────────────────────────────────── */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
                <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-10">
                        <Kicker>Timeline</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Exhibitions</h2>
                    </Reveal>
                    <div>
                        {artist.exhibitions.map((ex, i) => (
                            <Reveal key={i} delay={(i % 6) * 60}>
                                <div className="grid grid-cols-12 items-baseline gap-4 border-b border-[#3a3240]/10 py-6">
                                    <span className="col-span-3 font-serif text-2xl italic text-[#a9769f] sm:col-span-2">
                                        {ex.year}
                                    </span>
                                    <div className="col-span-9 sm:col-span-7">
                                        <p className="font-serif text-lg italic text-[#3a3240]">{ex.title}</p>
                                        {ex.location && <p className="mt-1 font-sans text-sm text-[#8a8189]">{ex.location}</p>}
                                    </div>
                                    {ex.type && (
                                        <span className="col-span-12 font-sans text-[10px] uppercase tracking-[0.16em] text-[#a39aa0] sm:col-span-3 sm:text-right">
                                            {ex.type}
                                        </span>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Publications ─────────────────────────────────────────────── */}
            {artist.publications && artist.publications.length > 0 && (
                <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-10">
                        <Kicker>Press</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Publications</h2>
                    </Reveal>
                    <div>
                        {artist.publications.map((pub, i) => (
                            <Reveal key={i} delay={(i % 6) * 60}>
                                <div className="flex gap-6 border-b border-[#3a3240]/10 py-5">
                                    <span className="w-14 shrink-0 font-serif text-xl italic text-[#a9769f]">{pub.year}</span>
                                    <div>
                                        <p className="font-serif text-lg italic text-[#3a3240]">{pub.title}</p>
                                        {pub.publication && (
                                            <p className="mt-0.5 font-sans text-sm text-[#8a8189]">{pub.publication}</p>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Reviews ──────────────────────────────────────────────────── */}
            {artist.reviews && artist.reviews.length > 0 && (
                <section className="relative overflow-hidden py-16 md:py-24">
                    <GlowBlob className="left-1/2 top-0 h-96 w-96 -translate-x-1/2" colors={["#fdeadb", "#e3ecff"]} opacity={0.4} />
                    <div className="relative mx-auto max-w-7xl px-6 md:px-10">
                        <Reveal className="mb-10">
                            <Kicker>Words From Others</Kicker>
                            <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">What People Are Saying</h2>
                        </Reveal>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {artist.reviews.map((review, i) => (
                                <Reveal key={i} delay={i * 90}>
                                    <div className="bg-white/70 p-8 shadow-[0_16px_36px_-20px_rgba(58,50,64,0.2)] backdrop-blur-sm">
                                        <span aria-hidden="true" className="mb-2 block font-serif text-4xl italic text-[#d9b9d1]">
                                            &ldquo;
                                        </span>
                                        <blockquote className="font-serif text-lg italic leading-relaxed text-[#3a3240]">
                                            {review.text}
                                        </blockquote>
                                        <p className="mt-5 font-sans text-sm font-semibold text-[#3a3240]">{review.author}</p>
                                        {review.role && (
                                            <p className="font-sans text-xs uppercase tracking-[0.12em] text-[#a39aa0]">{review.role}</p>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Galleries ────────────────────────────────────────────────── */}
            {artist.galleries && artist.galleries.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-10">
                        <Kicker>Representation</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Galleries</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {artist.galleries.map((g, i) => (
                            <Reveal key={i} delay={(i % 3) * 90}>
                                <div>
                                    {g.photo && (
                                        <div className="relative mb-4 aspect-[3/2] overflow-hidden bg-white p-1.5 shadow-[0_14px_30px_-18px_rgba(58,50,64,0.2)]">
                                            <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                                <Image src={g.photo} alt={g.name} fill className="object-cover" />
                                            </div>
                                        </div>
                                    )}
                                    <p className="font-serif text-lg italic text-[#3a3240]">
                                        {(g.link ?? g.url) ? (
                                            <a
                                                href={g.link ?? g.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 transition-colors hover:text-[#a9769f]"
                                            >
                                                {g.name} <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        ) : (
                                            g.name
                                        )}
                                    </p>
                                    {(g.city || g.state) && (
                                        <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-[#a39aa0]">
                                            {[g.city, g.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Studio Locations ─────────────────────────────────────────── */}
            {artist.studioLocations && artist.studioLocations.length > 0 && (
                <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-10">
                        <Kicker>Visit</Kicker>
                        <h2 className="mt-4 font-serif text-3xl italic text-[#3a3240]">Studio Locations</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {artist.studioLocations.map((loc, i) => (
                            <Reveal key={i} delay={(i % 4) * 80} className="border-l border-[#e3c9dd] pl-6">
                                {loc.name && <p className="font-serif text-lg italic text-[#3a3240]">{loc.name}</p>}
                                <p className="mt-1 font-sans text-sm text-[#6b6470]">
                                    {[loc.address, loc.city, loc.state, loc.zipCode].filter(Boolean).join(", ")}
                                </p>
                                {loc.directionsUrl && (
                                    <a
                                        href={loc.directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex items-center gap-1 font-sans text-xs font-medium uppercase tracking-[0.12em] text-[#a9769f] hover:text-[#3a3240]"
                                    >
                                        Get Directions <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
