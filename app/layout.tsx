import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap", // Zapewnia szybsze wyświetlenie tekstu (FCP)
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Serce na Dłoni Studio",
  description: "High-end beauty studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        {/* OPTYMALIZACJA: Przyspieszamy ładowanie zdjęć z zewnętrznego serwera */}
        <link rel="preconnect" href="https://sercenadlonistudio.pl" crossOrigin="anonymous" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased text-primary-950 bg-primary-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}