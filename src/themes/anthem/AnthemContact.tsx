"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Instagram, Facebook, Music2, Mail, Phone, MapPin, Check } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import Reveal from "./Reveal";

const COMMISSION_STEPS = [
    {
        title: "Consultation & Sizing",
        body: "Share your preferred dimensions and any color or space notes — no size is too big or small.",
    },
    {
        title: "One-of-a-Kind, Guaranteed",
        body: "Every commission echoes the spirit of existing work while becoming a fully original piece.",
    },
    {
        title: "Insured, Ready-to-Hang Delivery",
        body: "Shipped securely and ready to hang, direct from the studio.",
    },
];

export default function AnthemContact(props: ThemePageProps) {
    // useSearchParams() needs a Suspense boundary around it (Next.js requirement for any
    // client component reading the URL's query string during static rendering).
    return (
        <Suspense fallback={null}>
            <AnthemContactInner {...props} />
        </Suspense>
    );
}

function ToggleOption({
    active,
    onClick,
    label,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest px-4 py-3 border-2 transition-colors ${
                active ? "border-[#C9A227] bg-[#C9A227]/10 text-black" : "border-black/25 text-black/50 hover:border-black/50"
            }`}
        >
            <span className={`w-4 h-4 flex items-center justify-center border-2 shrink-0 ${active ? "bg-[#C9A227] border-[#C9A227]" : "border-black/30"}`}>
                {active && <Check size={11} strokeWidth={3.5} className="text-black" />}
            </span>
            {label}
        </button>
    );
}

function AnthemContactInner({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const acceptsCommissions = Boolean(artist.acceptsCommissions) && artist.acceptsCommissions !== "no";
    const searchParams = useSearchParams();
    const [isCommission, setIsCommission] = useState(false);
    const [status, setStatus] = useState<"idle" | "sent">("idle");

    // Nav's "Commission" link points at /contact?tab=commission — land there with the
    // commission tab pre-selected. useSearchParams() (not window.location.hash) is what makes
    // this actually work: Next's <Link> does client-side navigation via history.pushState,
    // which never fires a 'hashchange' event (a real gap in that API, not a Next quirk) — so a
    // hash + hashchange-listener approach silently fails to reset the tab when a visitor goes
    // from /contact?tab=commission back to a plain /contact via the nav's "Contact" link.
    // useSearchParams() is the App Router's supported hook for exactly this: it reactively
    // updates on every client-side navigation, hash-free.
    useEffect(() => {
        setIsCommission(acceptsCommissions && searchParams.get("tab") === "commission");
    }, [searchParams, acceptsCommissions]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // No backend is reachable from this preview — this simulates a successful submit so
        // the flow can be reviewed end to end. In production this posts to the artist's real
        // intake (GHL workflow / email) the same way the other themes' contact forms do.
        setStatus("sent");
    }

    const marketplaceCommissionUrl = artist.slug ? `${marketplaceArtistUrl(artist.slug)}/commission` : null;

    const socials: { href: string; Icon: typeof Instagram; label: string }[] = [
        artist.instagram ? { href: artist.instagram, Icon: Instagram, label: "Instagram" } : null,
        artist.facebook ? { href: artist.facebook, Icon: Facebook, label: "Facebook" } : null,
        artist.tiktok ? { href: artist.tiktok, Icon: Music2, label: "TikTok" } : null,
    ].filter((s): s is { href: string; Icon: typeof Instagram; label: string } => !!s);

    const form = (
        <div className="border-4 border-black">
            {status === "sent" ? (
                <div className="p-10 md:p-14 flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFDC00] border-2 border-black flex items-center justify-center">
                        <Check size={28} strokeWidth={3} />
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl">Message Sent</h2>
                    <p className="text-black/70 max-w-[420px]">
                        Thanks for reaching out — {name.split(" ")[0]} will get back to you shortly.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6 md:p-10 grid grid-cols-1 gap-6">
                    {acceptsCommissions && (
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">I&apos;m interested in</p>
                            <div className="flex gap-3">
                                <ToggleOption active={!isCommission} onClick={() => setIsCommission(false)} label="Inquiry" />
                                <ToggleOption active={isCommission} onClick={() => setIsCommission(true)} label="Commission" />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest">Name</span>
                            <input required type="text" name="name" className="border-2 border-black px-4 py-3 bg-[#F7F4EC] focus:outline-none focus:bg-white" />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest">Email</span>
                            <input required type="email" name="email" className="border-2 border-black px-4 py-3 bg-[#F7F4EC] focus:outline-none focus:bg-white" />
                        </label>
                    </div>

                    <label className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest">Phone (optional)</span>
                        <input type="tel" name="phone" className="border-2 border-black px-4 py-3 bg-[#F7F4EC] focus:outline-none focus:bg-white" />
                    </label>

                    {isCommission && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest">Target Dimensions</span>
                                <input type="text" name="size" placeholder='e.g. 36" x 48"' className="border-2 border-black px-4 py-3 bg-[#F7F4EC] focus:outline-none focus:bg-white" />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest">Budget Target</span>
                                <input type="text" name="budget" placeholder="e.g. $1,500 – $2,500" className="border-2 border-black px-4 py-3 bg-[#F7F4EC] focus:outline-none focus:bg-white" />
                            </label>
                        </div>
                    )}

                    <label className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {isCommission ? "Message & Inspiration" : "Message"}
                        </span>
                        <textarea
                            required
                            name="message"
                            rows={5}
                            placeholder={isCommission ? "Tell us about your space, colors, inspiration, timeline…" : ""}
                            className="border-2 border-black px-4 py-3 bg-[#F7F4EC] focus:outline-none focus:bg-white resize-none"
                        />
                    </label>

                    <button
                        type="submit"
                        className="inline-block bg-black text-[#F7F4EC] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#E62828] hover:text-black transition-colors w-full"
                    >
                        {isCommission ? "Submit Commission Inquiry to Studio" : "Send Message"}
                    </button>

                    {isCommission && marketplaceCommissionUrl && (
                        <a
                            href={marketplaceCommissionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border-2 border-black text-black font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-black hover:text-[#F7F4EC] transition-colors w-full text-center"
                        >
                            Submit a Commission Inquiry on the Marketplace →
                        </a>
                    )}
                </form>
            )}
        </div>
    );

    return (
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">
            <Reveal className={acceptsCommissions ? "max-w-[900px]" : ""}>
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#E62828] mb-4">Get in Touch</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl leading-[0.92] mb-8">
                    Let&apos;s Make
                    <br />
                    Something.
                </h1>
                {acceptsCommissions && (
                    <p className="text-lg text-black/80 max-w-[600px] mb-12">
                        {name} is currently accepting commission requests. Have a space, a color story, or a story in
                        mind? Tell us about it below and we&apos;ll follow up within a few days.
                    </p>
                )}
            </Reveal>

            {acceptsCommissions ? (
                <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start">
                    {/* Left: always-visible info panel — stays put regardless of the Inquiry/Commission
                        toggle on the right, per feedback ("leave the Commission Process visible even at
                        Inquiry"). */}
                    <Reveal delay={60} className="border-4 border-black p-6 md:p-8">
                        <h2 className="font-[family-name:var(--font-display)] uppercase text-2xl mb-6">Commission Process</h2>
                        <ol className="space-y-6">
                            {COMMISSION_STEPS.map((step, i) => (
                                <li key={step.title} className="flex gap-4">
                                    <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-black text-[#F7F4EC] font-bold text-sm">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-wide">{step.title}</p>
                                        <p className="text-sm text-black/60 mt-1">{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        {(artist.email || artist.phone || artist.city || artist.state) && (
                            <div className="border-t-2 border-black/15 mt-8 pt-6 space-y-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">Direct Contact</p>
                                {artist.email && (
                                    <a href={`mailto:${artist.email}`} className="flex items-center gap-3 text-sm font-bold hover:text-[#E62828]">
                                        <Mail size={16} /> {artist.email}
                                    </a>
                                )}
                                {artist.phone && (
                                    <a href={`tel:${artist.phone}`} className="flex items-center gap-3 text-sm font-bold hover:text-[#E62828]">
                                        <Phone size={16} /> {artist.phone}
                                    </a>
                                )}
                                {(artist.city || artist.state) && (
                                    <p className="flex items-center gap-3 text-sm text-black/60">
                                        <MapPin size={16} /> {[artist.city, artist.state].filter(Boolean).join(", ")}
                                    </p>
                                )}
                            </div>
                        )}

                        {socials.length > 0 && (
                            <div className="border-t-2 border-black/15 mt-6 pt-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">Follow Along</p>
                                <div className="flex gap-3">
                                    {socials.map(({ href, Icon, label }) => (
                                        <a
                                            key={href}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="w-9 h-9 flex items-center justify-center border-2 border-black hover:bg-black hover:text-[#F7F4EC] transition-colors"
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Reveal>

                    <Reveal delay={120}>{form}</Reveal>
                </div>
            ) : (
                <Reveal delay={80}>{form}</Reveal>
            )}

            {artist.galleries && artist.galleries.length > 0 && (
                <Reveal delay={180} className="mt-14">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-2xl mb-6">Also Available Through</h2>
                    <div className="flex flex-wrap gap-4">
                        {artist.galleries.map((g, i) => (
                            <a
                                key={i}
                                href={g.url ?? g.link ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-black px-5 py-3 text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-[#F7F4EC] transition-colors"
                            >
                                {g.name}
                            </a>
                        ))}
                    </div>
                </Reveal>
            )}
        </div>
    );
}
