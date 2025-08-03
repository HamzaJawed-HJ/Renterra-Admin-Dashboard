import { Geist, Geist_Mono } from "next/font/google";

const primaryFont = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
});

const secondaryFont = Geist_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export { primaryFont, secondaryFont };
