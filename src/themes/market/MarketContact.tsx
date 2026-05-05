import type { ThemePageProps } from "@/themes/types";
import { getArtistName } from "@/lib/artist-api";

export default function MarketContact({ artist }: ThemePageProps) {
    const name = getArtistName(artist);

    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-stone-900 mb-2">Contact</h1>
            <p className="text-stone-400 text-sm mb-8">Reach out to {name} directly</p>

            {artist.acceptsCommissions && artist.acceptsCommissions !== "no" && (
                <div className="bg-amber-50 border border-amber-200 p-5 mb-8">
                    <h2 className="text-sm font-bold text-amber-900 mb-2">Commissions Open</h2>
                    <p className="text-sm text-amber-700 leading-relaxed">
                        {artist.commissionDescription ?? "This artist accepts custom commission requests. Get in touch to discuss your vision."}
                    </p>
                </div>
            )}

            <div className="bg-white border border-stone-200 p-6 space-y-4">
                {artist.email && (
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Email</p>
                        <a href={`mailto:${artist.email}`} className="text-stone-700 text-sm hover:text-stone-900 underline font-medium">{artist.email}</a>
                    </div>
                )}
                {artist.instagram && (
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Instagram</p>
                        <a href={`https://instagram.com/${artist.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-stone-700 text-sm hover:text-stone-900 underline font-medium">
                            @{artist.instagram.replace("@", "")}
                        </a>
                    </div>
                )}
                {artist.website && (
                    <div>
                        <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Website</p>
                        <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-stone-700 text-sm hover:text-stone-900 underline font-medium">{artist.website}</a>
                    </div>
                )}
                {artist.slug && (
                    <div className="pt-2 border-t border-stone-100">
                        <a href={`https://artdistrictusa.com/artist/${artist.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-stone-700 underline">
                            View profile on ArtDistrictUSA →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
