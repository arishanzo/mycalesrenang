import type { Metadata } from 'next';
import { getById } from '@/app/services/sertifikat.services';
import type { SertifikatData } from '@/app/types/types';
import CertificatePublicView from '../../components/CertificatePublicView';
import { CertificateLoadError, CertificateNotFound } from '../../components/CertificateState';

type CertificatePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const certificate = await getById(id);
    return {
      title: `Sertifikat ${certificate.student_name} | MYCA Center of Aquatic`,
      description: `Sertifikat renang level ${certificate.level_sertifikat} untuk ${certificate.student_name}.`,
      openGraph: {
        title: `Sertifikat ${certificate.student_name}`,
        description: `Sertifikat renang MYCA nomor ${certificate.no_sertifikat}.`,
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Sertifikat tidak ada | MYCA Center of Aquatic',
    };
  }
}

export default async function CertificateDetailPage({ params }: CertificatePageProps) {
  const { id } = await params;
  if (!id.trim()) return <CertificateNotFound />;

  let certificate: SertifikatData | null = null;
  let errorMessage = '';
  try {
    certificate = await getById(id);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat memuat sertifikat.';
  }

  if (!certificate && /404|not found|tidak ditemukan/i.test(errorMessage)) {
    return <CertificateNotFound />;
  }
  if (!certificate) return <CertificateLoadError message={errorMessage} />;
  return <CertificatePublicView certificate={certificate} />;
}
