import { useRef } from 'react';
import {
  CheckCircle,
  ChevronLeft,
  Upload,
  ImageIcon,
  X,
} from 'lucide-react';
import Image from 'next/image';

interface BuktiPembayaranProps {

    paymentProof: string | null;
     handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isStep4Valid: boolean;
     setPaymentProof: (e: string | null) => void; 
   handlePrevStep: () => void;
    handleNextStep: () => void;
   totalPrice: number;
   handleFinishPayment: () => void

}

const BuktiPembayaran = ( {  paymentProof, handleFileChange, isStep4Valid, handleFinishPayment,  setPaymentProof, handlePrevStep, handleNextStep, totalPrice} : BuktiPembayaranProps) => {

      const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
         <div id="step-3-content" className="space-y-6">
                <div className="border-b border-marine-50 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-marine-900 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-cyan-600" />
                    Upload Bukti Pembayaran
                  </h3>
                  <p className="text-xs text-marine-600 mt-1">Silakan transfer ke rekening MYCA lalu upload screenshot / foto bukti transfer.</p>
                </div>

                {/* Info Rekening */}
                <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 space-y-2 text-sm">
                  <p className="font-bold text-marine-900">Informasi Rekening MYCA Les Renang:</p>
                  <div className="grid grid-cols-2 gap-y-1 text-xs text-marine-800">
                    <span className="text-marine-600">Bank</span>
                    <span className="font-semibold">BCA / BRI / Mandiri</span>
                    <span className="text-marine-600">No. Rekening</span>
                    <span className="font-mono font-bold text-marine-950">1234-5678-90</span>
                    <span className="text-marine-600">Atas Nama</span>
                    <span className="font-semibold">MYCA Semarang Aquatic</span>
                    <span className="text-marine-600">Nominal</span>
                    <span className="font-bold text-cyan-700">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Upload Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                    Bukti Transfer <span className="text-red-500">*</span>
                  </label>

                  {!paymentProof ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-marine-200 hover:border-cyan-400 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-marine-50/40 hover:bg-cyan-50/30"
                    >
                      <ImageIcon className="h-10 w-10 text-marine-300" />
                      <p className="text-sm text-marine-600 font-medium">Klik untuk pilih gambar</p>
                      <p className="text-xs text-marine-400">JPG, PNG, atau WEBP — maks. 5MB</p>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-marine-100">
                      <Image 
                      width={64} 
                      height={64}
                      src={paymentProof} 
                      alt="Bukti Pembayaran" 
                      className="w-full max-h-64 object-contain bg-marine-50" />
                      <button
                        type="button"
                        onClick={() => setPaymentProof(null)}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-2 p-3 bg-emerald-50 border-t border-emerald-100">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs text-emerald-700 font-semibold">Bukti berhasil diunggah</span>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex justify-between pt-6 border-t border-marine-50">
                  <button
                    id="btn-step3-back"
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold text-marine-800 hover:text-cyan-500 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Kembali
                  </button>
                  <button
                    id="btn-step3-submit"
                    type="submit"
                    disabled={!isStep4Valid}
                    onClick={() => {
                      handleNextStep();
                      handleFinishPayment();
                    }}
                    className="flex items-center gap-2 py-3.5 px-8 text-sm font-bold text-white bg-cyan-600 disabled:opacity-50 hover:bg-cyan-500 rounded-xl cursor-pointer shadow-lg shadow-cyan-200/50 transition-all duration-300"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Kirim Pendaftaran
                  </button>
                </div>
              </div>
        </>
    )
}

export default BuktiPembayaran;