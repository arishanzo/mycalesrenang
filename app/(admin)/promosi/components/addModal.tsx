"use client";

import { create } from "@/app/services/promosi.service";
import { PromosiData } from "@/app/types/types";
import { Send, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UseGetBooking } from "../../hook/useGetBooking";

export default function VoucherAddModal({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const [form, setForm] = useState<PromosiData>({
    id:"",
    email: [""],
    subject: "",
    message: "",
    schedule: "",
    status: "pending",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerEmails, setCustomerEmails] = useState<string[]>([]);

  const [emailInput, setEmailInput] = useState("");

  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  
  const {booking} = UseGetBooking()


  useEffect(() => {
    if (!isOpen) return;

    const loadCustomers = async () => {
      try {
        setIsLoadingCustomers(true);


        const emails = booking.map((customer) => customer.email)
          .filter( (email: string | undefined): email is string =>
              Boolean(email)
          );

        setCustomerEmails(emails);
      } catch (error) {
        console.error("Gagal mengambil data pelanggan:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };

    loadCustomers();
  }, [booking, isOpen]);


  const handleEmailChange = (value: string) => {
    setEmailInput(value);

    if (!value.trim()) {
      setEmailSuggestions([]);
      return;
    }

    const search = value.toLowerCase();

    const selectedEmails = form.email.map((email) =>
      email.toLowerCase()
    );

    const filtered = customerEmails.filter((email) => {
      const emailLower = email.toLowerCase();

      return (
        emailLower.includes(search) &&
        !selectedEmails.includes(emailLower)
      );
    });

    setEmailSuggestions(filtered);
  };


  const addEmail = async (email: string) => {
    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    // Validasi email
    const isValidEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!isValidEmail) {
      await Swal.fire({
        icon: "warning",
        title: "Email tidak valid",
        text: "Masukkan alamat email yang valid.",
      });

      return;
    }

    // Cek email duplicate
    const alreadyExists = form.email.some(
      (item) =>
        item.trim().toLowerCase() === cleanEmail.toLowerCase()
    );

    if (alreadyExists) {
      await Swal.fire({
        icon: "info",
        title: "Email sudah ditambahkan",
        text: cleanEmail,
        timer: 1500,
        showConfirmButton: false,
      });

      setEmailInput("");
      setEmailSuggestions([]);

      return;
    }

    // Tambahkan email
    setForm((current) => ({
      ...current,
      email: [
        ...current.email.filter((item) => item.trim() !== ""),
        cleanEmail,
      ],
    }));

    // Reset input
    setEmailInput("");
    setEmailSuggestions([]);
  };

  const handleEmailKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const email = emailInput.trim();

    if (!email) return;

    await addEmail(email);
  };

  const removeEmail = (index: number) => {
    setForm((current) => ({
      ...current,
      email: current.email.filter(
        (_, emailIndex) => emailIndex !== index
      ),
    }));
  };


  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const email = form.email
      .map((recipient) => recipient.trim())
      .filter(Boolean);

    // Validasi email
    if (
      email.length === 0 ||
      email.some(
        (email) =>
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      )
    ) {
      await Swal.fire({
        icon: "warning",
        title: "Email tidak valid",
        text: "Masukkan setidaknya satu alamat email yang valid.",
      });

      return;
    }

    // Validasi subject, message dan schedule
    if (
      !form.subject.trim() ||
      !form.message.trim() ||
      !form.schedule
    ) {
      await Swal.fire({
        icon: "warning",
        title: "Data belum lengkap",
        text: "Subject, pesan, dan jadwal pengiriman wajib diisi.",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const payload: PromosiData = {
        ...form,
        email,
      };

      const res = await create(payload);

      if (res) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Email promosi berhasil dijadwalkan.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset
        setForm({
          id: "",
          email: [""],
          subject: "",
          message: "",
          schedule: "",
          status: "pending",
        });

        setEmailInput("");
        setEmailSuggestions([]);

        onClose();
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menjadwalkan email.",
      });
    }
    finally {
    onClose();
     setTimeout(() => {
            window.location.reload();
          }, 3000);
  
  }
  };


  const handleClose = () => {
    if (isSubmitting) return;

    setEmailInput("");
    setEmailSuggestions([]);

    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">


        <div className="flex items-start justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Kirim Email Promosi
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Kirim pesan ke satu atau beberapa alamat email
              sekaligus.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-5">


            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email Penerima
              </label>

              <div className="relative">

                {/* EMAIL CONTAINER */}

                <div
                  className="
                    flex
                    min-h-[46px]
                    flex-wrap
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    transition
                    focus-within:border-marine-500
                    focus-within:ring-2
                    focus-within:ring-marine-100
                  "
                >


                  {form.email
                    .filter((email) => email.trim() !== "")
                    .map((email, index) => (
                      <div
                        key={`${email}-${index}`}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-marine-50
                          px-3
                          py-1.5
                          text-sm
                          text-marine-700
                        "
                      >
                        <span>{email}</span>

                        <button
                          type="button"
                          onClick={() => removeEmail(index)}
                          className="
                            text-marine-400
                            transition
                            hover:text-red-500
                          "
                          aria-label={`Hapus ${email}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}

                  {/* EMAIL INPUT */}

                  <input
                    type="text"
                    value={emailInput}
                    onChange={(event) =>
                      handleEmailChange(event.target.value)
                    }
                    onKeyDown={handleEmailKeyDown}
                    placeholder={
                      form.email.some(
                        (email) => email.trim() !== ""
                      )
                        ? "Tambah email..."
                        : "Ketik email pelanggan..."
                    }
                    className="
                      min-w-[200px]
                      flex-1
                      border-0
                      bg-transparent
                      px-1
                      py-1
                      text-sm
                      text-slate-700
                      outline-none
                      placeholder:text-slate-400
                      focus:ring-0
                    "
                    autoComplete="off"
                  />
                </div>


                {emailInput.trim() &&
                  emailSuggestions.length > 0 && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-full
                        z-50
                        mt-2
                        max-h-56
                        overflow-y-auto
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        shadow-xl
                      "
                    >
                      {emailSuggestions.map((email) => (
                        <button
                          key={email}
                          type="button"
                          onClick={() => addEmail(email)}
                          className="
                            flex
                            w-full
                            items-center
                            px-4
                            py-3
                            text-left
                            text-sm
                            text-slate-700
                            transition
                            hover:bg-slate-50
                          "
                        >
                          <span className="truncate">
                            {email}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                {/* LOADING */}

                {emailInput.trim() &&
                  isLoadingCustomers && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-full
                        z-50
                        mt-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-slate-500
                        shadow-xl
                      "
                    >
                      Memuat email pelanggan...
                    </div>
                  )}
              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                Ketik untuk mencari pelanggan. Klik email yang
                muncul atau tekan Enter untuk menambahkan email
                baru.
              </p>
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-700"
                htmlFor="email-subject"
              >
                Subject
              </label>

              <input
                id="email-subject"
                type="text"
                value={form.subject}
                onChange={(event) =>
                  setForm({
                    ...form,
                    subject: event.target.value,
                  })
                }
                placeholder="Masukkan subject email"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  focus:border-marine-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-marine-100
                "
                required
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-700"
                htmlFor="email-message"
              >
                Message
              </label>

              <textarea
                id="email-message"
                value={form.message}
                onChange={(event) =>
                  setForm({
                    ...form,
                    message: event.target.value,
                  })
                }
                placeholder="Tulis isi email"
                rows={5}
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  focus:border-marine-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-marine-100
                "
                required
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-700"
                htmlFor="email-scheduled-at"
              >
                Jadwal Pengiriman (Masukan Tanggal dan Jam)
              </label>

              <input
                id="email-scheduled-at"
                type="datetime-local"
                value={form.schedule}
                onChange={(event) =>
                  setForm({
                    ...form,
                    schedule: event.target.value,
                  })
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  focus:border-marine-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-marine-100
                "
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="
                rounded-xl
                border
                border-slate-200
                px-4
                py-2
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-marine-600
                px-5
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-marine-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Send size={16} />

              {isSubmitting
                ? "Menyimpan..."
                : "Jadwalkan Email"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}