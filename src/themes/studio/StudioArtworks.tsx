import Image from "next/image";
import Link from "next/link";
import type { ThemePageProps } from "@/themes/types";
import { getProductImageUrl } from "@/lib/artist-api";
import ScrollReveal from "./ScrollReveal";

export default function StudioArtworks({ artworks }: ThemePageProps) {
    const active = artworks.filter((a) => a.status === "active");
    const sold = artworks.filter((a) => a.status === "sold");

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <div className="mb-12 flex flex-col gap-3 border-b border-neutral-800/60 pb-8 md:mb-16">
                <p className="font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-600">
                    Catalogue
                </p>
                <h1 className="font-[family-name:var(--font-studio-display)] text-4xl italic font-light text-neutral-100 md:text-6xl">
                    The Work
                </h1>
                {active.length > 0 && (
                    <p className="font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-widest text-neutral-700">
                        {active.length} {active.length === 1 ? "piece" : "pieces"} available
                    </p>
                )}
            </div>

            {active.length === 0 && sold.length === 0 && (
                <p className="font-[family-name:var(--font-studio-body)] font-light text-neutral-600">
                    New work is being prepared for the studio floor. Check back soon.
                </p>
            )}

            {active.length > 0 && (
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
                    {active.map((artwork, i) => {
                        const img = getProductImageUrl(artwork);
                        return (
                            <ScrollReveal key={artwork.id} delayMs={(i % 4) * 60}>
                                <Link
                                    href={`/artworks/${artwork.slug ?? artwork.id}`}
                                    className="group relative block aspect-square overflow-hidden bg-neutral-900"
                                >
                                    {img && (
                                        <Image
                                            src={img}
                                            alt={artwork.title}
                                            fill
                                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                            className="object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                                        />
                                    )}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <p className="font-[family-name:var(--font-studio-body)] text-sm font-medium text-neutral-50">
                                            {artwork.title}
                                        </p>
                                        <p className="font-[family-name:var(--font-studio-condensed)] text-xs tracking-wide text-neutral-300">
                                            ${artwork.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        );
                    })}
                </div>
            )}

            {sold.length > 0 && (
                <div className="mt-20">
                    <p className="mb-8 font-[family-name:var(--font-studio-condensed)] text-xs uppercase tracking-[0.4em] text-neutral-700">
                        Archive — No Longer Available
                    </p>
                    <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 lg:grid-cols-6">
                        {sold.map((artwork) => {
                            const img = getProductImageUrl(artwork);
                            return (
                                <div key={artwork.id} className="group relative aspect-square overflow-hidden bg-neutral-900">
                                    {img && (
                                        <Image
                                            src={img}
                                            alt={artwork.title}
                                            fill
                                            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                                            className="object-cover opacity-25 grayscale transition-all duration-500 group-hover:opacity-50"
                                        />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-2">
                                        <p className="truncate font-[family-name:var(--font-studio-condensed)] text-[10px] uppercase tracking-wide text-neutral-600">
                                            {artwork.title}
                                        </p>
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
