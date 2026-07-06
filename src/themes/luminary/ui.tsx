import Link from "next/link";
import clsx from "clsx";

/** Small tracked-out label used above section headlines throughout the theme. */
export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span
            className={clsx(
                "font-sans inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a9769f]",
                className
            )}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#f3b6d0] to-[#b6c8f3]" />
            {children}
        </span>
    );
}

/** Filled pill CTA — internal (Link) or external (anchor) depending on href shape. */
export function PillButton({
    href,
    children,
    variant = "solid",
    external = false,
    className = "",
}: {
    href: string;
    children: React.ReactNode;
    variant?: "solid" | "outline";
    external?: boolean;
    className?: string;
}) {
    const base =
        "font-sans inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-300";
    const styles =
        variant === "solid"
            ? "bg-[#3a3240] text-white hover:bg-[#a9769f] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#e8b9d6]/40"
            : "border border-[#3a3240]/25 text-[#3a3240] hover:border-[#a9769f] hover:text-[#a9769f] hover:-translate-y-0.5";

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={clsx(base, styles, className)}>
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className={clsx(base, styles, className)}>
            {children}
        </Link>
    );
}

/** Small artwork palette swatches sourced from Product.dominantColors. */
export function PaletteDots({ colors }: { colors: Array<{ name: string; hex: string }> }) {
    return (
        <div className="flex flex-wrap gap-3">
            {colors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span
                        className="h-6 w-6 rounded-full ring-1 ring-black/10 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                        title={c.hex}
                    />
                    <span className="font-sans text-xs capitalize text-[#7a7280]">{c.name}</span>
                </div>
            ))}
        </div>
    );
}

/** Thin gradient hairline used to separate sections without heavy borders. */
export function GlowDivider({ className = "" }: { className?: string }) {
    return (
        <div className={clsx("mx-auto h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-[#e3c9dd] to-transparent", className)} />
    );
}
