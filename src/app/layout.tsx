import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.urbani.tv"),
  title: "Urbani | Plan, Buy & Optimize CTV Campaigns with AI",
  description:
    "Urbani helps advertisers get more from their media spend. Urbani™, our proprietary AI agent, analyzes billions of privacy-compliant signals in real time to deliver CTV campaigns that adapt on the fly.",
  openGraph: {
    title: "Urbani | Plan, Buy & Optimize CTV Campaigns with AI",
    description:
      "Urbani™ analyzes billions of privacy-compliant signals in real time to deliver CTV campaigns that adapt on the fly for advertisers and streaming publishers.",
    url: "https://www.urbani.tv",
    siteName: "Urbani",
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night-950">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
