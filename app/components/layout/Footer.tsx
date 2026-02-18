"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".footer-anim", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        });
    }, { scope: container });

    return (
        <footer
            ref={container}
            // ZMIANA: bg-secondary-900 (Twój nowy kolor #0c0103)
            className="relative bg-secondary-900 text-primary-100 h-dvh w-full overflow-hidden"
        >
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-full flex flex-col justify-between py-8 md:py-10 relative z-10">

                {/* 1. GÓRA: TYTUŁ */}
                <div className="border-b border-primary-100/20 pb-6 footer-anim">
                    <span className="block text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-primary-300 mb-2">
                        ( Kontakt )
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                        Informacje <span className="italic text-primary-400">kontaktowe</span>
                    </h2>
                </div>

                {/* 2. ŚRODEK: GŁÓWNA TREŚĆ */}
                <div className="grow flex items-center footer-anim">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-center">

                        {/* KOLUMNA LEWA - O STUDIU I PODEJŚCIU */}
                        <div className="lg:col-span-5 space-y-8 md:space-y-10 flex flex-col justify-center">

                            {/* WPADNIJ */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-primary-400 mb-3">Wpadnij!</h3>
                                <p className="text-base md:text-lg font-light leading-relaxed text-primary-100/90">
                                    Serce na dłoni to kameralne studio tatuażu w centrum Bytomia. Powstało z potrzeby stworzenia miejsca, w którym każdy może poczuć się swobodnie.
                                </p>
                            </div>

                            {/* FILOZOFIA KONTAKTU */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-primary-400 mb-3">Dlaczego wiadomość?</h3>
                                <p className="text-base md:text-lg font-light leading-relaxed text-primary-100/90">
                                    Stawiam na kontakt pisemny – dzięki temu mogę dokładnie zapisać wszystkie szczegóły Twojej wizyty i nic mi nie umknie.
                                </p>
                                <p className="text-base md:text-lg font-serif italic text-primary-200 mt-4">
                                    Czekam na Twoją wiadomość i nie mogę się doczekać, aby wspólnie stworzyć Twój wymarzony tatuaż!
                                </p>
                            </div>

                        </div>

                        {/* SEPARATOR NA MOBILE (opcjonalny, tu ukryty na desktopie) */}
                        <div className="hidden lg:block lg:col-span-1 h-full border-l border-primary-100/10 mx-auto"></div>

                        {/* KOLUMNA PRAWA - DANE */}
                        <div className="lg:col-span-6 flex flex-col gap-8 justify-center lg:pl-8">

                            {/* MAIL */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-primary-400 mb-2">Napisz do mnie</h3>
                                <a
                                    href="mailto:sercenadloni.studio@gmail.com"
                                    className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-50 hover:text-primary-300 transition-colors border-b border-primary-50/20 pb-1 break-all"
                                >
                                    sercenadloni.studio@gmail.com
                                </a>
                            </div>

                            {/* INSTAGRAM */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-primary-400 mb-2">Instagram</h3>
                                <div className="flex flex-col gap-2 font-light text-base md:text-lg">
                                    <a href="https://instagram.com/serce_na_dloni_studio" target="_blank" rel="noreferrer" className="hover:text-primary-300 transition-colors flex items-center gap-2 w-fit">
                                        <span>@serce_na_dloni_studio</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </a>
                                    <a href="https://instagram.com/momomlynarska" target="_blank" rel="noreferrer" className="hover:text-primary-300 transition-colors flex items-center gap-2 w-fit">
                                        <span>@momomlynarska</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                                    </a>
                                </div>
                            </div>

                            {/* ADRES */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-primary-400 mb-2">Studio</h3>
                                <address className="not-italic text-lg md:text-xl font-serif text-primary-50">
                                    ul. Chrzanowskiego 5/3a<br />
                                    41-902 Bytom
                                </address>
                                <span className="block mt-1 text-xs md:text-sm text-primary-400 font-light">*wejście od podwórza</span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 3. DÓŁ: COPYRIGHT */}
                <div className="border-t border-primary-100/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs uppercase tracking-widest text-primary-500 footer-anim">
                    <p>&copy; {new Date().getFullYear()} Serce na Dłoni Studio.</p>

                </div>

            </div>
        </footer>
    );
}