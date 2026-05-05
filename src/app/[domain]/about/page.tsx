import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDomainConfig } from "@/lib/artist-api";
import { getArtistData, getArtistName } from "@/lib/artist-api";
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

    return {
        title: `About — ${name}`,
        description: data.profile.bio?.slice(0, 160) ?? `About ${name}`,
        alternates: { canonical: `https://${domain}/about` },
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
