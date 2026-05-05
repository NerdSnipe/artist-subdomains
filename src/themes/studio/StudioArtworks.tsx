import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";

export default function StudioArtworks({ artworks, domain }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-600 mb-12">Works</p>

            {active.length === 0 && (
                <p className="text-neutral-600 font-light">No works currently available.</p>
            )}

            {active.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mb-1">
                    {active.map((artwork) => {
                        const img = getProductImageUrl(artwork);
                        return (
                            <Link
                                key={artwork.id}
                                href={`/${domain}/artworks/${artwork.slug ?? artwork.id}`}
                                className="group relative aspect-square bg-neutral-900 overflow-hidden block"
                            >
                                {img && (
                                    <Image
                                        src={img}
                                        alt={artwork.title}
                                        fill
                                        className="object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                )}
                                <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <p className="text-white text-sm font-light">{artwork.title}</p>
                                    <p className="text-neutral-400 text-xs">${artwork.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {sold.length > 0 && (
                <div className="mt-16">
                    <p className="text-xs tracking-[0.3em] uppercase text-neutral-700 mb-8">Archive</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
                        {sold.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="relative aspect-square bg-neutral-900">
                                    {img && (
                                        <Image
                                            src={img}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover opacity-30 grayscale"
                                        />
                                    )}
                                    <div className="absolute bottom-2 left-2">
                                        <p className="text-neutral-500 text-xs">{artwork.title}</p>
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
