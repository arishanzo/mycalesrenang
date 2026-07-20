import type { Metadata } from "next";
import { Geist, Baloo_2 } from "next/font/google";
import "./globals.css";

export const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL('https://lesrenangmyca.com'), // Ganti dengan domain Anda
  title: 'MYCA Center of Aquatic | Les Renang Semarang',
  description:
    'Les renang Semarang yang menyediakan pilihan program les privat, semi privat, dan grup.',
  icons: {
    icon: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MYCA Center of Aquatic | Les Renang Semarang',
    description:
      'Les renang Semarang yang menyediakan pilihan program les privat, semi privat, dan grup.',
    url: 'https://lesrenangmyca.com',
    siteName: 'MYCA Center of Aquatic',
    locale: 'id_ID',
    type: 'website',
  },
}

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
