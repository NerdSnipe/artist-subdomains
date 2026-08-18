import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDomainConfig, getArtistData, getArtistName, getProductBySlug, marketplaceArtworkUrl } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    params: Promise<{ domain: string; slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { domain, slug } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return { title: "Artwork" };

    try {
        const { product } = await getProductBySlug(config.artistSlug, slug);
        const data = await getArtistData(config.artistSlug);
        const name = getArtistName(data.profile);
        const description = product.description?.slice(0, 160);
        const ogImageUrl = `https://${domain}/artworks/${slug}/opengraph-image`;
        const twitterImageUrl = `https://${domain}/artworks/${slug}/twitter-image`;

        return {
            title: `${product.title} — ${name}`,
            description,
            openGraph: {
                title: product.title,
                description,
                images: [{ url: ogImageUrl, width: 1200, height: 630 }],
            },
            twitter: {
                card: "summary_large_image",
                title: product.title,
                description,
                images: [twitterImageUrl],
            },
            alternates: { canonical: marketplaceArtworkUrl(product) },
        };
    } catch {
        return { title: "Artwork" };
    }
}

export default async function ArtworkDetailPage({ params }: Props) {
    const { domain, slug } = await params;
    const config = await getDomainConfig(domain);
    if (!config) return notFound();

    let productData;
    try {
        productData = await getProductBySlug(config.artistSlug, slug);
    } catch {
        return notFound();
    }

    const data = await getArtistData(config.artistSlug);
    const { ArtworkDetailPage: ThemeArtworkDetailPage } = getThemeModule(config.themeKey);

    const relatedProducts = data.products
        .filter((p) => p.status === "active" && p.slug !== slug && p.id !== productData.product.id)
        .slice(0, 4);

    return (
        <ThemeArtworkDetailPage
            artist={data.profile}
            product={productData.product}
            relatedProducts={relatedProducts}
            domain={domain}
        />
    );
}
