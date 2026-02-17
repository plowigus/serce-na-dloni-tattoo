"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Rejestracja pluginu
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// DEFINICJA KROKÓW
const STEPS = [
    {
        id: "01",
        title: "Zapisy i Projekt",
        imgSrc: "https://sercenadlonistudio.pl/wp-content/uploads/2025/10/DSC_1291_1-scaled.jpg",
        imgAlt: "Tattoo artist sketching design",
        bgColor: "bg-[#fcf5f6]",
        content: (
            <div className="flex flex-col h-full justify-center space-y-8">
                <div>
                    <h4 className="font-serif text-2xl text-primary-950 mb-4">Gdzie pisać?</h4>
                    <ul className="space-y-3 text-lg font-light text-primary-900">
                        <li className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <span className="font-medium font-serif italic text-primary-500">Instagram:</span>
                            <div className="flex gap-2">
                                <a href="https://instagram.com/serce_na_dloni_studio" target="_blank" rel="noreferrer" className="hover:text-primary-600 border-b border-primary-900/20 hover:border-primary-600 transition-colors">@serce_na_dloni_studio</a>
                            </div>
                        </li>
                        <li className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <span className="font-medium font-serif italic text-primary-500">Mail:</span>
                            <a href="mailto:sercenadloni.studio@gmail.com" className="hover:text-primary-600 border-b border-primary-900/20 hover:border-primary-600 transition-colors w-fit">sercenadloni.studio@gmail.com</a>
                        </li>
                    </ul>
                </div>

                <hr className="border-primary-900/10" />

                <div>
                    <h4 className="font-serif text-2xl text-primary-950 mb-4">Co zawrzeć w wiadomości?</h4>
                    <div className="space-y-4 text-lg text-primary-900 font-light leading-relaxed">
                        <p>
                            Podaj, jaki tatuaż Cię interesuje, jego <strong className="font-medium">wielkość</strong> i <strong className="font-medium">miejsce na ciele</strong>.
                        </p>
                        <p>
                            Możesz dołączyć zdjęcie fragmentu ciała oraz inspiracje — np. inne tatuaże, rysunki lub moje prace.
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "02",
        title: "Terminy i Odpowiedź",
        imgSrc: "https://sercenadlonistudio.pl/wp-content/uploads/2025/10/DSC_1296_1-scaled.jpg",
        imgAlt: "Planning and scheduling",
        bgColor: "bg-white",
        content: (
            <div className="flex flex-col h-full justify-center space-y-8">
                <div>
                    <h4 className="font-serif text-2xl text-primary-950 mb-4">Preferowane daty</h4>
                    <p className="text-lg font-light text-primary-900 leading-relaxed">
                        Proces umawiania pójdzie sprawniej, jeśli od razu napiszesz, jakie dni lub godziny najbardziej Ci odpowiadają <span className="text-primary-500 italic">(albo które na pewno odpadają)</span>.
                    </p>
                </div>

                <hr className="border-primary-900/10" />

                <div>
                    <h4 className="font-serif text-2xl text-primary-950 mb-4">Czas oczekiwania</h4>
                    <div className="text-lg font-light text-primary-900 leading-relaxed space-y-4">
                        <p>
                            Po wysłaniu wiadomości poczekaj na odpowiedź — jeśli po kilku dniach jej nie otrzymasz, śmiało przypomnij się.
                        </p>
                        <div className="bg-primary-50 p-4 border border-primary-100"> {/* Usunięto rounded-xl tutaj też dla spójności */}
                            <p className="font-serif italic text-base">
                                Postaram się odpowiedzieć jak najszybciej, doradzić w kwestii projektu i wstępnie określić widełki cenowe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "03",
        title: "Wycena",
        imgSrc: "https://sercenadlonistudio.pl/wp-content/uploads/2025/10/DSC_1348_1-scaled.jpg",
        imgAlt: "Tattoo ink details",
        bgColor: "bg-primary-950",
        textColor: "text-white",
        content: (
            <div className="flex flex-col h-full justify-between">
                <div className="space-y-6 text-white/90 font-light leading-relaxed">
                    <p className="text-lg">
                        Na cenę wpływa <strong className="text-primary-200">rozmiar</strong>, <strong className="text-primary-200">miejsce na ciele</strong> (trudniejsze pozycje), <strong className="text-primary-200">kolorystyka</strong> (zużycie materiałów) oraz czas pracy. Wysokiej jakości tusze oraz jednorazowe, sterylne materiały są zawsze wliczone w cenę.
                    </p>

                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="font-serif text-2xl text-primary-200 mb-6">Cennik</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Usunięto rounded-xl z wewnętrznych kart dla ostrości */}
                        <div className="bg-white/5 p-4 border border-white/10 backdrop-blur-md">
                            <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">Start od</span>
                            <span className="text-3xl font-serif text-white">300 zł</span>
                            <span className="block text-xs opacity-50 mt-1">Małe, proste wzory</span>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/10 backdrop-blur-md">
                            <span className="block text-xs uppercase tracking-widest opacity-60 mb-1">Sesja całodniowa</span>
                            <span className="text-3xl font-serif text-white">1800 zł</span>
                            <span className="block text-xs opacity-50 mt-1">Większe projekty</span>
                        </div>
                    </div>

                    <p className="text-base opacity-70 italic mb-8">
                        * Przy kilku tatuażach za jednym zamachem przewidziany rabat.
                    </p>


                </div>
            </div>
        ),
    },
];

export default function BookingSteps() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // --- ANIMACJA NAGŁÓWKA ---
        gsap.from(".anim-title-element", {
            scrollTrigger: {
                trigger: ".anim-title-wrapper",
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
        });

        // --- ANIMACJA KART ---
        const panels = gsap.utils.toArray<HTMLElement>(".booking-section");
        const panelsToAnimate = panels.slice(0, -1);

        panelsToAnimate.forEach((panel, i) => {
            let innerpanel = panel.querySelector(".booking-inner") as HTMLElement;
            let panelHeight = innerpanel.offsetHeight;
            let windowHeight = window.innerHeight;
            let difference = panelHeight - windowHeight;
            let fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;

            if (fakeScrollRatio) {
                panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    start: "bottom bottom",
                    end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
                    pinSpacing: false,
                    pin: true,
                    scrub: true,
                }
            });

            if (fakeScrollRatio) {
                tl.to(innerpanel, {
                    yPercent: -100,
                    y: window.innerHeight,
                    duration: 1 / (1 - fakeScrollRatio) - 1,
                    ease: "none"
                });
            }

            // Efekt zanikania (bez zaokrągleń, więc blur wygląda jeszcze lepiej)
            tl.fromTo(panel,
                { scale: 1, opacity: 1, filter: "blur(0px)" },
                { scale: 0.9, opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power2.inOut" }
            );
        });

    }, { scope: container });

    return (
        <div ref={container} className="slides-wrapper relative w-full pt-12 pb-0 bg-primary-50">

            {/* NAGŁÓWEK */}
            <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto anim-title-wrapper">
                <div className="anim-title-element overflow-hidden mb-6 flex justify-center md:justify-start">
                    <span className="block text-sm font-bold tracking-[0.3em] uppercase text-primary-950 pb-2 w-fit">
                        ( 02 — Proces )
                    </span>
                </div>

                <h2 className="font-serif text-6xl md:text-7xl xl:text-8xl text-primary-900 leading-[0.95] tracking-tight text-center md:text-left">
                    <div className="overflow-hidden">
                        <span className="py-1 anim-title-element block will-change-transform">Jak się</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="anim-title-element block pb-3 italic text-primary-500 ml-4 md:ml-8 will-change-transform">zapisać?</span>
                    </div>
                </h2>
            </div>

            {/* KARTY */}
            {STEPS.map((step, index) => (
                <section
                    key={step.id}
                    // ZMIANA: Usunięto rounded-[32px] i md:rounded-[48px]
                    className={`booking-section w-full flex justify-center items-center relative box-border overflow-hidden shadow-2xl border-t border-white/50 ${step.bgColor} ${step.textColor || 'text-primary-900'}`}
                    style={{ height: '100vh', zIndex: index + 1 }}
                >
                    <div className="booking-inner h-full w-full max-w-[1600px] mx-auto flex flex-col md:flex-row relative">

                        {/* LEWA STRONA: ZDJĘCIE */}
                        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden">
                            <Image
                                src={step.imgSrc}
                                alt={step.imgAlt}
                                fill
                                className="object-cover transition-transform duration-[2s] hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-primary-900/10" />


                        </div>

                        {/* PRAWA STRONA: TREŚĆ */}
                        <div className="w-full md:w-1/2 h-auto md:h-full p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-y-auto">
                            <h3 className="font-serif text-3xl md:text-5xl mb-8 md:mb-12 relative z-10 leading-tight">
                                {step.title}
                            </h3>

                            <div className="relative z-10">
                                {step.content}
                            </div>
                        </div>

                    </div>
                </section>
            ))}
        </div>
    );
}