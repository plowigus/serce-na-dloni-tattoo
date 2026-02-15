"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Hero from "./components/sections/Hero";

// Dynamiczny import z wyłączonym SSR (kluczowe dla TBT)
const HeartsBackground = dynamic(
  () => import("./components/ui/HeartsBackground"),
  { ssr: false }
);

export default function Home() {
  // 1. mountCanvas: Decyduje, kiedy w ogóle zacząć ładować kod 3D (opóźniamy to)
  const [mountCanvas, setMountCanvas] = useState(false);

  // 2. is3DReady: Czy WebGL już wstał i możemy go pokazać (opacity 1)?
  const [is3DReady, setIs3DReady] = useState(false);

  // OPTYMALIZACJA: Montujemy Canvas dopiero jak przeglądarka "odetchnie" po HTML/CSS
  useEffect(() => {
    const startLoading3D = () => setMountCanvas(true);

    // Jeśli przeglądarka wspiera requestIdleCallback, używamy tego (najlepsze dla wydajności)
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(startLoading3D, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      // Fallback: sztywne opóźnienie 500ms
      const timer = setTimeout(startLoading3D, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // FIX: Używamy useCallback, żeby funkcja miała stabilną referencję.
  // Dzięki temu React nie robi re-renderu komponentu HeartsBackground przy zmianach stanu rodzica.
  const handleReady = useCallback(() => {
    setIs3DReady(true);
  }, []);

  return (
    <main className="relative w-full h-full min-h-screen overflow-hidden bg-primary-50 selection:bg-primary-200 selection:text-primary-950">

      {/* WARSTWA 1: TŁO 3D (Z-Index 0)
          - Jest w DOM tylko gdy mountCanvas = true
          - Jest niewidoczne (opacity-0) dopóki is3DReady = false
          - Transition duration-1000 zapewnia miękkie wejście "fade-in"
      */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${is3DReady ? 'opacity-100' : 'opacity-0'}`}
      >
        {mountCanvas && <HeartsBackground onReady={handleReady} />}
      </div>

      {/* WARSTWA 2: TREŚĆ (Z-Index 10)
          - Ładuje się NATYCHMIAST (LCP ~0.3s)
          - Nie czeka na nic
      */}
      <div className="relative z-10">
        <Hero />
      </div>

    </main>
  );
}