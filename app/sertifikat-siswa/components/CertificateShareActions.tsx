'use client';

import { useState } from 'react';
import { Check, Copy, MessageCircle, Share2 } from 'lucide-react';

export default function CertificateShareActions({ title }: { title: string }) {
  const [copyStatus, setCopyStatus] = useState('');

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('Tautan berhasil disalin.');
    } catch (error) {
      console.error('Gagal menyalin tautan sertifikat:', error);
      setCopyStatus('Tautan tidak dapat disalin di browser ini.');
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-cyan-700" />
        <h2 className="text-sm font-bold text-slate-900">Bagikan sertifikat</h2>
      </div>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Bagikan tautan halaman sertifikat ini kepada keluarga dan teman.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => openShareWindow(
            `https://wa.me/?text=${encodeURIComponent(`${title} - ${window.location.href}`)}`,
          )}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => openShareWindow(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
          )}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 hover:bg-blue-100"
        >
          Facebook
        </button>
        <button
          type="button"
          onClick={() => openShareWindow(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
          )}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 hover:bg-sky-100"
        >
          LinkedIn
        </button>
        <button
          type="button"
          onClick={() => openShareWindow(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`,
          )}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200"
        >
          X
        </button>
        <button
          type="button"
          onClick={() => void copyLink()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          {copyStatus === 'Tautan berhasil disalin.' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          Salin tautan
        </button>
      </div>
      {copyStatus && (
        <p className="mt-3 text-xs text-slate-500" role="status">
          {copyStatus}
        </p>
      )}
    </section>
  );
}
