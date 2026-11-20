import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Download, ShieldCheck } from 'lucide-react';
import type { SertifikatData } from '@/app/types/types';
import { getSertifikatFileUrl } from '@/app/services/sertifikat.services';
import CertificatePdfPreview from './CertificatePdfPreview';
import CertificateShareActions from './CertificateShareActions';

export default function CertificatePublicView({
  certificate,
}: {
  certificate: SertifikatData;
}) {
  const certificateUrl = getSertifikatFileUrl(certificate.fileproof_sertifikat);
  const reportUrl = getSertifikatFileUrl(
    certificate.fileproof_laporanbulanan,
    'monthly-report',
  );
  const publishDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(certificate.tgl_sertifikat));

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image src="/logo.png" alt="MYCA" width={44} height={44} className="rounded-xl" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold tracking-wide text-marine-950">
                MYCA Center of Aquatic
              </span>
              <span className="block text-xs text-slate-500">Sertifikat Digital</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Beranda</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
        <div className="min-w-0">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Sertifikat terverifikasi
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              Sertifikat {certificate.student_name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Dokumen sertifikat resmi dari MYCA Center of Aquatic.
            </p>
          </div>
          <CertificatePdfPreview
            fileUrl={certificateUrl}
            studentName={certificate.student_name}
          />
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">Informasi sertifikat</h2>
            <dl className="mt-4 divide-y divide-slate-100">
              <div className="py-3 first:pt-0">
                <dt className="text-xs text-slate-500">Nama siswa</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {certificate.student_name}
                </dd>
              </div>
              <div className="py-3">
                <dt className="text-xs text-slate-500">No. sertifikat</dt>
                <dd className="mt-1 break-all font-mono text-sm font-semibold text-slate-900">
                  {certificate.no_sertifikat}
                </dd>
              </div>
              <div className="py-3">
                <dt className="text-xs text-slate-500">Level</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  Level {certificate.level_sertifikat}
                </dd>
              </div>
              <div className="py-3 last:pb-0">
                <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Tanggal publish sertifikat
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{publishDate}</dd>
              </div>
            </dl>
          </section>

          <a
            href={reportUrl}
            download={certificate.fileproof_laporanbulanan}
            className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-100"
          >
            <span>
              <span className="block text-sm font-bold text-cyan-950">
                Unduh laporan bulanan
              </span>
              <span className="mt-1 block max-w-[230px] truncate text-xs text-cyan-800">
                {certificate.fileproof_laporanbulanan}
              </span>
            </span>
            <Download className="h-5 w-5 shrink-0 text-cyan-800" />
          </a>

          <CertificateShareActions
            title={`Sertifikat renang ${certificate.student_name} - ${certificate.no_sertifikat}`}
          />
        </aside>
      </div>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} MYCA Center of Aquatic
      </footer>
    </main>
  );
}
