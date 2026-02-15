"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";

interface HeroProps {
    startAnimation: boolean;
}

export default function Hero({ startAnimation }: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Zabezpieczenie przed podwójną animacją
    const hasAnimated = useRef(false);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useEffect(() => {
        if (startAnimation && !hasAnimated.current) {
            hasAnimated.current = true;
            playIntro();
        }
    }, [startAnimation]);

    const playIntro = contextSafe(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(imgRef.current, { opacity: 1, scale: 1, x: 0, duration: 1.2 })
            .to(textContainerRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
            .to(contentRef.current?.children || [], { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.6");
    });

    return (
        <section ref={containerRef} className="relative h-dvh w-full flex items-center justify-center pt-24 pb-12 overflow-hidden z-10">
            <div className="w-full max-w-6xl px-8 h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center h-full max-h-[85vh]">

                    {/* LEWA STRONA - ZDJĘCIE */}
                    <div className="md:col-span-5 h-full relative flex flex-col justify-center">
                        <div ref={imgRef} className="opacity-0 translate-x-[-30px] scale-95 relative w-full max-w-[450px] aspect-[4/5] max-h-[600px] mx-auto md:mr-auto rounded-[40px] overflow-hidden shadow-2xl shadow-primary-900/5 border border-white/40">
                            <Image
                                src="https://sercenadlonistudio.pl/wp-content/uploads/2025/10/pieczkopietras_warsztaty_luty24_-64-scaled.jpg"
                                alt="Momo - Tatuażystka"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                    </div>

                    {/* PRAWA STRONA - TEKST */}
                    <div className="md:col-span-7 flex flex-col justify-center items-end">
                        <div ref={textContainerRef} className="opacity-0 translate-y-[30px] w-full max-w-[600px] bg-white/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border-[0.5px] border-primary-950/25 shadow-sm shadow-primary-500/5">
                            <div ref={contentRef}>
                                <h1 className="opacity-0 translate-y-[20px] font-serif text-4xl md:text-5xl lg:text-6xl text-primary-950 leading-[1.1] mb-8">
                                    <span className="text-[#a85f6c] font-medium">Hej jestem Momo !</span>
                                </h1>
                                <div className="opacity-0 translate-y-[20px] space-y-6 text-base md:text-lg text-primary-900 font-light leading-relaxed text-justify">
                                    <p>Jestem tatuażystką z Bytomia. Tworzę ilustracyjne tatuaże, w których najbardziej liczy się dla mnie detal i spójność z osobą, która będzie je nosić.</p>
                                    <p>Lubię, kiedy tatuaż jest osobisty i niesie ze sobą jakąś historię – nawet taką, która na pierwszy rzut oka może wydawać się banalna.</p>
                                </div>
                                <div className="opacity-0 translate-y-[20px] mt-10">
                                    <Link href="/moje-prace" className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary-950 text-primary-50 rounded-full overflow-hidden transition-all duration-500 ease-out hover:bg-[#a85f6c] hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(168,95,108,0.5)]">
                                        <span className="relative z-10 uppercase tracking-widest text-sm font-medium transition-all duration-500 group-hover:tracking-[0.25em]">Zobacz moje prace</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}