import Image from "next/image";
import Link from "next/link";
import { getArtistData, getArtistName, getArtistSlugByAccountId } from "@/lib/artist-api";
import { themeList } from "@/themes/registry";

export const dynamic = "force-dynamic";

interface Props {
    searchParams: Promise<{ accountId?: string; slug?: string }>;
}

export default async function PreviewIndex({ searchParams }: Props) {
    const { accountId, slug: slugParam } = await searchParams;

    if (!accountId && !slugParam) {
        return (
            <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "10vh auto", padding: "0 1.5rem" }}>
                <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Theme Preview</h1>
                <p style={{ color: "#555", lineHeight: 1.6 }}>
                    Pass either <code>?accountId=...</code> or <code>?slug=...</code> in the URL to preview
                    every theme for that artist, e.g.:
                </p>
                <pre style={{ background: "#f4f4f4", padding: "0.75rem 1rem", borderRadius: 6, fontSize: 13, overflowX: "auto" }}>
                    /preview?accountId=YOUR_ACCOUNT_ID{"\n"}/preview?slug=artist-slug
                </pre>
            </div>
        );
    }

    let slug = slugParam ?? null;
    if (!slug && accountId) {
        slug = await getArtistSlugByAccountId(accountId);
    }

    if (!slug) {
        return (
            <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "10vh auto", padding: "0 1.5rem" }}>
                <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Artist not found</h1>
                <p style={{ color: "#555" }}>
                    Could not resolve a slug for accountId <code>{accountId}</code>. Double-check the
                    accountId, or pass <code>?slug=...</code> directly if you know it.
                </p>
            </div>
        );
    }

    let data;
    try {
        data = await getArtistData(slug);
    } catch {
        return (
            <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "10vh auto", padding: "0 1.5rem" }}>
                <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Artist not found</h1>
                <p style={{ color: "#555" }}>No artist found for slug <code>{slug}</code>.</p>
            </div>
        );
    }

    const name = getArtistName(data.profile);

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "8vh auto", padding: "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                {data.profile.profilePhoto && (
                    <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                        <Image src={data.profile.profilePhoto} alt={name} fill style={{ objectFit: "cover" }} />
                    </div>
                )}
                <div>
                    <h1 style={{ fontSize: "1.5rem", margin: 0 }}>{name}</h1>
                    <p style={{ color: "#777", margin: 0, fontSize: 14 }}>
                        {data.meta.totalProducts} artwork{data.meta.totalProducts === 1 ? "" : "s"} · slug: {slug}
                    </p>
                </div>
            </div>

            <p style={{ color: "#555", marginBottom: "1.25rem" }}>Pick a theme to preview this artist&apos;s site:</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
                {themeList.map((theme) => (
                    <Link
                        key={theme.key}
                        href={`/preview/${theme.key}/${slug}`}
                        style={{
                            display: "block",
                            border: "1px solid #e2e2e2",
                            borderRadius: 8,
                            padding: "1rem 1.25rem",
                            textDecoration: "none",
                            color: "#111",
                        }}
                    >
                        <strong style={{ display: "block", fontSize: 15 }}>{theme.name}</strong>
                        <span style={{ fontSize: 13, color: "#888" }}>{theme.key}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
