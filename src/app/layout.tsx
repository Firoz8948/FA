import type { Metadata } from "next";
import { Alice, Cardo } from "next/font/google";
import "./globals.css";

const alice = Alice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alice",
});

const cardo = Cardo({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cardo",
});

export const metadata: Metadata = {
  title: "For My Love ❤️",
  description: "A special place for us, to celebrate every moment we share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${alice.variable} ${cardo.variable}`}>
      <body className="min-h-full flex flex-col bg-cream text-slate-700 font-cardo">
        {children}
      </body>
    </html>
  );
}
