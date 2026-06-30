// VoucherEditModal.tsx
import { update } from "@/app/services/vourchers.services";
import { VouchersData } from "@/app/types/types";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";



export default function VoucherEditModal({  onClose, voucher, isOpen }: {
  onClose: () => void;
  voucher: VouchersData | null;
  isOpen: boolean;
}) {
 

     const [form, setForm] = useState<VouchersData>({
    id: "",
    code: "",
    discount_type: "percentage",
    discount_value: Number(''),
    start_date: "",
    end_date: "",
    is_active: true,
  });

  

  useEffect(() => {
  if (voucher) {

    
    setForm({
      id: voucher.id ?? "",
      code: voucher.code ?? "",
      discount_type: voucher.discount_type ?? "percentage",
      discount_value: Number(voucher?.discount_value ?? 0),
      start_date: format(new Date(voucher.start_date), "yyyy-MM-dd") ?? "",
      end_date:  format(new Date(voucher.end_date), "yyyy-MM-dd") ?? "",
      is_active: voucher.is_active ?? true,
    });
  }
}, [voucher]);

  
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const id = voucher?.id ?? form.id;


     try {

        const res = await update(id, form);
         console.log("RES:", res);
    
       if(res){
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Voucher berhasil diedit.",
          timer: 2000,
          showConfirmButton: false,
        });
       }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat edit voucher.",
        });
      } finally {
        onClose();
        setTimeout(() => {
            window.location.reload();
          }, 3000);
      }
  };

    if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
  <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

    {/* Header */}
    <div className="flex items-start justify-between border-b px-6 py-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Edit Voucher
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Perbarui informasi voucher yang sudah ada.
        </p>
      </div>

      <button
        onClick={onClose}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        ✕
      </button>
    </div>

    {/* Body */}
    <div className="space-y-4 px-6 py-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Kode Voucher
        </label>
        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Masukkan kode voucher"
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Tipe Diskon
        </label>
        <select
          name="discount_type"
          value={form.discount_type}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
        >
          <option value="percentage">Persentase (%)</option>
          <option value="fixed">Nominal (Rp)</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Nilai Diskon
        </label>
        <input
          type="number"
          name="discount_value"
          value={form.discount_value}
          onChange={handleChange}
          placeholder="Masukkan nilai diskon"
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Tanggal Mulai
          </label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Tanggal Berakhir
          </label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
          />
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
      <button
        onClick={onClose}
        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Batal
      </button>

      <button
        onClick={handleSubmit}
        className="rounded-xl bg-marine-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-marine-700"
      >
        Simpan Perubahan
      </button>
    </div>

  </div>
</div>
  );
}
