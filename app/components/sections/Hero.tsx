"use client";

import HeartsBackground from "@/app/components/ui/HeartsBackground";

export default function Hero() {
    return (
        <section
            className="relative w-full h-dvh overflow-hidden bg-primary-50 block"
            aria-label="Hero Background Test"
        >
            <HeartsBackground />
        </section>
    );
}