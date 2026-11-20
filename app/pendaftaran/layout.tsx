import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Les Renang - MYCA Center of Aquatic",
  description: "Isi Biodata / form les renang private myca center of aquatic",
};

export default function PendaftaranLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
