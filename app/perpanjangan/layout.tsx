import type { Metadata } from "next";
import { Geist, Baloo_2 } from "next/font/google";
import "../globals.css";

export const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MYCA Center of Aquatic",
  description: " les renang Semarang yang menyediakan pilihan program les privat, semi privat, dan grup. ",
  icons: './images/logo.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
