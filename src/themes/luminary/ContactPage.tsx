import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function LuminaryContactPage({ artist, domain }: ThemePageProps) {
    const name = getArtistName(artist);
    const location = [artist.city, artist.state, artist.country].filter(Boolean).join(", ");

    const socials: { href: string; label: string; handle: string }[] = [
        artist.instagram
            ? { href: `https://instagram.com/${artist.instagram.replace("@", "")}`, label: "Instagram", handle: `@${artist.instagram.replace("@", "")}` }
            : null,
        artist.facebook
            ? { href: artist.facebook, label: "Facebook", handle: "facebook.com" }
            : null,
        artist.twitter
            ? { href: `https://twitter.com/${artist.twitter.replace("@", "")}`, label: "X / Twitter", handle: `@${artist.twitter.replace("@", "")}` }
            : null,
        artist.tiktok
            ? { href: `https://tiktok.com/@${artist.tiktok.replace("@", "")}`, label: "TikTok", handle: `@${artist.tiktok.replace("@", "")}` }
            : null,
        artist.pinterest
            ? { href: artist.pinterest, label: "Pinterest", handle: "pinterest.com" }
            : null,
        artist.youtube
            ? { href: artist.youtube, label: "YouTube", handle: "youtube.com" }
            : null,
        artist.linkedin
            ? { href: artist.linkedin, label: "LinkedIn", handle: "linkedin.com" }
            : null,
    ].filter((s): s is { href: string; label: string; handle: string } => s !== null);

    return (
        <div>
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="border-b-2 border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-3">
                        Get in Touch
                    </p>
                    <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#1a1a1a]">
                        Contact
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

                    {/* ── Left: Contact Info ───────────────────────────────── */}
                    <div className="md:col-span-5">
                        <div className="mb-10">
                            <p className="font-serif font-black text-2xl text-[#1a1a1a] mb-1">{name}</p>
                            {location && (
                                <p className="font-sans text-sm tracking-widest uppercase text-neutral-400 mb-6">
                                    {location}
                                </p>
                            )}
                        </div>

                        {/* Contact details */}
                        <div className="space-y-0">
                            {artist.email && (
                                <div className="py-4 border-b border-neutral-100 grid grid-cols-3 gap-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 pt-0.5 col-span-1">
                                        Email
                                    </span>
                                    <a
                                        href={`mailto:${artist.email}`}
                                        className="col-span-2 font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors break-all"
                                    >
                                        {artist.email}
                                    </a>
                                </div>
                            )}
                            {artist.website && (
                                <div className="py-4 border-b border-neutral-100 grid grid-cols-3 gap-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 pt-0.5 col-span-1">
                                        Website
                                    </span>
                                    <a
                                        href={artist.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="col-span-2 font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors break-all"
                                    >
                                        {artist.website.replace(/^https?:\/\//, "")}
                                    </a>
                                </div>
                            )}
                            {artist.slug && (
                                <div className="py-4 border-b border-neutral-100 grid grid-cols-3 gap-4">
                                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 pt-0.5 col-span-1">
                                        Marketplace
                                    </span>
                                    <a
                                        href={`https://www.artsdistrictusa.com/artist/${artist.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="col-span-2 font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                                    >
                                        ArtsDistrictUSA Profile →
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Social links — clean text list, no icons */}
                        {socials.length > 0 && (
                            <div className="mt-10">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-5">
                                    Social
                                </p>
                                <div className="space-y-0">
                                    {socials.map((s) => (
                                        <div key={s.label} className="py-3 border-b border-neutral-100 grid grid-cols-3 gap-4">
                                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-neutral-400 pt-0.5 col-span-1">
                                                {s.label}
                                            </span>
                                            <a
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="col-span-2 font-sans text-sm text-[#1a1a1a] hover:text-[#0f2d6b] transition-colors"
                                            >
                                                {s.handle}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Right: Commission Brief / Editorial CTA ──────────── */}
                    <div className="md:col-span-7">
                        {artist.acceptsCommissions && artist.acceptsCommissions !== "no" ? (
                            <div className="border-2 border-[#0f2d6b] p-8 md:p-10">
                                <div className="flex items-start gap-4 mb-6">
                                    <div>
                                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#0f2d6b] mb-1">
                                            Open for Commissions
                                        </p>
                                        <h2 className="font-serif font-black text-3xl md:text-4xl text-[#1a1a1a] leading-tight">
                                            Commission a Work
                                        </h2>
                                    </div>
                                </div>

                                <div className="w-12 h-0.5 bg-[#0f2d6b] mb-6" />

                                <p className="font-sans text-base text-neutral-600 leading-relaxed mb-6">
                                    {artist.commissionDescription ??
                                        `${name} accepts commission inquiries for original works. Each commission is a unique collaboration — reach out to discuss your vision, timeline, and budget.`}
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1 h-1 bg-[#0f2d6b] mt-2 shrink-0" />
                                        <p className="font-sans text-sm text-neutral-600">
                                            Personalized to your space and vision
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1 h-1 bg-[#0f2d6b] mt-2 shrink-0" />
                                        <p className="font-sans text-sm text-neutral-600">
                                            Direct collaboration with the artist
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1 h-1 bg-[#0f2d6b] mt-2 shrink-0" />
                                        <p className="font-sans text-sm text-neutral-600">
                                            Certificate of authenticity included
                                        </p>
                                    </div>
                                </div>

                                {artist.email && (
                                    <a
                                        href={`mailto:${artist.email}?subject=Commission Inquiry`}
                                        className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-[#0f2d6b] text-white px-8 py-4 hover:bg-[#1a1a1a] transition-colors"
                                    >
                                        Submit an Inquiry
                                    </a>
                                )}
                            </div>
                        ) : (
                            /* No commissions — show a studio note instead */
                            <div className="border border-neutral-200 p-8 md:p-10">
                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                                    Available Works
                                </p>
                                <h2 className="font-serif font-black text-3xl text-[#1a1a1a] leading-tight mb-4">
                                    Explore the Collection
                                </h2>
                                <p className="font-sans text-base text-neutral-600 leading-relaxed mb-6">
                                    Browse available original works and prints. All purchases and inquiries are handled securely through ArtsDistrictUSA.
                                </p>
                                <a
                                    href={`/${domain}/artworks`}
                                    className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-2 border-[#0f2d6b] text-[#0f2d6b] px-8 py-4 hover:bg-[#0f2d6b] hover:text-white transition-colors"
                                >
                                    View All Works
                                </a>
                            </div>
                        )}

                        {/* Tagline or statement below CTA block */}
                        {artist.artistTagline && (
                            <div className="mt-10 border-l-2 border-[#0f2d6b] pl-6">
                                <p className="font-serif text-xl md:text-2xl font-black italic text-[#1a1a1a] leading-snug">
                                    &ldquo;{artist.artistTagline}&rdquo;
                                </p>
                                <p className="font-sans text-xs tracking-widest uppercase text-neutral-400 mt-3">
                                    — {name}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
