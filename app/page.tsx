"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Hero from "./components/sections/Hero";
import Preloader from "./components/ui/Preloader";

// Dynamiczny import
const HeartsBackground = dynamic(
  () => import("./components/ui/HeartsBackground"),
  { ssr: false }
);

export default function Home() {
  const [mountCanvas, setMountCanvas] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [forceShow, setForceShow] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  // 1. Montowanie Canvasa z opóźnieniem (odciążenie startu)
  useEffect(() => {
    const startLoading3D = () => setMountCanvas(true);

    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(startLoading3D, { timeout: 1000 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(startLoading3D, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  // 2. Fail-safe (3.5 sekundy)
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      // Jeśli po 3.5s nadal nie mamy sygnału z 3D, wymuszamy pokazanie treści
      // Ale NIE odmontowujemy Canvasa, niech się dociągnie w tle
      if (!is3DReady) {
        console.warn("3D Background timeout - forcing content display");
        setForceShow(true);
      }
    }, 3500);

    return () => clearTimeout(fallbackTimer);
  }, [is3DReady]);

  // 3. Stabilna funkcja obsługi gotowości (Kluczowe dla uniknięcia migania!)
  const handleReady = useCallback(() => {
    setIs3DReady(true);
  }, []);

  const handlePreloaderComplete = () => {
    setStartHeroAnimation(true);
  };

  return (
    <main className="relative w-full h-full min-h-screen overflow-hidden bg-primary-50 selection:bg-primary-200 selection:text-primary-950">

      {/* PRELOADER */}
      <Preloader
        ready={is3DReady}
        forceShow={forceShow}
        onComplete={handlePreloaderComplete}
      />

      {/* TŁO 3D - Zawsze pod spodem (z-0) */}
      {mountCanvas && (
        <div className="absolute inset-0 z-0">
          <HeartsBackground onReady={handleReady} />
        </div>
      )}

      {/* HERO - Treść na wierzchu (z-10) */}
      <div className="relative z-10">
        <Hero startAnimation={startHeroAnimation} />
      </div>

    </main>
  );
}