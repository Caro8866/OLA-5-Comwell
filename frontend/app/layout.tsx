import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome to Comwell's hotels throughout the country",
  description: "Meeting rooms, conference rooms, venues and lovely rooms. Comwell has it all. We aim high, also regarding sustainability, so you get the best experiences",
  keywords: "hotel, meeting room, conference room, accommodation, hotel stay, Denmark, offer, restaurant, meeting package, stay, spa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
