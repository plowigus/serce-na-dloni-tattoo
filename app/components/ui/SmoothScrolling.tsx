"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrolling() {
    useEffect(() => {
        // 1. Inicjalizacja Lenis
        const lenis = new Lenis({
            duration: 1.2, // Czas trwania "dojazdu" scrolla (im więcej, tym bardziej "pływa")
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Elegancka krzywa bezwładności
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            // touchMultiplier: 2, // Opcjonalnie: Czułość na dotyk
        });

        // 2. Synchronizacja z GSAP ScrollTrigger
        // Mówimy ScrollTriggerowi, żeby aktualizował się, gdy Lenis przewija
        lenis.on('scroll', ScrollTrigger.update);

        // 3. Podpięcie pod Ticker GSAP
        // Zamiast używać requestAnimationFrame Lenisa, używamy tickera GSAP.
        // Dzięki temu scroll i animacje są w tej samej klatce renderowania.
        const update = (time: number) => {
            lenis.raf(time * 1000); // Lenis wymaga czasu w ms
        };

        gsap.ticker.add(update);

        // Wyłączenie lagSmoothing GSAP (ważne przy smooth scrollu, żeby nie było "skoków")
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return null; // Ten komponent nie renderuje nic wizualnego
}