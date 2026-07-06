"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: "div" | "span";
}

/** Small IntersectionObserver-driven fade/rise-in wrapper. Pure CSS transition, no deps. */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
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
                        break;
                    }
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const Tag = as;
    return (
        <Tag
            ref={ref as never}
            className={`transition-all duration-[900ms] ease-out will-change-transform ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
}
