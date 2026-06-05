'use client';

import { MYCA_PACKAGES } from "@/app/libs/data";
import { BookingSubmission } from "@/app/types/types";
import { BadgeCheck, History, Hourglass } from "lucide-react";

const HistoryModal = ({ bookings, onClose, onSelectBooking }: { bookings: BookingSubmission[]; onClose: () => void; onSelectBooking: (booking: BookingSubmission) => void }) => {


    return (

        <>
<div className="fixed inset-0 bg-marine-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-marine-100 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-marine-100 pb-4 mb-6">
              <h3 className="font-display font-bold text-lg text-marine-900 flex items-center gap-2">
                <History className="h-5 w-5 text-cyan-600" />
                Histori Pendaftaran
              </h3>
              <button
                id="close-history-modal"
                onClick={onClose}
                className="p-1 px-2.5 rounded-lg text-xs bg-marine-100 hover:bg-marine-200 text-marine-800 font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-marine-600">Belum ada pendaftaran tersimpan.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(book => (
                  <div key={book.id} className="p-4 border border-marine-150 rounded-2xl hover:border-cyan-500/60 bg-marine-50/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono tracking-wider text-cyan-600">{book.bookingCode}</span>
                      <span className="text-[10px] text-marine-600">{book.submittedAt}</span>
                    </div>
                    <p className="text-sm font-semibold text-marine-950 mt-2">{book.studentName}</p>
                    <p className="text-xs text-marine-800">
                      {MYCA_PACKAGES.find(p => p.id === book.packageId)?.name} • {(book.courseDays ?? []).length}× pertemuan
                    </p>
                    <div className="mt-3 pt-3 border-t border-marine-100/60 flex justify-between items-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                        book.status === 'Terkonfirmasi' || book.status === 'Pembayaran Diterima'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {book.status === 'Terkonfirmasi' || book.status === 'Pembayaran Diterima'
                          ? <BadgeCheck className="h-3 w-3" />
                          : <Hourglass className="h-3 w-3" />
                        }
                        {book.status}
                      </span>
                      <button
                        id={`btn-open-ticket-${book.id}`}
                        onClick={() => onSelectBooking(book)}
                        className="text-[10px] bg-marine-800 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-cyan-500 transition-colors cursor-pointer"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        </>

    )
}

export default HistoryModal;