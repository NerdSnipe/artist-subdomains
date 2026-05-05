import { NextResponse } from "next/server";
import { getDomainConfig } from "@/lib/artist-api";

export const dynamic = 'force-dynamic';

export async function GET() {
    const config = await getDomainConfig("heiko-katins-art.artsdistrictusa.com");
    return NextResponse.json({ config, apiUrl: process.env.ARTIST_API_URL });
}
