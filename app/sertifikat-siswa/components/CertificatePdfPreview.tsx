type CertificatePdfPreviewProps = {
  fileUrl: string;
  studentName: string;
};

export default function CertificatePdfPreview({
  fileUrl,
  studentName,
}: CertificatePdfPreviewProps) {
  return (
    <section aria-label="Pratinjau sertifikat">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">Pratinjau sertifikat</p>
          <p className="mt-0.5 text-xs text-slate-500">Dokumen PDF resmi MYCA</p>
        </div>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-cyan-700 hover:text-cyan-900"
        >
          Buka di tab baru
        </a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
        <iframe
          src={`${fileUrl}#toolbar=1&navpanes=0`}
          title={`Sertifikat renang ${studentName}`}
          className="h-[min(78vh,900px)] min-h-[480px] w-full"
        />
      </div>
    </section>
  );
}
