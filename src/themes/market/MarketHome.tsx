import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, Quote, ShieldCheck, Truck } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function MarketHome({ artist, artworks, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const active = artworks.filter((a) => a.status === "active");
    const featured = active.slice(0, 8);
    const originalsCount = active.filter((a) => a.isOriginal).length;
    const sold = artist.soldArtworks?.slice(0, 6) ?? [];
    const reviews = artist.reviews?.slice(0, 3) ?? [];
    const acceptsCommissions = Boolean(artist.acceptsCommissions && artist.acceptsCommissions !== "no");

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#f8f2e9] border-b border-[#e3d5c1]">
                <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                    <Reveal delay={0}>
                        <p className="text-xs tracking-[0.3em] uppercase text-[#b2542e] font-semibold mb-5">
                            {artist.medium ?? "Original Artwork"} · Direct From The Studio
                        </p>
                        <h1 className="font-[family-name:var(--market-font-display)] text-5xl md:text-6xl text-[#241e19] leading-[1.05] mb-6">
                            {name}
                        </h1>
                        {artist.artistTagline && (
                            <p className="text-[#4a4038] text-lg md:text-xl leading-relaxed mb-7 max-w-md">
                                {artist.artistTagline}
                            </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="/artworks"
                                className="group inline-flex items-center gap-2 bg-[#241e19] text-[#f8f2e9] px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#b2542e] transition-colors"
                            >
                                Shop the Collection
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            {acceptsCommissions && (
                                <Link
                                    href="/contact"
                                    className="text-sm font-semibold text-[#241e19] border-b-2 border-[#b2542e] pb-0.5 hover:text-[#b2542e] transition-colors"
                                >
                                    Commission a Piece
                                </Link>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-10 text-xs text-[#8a7d6e] tracking-wide uppercase">
                            {(artist.city || artist.state) && (
                                <span>{artist.city}{artist.city && artist.state ? ", " : ""}{artist.state}</span>
                            )}
                            {originalsCount > 0 && <span>{originalsCount} Original{originalsCount === 1 ? "" : "s"} Available</span>}
                            {artist.priceRange && <span>{artist.priceRange}</span>}
                        </div>
                    </Reveal>

                    {artist.profilePhoto && (
                        <Reveal delay={120} className="relative">
                            <div className="relative aspect-[4/5] max-w-sm mx-auto md:mx-0">
                                <div className="absolute -inset-3 border border-[#b2542e]/40" />
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={artist.profilePhoto}
                                        alt={name}
                                        fill
                                        priority
                                        sizes="(min-width: 768px) 24rem, 80vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Featured works */}
            {featured.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <Reveal className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-2">
                                In The Studio Now
                            </p>
                            <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19]">
                                Available Works
                            </h2>
                        </div>
                        <Link
                            href="/artworks"
                            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#4a4038] hover:text-[#b2542e] transition-colors"
                        >
                            View all <ArrowRight size={14} />
                        </Link>
                    </Reveal>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                        {featured.map((artwork, i) => (
                            <Reveal key={artwork.id} delay={i * 60}>
                                <ProductCard artwork={artwork} priority={i < 2} index={i} />
                            </Reveal>
                        ))}
                    </div>
                    <Link
                        href="/artworks"
                        className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#4a4038]"
                    >
                        View all works <ArrowRight size={14} />
                    </Link>
                </section>
            )}

            {/* Trust strip */}
            <section className="bg-[#efe6d7] py-14">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
                    {[
                        { Icon: Palette, title: "Genuinely Original", copy: "Every piece is one-of-a-kind, made by hand in the studio." },
                        { Icon: ShieldCheck, title: "Secure Purchase", copy: "Checkout is handled safely through ArtsDistrictUSA." },
                        { Icon: Truck, title: "Shipped With Care", copy: "Carefully packed and shipped direct to your door." },
                    ].map(({ Icon, title, copy }) => (
                        <Reveal key={title} className="flex flex-col items-start gap-3">
                            <Icon size={22} className="text-[#b2542e]" strokeWidth={1.5} />
                            <p className="font-[family-name:var(--market-font-display)] text-lg text-[#241e19]">{title}</p>
                            <p className="text-sm text-[#6b5d4f] leading-relaxed">{copy}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Reviews / social proof */}
            {reviews.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <Reveal className="text-center mb-12">
                        <p className="text-xs tracking-[0.25em] uppercase text-[#b2542e] font-semibold mb-2">
                            From Collectors
                        </p>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#241e19]">
                            What People Are Saying
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((r, i) => (
                            <Reveal key={i} delay={i * 90} className="bg-[#faf6ee] border border-[#e3d5c1] p-7 flex flex-col">
                                <Quote size={20} className="text-[#e8c9ae] mb-4" />
                                <p className="text-sm text-[#4a4038] leading-relaxed italic flex-1">&ldquo;{r.text}&rdquo;</p>
                                <p className="text-sm font-semibold text-[#241e19] mt-5">{r.author}</p>
                                {r.role && <p className="text-xs text-[#8a7d6e]">{r.role}</p>}
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Recently collected */}
            {sold.length > 0 && (
                <section className="bg-[#241e19] py-20">
                    <div className="max-w-6xl mx-auto px-6">
                        <Reveal className="mb-10">
                            <p className="text-xs tracking-[0.25em] uppercase text-[#e8c9ae] font-semibold mb-2">
                                Already Finding Homes
                            </p>
                            <h2 className="font-[family-name:var(--market-font-display)] text-3xl text-[#f8f2e9]">
                                Recently Collected
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {sold.map((s, i) => (
                                <Reveal key={s.id ?? s.title + i} delay={i * 60} className="group">
                                    <div className="relative aspect-square bg-[#3a2f26] overflow-hidden mb-2.5">
                                        <Image
                                            src={s.image}
                                            alt={s.title}
                                            fill
                                            sizes="20vw"
                                            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute top-2 left-2 bg-[#f8f2e9]/90 text-[#241e19] text-[9px] font-semibold tracking-[0.15em] uppercase px-1.5 py-0.5">
                                            Sold
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-[#e9dcc8] leading-tight truncate">{s.title}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Commissions CTA */}
            {acceptsCommissions && (
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <Reveal className="bg-[#f0d9c5] px-8 py-14 md:px-16 md:py-16 text-center flex flex-col items-center">
                        <p className="text-xs tracking-[0.25em] uppercase text-[#8f3f1f] font-semibold mb-3">
                            Commissions Open
                        </p>
                        <h2 className="font-[family-name:var(--market-font-display)] text-3xl md:text-4xl text-[#241e19] max-w-xl mb-5">
                            Have something specific in mind?
                        </h2>
                        <p className="text-[#5a4a3a] max-w-lg mb-8 leading-relaxed">
                            {artist.commissionDescription ??
                                `${name} welcomes custom commission requests — let's create something made just for your space.`}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#241e19] text-[#f8f2e9] px-8 py-3.5 text-sm font-semibold hover:bg-[#b2542e] transition-colors"
                        >
                            Start a Commission
                            <ArrowRight size={15} />
                        </Link>
                    </Reveal>
                </section>
            )}
        </div>
    );
}
