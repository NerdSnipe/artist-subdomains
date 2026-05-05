import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default function middleware(req: NextRequest) {
    const host = req.headers.get("host") ?? "";
    // Strip www. prefix and port (for local dev)
    const domain = host.replace(/^www\./, "").split(":")[0];

    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // Already under a domain segment — don't double-wrap
    // This can happen if the request path already starts with the domain (e.g. during ISR)
    if (pathname.startsWith(`/${domain}`)) {
        return NextResponse.next();
    }

    url.pathname = `/${domain}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
}
