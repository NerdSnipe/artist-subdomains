"use client";

import { useEffect } from "react";

interface Props {
    accent: string;
}

export default function DynamicColorProvider({ accent }: Props) {
    useEffect(() => {
        document.documentElement.style.setProperty("--accent", accent);
        return () => {
            document.documentElement.style.removeProperty("--accent");
        };
    }, [accent]);

    return null;
}
