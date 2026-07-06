import { notFound } from "next/navigation";
import { getArtistData } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    params: Promise<{ theme: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function PreviewArtworksPage({ params }: Props) {
    const { theme, slug } = await params;

    let data;
    try {
        data = await getArtistData(slug);
    } catch {
        return notFound();
    }

    const { ArtworksPage } = getThemeModule(theme);

    return <ArtworksPage artist={data.profile} artworks={data.products} domain={`preview/${theme}/${slug}`} />;
}
