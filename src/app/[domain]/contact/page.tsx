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
    if (!config) return { title: "Contact" };

    const data = await getArtistData(config.artistSlug);
    const name = getArtistName(data.profile);

    return {
        title: `Contact — ${name}`,
        alternates: { canonical: marketplaceArtistUrl(config.artistSlug) },
    };
}

export default async function ContactPage({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    const data = await getArtistData(config.artistSlug);
    const { ContactPage: ThemeContactPage } = getThemeModule(config.themeKey);

    return <ThemeContactPage artist={data.profile} artworks={data.products} domain={domain} />;
}
