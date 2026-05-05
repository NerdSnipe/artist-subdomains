import { getDomainConfig, getArtistData } from "@/lib/artist-api";
import { getThemeModule } from "@/themes/registry";

interface Props {
    children: React.ReactNode;
    params: Promise<{ domain: string }>;
}

export const dynamic = 'force-dynamic';

export default async function DomainLayout({ children, params }: Props) {
    const { domain } = await params;
    const config = await getDomainConfig(domain);

    if (!config) {
        return (
            <div style={{ fontFamily: "sans-serif", textAlign: "center", paddingTop: "20vh" }}>
                <h1>Site not available</h1>
            </div>
        );
    }

    const data = await getArtistData(config.artistSlug);
    const { Layout } = getThemeModule(config.themeKey);

    return <Layout artist={data.profile} domain={domain}>{children}</Layout>;
}
