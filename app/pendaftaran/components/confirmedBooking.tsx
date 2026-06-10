'use client';

import { MYCA_PACKAGES,  MYCA_LOCATIONS } from "@/app/libs/data";
import { BookingSubmission } from "@/app/types/types";
import { BadgeCheck, Hourglass, Phone, Waves } from "lucide-react";
import Image from "next/image";

const ConfirmedBooking = ({ Booking, onReset, onWhatsApp }: { Booking:  BookingSubmission; onReset: () => void; onWhatsApp: () => void;  }) => {
    return (

        <>
         <div id="step-4-content" className="space-y-8">

                {/* Status Banner */}
                <div className="text-center py-6">
                  <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hourglass className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-marine-900">Pendaftaran Terkirim!</h3>
                  <p className="text-sm text-marine-600 mt-2 max-w-md mx-auto">
                    Bukti pembayaran Anda sudah kami terima. Tim MYCA akan memverifikasi dan menghubungi Anda dalam 1×24 jam kerja.
                  </p>
                </div>

                {/* Status Card */}
                <div className="bg-marine-50 rounded-2xl p-6 border border-marine-100 space-y-4">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Waves className="h-5 w-5 text-marine-800" />
                      <span className="font-display font-bold text-marine-900">MYCA Les Renang</span>
                    </div>
                    <span className="font-mono font-bold text-cyan-600 tracking-wider">{Booking.booking_code}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 text-xs border-t border-marine-100 pt-4">
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Nama Murid</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{Booking.student_name}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Paket</p>
                      <p className="font-semibold text-cyan-600 mt-0.5">{MYCA_PACKAGES.find(p => p.id === Booking.package_id)?.name}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Lokasi</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{MYCA_LOCATIONS.find(l => l.id === Booking.location_id)?.name}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Jadwal</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{Booking.schedule_preference}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Total Bayar</p>
                      <p className="font-bold text-marine-900 mt-0.5">Rp {Booking.total_price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-marine-100">
                    <span className="text-xs text-marine-600">Status Pendaftaran</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                      Booking.status === 'Pembayaran Diterima' || Booking.status === 'Terkonfirmasi'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {Booking.status === 'Pembayaran Diterima' || Booking.status === 'Terkonfirmasi'
                        ? <BadgeCheck className="h-3.5 w-3.5" />
                        : <Hourglass className="h-3.5 w-3.5" />
                      }
                      {Booking.status}
                    </span>
                  </div>

                  {/* Bukti Bayar thumbnail */}
                  {Booking.paymentProof && (
                    <div className="pt-2">
                      <p className="text-xs text-marine-500 uppercase font-mono tracking-wider mb-2">Bukti Pembayaran</p>
                      <Image
                      width={40}
                      height={40}
                        src={Booking.paymentProof}
                        alt="Bukti Pembayaran"
                        className="w-full max-h-40 object-contain rounded-xl border border-marine-100 bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    id="btn-confirm-wa"
                    type="button"
                    onClick={() => onWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    Konfirmasi via WhatsApp
                  </button>
                  <button
                    id="btn-register-new-student"
                    type="button"
                    onClick={() => onReset()}
                    className="flex items-center justify-center gap-1 py-3 px-5 rounded-xl text-sm font-semibold text-marine-800 hover:text-cyan-600 border border-marine-200 hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    Daftar Murid Baru
                  </button>
                </div>

              </div>
        
        </>

    )
}

export default ConfirmedBooking;