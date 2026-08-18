import { getDomainConfig, getArtistData, getArtistName, getProductBySlug } from "@/lib/artist-api";
import { renderArtworkOgImage, renderFallbackOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

interface Props {
    params: Promise<{ domain: string; slug: string }>;
}

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const dynamic = "force-dynamic";

export default async function Image({ params }: Props) {
    const { domain, slug } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return renderFallbackOgImage("Artwork");

    try {
        const { product } = await getProductBySlug(config.artistSlug, slug);
        const data = await getArtistData(config.artistSlug);
        return renderArtworkOgImage(product, getArtistName(data.profile));
    } catch {
        return renderFallbackOgImage("Artwork");
    }
}
