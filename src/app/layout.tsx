import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-pink-rose font-sans">
        {children}
      </body>
    </html>
  );
}
