"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
    ready: boolean;          // Czy 3D zgłosiło gotowość?
    forceShow: boolean;      // Czy minął czas (3s) i wymuszamy pokazanie?
    onComplete: () => void;  // Sygnał do rodzica, że preloader zniknął
}

export default function Preloader({ ready, forceShow, onComplete }: PreloaderProps) {
    const [isExiting, setIsExiting] = useState(false);
    const shouldHide = ready || forceShow;

    useEffect(() => {
        if (shouldHide) {
            // Rozpoczynamy animację wyjścia
            setIsExiting(true);

            // Czekamy na koniec transition (800ms) i dajemy sygnał onComplete
            const timer = setTimeout(() => {
                onComplete();
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [shouldHide, onComplete]);

    // Jeśli animacja wyjścia się skończyła (obsłużone w rodzicu przez unmount),
    // tutaj dbamy tylko o klasę CSS.

    return (
        <div
            className={`
                fixed inset-0 z-9999 bg-primary-50 flex items-center justify-center
                transition-transform duration-800 ease-in-out will-change-transform
                ${isExiting ? "-translate-y-full" : "translate-y-0"}
            `}
        >
            <div className={`
                flex flex-col items-center gap-4 text-primary-900
                transition-opacity duration-300
                ${isExiting ? "opacity-0" : "opacity-100"}
            `}>
                {/* CSS Pulse Animation */}
                <div className="animate-pulse-slow">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-[#a85f6c]">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] font-light animate-pulse">Ładowanie</span>
            </div>

            {/* Dodaj to do global.css lub tailwind.config.js jeśli nie masz klasy animate-pulse-slow */}
            <style jsx>{`
                .animate-pulse-slow {
                    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: .7; transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}