"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

export default function Reveal({
    children,
    className,
    delay = 0,
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: "div" | "section" | "li" | "span";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref as never}
            style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
            className={clsx(
                "transition-all duration-700 ease-out",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                className
            )}
        >
            {children}
        </Tag>
    );
}
