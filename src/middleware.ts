import { NextRequest, NextResponse } from "next/server";

// Dev-only helper: lets you click through a theme's real nav links (/, /about,
// /artworks, /contact, ...) while browsing a /preview/[theme]/[slug] page locally,
// without needing real subdomain DNS/rewrites. Disabled entirely in production.
const PREVIEW_THEME_COOKIE = "adusa_preview_theme";
const PREVIEW_SLUG_COOKIE = "adusa_preview_slug";

export function middleware(request: NextRequest) {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/preview/")) {
        const [, , theme, slug] = pathname.split("/");
        if (theme && slug) {
            const response = NextResponse.next();
            response.cookies.set(PREVIEW_THEME_COOKIE, theme, { path: "/" });
            response.cookies.set(PREVIEW_SLUG_COOKIE, slug, { path: "/" });
            return response;
        }
        return NextResponse.next();
    }

    const theme = request.cookies.get(PREVIEW_THEME_COOKIE)?.value;
    const slug = request.cookies.get(PREVIEW_SLUG_COOKIE)?.value;

    if (theme && slug) {
        const url = request.nextUrl.clone();
        url.pathname = `/preview/${theme}/${slug}${pathname === "/" ? "" : pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico).*)"],
};
