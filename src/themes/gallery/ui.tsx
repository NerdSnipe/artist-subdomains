import { BadgeCheck } from "lucide-react";
import type { Product } from "@/types";

/**
 * Shared museum-label presentational primitives used across the Gallery
 * ("The White Cube") theme. All pure/server-safe — no client interactivity.
 */

export function SectionLabel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p
            className={`font-[family-name:var(--font-sans)] text-[11px] tracking-[0.28em] uppercase text-[#8C8478] ${className}`}
        >
            {children}
        </p>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    className = "",
}: {
    eyebrow?: string;
    title: string;
    className?: string;
}) {
    return (
        <div className={`flex items-end justify-between gap-6 border-b border-[#E3DCCE] pb-5 ${className}`}>
            <div>
                {eyebrow && <SectionLabel className="mb-2">{eyebrow}</SectionLabel>}
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal text-[#1B1812] tracking-tight">
                    {title}
                </h2>
            </div>
        </div>
    );
}

export function VerifiedBadge({ className = "" }: { className?: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 font-[family-name:var(--font-sans)] text-[11px] tracking-[0.16em] uppercase text-[#6B6459] ${className}`}
        >
            <BadgeCheck size={14} strokeWidth={1.75} className="text-[#8C8478]" />
            Verified Artist
        </span>
    );
}

function formatDimensions(product: Product): string | null {
    if (!product.dimensions) return null;
    const { width, height, depth, unit } = product.dimensions;
    const unitLabel = unit === "inches" ? "in" : "cm";
    return `${width} × ${height}${depth ? ` × ${depth}` : ""} ${unitLabel}`;
}

/**
 * A wall-label style caption: Title (italic serif), then a single muted line
 * of medium, dimensions and year — exactly how a gallery checklist reads.
 */
export function WallLabel({
    product,
    showPrice = true,
    className = "",
}: {
    product: Product;
    showPrice?: boolean;
    className?: string;
}) {
    const meta = [product.medium, formatDimensions(product), product.yearCreated ? String(product.yearCreated) : null]
        .filter(Boolean)
        .join(", ");

    return (
        <div className={className}>
            <p className="font-[family-name:var(--font-display)] italic text-[15px] text-[#1B1812] leading-snug">
                {product.title}
            </p>
            {meta && (
                <p className="font-[family-name:var(--font-sans)] text-[12px] text-[#8C8478] mt-1 leading-relaxed">
                    {meta}
                </p>
            )}
            {showPrice && product.status !== "sold" && (
                <p className="font-[family-name:var(--font-sans)] text-[12px] text-[#57514A] mt-1 tracking-wide">
                    ${product.price.toLocaleString()}
                </p>
            )}
            {product.status === "sold" && (
                <p className="font-[family-name:var(--font-sans)] text-[11px] tracking-[0.16em] uppercase text-[#8C8478] mt-1">
                    Sold
                </p>
            )}
        </div>
    );
}

export function PullQuote({
    quote,
    author,
    role,
}: {
    quote: string;
    author: string;
    role?: string;
}) {
    return (
        <figure className="max-w-2xl">
            <blockquote className="font-[family-name:var(--font-display)] italic text-xl md:text-2xl leading-relaxed text-[#1B1812]">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-[family-name:var(--font-sans)] text-[11px] tracking-[0.2em] uppercase text-[#8C8478]">
                {author}
                {role ? ` — ${role}` : ""}
            </figcaption>
        </figure>
    );
}
