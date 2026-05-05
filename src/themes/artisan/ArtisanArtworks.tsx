import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";

export default function ArtisanArtworks({ artworks, domain }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="max-w-5xl mx-auto px-6 py-12" style={{ fontFamily: "'Georgia', serif" }}>
            <h1 className="text-3xl text-stone-700 mb-2"><em>Gallery</em></h1>
            <p className="text-sm text-amber-700 mb-10">{active.length} works available</p>

            {active.length === 0 && (
                <p className="text-stone-500 italic">No works currently available.</p>
            )}

            {active.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                    {active.map((artwork) => {
                        const img = getProductImageUrl(artwork);
                        return (
                            <Link
                                key={artwork.id}
                                href={`/${domain}/artworks/${artwork.slug ?? artwork.id}`}
                                className="group block"
                            >
                                <div className="relative aspect-[4/5] bg-amber-100 overflow-hidden mb-3 border border-amber-200">
                                    {img && (
                                        <Image src={img} alt={artwork.title} fill className="object-cover group-hover:scale-103 transition-transform duration-500" />
                                    )}
                                </div>
                                <p className="text-stone-700 text-sm">{artwork.title}</p>
                                {artwork.dimensions && (
                                    <p className="text-xs text-stone-400 mt-0.5">
                                        {artwork.dimensions.width}″ × {artwork.dimensions.height}″
                                    </p>
                                )}
                                <p className="text-amber-700 text-sm mt-0.5">${artwork.price.toLocaleString()}</p>
                            </Link>
                        );
                    })}
                </div>
            )}

            {sold.length > 0 && (
                <div className="border-t border-amber-200 pt-10">
                    <h2 className="text-xl text-stone-500 mb-6"><em>Sold — Past Work</em></h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sold.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="opacity-50">
                                    <div className="relative aspect-square bg-amber-100 overflow-hidden mb-2 border border-amber-200">
                                        {img && <Image src={img} alt={artwork.title} fill className="object-cover grayscale" />}
                                    </div>
                                    <p className="text-xs text-stone-500">{artwork.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
