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
            .to(contentRef.current?.children || [], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.05
            }, "-=0.6");
    });

    return (
        <section ref={containerRef} className="relative h-dvh w-full flex items-center justify-center pt-32 pb-12 overflow-hidden z-10">
            <div className="w-full max-w-7xl h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 h-full">

                    {/* LEWA STRONA - ZDJĘCIE */}
                    <div className="md:col-span-6 h-full flex flex-col justify-start">
                        <div
                            ref={imgRef}
                            className="opacity-0 translate-x-[-30px] scale-95 relative w-full max-w-[600px] aspect-4/5 rounded-[40px] overflow-hidden shadow-2xl shadow-primary-900/5 border border-white/40"
                        >
                            <Image
                                alt="Momo - Tatuażystka"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={85}
                                src="/images/momo.jpg"
                            />
                        </div>
                    </div>

                    {/* PRAWA STRONA - TEKST */}
                    <div className="md:col-span-6 h-full flex flex-col justify-start items-center md:items-end">
                        <div
                            ref={textContainerRef}
                            className="opacity-0 translate-y-[30px] w-full max-w-[600px] aspect-4/5 bg-white/30 backdrop-blur-md rounded-[40px] p-8 md:p-12 border-[0.5px] border-primary-950/25 shadow-sm shadow-primary-500/5 flex flex-col justify-start"
                        >
                            <div ref={contentRef}>
                                <h1 className="opacity-0 translate-y-[20px] font-serif text-4xl md:text-5xl lg:text-5xl text-primary-950 leading-[1.1] mb-8">
                                    <span className="text-[#a85f6c] font-medium italic block mb-2">Serce na Dłoni</span>
                                    <span>Hej, jestem Momo</span>
                                </h1>

                                <div className="opacity-0 translate-y-[20px] space-y-6 text-base md:text-lg text-primary-900 font-light leading-relaxed text-justify max-w-[440px]">
                                    <p>
                                        Wierzę, że Twoja skóra to płótno dla historii, które warto opowiedzieć.
                                        W moim studio w Bytomiu tworzę ilustracyjne tatuaże, gdzie precyzyjny
                                        detal spotyka się z głęboką, osobistą wrażliwością.
                                    </p>
                                    <p>
                                        Dla mnie tatuaż to proces szukania spójności – nie tylko z Twoją
                                        estetyką, ale przede wszystkim z tym, co nosisz w środku. Każda kreska
                                        jest przemyślana tak, by stać się Twoją integralną częścią.
                                    </p>
                                </div>

                                <div className="opacity-0 translate-y-[20px] mt-10">
                                    <Link
                                        href="/moje-prace"
                                        className="relative inline-flex items-center justify-center px-10 py-4 bg-[#e7a0a1] text-white rounded-2xl overflow-hidden transition-colors duration-300 ease-out hover:bg-[#a85f6c]"
                                        prefetch={false}
                                    >
                                        <span className="relative z-10 uppercase tracking-widest text-sm font-medium">
                                            Zobacz moje prace
                                        </span>
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