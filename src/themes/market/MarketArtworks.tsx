import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";

export default function MarketArtworks({ artworks, domain }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-stone-900">All Works</h1>
                <p className="text-sm text-stone-400">{active.length} available</p>
            </div>

            {active.length === 0 && (
                <div className="text-center py-20 text-stone-400">No works currently available.</div>
            )}

            {active.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
                    {active.map((artwork) => {
                        const img = getProductImageUrl(artwork);
                        return (
                            <Link
                                key={artwork.id}
                                href={`/artworks/${artwork.slug ?? artwork.id}`}
                                className="group bg-white border border-stone-100 hover:border-stone-300 transition-colors block"
                            >
                                <div className="relative aspect-square bg-stone-50 overflow-hidden">
                                    {img && (
                                        <Image src={img} alt={artwork.title} fill className="object-cover group-hover:scale-103 transition-transform duration-300" />
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-sm font-semibold text-stone-900 leading-tight mb-1">{artwork.title}</p>
                                    {artwork.dimensions && (
                                        <p className="text-xs text-stone-400 mb-1.5">
                                            {artwork.dimensions.width}″ × {artwork.dimensions.height}″
                                        </p>
                                    )}
                                    <p className="text-base font-bold text-stone-900">${artwork.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {sold.length > 0 && (
                <div className="border-t border-stone-200 pt-10">
                    <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-6">Sold Works</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {sold.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="bg-white border border-stone-100 opacity-60">
                                    <div className="relative aspect-square bg-stone-50 overflow-hidden">
                                        {img && <Image src={img} alt={artwork.title} fill className="object-cover grayscale" />}
                                        <div className="absolute top-1.5 left-1.5 bg-stone-900 text-white text-xs px-1.5 py-0.5 font-medium">SOLD</div>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-xs text-stone-500 font-medium leading-tight">{artwork.title}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
