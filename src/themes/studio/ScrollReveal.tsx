"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delayMs?: number;
}

/**
 * Lightweight fade/rise-in-on-scroll wrapper, built on IntersectionObserver
 * so the whole theme gets tasteful motion without any animation library.
 */
export default function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
            className={clsx(
                "transition-all duration-1000 ease-out will-change-transform",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                className
            )}
        >
            {children}
        </div>
    );
}
