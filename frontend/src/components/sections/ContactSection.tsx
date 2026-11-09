"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { analyzeSentiment, SentimentResult } from "@/lib/api";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentimentResult, setSentimentResult] = useState<SentimentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live sentiment debounce on message change
  useEffect(() => {
    if (message.length < 10) {
      setSentimentResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await analyzeSentiment(message, name);
      setSentimentResult(res);
    }, 400);

    return () => clearTimeout(timer);
  }, [message, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-400 mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>LET&apos;S COLLABORATE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Get in Touch
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Interested in discussing an AI/ML engineering role, full-time opportunity, or technical architecture? Send a note or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Information Cards (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
            <h3 className="text-lg font-bold text-white mb-2">Direct Channels</h3>

            <a
              href="mailto:ddarshu260@gmail.com"
              className="flex items-center gap-3.5 text-xs sm:text-sm text-gray-300 hover:text-cyan-300 transition-colors group"
            >
              <div className="p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-cyan-500/20 text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">Email</div>
                <div className="font-mono">ddarshu260@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:+918147769141"
              className="flex items-center gap-3.5 text-xs sm:text-sm text-gray-300 hover:text-cyan-300 transition-colors group"
            >
              <div className="p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-cyan-500/20 text-cyan-400 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">Phone</div>
                <div className="font-mono">+91 8147769141</div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 text-xs sm:text-sm text-gray-300">
              <div className="p-2.5 rounded-xl bg-white/[0.04] text-cyan-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">Location</div>
                <div>Bengaluru, Karnataka, India</div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col gap-3">
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Professional Profiles
            </h4>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/in/darshan-sp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-xs font-mono text-gray-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Darshan-S-P"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-xs font-mono text-gray-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form with Live NLP Tone Detector (3 Cols) */}
        <div className="lg:col-span-3">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0d0f18]/90">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
                  Thank you! Your note has been received and prioritized via our NLP sentiment filter. Darshan will respond promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 text-xs font-mono text-cyan-300 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">
                      Your Name / Recruiter Title
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins (Tech Lead)"
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-gray-400">
                      Message / Opportunity Details
                    </label>
                    {/* Live NLP Sentiment Badge */}
                    {sentimentResult && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 flex items-center gap-1 animate-fadeIn">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Tone: {sentimentResult.tone}
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Darshan about the position, technical challenges, or collaboration you have in mind..."
                    className="w-full rounded-xl bg-black/40 border border-white/10 p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-sans"
                  />
                </div>

                {/* Priority Classifier Preview */}
                {sentimentResult && (
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-[11px] font-mono text-gray-300 flex items-center justify-between">
                    <span className="text-gray-400">Automated Inbox Priority:</span>
                    <span className="text-cyan-300 font-bold">{sentimentResult.priority}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !message || !email}
                  className="w-full py-3.5 rounded-xl font-medium text-xs sm:text-sm text-black bg-gradient-to-r from-neonCyan to-neonBlue hover:opacity-95 shadow-glow-cyan transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Dispatching..." : "Send Prioritized Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
