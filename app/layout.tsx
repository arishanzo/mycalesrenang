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
   keywords: [
    "les renang dewasa semarang",
    "les renang di semarang",
    "les renang semarang",
    "rania myca",
    "kursus renang semarang",
    "les renang",
     "les renang murah",
      "Paket les renang",
       "private les renang",
        "les renang solo",
         "les renang di jawa tengah",
         "info les renang",
  ],
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
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "MYCA Center of Aquatic",
            image: "https://lesrenangmyca.com/logo.png",
            url: "https://lesrenangmyca.com",
            telephone: "+62-812-3456-7890",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Contoh Raya No. 123",
              addressLocality: "Semarang",
              addressRegion: "Jawa Tengah",
              postalCode: "50123",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -6.9667,
              longitude: 110.4167,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
            ],
            description:
              "Les renang Semarang dengan program privat, semi privat, dan grup untuk anak-anak maupun dewasa.",
            priceRange: "Rp",
            offers: [
              {
                "@type": "Offer",
                name: "Les Privat Renang",
                description: "Program privat dengan instruktur 1-on-1.",
                price: "500000",
                priceCurrency: "IDR",
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                name: "Les Semi Privat",
                description: "Program semi privat untuk 2-3 peserta.",
                price: "350000",
                priceCurrency: "IDR",
                availability: "https://schema.org/InStock",
              },
              {
                "@type": "Offer",
                name: "Les Grup",
                description: "Program grup untuk 4-6 peserta.",
                price: "250000",
                priceCurrency: "IDR",
                availability: "https://schema.org/InStock",
              },
            ],
          }),
        }}
      />

    </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
