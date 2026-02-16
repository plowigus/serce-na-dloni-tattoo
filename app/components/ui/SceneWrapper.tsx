"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamiczny import wewnątrz Client Componentu
const HeartsBackground = dynamic(
    () => import("./HeartsBackground"),
    { ssr: false }
);

export default function SceneWrapper() {
    const [mountCanvas, setMountCanvas] = useState(false);

    useEffect(() => {
        // Logika opóźnienia, którą mieliśmy w page.tsx
        // Czekamy, aż główny wątek obsłuży HTML/CSS
        const timer = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => setMountCanvas(true));
            } else {
                setMountCanvas(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!mountCanvas) return null;

    return (
        <div className="absolute inset-0 z-0">
            <HeartsBackground />
        </div>
    );
}