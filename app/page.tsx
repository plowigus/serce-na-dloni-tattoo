import dynamic from "next/dynamic";
import Hero from "./components/sections/Hero";

const AboutEditorial = dynamic(() => import("./components/sections/AboutEditorial"), { ssr: true });
const BookingSteps = dynamic(() => import("./components/sections/BookingSteps"), { ssr: true });
const Portfolio = dynamic(() => import("./components/sections/Portfolio"), { ssr: true });


export default function Home() {
  return (
    <main className="relative w-full h-full min-h-screen overflow-hidden bg-primary-50">
      {/* ZMIANA: SceneWrapper usunięty stąd. Trafia do Hero. */}
      <Hero />
      <AboutEditorial />
      <BookingSteps />
      <Portfolio />

    </main>
  );
}