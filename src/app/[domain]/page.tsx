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
    if (!config) return { title: "Artist Portfolio" };

    const data = await getArtistData(config.artistSlug);
    const { profile } = data;
    const name = getArtistName(profile);

    return {
        title: `${name} — Artist`,
        description: profile.bio?.slice(0, 160) ?? `Original artwork by ${name}`,
        openGraph: {
            title: name,
            description: profile.bio?.slice(0, 160) ?? `Original artwork by ${name}`,
            images: profile.profilePhoto ? [{ url: profile.profilePhoto }] : [],
            type: "profile",
        },
        alternates: { canonical: `https://${domain}` },
    };
}

export default async function DomainHomePage({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    const data = await getArtistData(config.artistSlug);
    const { HomePage } = getThemeModule(config.themeKey);

    return (
        <HomePage artist={data.profile} artworks={data.products} domain={domain} />
    );
}
