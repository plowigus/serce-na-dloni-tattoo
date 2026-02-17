"use client";

import { useRef } from "react";
import Image from "next/image";
// ZACHOWANO IMPORT ZGODNIE Z PROŚBĄ:
import momoImg from "../../../public/images/about.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Rejestracja wtyczki (bezpieczna, bo GSAP sam sprawdza czy już zarejestrowana)
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutEditorial() {
    const container = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLSpanElement>(null);


    useGSAP(() => {

        if (!textRef.current || !bgTextRef.current) return;

        const titleAnim = gsap.from(".anim-title-element", {
            scrollTrigger: {
                trigger: ".anim-title-wrapper",
                start: "top 70%",
                end: "bottom top",
                toggleActions: "play reverse play reverse",

            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
        });

        // 2. ANIMACJA GŁÓWNEGO TEKSTU
        const textAnim = gsap.from(".anim-text-child", {
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 70%",
                toggleActions: "play reverse play reverse",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
        });

        // 3. PRZESUWANIE TEKSTU W TLE (Background Parallax)
        const bgAnim = gsap.to(bgTextRef.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true,
            },
            xPercent: -40,
            ease: "none",
        });



    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-primary-50 py-24 md:py-48 overflow-hidden">

            {/* DEKORACJA TŁA */}
            <div className="absolute top-20 left-0 w-full opacity-[0.04] pointer-events-none select-none overflow-hidden mix-blend-multiply">
                <span ref={bgTextRef} className="text-[25vw] font-serif italic text-primary-900 leading-none whitespace-nowrap inline-block pl-[20vw] will-change-transform">
                    Serce na dłoni
                </span>
            </div>

            <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">

                    {/* KOLUMNA 1: STICKY HEADING */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-auto lg:h-fit mb-16 lg:mb-0 anim-title-wrapper z-20">

                        <div className="anim-title-element overflow-hidden mb-6">
                            <span className="block text-sm font-bold tracking-[0.3em] uppercase text-primary-950  pb-2 w-fit">
                                ( 01 — O mnie )
                            </span>
                        </div>

                        <h2 className="font-serif text-6xl md:text-7xl xl:text-8xl text-primary-900 leading-[0.95] tracking-tight">
                            <div className="overflow-hidden">
                                <span className="py-1 anim-title-element block will-change-transform">Więcej</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="anim-title-element block pb-3 italic text-primary-500 ml-4 md:ml-8 will-change-transform">niż tylko</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="anim-title-element block pl-4 text-right md:text-left md:ml-16 will-change-transform">tusz.</span>
                            </div>
                        </h2>
                    </div>

                    {/* KOLUMNA 2: GŁÓWNA TREŚĆ */}
                    <div ref={textRef} className="lg:col-span-4 lg:mt-48 space-y-10 relative z-20">
                        <div className="space-y-8 text-primary-900 text-xl font-light leading-relaxed text-justify">
                            <p className="anim-text-child will-change-transform">
                                Cześć, tu Momo. Moja pracownia to miejsce, gdzie sztuka spotyka się z empatią.
                                Nie traktuję skóry jak papieru, a Ciebie jak klienta z kolejki.
                            </p>
                            <p className="anim-text-child will-change-transform">
                                Każdy projekt zaczynam od rozmowy. Chcę zrozumieć nie tylko "co" chcesz wytatuować,
                                ale "dlaczego". Wierzę w minimalizm, który niesie maksymalny ładunek emocjonalny.
                            </p>
                        </div>

                        {/* CYTAT */}
                        <div className="anim-text-child pl-8 border-l-2 border-primary-950 py-4 my-8 will-change-transform">
                            <p className="font-serif italic text-3xl md:text-4xl text-primary-900 leading-tight">
                                "Tatuaż to najintymniejsza forma sztuki. Staje się częścią naszej tożsamości."
                            </p>
                        </div>
                    </div>

                    {/* KOLUMNA 3: ZDJĘCIE (STATYCZNE) */}
                    <div className="lg:col-span-4 relative mt-16 lg:mt-0 overflow-hidden rounded-[20px]">
                        <div className="relative w-full aspect-3/4 shadow-2xl shadow-primary-900/10 z-10 grayscale-20 hover:grayscale-0 transition-all duration-700">
                            <Image
                                src={momoImg}
                                alt="Momo przy pracy"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                placeholder="blur"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}