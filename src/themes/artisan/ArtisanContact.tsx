import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function ArtisanContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-xl mx-auto px-6 py-14" style={{ fontFamily: "'Georgia', serif" }}>
            <h1 className="text-3xl text-stone-700 mb-2"><em>Connect</em></h1>
            <p className="text-sm text-amber-700 mb-10">Reach out to {name}</p>

            {artist.acceptsCommissions && artist.acceptsCommissions !== "no" && (
                <div className="bg-amber-100 border border-amber-300 p-6 mb-8">
                    <h2 className="text-base text-stone-700 mb-2"><em>Commissions Welcome</em></h2>
                    <p className="text-sm text-stone-600 leading-relaxed">
                        {artist.commissionDescription ?? "I love creating custom pieces. Let&rsquo;s talk about bringing your vision to life."}
                    </p>
                </div>
            )}

            <div className="space-y-5 text-sm">
                {artist.email && (
                    <div className="flex gap-5 items-start">
                        <span className="text-amber-700 w-20 shrink-0 text-xs uppercase tracking-widest pt-0.5">Email</span>
                        <a href={`mailto:${artist.email}`} className="text-stone-600 underline hover:text-amber-700">{artist.email}</a>
                    </div>
                )}
                {artist.instagram && (
                    <div className="flex gap-5 items-start">
                        <span className="text-amber-700 w-20 shrink-0 text-xs uppercase tracking-widest pt-0.5">Instagram</span>
                        <a href={`https://instagram.com/${artist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-stone-600 underline hover:text-amber-700">
                            @{artist.instagram.replace("@", "")}
                        </a>
                    </div>
                )}
                {artist.website && (
                    <div className="flex gap-5 items-start">
                        <span className="text-amber-700 w-20 shrink-0 text-xs uppercase tracking-widest pt-0.5">Website</span>
                        <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-stone-600 underline hover:text-amber-700">{artist.website}</a>
                    </div>
                )}
                {artist.slug && (
                    <div className="flex gap-5 items-start pt-4 border-t border-amber-200">
                        <span className="text-amber-700 w-20 shrink-0 text-xs uppercase tracking-widest pt-0.5">Profile</span>
                        <a href={`https://artdistrictusa.com/artist/${artist.slug}`} target="_blank" rel="noopener noreferrer" className="text-stone-500 underline hover:text-amber-700 text-xs">
                            View on ArtDistrictUSA →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
