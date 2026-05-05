import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDomainConfig, getArtistData, getArtistName } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    params: Promise<{ domain: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return { title: "Artworks" };

    const data = await getArtistData(config.artistSlug);
    const name = getArtistName(data.profile);

    return {
        title: `Artworks — ${name}`,
        description: `Browse original artwork by ${name}`,
        alternates: { canonical: `https://${domain}/artworks` },
    };
}

export default async function ArtworksPage({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    const data = await getArtistData(config.artistSlug);
    const { ArtworksPage: ThemeArtworksPage } = getThemeModule(config.themeKey);

    return (
        <ThemeArtworksPage artist={data.profile} artworks={data.products} domain={domain} />
    );
}
