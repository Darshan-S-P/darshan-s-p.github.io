"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import SkillsSection from "@/components/sections/SkillsSection";
import JDMatcherSection from "@/components/sections/JDMatcherSection";
import ContactSection from "@/components/sections/ContactSection";
import AIChatWidget from "@/components/chat/AIChatWidget";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#08090d] text-white selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Top Navbar */}
      <Navbar onOpenChat={() => setChatOpen(true)} />

      {/* Hero Section with R3F 3D Neural Nodes & 3D Cyber Terminal */}
      <HeroSection onOpenChat={() => setChatOpen(true)} />

      {/* Featured Projects with 3D Tilt & Framer Motion Modal */}
      <ProjectsSection />

      {/* 3D-feeling Scroll-driven Experience Timeline */}
      <ExperienceTimeline />

      {/* Production Skills & Verified Certifications */}
      <SkillsSection />

      {/* Recruiter JD Matcher with spaCy NLP analysis */}
      <JDMatcherSection />

      {/* Contact Section with Live Sentiment Analysis */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating LangGraph AI Agent Widget */}
      <AIChatWidget
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpen={() => setChatOpen(true)}
      />
    </main>
  );
}
