import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";


const playfair = localFont({
  src: './fonts/PlayfairDisplay-VariableFont_wght.ttf',
  variable: '--font-serif',
  display: 'swap',
  weight: '400 900',
});

const inter = localFont({
  src: [
    {
      path: './fonts/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './fonts/Inter-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
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
        // Łączymy zmienne fontów i klasy bazowe
        className={`${playfair.variable} ${inter.variable} font-sans antialiased text-primary-950 bg-primary-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}