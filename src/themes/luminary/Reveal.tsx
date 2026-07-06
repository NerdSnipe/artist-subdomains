"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    as?: "div" | "span";
}

/**
 * Gentle fade + slight-rise scroll reveal, built purely with IntersectionObserver
 * and inline transition styles (no animation library required).
 */
export default function Reveal({ children, className = "", delay = 0, y = 20, as = "div" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const Tag = as;
    return (
        <Tag
            ref={ref as never}
            className={`transition-[opacity,transform] duration-[1100ms] ease-out will-change-transform ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
            }}
        >
            {children}
        </Tag>
    );
}
