"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delayMs?: number;
}

/**
 * Lightweight fade/rise-in reveal on scroll, using IntersectionObserver only —
 * no animation libraries. Respects reduced-motion by revealing immediately.
 */
export default function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={clsx(
                "transition-all duration-[1200ms] ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                className
            )}
            style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
        >
            {children}
        </div>
    );
}
