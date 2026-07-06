import { notFound } from "next/navigation";
import { getArtistData } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    params: Promise<{ theme: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function PreviewHomePage({ params }: Props) {
    const { theme, slug } = await params;

    let data;
    try {
        data = await getArtistData(slug);
    } catch {
        return notFound();
    }

    const { HomePage } = getThemeModule(theme);

    return <HomePage artist={data.profile} artworks={data.products} domain={`preview/${theme}/${slug}`} />;
}
