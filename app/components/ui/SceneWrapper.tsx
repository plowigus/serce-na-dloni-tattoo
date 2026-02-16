"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HeartsBackground = dynamic(
    () => import("./HeartsBackground"),
    { ssr: false }
);

// Global flag – survives component unmount/remount cycles.
// Once the initial 1300ms delay has fired, every subsequent mount is instant.
let isGlobalLoaded = false;

export default function SceneWrapper() {
    const [mountCanvas, setMountCanvas] = useState(isGlobalLoaded);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // --- Delay logic (first load only) ---
    useEffect(() => {
        if (isGlobalLoaded) return;

        const timer = setTimeout(() => {
            const activate = () => {
                isGlobalLoaded = true;
                setMountCanvas(true);
            };

            if ("requestIdleCallback" in window) {
                (window as unknown as { requestIdleCallback: (cb: () => void) => void })
                    .requestIdleCallback(activate);
            } else {
                activate();
            }
        }, 1300);

        return () => clearTimeout(timer);
    }, []);

    // --- Scroll-driven clip: confine canvas to Hero area only ---
    useEffect(() => {
        if (!mountCanvas) return;

        const onScroll = () => {
            const el = wrapperRef.current;
            if (!el) return;

            const scrollY = window.scrollY;
            const heroH = window.innerHeight; // Hero = 100dvh ≈ innerHeight

            if (scrollY <= 0) {
                el.style.clipPath = "none";
            } else if (scrollY >= heroH) {
                el.style.clipPath = "inset(0 0 100% 0)";
            } else {
                el.style.clipPath = `inset(0 0 ${(scrollY / heroH) * 100}% 0)`;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // set initial state
        return () => window.removeEventListener("scroll", onScroll);
    }, [mountCanvas]);

    if (!mountCanvas) return null;

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ willChange: "clip-path" }}
        >
            <HeartsBackground />
        </div>
    );
}