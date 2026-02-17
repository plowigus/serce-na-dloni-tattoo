"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fotoImg from "../../../public/images/foto.jpg";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Generowanie ścieżek do 44 zdjęć (1.jpeg ... 44.jpeg)
const PORTFOLIO_ITEMS = Array.from({ length: 44 }, (_, i) => ({
    src: `/images/galeria/${i + 1}.jpeg`,
    alt: `Tatuaż portfolio ${i + 1}`
}));

export default function Portfolio() {
    const containerRef = useRef<HTMLElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const galleryWrapperRef = useRef<HTMLDivElement>(null);
    const stripContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const strip = stripRef.current;
        const galleryWrapper = galleryWrapperRef.current;
        const stripContainer = stripContainerRef.current;

        // 1. ANIMACJA NAGŁÓWKA I TEKSTU (Intro)
        gsap.from(".anim-portfolio-intro", {
            scrollTrigger: {
                trigger: ".portfolio-intro-trigger",
                start: "top 80%",
                toggleActions: "play reverse play reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        });

        // 2. POZIOMY SCROLL
        if (strip && galleryWrapper && stripContainer) {
            // Obliczamy scroll tak, aby koniec paska zrównał się z prawą krawędzią kontenera
            const getScrollAmount = () => {
                const containerWidth = stripContainer.offsetWidth;
                const stripWidth = strip.scrollWidth;
                return -(stripWidth - containerWidth);
            };

            const tween = gsap.to(strip, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: galleryWrapper,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount())}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            return () => tween.kill();
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-primary-50 relative w-full">

            {/* CZĘŚĆ 1: INTRO */}
            <div className="portfolio-intro-trigger w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEWA: TEKST */}
                    <div className="flex flex-col justify-center order-2 lg:order-1">
                        <div className="anim-portfolio-intro mb-8">
                            <span className="block text-sm font-bold tracking-[0.3em] uppercase text-primary-950 pb-2 w-fit">
                                ( 03 — Galeria )
                            </span>

                            <h2 className="font-serif text-6xl md:text-7xl xl:text-8xl text-primary-900 leading-[0.95] tracking-tight mt-6">
                                <div className="overflow-hidden py-3">
                                    <span className="block">Moje <span className="block italic text-primary-500 ml-12 md:ml-24">prace.</span></span>
                                </div>
                            </h2>
                        </div>

                        <div className="space-y-6 text-xl text-primary-900 font-light leading-relaxed anim-portfolio-intro">
                            <p>
                                Oto kilka moich realizacji.
                                Nie kopiuję wzorów – ani swoich, ani cudzych – ale jeśli coś Ci się spodoba, z przyjemnością stworzę coś nowego, inspirowanego klimatem pierwowzoru.
                            </p>
                            <p>
                                A jeśli chodzi Ci po głowie zupełnie inny pomysł albo coś nietypowego – napisz do mnie! Na pewno razem wymyślimy coś świetnego.
                            </p>
                        </div>
                    </div>

                    {/* PRAWA: FOTO */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end anim-portfolio-intro">
                        <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden bg-primary-200 border border-primary-900/10 rounded-[20px] shadow-2xl">
                            <Image
                                src={fotoImg}
                                alt="Momo Młynarska"
                                fill
                                className="object-cover"
                                placeholder="blur"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* CZĘŚĆ 2: GALERIA POZIOMA */}
            <div ref={galleryWrapperRef} className="h-[100dvh] w-full overflow-hidden flex flex-col justify-center relative bg-primary-50">

                <div className="flex-grow flex items-center w-full">
                    <div ref={stripContainerRef} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-[70vh] md:h-[80vh] flex items-center overflow-visible">

                        <div ref={stripRef} className="flex gap-4 md:gap-8 w-max h-full items-center">

                            {PORTFOLIO_ITEMS.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative h-full aspect-[2/3] flex-shrink-0 bg-primary-200 overflow-hidden group border border-primary-900/10"
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        // ZMIANA: Usunięto grayscale-[30%]
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 80vw, 40vw"
                                    />
                                    {/* Subtelny overlay przy hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}