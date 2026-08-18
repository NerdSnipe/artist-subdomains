import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDomainConfig, getArtistData, getArtistName, marketplaceArtistUrl } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    params: Promise<{ domain: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return { title: "Artworks" };

    const data = await getArtistData(config.artistSlug);
    const name = getArtistName(data.profile);

    const description = `Browse original artwork by ${name}`;

    return {
        title: `Artworks — ${name}`,
        description,
        openGraph: {
            title: `Artworks — ${name}`,
            description,
            images: [{ url: `https://${domain}/opengraph-image`, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `Artworks — ${name}`,
            description,
            images: [`https://${domain}/twitter-image`],
        },
        alternates: { canonical: marketplaceArtistUrl(config.artistSlug) },
    };
}

export default async function ArtworksPage({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    const data = await getArtistData(config.artistSlug);
    const { ArtworksPage: ThemeArtworksPage } = getThemeModule(config.themeKey);

    return <ThemeArtworksPage artist={data.profile} artworks={data.products} domain={domain} />;
}
