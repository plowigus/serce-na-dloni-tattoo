"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Hero from "./components/sections/Hero";
import Preloader from "./components/ui/Preloader";

const HeartsBackground = dynamic(
  () => import("./components/ui/HeartsBackground"),
  { ssr: false }
);

export default function Home() {
  const [mountCanvas, setMountCanvas] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [forceShow, setForceShow] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  useEffect(() => {
    // Opóźnienie startu dla optymalizacji FCP
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => setMountCanvas(true));
      } else {
        setMountCanvas(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!is3DReady) setForceShow(true);
    }, 4000);
    return () => clearTimeout(fallbackTimer);
  }, [is3DReady]);

  // Zapobiega re-renderom tła przy zmianie stanów rodzica
  const handleReady = useCallback(() => {
    setIs3DReady(true);
  }, []);

  const handlePreloaderComplete = () => {
    setStartHeroAnimation(true);
  };

  return (
    <main className="relative w-full h-full min-h-screen overflow-hidden bg-primary-50">
      <Preloader
        ready={is3DReady}
        forceShow={forceShow}
        onComplete={handlePreloaderComplete}
      />

      <div className={`absolute inset-0 z-0 transition-opacity duration-1500 ${is3DReady ? 'opacity-100' : 'opacity-0'}`}>
        {/* Renderuje się raz i zostaje dzięki dynamic import + stable handleReady */}
        {mountCanvas && <HeartsBackground onReady={handleReady} />}
      </div>

      <Hero startAnimation={startHeroAnimation} />
    </main>
  );
}