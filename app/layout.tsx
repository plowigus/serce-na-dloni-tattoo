import type { Metadata } from "next";
// ZMIANA: Wracamy do zoptymalizowanego modułu Google
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";

// Konfiguracja: Variable font + tylko Latin
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"], // KLUCZ DO MAŁEGO ROZMIARU
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"], // KLUCZ DO MAŁEGO ROZMIARU
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
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased text-primary-950 bg-primary-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}