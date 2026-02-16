import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";

// OPTYMALIZACJA: Ładujemy tylko wagi 400 i 500 oraz style normal/italic
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

// OPTYMALIZACJA: Ładujemy tylko 300 (teksty), 400 (baza), 500 (przyciski/nav)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
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