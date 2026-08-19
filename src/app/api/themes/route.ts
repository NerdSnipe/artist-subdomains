import { NextResponse } from "next/server";
import { themeList } from "@/themes/registry";

const S3_PREVIEW_BASE = "https://img-artdistrictusa-com.s3.us-west-2.amazonaws.com/website-previews";

// GET /api/themes
// Public — the single source of truth for available website themes/styles.
// Called by the ADUSA backend so it never has to hardcode a theme catalog;
// adding a theme here (registry.ts) makes it available everywhere automatically.
export async function GET() {
    const themes = themeList.map((theme) => ({
        key: theme.key,
        name: theme.name,
        description: theme.description,
        palette: theme.palette,
        previewUrl: `${S3_PREVIEW_BASE}/${theme.key}.png`,
        previewWidth: theme.previewWidth,
        previewHeight: theme.previewHeight,
    }));

    // Note: next.config.ts forces Cache-Control: no-store on all routes in this app
    // (subdomain content must never be cached at the edge), so caching for callers
    // of this endpoint is handled by the caller's own fetch revalidation instead.
    return NextResponse.json({ success: true, data: themes });
}
