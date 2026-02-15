"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

// Ikony Social Media (z Twojego kodu)
const IconFB = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const IconIG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Navbar zjeżdża
        tl.from(navRef.current, {
            yPercent: -100,
            duration: 1,
            delay: 0.2
        })
            // 2. Elementy wchodzą
            .to([containerRef.current, logoRef.current], {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8
            }, "-=0.5");

    }, { scope: navRef });

    // Style dla linków
    const linkStyle = "relative text-sm uppercase tracking-widest text-primary-800 hover:text-primary-600 transition-colors font-medium group py-2 whitespace-nowrap";
    const underlineStyle = "absolute left-0 bottom-0 w-0 h-[1px] bg-primary-400 transition-all duration-300 group-hover:w-full";

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
        >
            {/* Glassmorphism Container */}
            <div
                ref={containerRef}
                className="opacity-0 translate-y-[-10px] mx-auto max-w-6xl rounded-2xl bg-white/30 backdrop-blur-md border-[0.5px] border-primary-950/25 shadow-sm shadow-primary-500/5 px-8 py-4 relative grid grid-cols-2 items-center"
            >

                {/* LEWA STRONA */}
                <div className="flex items-center justify-end gap-12 z-10 pr-16">
                    <Link href="/" className={linkStyle}>
                        Home
                        <span className={underlineStyle}></span>
                    </Link>
                    <Link href="/o-mnie" className={linkStyle}>
                        O mnie
                        <span className={underlineStyle}></span>
                    </Link>
                    <Link href="/rezerwacja" className={linkStyle}>
                        Jak się umówić?
                        <span className={underlineStyle}></span>
                    </Link>
                </div>

                {/* ŚRODEK (LOGO) - ABSOLUTE CENTER */}
                <div
                    ref={logoRef}
                    className="opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
                >
                    <Link href="/" className="relative block w-64 h-24 hover:opacity-80 transition-opacity pointer-events-auto">
                        <Image
                            src="/logo.png"
                            alt="Serce na Dłoni Logo"
                            fill
                            className="object-contain"
                            priority
                            sizes="256px"
                        />
                    </Link>
                </div>

                {/* PRAWA STRONA */}
                <div className="flex items-center justify-start gap-10 z-10 pl-16 w-full">
                    <Link href="/moje-prace" className={linkStyle}>
                        Moje prace
                        <span className={underlineStyle}></span>
                    </Link>
                    <Link href="/kontakt" className={linkStyle}>
                        Kontakt
                        <span className={underlineStyle}></span>
                    </Link>

                    {/* Separator z klasą ml-auto - przesuwa wszystko co za nim na sam koniec */}
                    <div className="h-4 w-px bg-primary-950/20 mx-2 hidden md:block ml-auto"></div>

                    <div className="flex items-center gap-4 text-primary-800">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 hover:scale-110 transition-all duration-300">
                            <IconIG className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 hover:scale-110 transition-all duration-300">
                            <IconFB className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}