import { notFound } from "next/navigation";
import { getDomainConfig, getArtistData } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    children: React.ReactNode;
    params: Promise<{ domain: string }>;
}

export default async function DomainLayout({ children, params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);

    if (!config || !config.isActive) {
        notFound();
    }

    const data = await getArtistData(config.artistSlug);
    const { Layout } = getThemeModule(config.themeKey);

    return (
        <Layout artist={data.profile} domain={domain}>
            {children}
        </Layout>
    );
}
