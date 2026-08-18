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

    return {
        metadataBase: new URL(`https://${domain}`),
        title: `${name} — Artist`,
        description: data.profile.bio?.slice(0, 160) ?? `Original artwork by ${name}`,
        openGraph: {
            title: name,
            description: data.profile.bio?.slice(0, 160) ?? `Original artwork by ${name}`,
            type: "profile",
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
