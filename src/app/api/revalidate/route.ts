import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { artistCacheTag } from "@/lib/artist-api";

// Called by the ADUSA backend the moment an artist saves their profile
// (theme change, bio edit, new artwork, etc.) to instantly bust the cache
// for that artist's rendered site, instead of waiting for the 60s ISR window.
//
// POST /api/revalidate
// Headers: x-revalidate-secret: <REVALIDATE_SECRET>
// Body:    { "slug": "artist-slug" }
export async function POST(request: NextRequest) {
    const secret = request.headers.get("x-revalidate-secret");

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const slug = body?.slug as string | undefined;

    if (!slug) {
        return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    revalidateTag(artistCacheTag(slug));

    return NextResponse.json({ revalidated: true, slug, now: Date.now() });
}
