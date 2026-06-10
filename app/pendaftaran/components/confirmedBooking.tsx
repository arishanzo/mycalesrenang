'use client';

import { MYCA_PACKAGES,  MYCA_LOCATIONS } from "@/app/libs/data";
import { BookingSubmission } from "@/app/types/types";
import {  CheckCircle, Phone, Printer } from "lucide-react";
import Image from "next/image";


interface InvoiceStepProps {
  confirmedBooking: BookingSubmission;
  handlePrint: () => void;
  openWhatsApp: () => void;
  resetForm: () => void
}

const ConfirmedBooking = ({ confirmedBooking, resetForm, openWhatsApp, handlePrint, } : InvoiceStepProps) => {
    return (

        <>
         <div id="step-6-content" className="space-y-8 animate-reveal">
                
                {/* Visual success splash */}
                <div className="text-center py-6">
                  <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
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
                  <div className="absolute top-4 right-4 border-2 border-marine-800/20 text-marine-800/25 rotate-12 py-1 px-4 font-mono font-bold text-xs rounded tracking-widest uppercase">
                    Official MYCA
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
                           {confirmedBooking?.start_date.toLocaleDateString('id-ID', {
                                   weekday: 'long',
                                   year: 'numeric',
                                   month: 'long',
                                   day: 'numeric'
                                   })}</p>
                     </div>
           
                      <div>
                       <p className="text-[10px] text-marine-500 font-mono uppercase tracking-wider">Jam Mulai</p>
                       <p className="font-bold text-marine-800 mt-0.5 font-sans">
                       {confirmedBooking?.course_time }
                       
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
                         {MYCA_LOCATIONS.find(l => l.id === confirmedBooking?.location_id)?.name}
                       </p>
                     </div>
                   </div>

                    {confirmedBooking.paymentProof && (
                      <div className="col-span-1 sm:col-span-2 mt-5 mb-5 bg-emerald-50 p-3 rounded-xl border border-emerald-250">
                        <p className="text-[10px] text-emerald-700 font-mono uppercase tracking-wider font-bold">Bukti Transfer Dilampirkan (LUNAS):</p>
                          

                             <Image
                                                width={64} 
                                                height={64}
                                                src={confirmedBooking.paymentProof} 
                                                alt="Bukti Pembayaran" 
                                                className="w-full py-4 max-h-64 object-contain bg-marine-50" />
                       
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
                      <p className="text-xs text-marine-600">Total Biaya Sesi & Asuransi Latihan:</p>
                      <p className="text-xs text-marine-500 italic mt-0.5">Tipe: Sesi Lunas Sesuai Kedatangan</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold font-display text-marine-900">
                        Rp {confirmedBooking.total_price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[9px] text-cyan-600 font-mono">Dukungan Garansi Cepat Bisa</p>
                    </div>
                  </div>
 </div>
                </div>

                {/* Confirm on whatsapp and local commands */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center pt-4">
                  <button
                    id="btn-print-ticket"
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-1.5 py-3 px-5 border border-marine-200 rounded-xl hover:bg-marine-50 transition-colors text-sm font-semibold text-marine-800 cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    Cetak Tiket (Print)
                  </button>

                  <button
                    id="btn-confirm-wa"
                    type="button"
                    onClick={openWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md hover:shadow-emerald-250/20 transition-all cursor-pointer"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    Kirim Pesan Konfirmasi ke Pelatih (WA)
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

        </>

    )
}

export default ConfirmedBooking;