import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";
import GlowBlob from "./GlowBlob";
import Reveal from "./Reveal";
import { Kicker, PillButton } from "./ui";

export default function LuminaryHomePage({ artist, artworks }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const heroWork = active[0] ?? null;
    const heroImg = heroWork ? getProductImageUrl(heroWork) : null;
    const heroGlow = heroWork?.dominantColors?.[0]?.hex ?? "#f3c6de";
    const heroGlow2 = heroWork?.dominantColors?.[1]?.hex ?? "#c9d8f7";

    const featured = active.slice(1, 7);
    const bannerWork = active[7] ?? active[3] ?? null;
    const bannerImg = bannerWork ? getProductImageUrl(bannerWork) : null;

    const posts = (artist.blogPosts ?? []).slice(0, 3);
    const events = (artist.events ?? []).slice(0, 3);
    const location = [artist.city, artist.state].filter(Boolean).join(", ");

    return (
        <div>
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
                <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-10">
                    <Reveal className="md:col-span-6 lg:col-span-6" delay={0}>
                        <Kicker>{artist.medium ?? artist.artStyle ?? "Original Art"}</Kicker>
                        <h1 className="mt-6 font-serif text-[3.2rem] italic leading-[1.05] tracking-tight text-[#3a3240] sm:text-6xl lg:text-7xl">
                            {artist.artistTagline ?? `The art of ${name.split(" ")[0]}`}
                        </h1>
                        {(artist.artistTagline ? artist.bio : null) && (
                            <p className="mt-7 max-w-md font-sans text-[15px] leading-relaxed text-[#6b6470]">
                                {artist.bio!.slice(0, 190)}
                                {artist.bio!.length > 190 ? "…" : ""}
                            </p>
                        )}
                        {!artist.artistTagline && artist.bio && (
                            <p className="mt-7 max-w-md font-sans text-[15px] leading-relaxed text-[#6b6470]">
                                {artist.bio.slice(0, 190)}
                                {artist.bio.length > 190 ? "…" : ""}
                            </p>
                        )}
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <PillButton href="/artworks">View the Gallery</PillButton>
                            <PillButton href="/about" variant="outline">
                                Meet {name.split(" ")[0]}
                            </PillButton>
                        </div>
                        {location && (
                            <p className="mt-10 font-sans text-xs uppercase tracking-[0.24em] text-[#a9769f]">
                                Working out of {location}
                            </p>
                        )}
                    </Reveal>

                    <Reveal className="relative md:col-span-6 lg:col-span-6" delay={150}>
                        <div className="relative mx-auto max-w-md md:max-w-none">
                            <GlowBlob
                                className="-inset-x-10 -inset-y-10 -z-10"
                                colors={[heroGlow, heroGlow2]}
                                opacity={0.65}
                            />
                            {heroImg ? (
                                <div className="relative rounded-[2px] bg-white p-3 shadow-[0_30px_60px_-15px_rgba(58,50,64,0.25)] sm:p-4">
                                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f3f1]">
                                        <Image src={heroImg} alt={heroWork!.title} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                                    </div>
                                    <div className="flex items-baseline justify-between px-1 pt-3">
                                        <p className="font-serif italic text-[#3a3240]">{heroWork!.title}</p>
                                        {heroWork!.yearCreated && (
                                            <p className="font-sans text-xs text-[#a39aa0]">{heroWork!.yearCreated}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-white/60 p-10 text-center shadow-[0_30px_60px_-15px_rgba(58,50,64,0.15)]">
                                    <p className="font-serif text-3xl italic text-[#c9bdd2]">{name}</p>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Featured Works ───────────────────────────────────────────── */}
            {featured.length > 0 && (
                <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <Kicker>Selected Works</Kicker>
                            <h2 className="mt-4 font-serif text-4xl italic text-[#3a3240] sm:text-5xl">A gentle collection</h2>
                        </div>
                        <Link
                            href="/artworks"
                            className="group hidden items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.14em] text-[#a9769f] transition-colors hover:text-[#3a3240] md:inline-flex"
                        >
                            Browse full gallery
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </Reveal>

                    <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3">
                        {featured.map((work, i) => {
                            const img = getProductImageUrl(work);
                            const glow = work.dominantColors?.[0]?.hex ?? "#e9d6ef";
                            return (
                                <Reveal key={work.id} delay={(i % 3) * 90} className={i % 5 === 0 ? "col-span-2 sm:col-span-1" : ""}>
                                    <Link href={`/artworks/${work.slug ?? work.id}`} className="group relative block">
                                        <div className="relative">
                                            <GlowBlob
                                                className="-inset-4 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                                                colors={[glow, "#ffffff"]}
                                                opacity={0}
                                            />
                                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-2 shadow-[0_18px_36px_-18px_rgba(58,50,64,0.22)] transition-transform duration-500 group-hover:-translate-y-1.5">
                                                <div className="relative h-full w-full overflow-hidden bg-[#f6f3f1]">
                                                    {img ? (
                                                        <Image
                                                            src={img}
                                                            alt={work.title}
                                                            fill
                                                            sizes="(min-width: 640px) 33vw, 50vw"
                                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-[#f0ebe9]" />
                                                    )}
                                                    {work.status === "sold" && (
                                                        <span className="absolute right-3 top-3 rounded-full bg-[#3a3240] px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-white">
                                                            Sold
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3.5 flex items-baseline justify-between gap-2">
                                            <p className="font-serif italic text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                                {work.title}
                                            </p>
                                            <p className="shrink-0 font-sans text-sm text-[#6b6470]">
                                                ${work.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal className="mt-12 text-center md:hidden">
                        <PillButton href="/artworks" variant="outline">
                            Browse Full Gallery
                        </PillButton>
                    </Reveal>
                </section>
            )}

            {/* ── Artist Statement ─────────────────────────────────────────── */}
            {(artist.artistStatement || artist.bio) && (
                <section className="relative overflow-hidden py-24 md:py-32">
                    <GlowBlob className="left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2" colors={["#f6e3fb", "#e3ecff"]} opacity={0.55} />
                    <Reveal className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
                        <span aria-hidden="true" className="font-serif text-7xl italic text-[#d9b9d1]">
                            &ldquo;
                        </span>
                        <blockquote className="-mt-6 font-serif text-2xl italic leading-relaxed text-[#3a3240] sm:text-3xl md:text-4xl">
                            {(artist.artistStatement ?? artist.bio ?? "").slice(0, 280)}
                            {(artist.artistStatement ?? artist.bio ?? "").length > 280 ? "…" : ""}
                        </blockquote>
                        <p className="mt-8 font-sans text-xs uppercase tracking-[0.26em] text-[#a9769f]">
                            {name}
                            {location ? ` — ${location}` : ""}
                        </p>
                    </Reveal>
                </section>
            )}

            {/* ── Journal ──────────────────────────────────────────────────── */}
            {posts.length > 0 && (
                <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-12">
                        <Kicker>From the Studio</Kicker>
                        <h2 className="mt-4 font-serif text-4xl italic text-[#3a3240] sm:text-5xl">Notes &amp; Journal</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {posts.map((post, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <a
                                    href={post.externalUrl ?? "#"}
                                    target={post.externalUrl ? "_blank" : undefined}
                                    rel={post.externalUrl ? "noopener noreferrer" : undefined}
                                    className={`group block ${post.externalUrl ? "" : "pointer-events-none"}`}
                                >
                                    {post.imageUrl && (
                                        <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-[#f6f3f1]">
                                            <Image
                                                src={post.imageUrl}
                                                alt={post.title}
                                                fill
                                                sizes="(min-width: 768px) 33vw, 100vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#a9769f]">{post.date}</p>
                                    <h3 className="mt-2 font-serif text-xl italic text-[#3a3240] transition-colors group-hover:text-[#a9769f]">
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 font-sans text-sm leading-relaxed text-[#6b6470]">{post.excerpt}</p>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Events ───────────────────────────────────────────────────── */}
            {events.length > 0 && (
                <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal className="mb-12">
                        <Kicker>Upcoming</Kicker>
                        <h2 className="mt-4 font-serif text-4xl italic text-[#3a3240] sm:text-5xl">Exhibitions &amp; Events</h2>
                    </Reveal>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {events.map((event, i) => (
                            <Reveal
                                key={i}
                                delay={i * 100}
                                className="border-l border-[#e3c9dd] pl-6"
                            >
                                <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#a9769f]">
                                    {event.date ?? event.startDate ?? "Upcoming"}
                                </p>
                                <h3 className="mt-2 font-serif text-xl italic text-[#3a3240]">{event.title}</h3>
                                {event.location && <p className="mt-1 font-sans text-sm text-[#6b6470]">{event.location}</p>}
                                {event.description && (
                                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#8a8189]">
                                        {event.description.slice(0, 130)}
                                        {event.description.length > 130 ? "…" : ""}
                                    </p>
                                )}
                                {event.url && (
                                    <a
                                        href={event.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-medium uppercase tracking-[0.14em] text-[#a9769f] hover:text-[#3a3240]"
                                    >
                                        Details <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Full-bleed Feature ───────────────────────────────────────── */}
            {bannerWork && bannerImg && (
                <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-[2px]">
                            <div className="relative h-[65vh] min-h-[420px] w-full">
                                <Image src={bannerImg} alt={bannerWork.title} fill sizes="100vw" className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#3a3240]/70 via-[#3a3240]/10 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
                                    <p className="font-sans text-xs uppercase tracking-[0.24em] text-white/70">Featured Piece</p>
                                    <h3 className="mt-3 max-w-lg font-serif text-4xl italic text-white sm:text-5xl">
                                        {bannerWork.title}
                                    </h3>
                                    <PillButton
                                        href={`/artworks/${bannerWork.slug ?? bannerWork.id}`}
                                        variant="outline"
                                        className="mt-7 !border-white/70 !text-white hover:!border-white hover:!bg-white hover:!text-[#3a3240]"
                                    >
                                        View This Piece
                                    </PillButton>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>
            )}
        </div>
    );
}
