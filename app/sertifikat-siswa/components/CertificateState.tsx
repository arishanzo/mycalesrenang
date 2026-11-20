import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export function CertificateNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <FileQuestion className="h-8 w-8" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          MYCA Center of Aquatic
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Sertifikat tidak ada</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Tautan mungkin tidak lengkap atau sertifikat sudah tidak tersedia.
          Periksa kembali ID sertifikat yang Anda terima.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-marine-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-marine-700"
        >
          <Home className="h-4 w-4" />
          Kembali ke beranda
        </Link>
      </section>
    </main>
  );
}

export function CertificateLoadError({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <h1 className="text-xl font-bold text-slate-900">Sertifikat belum dapat dimuat</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message || 'Periksa koneksi internet Anda, lalu muat ulang halaman.'}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-marine-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-marine-700"
        >
          <Home className="h-4 w-4" />
          Kembali ke beranda
        </Link>
      </section>
    </main>
  );
}
