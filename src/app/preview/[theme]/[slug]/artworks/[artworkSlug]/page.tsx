import { notFound } from "next/navigation";
import { getArtistData, getProductBySlug } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    params: Promise<{ theme: string; slug: string; artworkSlug: string }>;
}

export const dynamic = "force-dynamic";

export default async function PreviewArtworkDetailPage({ params }: Props) {
    const { theme, slug, artworkSlug } = await params;

    let data;
    let productData;
    try {
        data = await getArtistData(slug);
        productData = await getProductBySlug(slug, artworkSlug);
    } catch {
        return notFound();
    }

    const { ArtworkDetailPage } = getThemeModule(theme);

    const relatedProducts = data.products
        .filter((p) => p.status === "active" && p.slug !== artworkSlug && p.id !== productData.product.id)
        .slice(0, 4);

    return (
        <ArtworkDetailPage
            artist={data.profile}
            product={productData.product}
            relatedProducts={relatedProducts}
            domain={`preview/${theme}/${slug}`}
        />
    );
}
