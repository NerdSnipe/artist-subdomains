import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-900 underline"
        >
            {label}
        </a>
    );
}

export default function GalleryContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    const socials: { href: string | null | undefined; label: string }[] = [
        { href: artist.instagram ? `https://instagram.com/${artist.instagram.replace("@", "")}` : null, label: "Instagram" },
        { href: artist.facebook, label: "Facebook" },
        { href: artist.twitter ? `https://twitter.com/${artist.twitter.replace("@", "")}` : null, label: "Twitter" },
        { href: artist.website, label: "Website" },
    ].filter((s) => !!s.href);

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-xs tracking-widest uppercase text-neutral-400 mb-10">Contact</h1>

            <h2 className="text-2xl font-light mb-2">{name}</h2>

            {artist.city && (
                <p className="text-sm text-neutral-400 mb-8">
                    {artist.city}{artist.state ? `, ${artist.state}` : ""}
                </p>
            )}

            {/* Commission section */}
            {artist.acceptsCommissions && artist.acceptsCommissions !== "no" && (
                <div className="mb-10 p-6 border border-neutral-100 bg-neutral-50">
                    <h3 className="text-xs tracking-widest uppercase text-neutral-400 mb-3">Commissions</h3>
                    <p className="text-sm font-light text-neutral-600 leading-relaxed">
                        {artist.commissionDescription ??
                            "This artist accepts commission inquiries. Please reach out to discuss your project."}
                    </p>
                </div>
            )}

            {/* Contact links */}
            <div className="space-y-3">
                {artist.email && (
                    <div className="flex gap-4 text-sm">
                        <span className="text-neutral-400 w-20 shrink-0 text-xs tracking-widest uppercase pt-0.5">
                            Email
                        </span>
                        <a
                            href={`mailto:${artist.email}`}
                            className="text-neutral-600 hover:text-neutral-900 underline"
                        >
                            {artist.email}
                        </a>
                    </div>
                )}
                {artist.website && (
                    <div className="flex gap-4 text-sm">
                        <span className="text-neutral-400 w-20 shrink-0 text-xs tracking-widest uppercase pt-0.5">
                            Website
                        </span>
                        <a
                            href={artist.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 hover:text-neutral-900 underline"
                        >
                            {artist.website}
                        </a>
                    </div>
                )}
            </div>

            {/* Social links */}
            {socials.length > 0 && (
                <div className="mt-10 border-t border-neutral-100 pt-8">
                    <h3 className="text-xs tracking-widest uppercase text-neutral-400 mb-4">Social</h3>
                    <div className="flex gap-6">
                        {socials.map((s) => (
                            <SocialLink key={s.label} href={s.href!} label={s.label} />
                        ))}
                    </div>
                </div>
            )}

            {/* ArtDistrictUSA profile link */}
            {artist.slug && (
                <div className="mt-10 border-t border-neutral-100 pt-8">
                    <a
                        href={`https://artdistrictusa.com/artist/${artist.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-400 hover:text-neutral-700 underline"
                    >
                        View full profile on ArtDistrictUSA →
                    </a>
                </div>
            )}
        </div>
    );
}
