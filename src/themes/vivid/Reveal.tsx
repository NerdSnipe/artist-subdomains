"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delayMs?: number;
    style?: CSSProperties;
}

/**
 * Lightweight scroll-triggered reveal, pure IntersectionObserver + CSS
 * transition — part of Vivid's kinetic, alive feel without any animation
 * library.
 */
export default function Reveal({ children, className = "", delayMs = 0, style }: RevealProps) {
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
            { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out will-change-transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
            style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms", ...style }}
        >
            {children}
        </div>
    );
}
