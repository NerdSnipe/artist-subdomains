import postgres from "postgres";
import { cache } from "react";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require", max: 5 });

export interface DomainConfig {
    artistSlug: string;
    themeKey: string;
    isActive: boolean;
}

export const getDomainConfig = cache(async (domain: string): Promise<DomainConfig | null> => {
    try {
        const rows = await sql<DomainConfig[]>`
            SELECT "artistSlug", "themeKey", "isActive"
            FROM "ArtistCustomDomain"
            WHERE "domainName" = ${domain}
            LIMIT 1
        `;
        if (!rows.length || !rows[0].isActive) return null;
        return rows[0];
    } catch (err) {
        console.error("getDomainConfig error:", err);
        return null;
    }
});
