"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Lightweight, dependency-free scroll-reveal used across the theme to give
 * sections a quiet, considered entrance (in place of framer-motion, which
 * isn't installed). Renders visible immediately if IntersectionObserver is
 * unavailable so content is never hidden.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
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
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-[900ms] ease-out will-change-transform ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
