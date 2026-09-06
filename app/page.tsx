import React from "react";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* 3D Centerpiece Hero */}
      <Hero />

      {/* About: Duality narrative & verified metrics */}
      <About />

      {/* Skills: Connected tracks with AI/ML bridge */}
      <Skills />

      {/* Projects: Flagship VanRakshak AI + Bento grid */}
      <Projects />

      {/* Journey: Interactive 8-stage learning pipeline flow */}
      <Journey />

      {/* Contact: Quiet, confident close with verified career statement */}
      <Contact />
    </div>
  );
}
