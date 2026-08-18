import { getDomainConfig, getArtistData } from "@/lib/artist-api";
import { renderArtistOgImage, renderFallbackOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

interface Props {
    params: Promise<{ domain: string }>;
}

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamic = "force-dynamic";

export default async function Image({ params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return renderFallbackOgImage("Artist Portfolio");

    const data = await getArtistData(config.artistSlug);
    return renderArtistOgImage(data.profile);
}
