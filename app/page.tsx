
import Hero from "./components/sections/Hero";
import SceneWrapper from "./components/ui/SceneWrapper";

export default function Home() {
  return (
    <main className="relative w-full h-full min-h-screen overflow-hidden bg-primary-50">
      <SceneWrapper />
      <Hero />
    </main>
  );
}