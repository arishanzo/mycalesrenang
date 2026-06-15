import React from 'react';
import { BookingSubmission, CourseDays } from '@/app/types/types';
import { MYCA_PACKAGES, MYCA_LOCATIONS } from '@/app/libs/data'
import { 
  FileText, 
  CreditCard, 
  AlertCircle, 
  ChevronRight 
} from 'lucide-react';

 const rules = [
    "Keterlambatan dari pihak murid tidak ada tambahan waktu. Apabila ada keterlambatan dari pihak coach akan diberikan tambahan waktu.",
    "Pembayaran les renang dilakukan di depan sesuai dengan pilihan paket. Paket Les Renang berlaku dalam 1 bulan. Pembayaran yang sudah lunas tidak dapat dikembalikan.",
    "Penggantian hari apabila tidak masuk/ijin/sakit berlaku dalam 1 bulan. Apabila tidak ada komunikasi penggantian hari dianggap masuk les renang.",
    "Apabila coach berhalangan hadir akan diberikan penggantian hari. Apabila ada tanggal merah tidak ada penggantian hari (bisa tetap renang/tidak, apabila tidak, tidak ada penggantian hari).",
    "Dalam grup ber 2/3 apabila ada salah satu murid yang bisa masuk dan tidak masuk akan dianggap jadwal berjalan.",
    "Diharapkan untuk orang tua/wali murid turut memperhatikan/mengawasi anak-anak.",
  ];

interface InvoiceStepProps {
  confirmedBooking: BookingSubmission;
  printError: string;
  setPrintError: (msg: string) => void;
  setCurrentStep: (step: number) => void;
  handlePrint: () => void;
  courseDays: CourseDays[];
}

