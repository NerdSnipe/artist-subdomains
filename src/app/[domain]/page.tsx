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
    if (!config) return { title: "Artist Portfolio" };

    const data = await getArtistData(config.artistSlug);
    const name = getArtistName(data.profile);

    const description = data.profile.bio?.slice(0, 160) ?? `Original artwork by ${name}`;
    const ogImageUrl = `https://${domain}/opengraph-image`;
    const twitterImageUrl = `https://${domain}/twitter-image`;

    return {
        title: `${name} — Artist`,
        description,
        openGraph: {
            title: name,
            description,
            type: "profile",
            images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: name,
            description,
            images: [twitterImageUrl],
        },
        alternates: { canonical: marketplaceArtistUrl(config.artistSlug) },
    };
}

export default async function DomainHomePage({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    const data = await getArtistData(config.artistSlug);
    const { HomePage } = getThemeModule(config.themeKey);

    return <HomePage artist={data.profile} artworks={data.products} domain={domain} />;
}
