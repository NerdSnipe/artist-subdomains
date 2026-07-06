import { ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function VerifiedBadge({
    className,
    label = "Verified Artist",
}: {
    className?: string;
    label?: string;
}) {
    return (
        <span
            className={clsx(
                "inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/40 bg-[#c9a96e]/[0.06] backdrop-blur-md px-3.5 py-1.5 text-[9px] tracking-[0.3em] uppercase text-[#c9a96e] font-light",
                className
            )}
        >
            <ShieldCheck size={12} strokeWidth={1.5} className="shrink-0" />
            {label}
        </span>
    );
}
