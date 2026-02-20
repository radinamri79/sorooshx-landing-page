"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <About />
      <FAQ />
      <CTA />
    </>
  );
}
