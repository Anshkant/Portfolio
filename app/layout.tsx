import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Preloader } from "@/components/ui/Preloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anshkant Malviya | Software Developer · Data Analyst",
  description:
    "Building production-ready software, data-driven solutions, and practical AI systems. Dual-discipline portfolio merging code structure and data signal.",
  keywords: [
    "Anshkant Malviya",
    "Software Developer",
    "Data Analyst",
    "AI/ML",
    "Computer Vision",
    "Next.js",
    "React",
    "Python",
    "Nagpur",
    "VanRakshak AI",
  ],
  authors: [{ name: "Anshkant Malviya" }],
  openGraph: {
    title: "Anshkant Malviya | Software Developer · Data Analyst",
    description:
      "Building production-ready software, data-driven solutions, and practical AI systems. Where software structure meets data signal.",
    url: "https://github.com/Anshkant",
    siteName: "Anshkant Malviya Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased selection:bg-structure/30 selection:text-text-primary">
        {/* Attractive 1 to 100% Loader */}
        <Preloader />
        <Navbar />
        <main className="flex min-h-screen w-full flex-col items-center overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
