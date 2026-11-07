import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/lib/lenis";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Darshan SP | AI/ML Engineer & Backend Architect",
  description:
    "Award-level portfolio of Darshan SP — Software Engineer specializing in Generative AI, hybrid retrieval RAG (BM25 + RRF), real-time computer vision (YOLOv8 + CUDA), and high-throughput FastAPI microservices.",
  keywords: [
    "Darshan SP",
    "AI/ML Engineer",
    "Software Engineer Bengaluru",
    "FastAPI",
    "LangGraph",
    "LangChain",
    "Hybrid Retrieval",
    "BM25",
    "YOLOv8",
    "Python",
    "Docker",
    "PostgreSQL",
    "RHCSA",
  ],
  authors: [{ name: "Darshan SP", url: "https://github.com/Darshan-S-P" }],
  openGraph: {
    title: "Darshan SP | AI/ML Engineer Portfolio",
    description: "Explore 3D neural scenes, LangGraph RAG agent, and production AI projects.",
    url: "https://darshan-portfolio.vercel.app",
    siteName: "Darshan SP Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darshan SP | AI/ML Engineer & Backend Architect",
    description: "Production GenAI, Computer Vision, and FastAPI microservices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#08090d]`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
