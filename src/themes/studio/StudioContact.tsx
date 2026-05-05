import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function StudioContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-3xl mx-auto px-8 py-16">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-700 mb-12">Contact</p>
            <h1 className="text-4xl font-extralight tracking-tight text-neutral-100 mb-2">{name}</h1>
            {artist.city && (
                <p className="text-xs tracking-[0.2em] uppercase text-neutral-600 mb-12">
                    {artist.city}{artist.state ? `, ${artist.state}` : ""}
                </p>
            )}

            {artist.acceptsCommissions && artist.acceptsCommissions !== "no" && (
                <div className="border border-neutral-800 p-6 mb-10">
                    <p className="text-xs tracking-[0.2em] uppercase text-neutral-600 mb-3">Commissions</p>
                    <p className="text-neutral-400 font-light leading-relaxed text-sm">
                        {artist.commissionDescription ?? "Commission inquiries welcome. Contact below."}
                    </p>
                </div>
            )}

            <div className="space-y-5">
                {artist.email && (
                    <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                        <span className="text-xs tracking-[0.2em] uppercase text-neutral-700 pt-0.5">Email</span>
                        <a href={`mailto:${artist.email}`} className="text-neutral-400 hover:text-neutral-100 text-sm underline">{artist.email}</a>
                    </div>
                )}
                {artist.instagram && (
                    <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                        <span className="text-xs tracking-[0.2em] uppercase text-neutral-700 pt-0.5">Instagram</span>
                        <a href={`https://instagram.com/${artist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-100 text-sm underline">
                            @{artist.instagram.replace("@", "")}
                        </a>
                    </div>
                )}
                {artist.website && (
                    <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                        <span className="text-xs tracking-[0.2em] uppercase text-neutral-700 pt-0.5">Web</span>
                        <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-100 text-sm underline">{artist.website}</a>
                    </div>
                )}
                {artist.slug && (
                    <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                        <span className="text-xs tracking-[0.2em] uppercase text-neutral-700 pt-0.5">Profile</span>
                        <a href={`https://artdistrictusa.com/artist/${artist.slug}`} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-100 text-sm underline">artdistrictusa.com</a>
                    </div>
                )}
            </div>
        </div>
    );
}
