"use client";

import React, { useState, useEffect } from "react";
import { Bot, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function Navbar({ onOpenChat }: { onOpenChat: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "JD Matcher", href: "#matcher" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090d]/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-[#08090d] rounded-lg flex items-center justify-center font-mono font-bold text-xs text-cyan-300 group-hover:text-white transition-colors">
              DS
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Darshan SP
            </span>
            <span className="text-[10px] font-mono text-cyan-400">
              AI/ML Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-gray-400 hover:text-cyan-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenChat}
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-cyan-300 glass-panel border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Agent</span>
          </button>

          <a
            href="https://github.com/Darshan-S-P"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-gray-300 hover:text-cyan-400 py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2 rounded-xl text-xs font-mono text-black bg-cyan-400 font-semibold flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Ask LangGraph Agent</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