export const InvoiceStep: React.FC<InvoiceStepProps> = ({
  confirmedBooking,
  printError,
  setCurrentStep,
   courseDays
}) => {
  return (
    <div id="step-4-content" className="space-y-8 animate-reveal font-sans">
      
      {/* Visual success splash */}
      <div className="text-center py-4">
        <div className="h-14 w-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
          <FileText className="h-7 w-7 text-amber-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-marine-900">
          Invoice Pendaftaran Diterbitkan!
        </h3>
        <p className="text-xs text-marine-600 mt-1 max-w-md mx-auto">
          Silakan screnshoot atau simpan Invoice resmi di bawah ini sebelum melakukan transfer bank, kemudian klik tombol unggah bukti di bagian bawah.
        </p>
      </div>

      {/* Premium Printable Invoice Layout Block */}
      <div 
        id="printable-invoice"
        className="p-6 sm:p-8 border-2 border-marine-300 bg-white rounded-3xl relative shadow-inner"
      >
        {/* Decorative badge watermark */}
        <div className="absolute top-6 right-6 border border-amber-500/40 text-amber-600/60 rotate-6 py-1 px-3 font-mono font-bold text-[10px] rounded tracking-wider uppercase">
          BELUM LUNAS - MENUNGGU PEMBAYARAN
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-marine-100">
          {/* Brand banner left */}
          <div className="md:col-span-8 flex items-center gap-3">
            <div>
              <p className="font-display font-bold text-marine-950 text-lg uppercase tracking-tight">MYCA Les Renang</p>
              <p className="text-[10px] text-marine-500 font-mono -mt-0.5">Miss Yenny Center of Aquatic</p>
            </div>
          </div>

          {/* Invoice Meta right */}
          <div className="md:col-span-4 text-left md:text-right font-sans">
            <p className="text-[10px] text-marine-500 uppercase font-mono tracking-wider font-semibold">NOMOR INVOICE</p>
            <p className="text-lg font-bold font-mono text-marine-900 tracking-wider mt-0.5">
              INV/MYCA/{confirmedBooking?.booking_code.split('-')[1]}
            </p>
            <p className="text-[10px] text-marine-400 font-mono mt-0.5">Tanggal: {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })} - { new Date().toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                    }) } </p>
          </div>
        </div>

        {/* Core Information Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-6 border-b border-marine-150 text-sm">
          <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider font-semibold">Atas Nama Calon Murid</p>
            <p className="font-bold text-marine-900 mt-0.5">{confirmedBooking?.student_name}</p>
          </div>

          {confirmedBooking?.parent_name && (
            <div>
              <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Orang Tua / Wali</p>
              <p className="font-bold text-marine-900 mt-0.5">{confirmedBooking?.parent_name || '-'}</p>
            </div>
          )}


          <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider font-semibold">Tipe Kursus / Program</p>
            <p className="font-bold text-cyan-600 mt-0.5 font-display">
              Program  {MYCA_PACKAGES.find(p => p.id === confirmedBooking?.package_id)?.category} -   {MYCA_PACKAGES.find(p => p.id === confirmedBooking?.package_id)?.name}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Biaya Program</p>
            <p className="font-bold text-marine-800 mt-0.5 font-sans">
              Rp {(MYCA_PACKAGES.find(p => p.id === confirmedBooking?.package_id)?.pricePerPerson || 100000).toLocaleString('id-ID')}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider font-semibold">Tanggal Mulai</p>
            <p className="font-bold text-marine-900 mt-0.5">
               {confirmedBooking?.start_date
                              ? new Date(confirmedBooking.start_date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                              : '-'}</p>
          </div>

           <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Jam Mulai</p>
            <p className="font-bold text-marine-800 mt-0.5 font-sans">
            {confirmedBooking?.course_time }
            
            </p>
          </div>

           <div>
                       <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Hari</p>
                       <p className="font-bold text-marine-800 mt-0.5 font-sans">
                       {  courseDays.map(i => i.name).join(',') || '-'} </p>
</div>
          <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Catatan</p>
            <p className="font-bold text-marine-800 mt-0.5 font-sans">
            {confirmedBooking?.notes || '-' }
            
            </p>
          </div>

          <div>
            <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider font-semibold">Lokasi Kolam Latihan</p>
            <p className="font-bold text-marine-800 mt-0.5 font-sans">
              {MYCA_LOCATIONS.find(l => l.id === confirmedBooking?.location_id)?.name || confirmedBooking.location_id }
            </p>
          </div>
        </div>

        {/* Financial Estimations Block */}
        <div className="py-6 border-b border-marine-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-xs text-marine-600 font-sans">Total Tagihan Les (Net):</p>
            <p className="text-[10px] text-marine-400 italic mt-0.5 font-light">Biaya Paket All-In (Termasuk pendaftaran, & sertifikat)</p>
           <p className="text-[10px] text-red-800 italic mt-0.5 font-light font-semibold">Harga Belum  Termasuk Tiket Masuk, dan Asuransi </p>
          </div>
          <div className="text-left sm:text-right font-sans">
            <p className="text-2xl font-bold font-display text-marine-900 font-sans">
              Rp {confirmedBooking?.total_price.toLocaleString('id-ID')}
            </p>
            <p className="text-[10px] text-emerald-600 font-bold font-mono tracking-wide uppercase mt-0.5">★ GARANSI LANGSUNG BISA</p>
          </div>
        </div>

        {/* Bank Transfer Details with Copy Options */}
        <div className="pt-6 font-sans">
          <h4 className="text-xs font-bold font-display text-marine-900 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <CreditCard className="h-4 w-4 text-cyan-600" />
            METODE PEMBAYARAN TRANSFER BANK
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bank BCA account */}
            <div className="bg-marine-50/50 p-4 rounded-2xl border border-marine-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-marine-500 font-bold uppercase tracking-wider">Bank BCA</p>
                <p className="text-sm font-black font-mono text-marine-950 mt-1">0095332728</p>
                <p className="text-[10px] text-marine-600 mt-0.5 font-sans">a.n. <strong className="font-semibold">Yenny Sarwokusumo</strong></p>
              </div>
              <span className="text-[10px] bg-cyan-100/70 border border-cyan-200 text-cyan-700 px-2 py-1 rounded-lg select-none font-bold">
                Utama
              </span>
            </div>

            {/* Bank Mandiri account */}
            <div className="bg-marine-50/50 p-4 rounded-2xl border border-marine-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-marine-500 font-bold uppercase tracking-wider">Bank BRI</p>
                <p className="text-sm font-black font-mono text-marine-950 mt-1">008301193936502</p>
                <p className="text-[10px] text-marine-600 mt-0.5 font-sans">a.n. <strong className="font-semibold">Yenny Sarwokusumo</strong></p>
              </div>
              <span className="text-[10px] bg-marine-100 border border-marine-200 text-marine-700 px-2 py-1 rounded-lg select-none font-bold">
                Alternatif
              </span>
            </div>

              {/* Bank Mandiri account */}
            <div className="bg-marine-50/50 p-4 rounded-2xl border border-marine-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-marine-500 font-bold uppercase tracking-wider">Bank Mandiri</p>
                <p className="text-sm font-black font-mono text-marine-950 mt-1">1350016264911</p>
                <p className="text-[10px] text-marine-600 mt-0.5 font-sans">a.n. <strong className="font-semibold">Yenny Sarwokusumo</strong></p>
              </div>
              <span className="text-[10px] bg-marine-100 border border-marine-200 text-marine-700 px-2 py-1 rounded-lg select-none font-bold">
                Alternatif
              </span>
            </div>
          </div>

