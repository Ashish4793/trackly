import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";


const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trackly - Job Tracker",
  description: "Track your job applications effortlessly with Trackly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manropeSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
