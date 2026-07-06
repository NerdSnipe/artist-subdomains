"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delayMs?: number;
}

/**
 * Lightweight scroll-reveal wrapper using IntersectionObserver.
 * No animation libraries — just a Tailwind transition toggled by a class.
 */
export default function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
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
            className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
            style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
        >
            {children}
        </div>
    );
}
