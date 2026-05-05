import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDomainConfig } from "@/lib/artist-api";
import { getArtistData, getArtistName, getProductBySlug } from "@/lib/artist-api";
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
        const imgUrl = product.images?.[0]?.imageUrl ?? product.imageUrl ?? undefined;

        return {
            title: `${product.title} — ${name}`,
            description: product.description?.slice(0, 160),
            openGraph: {
                title: product.title,
                description: product.description?.slice(0, 160),
                images: imgUrl ? [{ url: imgUrl }] : [],
            },
            alternates: { canonical: `https://${domain}/artworks/${slug}` },
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
