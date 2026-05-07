import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, getProductImageUrl } from "@/lib/artist-api";

export default function LuminaryHomePage({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const activeWorks = artworks.filter((a) => a.status !== "inactive");
    const heroWork = activeWorks.find((a) => a.status === "active") ?? null;
    const heroImgUrl = heroWork ? getProductImageUrl(heroWork) : null;
    const coverPhoto = artist.coverPhoto ?? artist.profilePhoto ?? null;

    // Editorial featured grid: first 6 active works
    const featuredWorks = activeWorks.filter((a) => a.status === "active").slice(0, 6);
    // Full-bleed feature: pick a different work than the hero if possible
    const featureWork = featuredWorks[2] ?? featuredWorks[0] ?? null;
    const featureImgUrl = featureWork ? getProductImageUrl(featureWork) : null;

    const year = new Date().getFullYear();
    const location = [artist.city, artist.state].filter(Boolean).join(", ");

    return (
        <div>
            {/* ── Editorial Header Strip ─────────────────────────────────────── */}
            <div className="border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-2 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-neutral-400">
                        Contemporary Art
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-neutral-400">
                        {location && `${location} · `}{year}
                    </span>
                </div>
            </div>

            {/* ── Hero: Magazine Cover Composition ──────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 items-start">
                    {/* Left: Typography column */}
                    <div className="md:col-span-5 flex flex-col justify-between py-6 md:py-12">
                        {/* Issue label */}
                        <div className="mb-8">
                            <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#0f2d6b] border border-[#0f2d6b] px-2 py-1">
                                Featured Artist
                            </span>
                        </div>

                        {/* Enormous headline */}
                        <div>
                            <h1 className="font-serif font-black text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight text-[#1a1a1a] mb-6">
                                {name}
                            </h1>
                            {artist.artistTagline && (
                                <p className="font-sans text-base md:text-lg text-neutral-500 leading-relaxed max-w-sm mb-8">
                                    {artist.artistTagline}
                                </p>
                            )}
                            {!artist.artistTagline && artist.bio && (
                                <p className="font-sans text-base text-neutral-500 leading-relaxed max-w-sm mb-8">
                                    {artist.bio.slice(0, 140)}…
                                </p>
                            )}
                        </div>

                        {/* CTA links */}
                        <div className="flex items-center gap-6 flex-wrap">
                            <Link
                                href={`/artworks`}
                                className="font-sans text-xs tracking-[0.2em] uppercase text-white bg-[#0f2d6b] px-6 py-3 hover:bg-[#1a1a1a] transition-colors"
                            >
                                View Works
                            </Link>
                            <Link
                                href={`/about`}
                                className="font-sans text-xs tracking-[0.2em] uppercase text-[#0f2d6b] border border-[#0f2d6b] px-6 py-3 hover:bg-[#0f2d6b] hover:text-white transition-colors"
                            >
                                Artist Profile
                            </Link>
                        </div>
                    </div>

                    {/* Right: Hero image — large, slightly cropped */}
                    <div className="md:col-span-7 relative">
                        {heroImgUrl ? (
                            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-100">
                                <Image
                                    src={heroImgUrl}
                                    alt={heroWork?.title ?? name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {heroWork && (
                                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                                        <p className="font-serif font-black text-white text-lg">
                                            {heroWork.title}
                                        </p>
                                        {heroWork.yearCreated && (
                                            <p className="font-sans text-xs text-white/70 tracking-widest uppercase mt-1">
                                                {heroWork.yearCreated}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : coverPhoto ? (
                            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-100">
                                <Image src={coverPhoto} alt={name} fill className="object-cover" priority />
                            </div>
                        ) : (
                            <div className="aspect-[4/5] md:aspect-[3/4] bg-neutral-100 flex items-end p-8">
                                <p className="font-serif font-black text-4xl text-neutral-300">{name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── "In This Issue" Editorial Grid ────────────────────────────── */}
            {featuredWorks.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                    <div className="flex items-baseline gap-6 mb-8 border-t-2 border-[#1a1a1a] pt-6">
                        <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b]">
                            In This Collection
                        </h2>
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-300">
                            — Selected Works
                        </span>
                    </div>

                    {/* Editorial grid with varying proportions */}
                    <div className="grid grid-cols-12 gap-4 md:gap-6">
                        {/* Large featured — col 1-7, tall */}
                        {featuredWorks[0] && (() => {
                            const img = getProductImageUrl(featuredWorks[0]);
                            return (
                                <Link
                                    href={`/artworks/${featuredWorks[0].slug ?? featuredWorks[0].id}`}
                                    className="col-span-12 md:col-span-7 group block"
                                >
                                    <div className="relative aspect-[4/5] md:aspect-auto md:h-[520px] overflow-hidden bg-neutral-100">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={featuredWorks[0].title}
                                                fill
                                                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                    </div>
                                    <div className="pt-3">
                                        <p className="font-serif font-black text-xl text-[#1a1a1a] group-hover:text-[#0f2d6b] transition-colors">
                                            {featuredWorks[0].title}
                                        </p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="font-sans text-xs text-neutral-400 tracking-wide">
                                                {featuredWorks[0].medium ?? featuredWorks[0].mediums?.[0]?.medium?.name ?? ""}
                                            </p>
                                            <p className="font-sans text-sm font-medium text-[#1a1a1a]">
                                                ${featuredWorks[0].price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* Right column: 2 stacked works */}
                        <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
                            {[featuredWorks[1], featuredWorks[2]].filter(Boolean).map((work) => {
                                if (!work) return null;
                                const img = getProductImageUrl(work);
                                return (
                                    <Link
                                        key={work.id}
                                        href={`/artworks/${work.slug ?? work.id}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
                                            {img ? (
                                                <Image
                                                    src={img}
                                                    alt={work.title}
                                                    fill
                                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-neutral-200" />
                                            )}
                                            {work.status === "sold" && (
                                                <div className="absolute top-3 right-3 bg-[#1a1a1a] text-white text-[10px] px-2 py-0.5 tracking-widest uppercase font-sans">
                                                    Sold
                                                </div>
                                            )}
                                        </div>
                                        <div className="pt-2.5">
                                            <p className="font-serif font-black text-base text-[#1a1a1a] group-hover:text-[#0f2d6b] transition-colors">
                                                {work.title}
                                            </p>
                                            <p className="font-sans text-sm text-neutral-500 mt-0.5">
                                                ${work.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Bottom row: 3 equal works */}
                        {featuredWorks.slice(3, 6).map((work) => {
                            const img = getProductImageUrl(work);
                            return (
                                <Link
                                    key={work.id}
                                    href={`/artworks/${work.slug ?? work.id}`}
                                    className="col-span-12 sm:col-span-6 md:col-span-4 group block"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-neutral-100">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={work.title}
                                                fill
                                                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                        {work.status === "sold" && (
                                            <div className="absolute top-3 right-3 bg-[#1a1a1a] text-white text-[10px] px-2 py-0.5 tracking-widest uppercase font-sans">
                                                Sold
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-2.5">
                                        <p className="font-serif font-black text-sm text-[#1a1a1a] group-hover:text-[#0f2d6b] transition-colors">
                                            {work.title}
                                        </p>
                                        <p className="font-sans text-xs text-neutral-400 mt-0.5">
                                            ${work.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {activeWorks.filter((a) => a.status === "active").length > 6 && (
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex-1 h-px bg-neutral-200" />
                            <Link
                                href={`/artworks`}
                                className="font-sans text-xs tracking-[0.2em] uppercase text-[#0f2d6b] hover:text-[#1a1a1a] transition-colors shrink-0"
                            >
                                View Full Collection →
                            </Link>
                        </div>
                    )}
                </section>
            )}

            {/* ── Artist Statement Pull Quote ────────────────────────────────── */}
            {(artist.artistStatement || artist.bio) && (
                <section className="border-t-2 border-[#1a1a1a] border-b-2">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-1 flex md:flex-col items-start">
                            <span
                                className="font-serif font-black text-8xl md:text-9xl leading-none text-[#0f2d6b] select-none"
                                aria-hidden="true"
                            >
                                &ldquo;
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-black leading-[1.2] text-[#1a1a1a] italic mb-8">
                                {artist.artistStatement
                                    ? artist.artistStatement.slice(0, 280)
                                    : artist.bio!.slice(0, 280)}
                                {((artist.artistStatement?.length ?? 0) > 280 || (artist.bio?.length ?? 0) > 280) && "…"}
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-0.5 bg-[#0f2d6b]" />
                                <p className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-500">
                                    {name}
                                    {location ? ` — ${location}` : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Events Strip ──────────────────────────────────────────────── */}
            {artist.events && artist.events.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
                    <div className="flex items-baseline gap-6 mb-8 border-t-2 border-[#1a1a1a] pt-6">
                        <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b]">
                            Upcoming
                        </h2>
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-300">
                            — Events & Exhibitions
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artist.events.slice(0, 3).map((event, i) => (
                            <div key={i} className="border-l-2 border-[#0f2d6b] pl-5 py-1">
                                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0f2d6b] mb-2">
                                    {event.date ?? event.startDate ?? "Upcoming"}
                                </p>
                                <p className="font-serif font-black text-lg text-[#1a1a1a] leading-tight mb-1">
                                    {event.title}
                                </p>
                                {event.location && (
                                    <p className="font-sans text-xs text-neutral-500 mb-2">
                                        {event.location}
                                    </p>
                                )}
                                {event.description && (
                                    <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                                        {event.description.slice(0, 120)}
                                        {event.description.length > 120 ? "…" : ""}
                                    </p>
                                )}
                                {event.url && (
                                    <a
                                        href={event.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-sans text-[10px] tracking-widest uppercase text-[#0f2d6b] hover:underline mt-2 inline-block"
                                    >
                                        Details →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Full-Bleed Featured Work ───────────────────────────────────── */}
            {featureWork && featureImgUrl && (
                <section className="w-full relative overflow-hidden border-t-2 border-[#1a1a1a]">
                    <div className="relative h-[60vh] md:h-[70vh] min-h-[420px]">
                        <Image
                            src={featureImgUrl}
                            alt={featureWork.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                        <div className="absolute inset-0 flex items-end p-8 md:p-14">
                            <div className="max-w-lg">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-3">
                                    Featured Work
                                </p>
                                <h3 className="font-serif font-black text-4xl md:text-5xl text-white leading-tight mb-3">
                                    {featureWork.title}
                                </h3>
                                {featureWork.yearCreated && (
                                    <p className="font-sans text-xs tracking-widest uppercase text-white/60 mb-4">
                                        {featureWork.yearCreated}
                                        {featureWork.medium ? ` · ${featureWork.medium}` : ""}
                                    </p>
                                )}
                                <Link
                                    href={`/artworks/${featureWork.slug ?? featureWork.id}`}
                                    className="font-sans text-xs tracking-[0.2em] uppercase text-white border border-white px-5 py-2.5 hover:bg-white hover:text-[#1a1a1a] transition-colors inline-block"
                                >
                                    View Work
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
