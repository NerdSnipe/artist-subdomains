import { notFound } from "next/navigation";
import { getArtistData } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    children: React.ReactNode;
    params: Promise<{ theme: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function PreviewLayout({ children, params }: Props) {
    const { theme, slug } = await params;

    let data;
    try {
        data = await getArtistData(slug);
    } catch {
        return notFound();
    }

    const { Layout } = getThemeModule(theme);

    return (
        <Layout artist={data.profile} domain={`preview/${theme}/${slug}`}>
            {children}
        </Layout>
    );
}
