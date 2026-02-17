import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import "./globals.css";
import SmoothScrolling from "./components/ui/SmoothScrolling";


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
      <body
        className={`${playfair.variable} font-sans antialiased text-primary-950 bg-primary-50`}
      >
        <SmoothScrolling />
        <Navbar />
        {children}
      </body>
    </html>
  );
}