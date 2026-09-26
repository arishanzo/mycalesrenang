"use client";

import { update } from "@/app/services/promosi.service";
import { PromosiData} from "@/app/types/types";
import { Plus, Send, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const emptyForm: PromosiData = {
  id: "",
  email: [""],
  subject: "",
  message: "",
  schedule: "",
  status: "pending",
};

export default function VoucherEditModal({
  onClose,
  isOpen,
  promosi,
}: {
  onClose: () => void;
  promosi: PromosiData | null;
  isOpen: boolean;
}) {
  const [form, setForm] = useState<PromosiData>(emptyForm);

  const [isSubmitting, setIsSubmitting] = useState(false);


  const updateRecipient = (index: number, value: string) => {
    setForm((current) => ({
      ...current,
      email: current.email.map((recipient, recipientIndex) =>
        recipientIndex === index ? value : recipient,
      ),
    }));
  };

  const addRecipient = () => {
    setForm((current) => ({
      ...current,
      email: [...current.email, ""],
    }));
  };

  const removeRecipient = (index: number) => {
    setForm((current) => ({
      ...current,
      email:
        current.email.length === 1
          ? [""]
          : current.email.filter((_, recipientIndex) => recipientIndex !== index),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = form.email
      .map((recipient) => recipient.trim())
      .filter(Boolean);

    if (email.length === 0 || email.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      await Swal.fire({
        icon: "warning",
        title: "Email tidak valid",
        text: "Masukkan setidaknya satu alamat email yang valid.",
      });
      return;
    }

    if (!form.subject.trim() || !form.message.trim() || !form.schedule) {
      await Swal.fire({
        icon: "warning",
        title: "Data belum lengkap",
        text: "Subject, pesan, dan jadwal pengiriman wajib diisi.",
      });
      return;
    }

    setIsSubmitting(true);

      const id = promosi?.id ?? form.id;

    try {

         const res = await update(id, form);
     
    if(res){
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Email promosi berhasil dijadwalkan.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
      onClose();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: error instanceof Error ? error.message : "Terjadi kesalahan saat menjadwalkan email.",
      });
    }finally {
    onClose();
    setTimeout(() => {
            window.location.reload();
    }, 3000);
  
  }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Kirim Email Promosi</h2>
            <p className="mt-1 text-sm text-slate-500">
              Kirim pesan ke satu atau beberapa alamat email sekaligus.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-5">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Email Penerima
                </label>
                <button
                  type="button"
                  onClick={addRecipient}
                  className="inline-flex items-center gap-1 text-xs font-medium text-marine-600 hover:text-marine-700"
                >
                  <Plus size={14} /> Tambah email
                </button>
              </div>
              <div className="space-y-2">
                {form.email.map((recipient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="email"
                      value={recipient}
                      onChange={(event) => updateRecipient(index, event.target.value)}
                      placeholder="contoh@email.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                      required={index === 0}
                    />
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="rounded-xl border border-slate-200 px-3 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Hapus email penerima ${index + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email-subject">
                Subject
              </label>
              <input
                id="email-subject"
                type="text"
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                placeholder="Masukkan subject email"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email-message">
                Message
              </label>
              <textarea
                id="email-message"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="Tulis isi email"
                rows={5}
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email-scheduled-at">
                Jadwal Pengiriman
              </label>
              <input
                id="email-scheduled-at"
                type="datetime-local"
                value={form.schedule}
                onChange={(event) => setForm({ ...form, schedule: event.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-marine-500 focus:outline-none focus:ring-2 focus:ring-marine-100"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-marine-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-marine-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
              {isSubmitting ? "Mengirim..." : "Kirim Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}