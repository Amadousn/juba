import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IntroLoader } from "@/components/IntroLoader";
import { Navigation } from "@/components/Navigation";
import { Cursor } from "@/components/Cursor";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrains = JetBrains_Mono({
  variable: "--font-mono-jet",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zerzourjuba.com"),
  title: "Zerzour Juba — Model · Editorial, Runway, Commercial",
  description:
    "Portfolio of Juba Zerzour — French model. Soft masculinity, cinematic presence. Available for editorial, runway and commercial bookings.",
  openGraph: {
    title: "Zerzour Juba — Model",
    description:
      "Soft masculinity, cinematic presence. Editorial · Runway · Commercial.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetBrains.variable} antialiased`}
    >
      <body className="bg-[var(--paper)] text-[var(--ink)] grain selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        <SmoothScroll>
          <IntroLoader />
          <Cursor />
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
