import React from "react";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* 3D Centerpiece Hero with high-contrast left split */}
      <Hero />

      {/* About: Duality narrative & verified metrics */}
      <About />

      {/* Experience & Education: Atorix IT Solutions, G H Raisoni, ExcelR */}
      <Experience />

      {/* Skills: Connected tracks with AI/ML bridge */}
      <Skills />

      {/* Projects: Flagship VanRakshak AI + CritIndia + ConnectingDots ERP + Bento grid */}
      <Projects />

      {/* Journey: Interactive 8-stage learning pipeline flow */}
      <Journey />

      {/* Contact: Quiet, confident close with verified career statement */}
      <Contact />
    </div>
  );
}
