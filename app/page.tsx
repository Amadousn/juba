import { Hero } from "@/components/sections/Hero";
import { Identity } from "@/components/sections/Identity";
import { ModelCard } from "@/components/sections/ModelCard";
import { Gallery } from "@/components/sections/Gallery";
import { EditorialStory } from "@/components/sections/EditorialStory";
import { Motion } from "@/components/sections/Motion";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Identity />
      <ModelCard />
      <Gallery />
      <EditorialStory />
      <Motion />
      <Booking />
      <Footer />
    </main>
  );
}
