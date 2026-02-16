import type { Metadata } from "next";
// ZMIANA: Importujemy TYLKO Playfair Display. Inter wylatuje.
import { Playfair_Display } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";

// Konfiguracja Playfair (Tylko dla nagłówków)
// Subset 'latin' drastycznie zmniejsza wagę pliku
const playfair = Playfair_Display({
  variable: "--font-serif",
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
      {/* ZMIANA W BODY:
          1. Usunięto ${inter.variable}.
          2. Zostawiamy font-sans (Tailwind domyślnie użyje systemowych fontów).
          Efekt: Nagłówki ozdobne (Playfair), reszta tekstu ultra-szybka (Systemowa).
      */}
      <body
        className={`${playfair.variable} font-sans antialiased text-primary-950 bg-primary-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}