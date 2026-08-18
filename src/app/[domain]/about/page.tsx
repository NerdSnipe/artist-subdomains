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
    if (!config) return { title: "About" };

    const data = await getArtistData(config.artistSlug);
    const name = getArtistName(data.profile);

    const description = data.profile.bio?.slice(0, 160) ?? `About ${name}`;

    return {
        title: `About — ${name}`,
        description,
        openGraph: {
            title: `About — ${name}`,
            description,
            images: [{ url: `https://${domain}/opengraph-image`, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `About — ${name}`,
            description,
            images: [`https://${domain}/twitter-image`],
        },
        alternates: { canonical: marketplaceArtistUrl(config.artistSlug) },
    };
}

export default async function AboutPage({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    const data = await getArtistData(config.artistSlug);
    const { AboutPage: ThemeAboutPage } = getThemeModule(config.themeKey);

    return <ThemeAboutPage artist={data.profile} artworks={data.products} domain={domain} />;
}
