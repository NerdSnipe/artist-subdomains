import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";

export default function GalleryArtworks({ artworks, domain }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-xs tracking-widest uppercase text-neutral-400 mb-10">
                Artworks
            </h1>

            {active.length === 0 && (
                <p className="text-neutral-400 font-light">No works currently available.</p>
            )}

            {active.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {active.map((artwork) => {
                        const imgUrl = getProductImageUrl(artwork);
                        return (
                            <Link
                                key={artwork.id}
                                href={`/artworks/${artwork.slug ?? artwork.id}`}
                                className="group block"
                            >
                                <div className="relative aspect-square bg-neutral-100 overflow-hidden mb-3">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-neutral-200" />
                                    )}
                                </div>
                                <p className="text-sm font-light">{artwork.title}</p>
                                {artwork.dimensions && (
                                    <p className="text-xs text-neutral-400">
                                        {artwork.dimensions.width} × {artwork.dimensions.height} {artwork.dimensions.unit}
                                    </p>
                                )}
                                <p className="text-sm text-neutral-400">${artwork.price.toLocaleString()}</p>
                            </Link>
                        );
                    })}
                </div>
            )}

            {sold.length > 0 && (
                <div>
                    <h2 className="text-xs tracking-widest uppercase text-neutral-400 mb-6 border-t border-neutral-100 pt-10">
                        Sold Works
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sold.map((artwork) => {
                            const imgUrl = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="group block opacity-60">
                                    <div className="relative aspect-square bg-neutral-100 overflow-hidden mb-2">
                                        {imgUrl ? (
                                            <Image
                                                src={imgUrl}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover grayscale"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-200" />
                                        )}
                                        <div className="absolute top-2 right-2 bg-neutral-900 text-white text-xs px-2 py-0.5 tracking-widest uppercase">
                                            Sold
                                        </div>
                                    </div>
                                    <p className="text-xs font-light">{artwork.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