<div className="border border-blue-300 rounded-lg p-6 shadow-sm bg-white">
  <h2 className="text-2xl font-bold text-blue-700 mb-2">
    Peraturan di Komunitas
  </h2>
  <h3 className="text-lg font-semibold text-gray-700 mb-4">
    Les Renang Myca
  </h3>

  <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
    {rules.map((rule, index) => (
      <li key={index}>{rule}</li>
    ))}
  </ol>

  <div className="mt-6 text-center text-blue-600 font-semibold">
    See you at the pool!
  </div>
</div>


         
        </div>

      </div>

      {/* Visual indicator / print warning banner */}
      {printError && (
        <div 
          id="print-error-banner" 
          className="no-print max-w-2xl mx-auto p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex gap-3 items-start text-xs leading-relaxed shadow-sm animate-reveal"
        >
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-950 block mb-1">⚠️ CETAK INVOICE DIWAJIBKAN:</span>
            {printError} Silakan tekan tombol <strong className="text-rose-950 font-bold">Cetak / Simpan PDF Invoice</strong> berwarna oranye/krem di bawah ini terlebih dahulu.
          </div>
        </div>
      )}

      {/* Print Invoice trigger and flow advancements */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center pt-2">
        {/* <button
          id="btn-print-invoice"
          type="button"
          onClick={handlePrint}
          className={`flex items-center justify-center gap-1.5 py-3 px-5 border-2 rounded-xl transition-all text-sm font-semibold cursor-pointer ${
            !invoicePrinted 
              ? 'border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 animate-pulse shadow-md shadow-amber-200/50' 
              : 'border-marine-250 bg-marine-50 hover:bg-marine-100 text-marine-800'
          }`}
        >
          <Printer className="h-4 w-4" />
          Cetak / Simpan PDF Invoice {invoicePrinted && '✓'}
        </button> */}

        <button
          id="btn-goto-upload"
          type="button"
          onClick={() => {
            setCurrentStep(4);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold transition-all cursor-pointer text-sm sm:text-base pointer-events-auto ${
            'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md hover:shadow-cyan-200/20 cursor-pointer'
          }`}
        >
          Lanjut ke Unggah Bukti TF
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>

        <button
          id="btn-back-to-form"
          type="button"
          onClick={() => setCurrentStep(2)}
          className="flex items-center justify-center gap-1 py-3 px-4 rounded-xl text-xs font-semibold text-marine-600 hover:text-red-500 transition-colors cursor-pointer"
        >
          Revisi Pendaftaran
        </button>
      </div>

      {/* Print Invoice helper banner for iframe compatibility */}
      {/* <div className="no-print mt-4 p-4 bg-cyan-50/70 border border-cyan-150 rounded-2xl flex gap-3 items-start text-xs text-cyan-800 leading-relaxed max-w-2xl mx-auto shadow-sm">
        <AlertCircle className="h-4.5 w-4.5 text-cyan-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-cyan-950 block mb-0.5">💡 Tips Cetak & Simpan PDF:</span>
          Jika tombol cetak tidak berespon pada tampilan pratinjau saat ini, silakan tekan tombol <strong>Open App in New Tab (ikon panah keluar di pojok kanan atas layar pratinjau browser)</strong> untuk membukanya di tab baru secara utuh, lalu tekan kembali tombol Cetak. Anda dapat memilih printer <strong>Save as PDF</strong> untuk mengunduhnya secara digital.
        </div>
      </div> */}

    </div>
  );
};
