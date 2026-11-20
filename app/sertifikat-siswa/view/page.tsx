import type { Metadata } from 'next';
import { CertificateNotFound } from '../components/CertificateState';

export const metadata: Metadata = {
  title: 'Sertifikat tidak ada | MYCA Center of Aquatic',
};

export default function CertificateWithoutIdPage() {
  return <CertificateNotFound />;
}
