'use client';

import { MYCA_PACKAGES,  MYCA_LOCATIONS } from "@/app/libs/data";
import { BookingSubmission, CourseDays } from "@/app/types/types";
import {  AlertCircle, CheckCircle, Phone, Printer } from "lucide-react";
import Image from "next/image";



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
  handlePrint: () => void;
  openWhatsApp: () => void;
  resetForm: () => void
  invoicePrinted: boolean;
   courseDays: CourseDays[];
}

const ConfirmedBooking = ({ confirmedBooking, courseDays, resetForm, openWhatsApp, handlePrint, invoicePrinted } : InvoiceStepProps) => {
    return (

        <>
         <div id="step-6-content" className="space-y-2 animate-reveal">
                
                {/* Visual success splash */}
                <div className="text-center py-6">
                  <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center max-w-7xl mx-auto mb-4 animate-bounce">
                    <CheckCircle className="h-10 w-10 text-emerald-600 fill-emerald-100" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-marine-900">
                    Tiket Booking Berhasil Dibuat!
                  </h3>
                  <p className="text-sm text-marine-600 mt-1 max-w-md mx-auto">
                    Kuitansi elektronik estimasi Anda telah diterbitkan secara lokal. Langkah mutlak terakhir adalah menghubungkan WhatsApp Pelatih untuk memverifikasi agenda kolam renang.
                  </p>
                </div>

                {/* Premium Printable Ticket Layout Block */}
                <div 
                  id="printable-ticket"
                  className="p-6 sm:p-8 bg-dashed border-2 border-marine-300 bg-marine-50/50 rounded-3xl relative"
                >
                  {/* Decorative stamp watermark */}
                  <div className="absolute top-4 md:right-42 right-2 mt-3 border-2 border-green-800/20 text-green-800/25  py-1 px-4 font-mono font-bold text-xs rounded tracking-widest uppercase">
                    Lunas Pembayaran
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-dashed border-marine-300">
                    
                    {/* Ticket Brand Banner left */}
                    <div className="md:col-span-8 flex items-center gap-3">
                     
                      <div>
                        <p className="font-display font-bold text-marine-950 text-lg">MYCA - Center of Aquatic</p>
                        <p className="text-xs text-marine-650 font-mono -mt-0.5">Semarang Les Renang Premium</p>
                      </div>
                    </div>

                    {/* Ticket Code right */}
                    <div className="md:col-span-4 text-left md:text-right">
                      <p className="text-[10px] text-marine-600 uppercase font-mono tracking-wider">KODE PENDAFTARAN</p>
                      <p className="text-xl font-bold font-mono text-marine-900 tracking-wider">
                        {confirmedBooking.booking_code}
                      </p>
                    </div>

                  </div>

              {/* Core Information Details */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-6 border-b border-marine-150 text-sm">
                           <div>
                          <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider font-semibold">Atas Nama Lengkap Murid</p>
                          <p className="font-bold text-marine-900 mt-0.5">{confirmedBooking?.student_name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider font-semibold">Nama Panggilan Murid</p>
                          <p className="font-bold text-marine-900 mt-0.5">{confirmedBooking?.nama_panggilan}</p>
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
                       <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Jam</p>
                       <p className="font-bold text-marine-800 mt-0.5 font-sans">
                       {confirmedBooking?.course_time }
                       
                       </p>
                     </div>

                     <div>
                       <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Hari</p>
                       <p className="font-bold text-marine-800 mt-0.5 font-sans">
                  { courseDays.map(i => i.name).join(',') || '-'}
                       
                       </p>
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

                    {confirmedBooking.paymentProof && (
                      <div className="col-span-1 sm:col-span-2 mt-5 mb-5 bg-emerald-50 p-3 rounded-xl border border-emerald-250">
                        <p className="text-[10px] text-emerald-700 font-mono uppercase tracking-wider font-bold">Bukti Transfer Dilampirkan (LUNAS):</p>
                          

                          {confirmedBooking?.paymentProof instanceof File ? (
                             <Image
                                                width={64} 
                                                height={64}
                                               src={URL.createObjectURL(confirmedBooking.paymentProof)}
                                                alt="Bukti Pembayaran" 
                                                className="w-full py-4 max-h-64 object-contain bg-marine-50" />
                             ) : (
                                         <Image
                                                width={64} 
                                                height={64}
                                               src={confirmedBooking?.paymentProof }
                                                alt="Bukti Pembayaran" 
                                                className="w-full py-4 max-h-64 object-contain bg-marine-50" />
                                      )}


                                                   
                                           </div>
                    )}

                    {confirmedBooking.notes && (
                      <div className="col-span-1 sm:col-span-2 bg-white/70 p-3 rounded-xl border border-marine-100">
                        <p className="text-[10px] text-marine-600 font-mono uppercase tracking-wider">Catatan Keperluan Khusus:</p>
                        <p className="text-xs text-marine-800 italic font-light mt-0.5 mt-1">{confirmedBooking.notes}</p>
                      </div>
                    )}

                 

                  {/* Financial Estimations Block inside ticket */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 gap-3">
                    <div>
                      <p className="text-xs text-marine-600">Total Biaya Sesi Latihan:</p>
                      <p className="text-xs text-marine-500 italic mt-0.5">Tipe: Sesi Lunas Sesuai Kedatangan</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold font-display text-marine-900">
                        Rp {confirmedBooking.total_price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[9px] text-cyan-600 font-mono">Dukungan Garansi Cepat Bisa</p>
                    </div>
                  </div>




<div className="border border-blue-300 rounded-lg p-6 shadow-sm bg-white mt-8">
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

                {/* Confirm on whatsapp and local commands */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center pt-4">
                  <button
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
                </button> 

                  <button
                    id="btn-confirm-wa"
                    disabled= { invoicePrinted ? false : true }
                    type="button"
                    onClick={openWhatsApp}
                              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold transition-all cursor-pointer text-sm sm:text-base pointer-events-auto ${
            invoicePrinted 
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md hover:shadow-cyan-200/20' 
              : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200/50 cursor-pointer '
          } `}                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    Kirim Pesan Konfirmasi (WA)
                  </button>

                  <button
                    id="btn-register-new-student"
                    type="button"
                    onClick={resetForm}
                    className="flex items-center justify-center gap-1 py-3 px-5 rounded-xl text-sm font-semibold text-marine-800 hover:text-cyan-600 transition-colors cursor-pointer"
                  >
                    Daftar Murid Baru Lagi
                  </button>
                </div>

                 <div className="no-print mt-4 p-4 bg-cyan-50/70 border border-cyan-150 rounded-2xl flex gap-3 items-start text-xs text-cyan-800 leading-relaxed max-w-2xl mx-auto shadow-sm">
        <AlertCircle className="h-4.5 w-4.5 text-cyan-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-cyan-950 block mb-0.5">💡 Tips Cetak & Simpan PDF Sebagai Bukti Pembayaran:</span>
          Jika tombol cetak tidak berespon pada tampilan pratinjau saat ini, silakan tekan tombol <strong>Open App in New Tab (ikon panah keluar di pojok kanan atas layar pratinjau browser)</strong> untuk membukanya di tab baru secara utuh, lalu tekan kembali tombol Cetak. Anda dapat memilih printer <strong>Save as PDF</strong> untuk mengunduhnya secara digital.
        </div>
      </div>

        </>

    )
}

export default ConfirmedBooking;