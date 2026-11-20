'use client'

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { UseGetEmailLogs } from "../../hook/useGetStatusEmail";

export default function StatusModal({ onClose, isOpen, id }: {
  onClose: () => void;
  isOpen: boolean;
  id: string;
}) {
  
     
    const { emailLogs } = UseGetEmailLogs(id)
 
  const badgeStyle = {
    sent: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    failed: "bg-rose-100 text-rose-700",
  };

  const statusIcon = {
    sent: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    pending: <Clock className="w-5 h-5 text-amber-600 animate-pulse" />,
    failed: <XCircle className="w-5 h-5 text-rose-600" />,
  };
if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between  px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Status Email</h2>
            <p className="mt-1 text-sm text-slate-500">Lihat status pengiriman email</p>
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

        {/* Scrollable Body */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4">
          {emailLogs.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                {statusIcon[item.status as keyof typeof statusIcon]}
                <span className="text-sm font-medium text-slate-700">{item.recipient}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badgeStyle[item.status as keyof typeof badgeStyle]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className=" px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
