import dynamic from "next/dynamic";
import Hero from "./components/sections/Hero";
// USUŃ: import SceneWrapper from "./components/ui/SceneWrapper";

const AboutEditorial = dynamic(() => import("./components/sections/AboutEditorial"), {
  ssr: true
});

export default function Home() {
  return (
    <main className="relative w-full h-full min-h-screen overflow-hidden bg-primary-50">
      {/* ZMIANA: SceneWrapper usunięty stąd. Trafia do Hero. */}
      <Hero />
      <AboutEditorial />
    </main>
  );
}