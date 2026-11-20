import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perpanjangan Les Renang - MYCA Center of Aquatic",
  description: "Les renang Semarang yang menyediakan pilihan program les privat, semi privat, dan grup.",
};

export default function PerpanjanganLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
