"use client";

import { useEffect, useState } from "react";
import { Instagram, Facebook, Music2, Mail, Phone, Check } from "lucide-react";
import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";
import Reveal from "./Reveal";

export default function AnthemNoirContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);
    const acceptsCommissions = artist.acceptsCommissions === "Yes";
    const [isCommission, setIsCommission] = useState(false);
    const [status, setStatus] = useState<"idle" | "sent">("idle");

    // Nav's "Commission" link points at /contact#commission — land there with the commission
    // tab pre-selected instead of just scrolling to a generic form. Also listens for
    // hashchange, not just mount: if the visitor is already sitting on /contact and clicks
    // Commission in the nav, Next's App Router treats that as a same-page hash navigation
    // (no remount), so a mount-only check would silently miss it.
    useEffect(() => {
        if (typeof window === "undefined" || !acceptsCommissions) return;
        const checkHash = () => {
            if (window.location.hash === "#commission") setIsCommission(true);
        };
        checkHash();
        window.addEventListener("hashchange", checkHash);
        return () => window.removeEventListener("hashchange", checkHash);
    }, [acceptsCommissions]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sent");
    }

    return (
        <div id="commission" className="max-w-[1100px] mx-auto px-5 md:px-10 py-16 md:py-24 scroll-mt-[100px]">
            <Reveal>
                <p className="text-[13px] font-bold tracking-[0.22em] uppercase text-[#C9A227] mb-4">Get in Touch</p>
                <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl leading-[0.92] mb-8">
                    Let&apos;s Make
                    <br />
                    Something.
                </h1>
                {acceptsCommissions && (
                    <p className="text-lg text-[#E9DFC9]/80 max-w-[600px] mb-12">
                        {name} is currently accepting commission requests. Have a space, a color story, or a story in
                        mind? Tell us about it below and we&apos;ll follow up within a few days.
                    </p>
                )}
            </Reveal>

            <Reveal delay={80}>
                <div className="border-4 border-[#E9DFC9]">
                    {status === "sent" ? (
                        <div className="p-10 md:p-14 flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#C9A227] border-2 border-[#E9DFC9] flex items-center justify-center">
                                <Check size={28} strokeWidth={3} className="text-[#0C0B09]" />
                            </div>
                            <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl">Message Sent</h2>
                            <p className="text-[#E9DFC9]/70 max-w-[420px]">
                                Thanks for reaching out — {name.split(" ")[0]} will get back to you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 md:p-10 grid grid-cols-1 gap-6">
                            {acceptsCommissions && (
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCommission(false)}
                                        className={`flex-1 text-xs font-bold uppercase tracking-widest px-4 py-3 border-2 border-[#E9DFC9] transition-colors ${
                                            !isCommission ? "bg-[#E9DFC9] text-[#0C0B09]" : "bg-transparent text-[#E9DFC9] hover:bg-[#E9DFC9]/10"
                                        }`}
                                    >
                                        General Inquiry
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCommission(true)}
                                        className={`flex-1 text-xs font-bold uppercase tracking-widest px-4 py-3 border-2 border-[#E9DFC9] transition-colors ${
                                            isCommission ? "bg-[#E9DFC9] text-[#0C0B09]" : "bg-transparent text-[#E9DFC9] hover:bg-[#E9DFC9]/10"
                                        }`}
                                    >
                                        Commission a Piece
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]">Name</span>
                                    <input required type="text" name="name" className="border-2 border-[#E9DFC9] px-4 py-3 bg-[#0C0B09] text-[#E9DFC9] focus:outline-none focus:bg-black" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]">Email</span>
                                    <input required type="email" name="email" className="border-2 border-[#E9DFC9] px-4 py-3 bg-[#0C0B09] text-[#E9DFC9] focus:outline-none focus:bg-black" />
                                </label>
                            </div>

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]">Phone (optional)</span>
                                <input type="tel" name="phone" className="border-2 border-[#E9DFC9] px-4 py-3 bg-[#0C0B09] text-[#E9DFC9] focus:outline-none focus:bg-black" />
                            </label>

                            {isCommission && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]">Approximate Size</span>
                                        <input type="text" name="size" placeholder='e.g. 36" x 48"' className="border-2 border-[#E9DFC9] px-4 py-3 bg-[#0C0B09] text-[#E9DFC9] placeholder:text-[#E9DFC9]/40 focus:outline-none focus:bg-black" />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]">Budget Range</span>
                                        <input type="text" name="budget" placeholder="e.g. $1,500 – $2,500" className="border-2 border-[#E9DFC9] px-4 py-3 bg-[#0C0B09] text-[#E9DFC9] placeholder:text-[#E9DFC9]/40 focus:outline-none focus:bg-black" />
                                    </label>
                                </div>
                            )}

                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#E9DFC9]">
                                    {isCommission ? "Tell us about the piece you have in mind" : "Message"}
                                </span>
                                <textarea
                                    required
                                    name="message"
                                    rows={5}
                                    placeholder={isCommission ? "Space, colors, inspiration, timeline…" : ""}
                                    className="border-2 border-[#E9DFC9] px-4 py-3 bg-[#0C0B09] text-[#E9DFC9] placeholder:text-[#E9DFC9]/40 focus:outline-none focus:bg-black resize-none"
                                />
                            </label>

                            <button
                                type="submit"
                                className="inline-block bg-[#E9DFC9] text-[#0C0B09] font-bold uppercase tracking-[0.1em] text-sm px-7 py-4 hover:bg-[#C9A227] transition-colors w-full md:w-auto md:self-start"
                            >
                                {isCommission ? "Send Commission Request" : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </Reveal>

            <Reveal delay={140}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b-4 border-[#E9DFC9] pb-10 mt-14">
                    <div className="space-y-5">
                        {artist.email && (
                            <a href={`mailto:${artist.email}`} className="flex items-center gap-3 font-bold hover:text-[#C9A227]">
                                <Mail size={20} /> {artist.email}
                            </a>
                        )}
                        {artist.phone && (
                            <a href={`tel:${artist.phone}`} className="flex items-center gap-3 font-bold hover:text-[#C9A227]">
                                <Phone size={20} /> {artist.phone}
                            </a>
                        )}
                        {(artist.city || artist.state) && (
                            <p className="text-[#E9DFC9]/60 text-sm uppercase tracking-wide">
                                {[artist.city, artist.state].filter(Boolean).join(", ")}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        {artist.instagram && (
                            <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold hover:text-[#C9A227]">
                                <Instagram size={20} /> Instagram
                            </a>
                        )}
                        {artist.facebook && (
                            <a href={artist.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold hover:text-[#C9A227]">
                                <Facebook size={20} /> Facebook
                            </a>
                        )}
                        {artist.tiktok && (
                            <a href={artist.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-bold hover:text-[#C9A227]">
                                <Music2 size={20} /> TikTok
                            </a>
                        )}
                    </div>
                </div>
            </Reveal>

            {artist.galleries && artist.galleries.length > 0 && (
                <Reveal delay={180} className="mt-10">
                    <h2 className="font-[family-name:var(--font-display)] uppercase text-2xl mb-6">Also Available Through</h2>
                    <div className="flex flex-wrap gap-4">
                        {artist.galleries.map((g, i) => (
                            <a
                                key={i}
                                href={g.url ?? g.link ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-[#E9DFC9] px-5 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#E9DFC9] hover:text-[#0C0B09] transition-colors"
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
