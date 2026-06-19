'use client';
import { useState } from 'react';
import { MYCA_LOCATIONS, MYCA_PACKAGES } from "@/app/libs/data";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, GraduationCap, MapPin, Tag, X, XCircle } from "lucide-react";
import {  CourseDays, VouchersData } from '@/app/types/types';
import { UseGetVoucher } from '@/app/(admin)/hook/useGetVouchers';


 const DaysList = [ 
    { id: 1,name: 'Senin'},
    { id: 2,name: 'Selasa'},
    { id: 3,name: 'Rabu'},
    { id: 4,name: 'Kamis'},
    { id: 4,name: 'Jumat'},
    { id: 4,name: 'Sabtu'},
    { id: 4,name: 'Minggu'}
  ];


const CATEGORIES = [
  { id: 'asisten',   label: 'Pricelist Asisten (Anak)' },
  { id: 'dewasa',    label: 'Pricelist Dewasa' },
  { id: 'homevisit', label: 'Pricelist Home Visit' },
  { id: 'missyenny', label: 'Pricelist with Miss Yenny' },
] as const;

const TYPE_LABEL: Record<string, string> = {
  privat:     'Privat (1 on 1)',
  semiprivat: 'Semi Privat (1 on 2)',
  grup:       'Grup (1 on 3/4)',
  oncecourse: 'Once Course',
};

const TIME_SLOTS: string[] = [];

for (let hour = 6; hour <= 18; hour++) {
  for (let minute = 0; minute < 60; minute++) {
    if (hour === 18 && minute > 0) break

    TIME_SLOTS.push(
      `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    )
  }
}


interface LayananJadwalProps {
    setDiscount : (discount: number) => void;
  discount: number;
    handleSubmitBooking: (e?: React.FormEvent) => void;
  packageId: string | number;
  setPackageId: (id: string) => void;
  customLocation: string;
  setCustomLocation: (id: string) => void;
  locationId: string;
  setLocationId: (id: string) => void;
  courseTime: string;
  setCourseTime: (time: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  selectedPackage: {
    name: string;
    pricePerPerson: number;
    frequency: string;
    maxKids: number;
    type: string;
    sessions: number;
    category: string;
  };
  handlePrevStep: () => void;
  isStep2Valid: boolean;
    courseDays: CourseDays[];
  setCourseDays: (days: CourseDays[]) => void;
}

const LayananJadwal = ({
 handleSubmitBooking,
  packageId,
  setPackageId,
  locationId,
  setLocationId,
  courseTime,
  setCourseTime,
  startDate,
  setStartDate,
  notes,
  setNotes,
  selectedPackage,
  handlePrevStep,
  isStep2Valid,
    courseDays,
  setCourseDays,
  customLocation,
  setCustomLocation,
    setDiscount,
    discount,
  
}: LayananJadwalProps) => {
  const [category, setCategory] = useState<string>('asisten');

  const { voucher } = UseGetVoucher();
  const [searchVoucher, setSearchVocuher] = useState('');

  const filteredPackages = MYCA_PACKAGES.filter(p => p.category === category);
  const catLabel = CATEGORIES.find(c => c.id === category)?.label ?? '';

  // dropdown & search state for time picker
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTime, setSearchTime] = useState<string>('');

  const filteredTimeSlots = TIME_SLOTS.filter(t =>
    t.includes(searchTime.trim())
  );

  // min date = today
  const today = new Date().toISOString().split('T')[0];
  const maxSessions = selectedPackage.frequency === '1x seminggu' ? 0 : 1;

    
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const first = MYCA_PACKAGES.find(p => p.category === cat);
    if (first) setPackageId(first.id);
    setCourseDays([]);
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPackageId(e.target.value);
    setCourseDays([]);
  };

  const toggleDay = (id: number, day: string) => {
    if (!courseDays) return;

    const data: CourseDays = { id, name: day };

    if (!courseDays.some(d => d.id === id) && courseDays.length > maxSessions) {
      return; // stop kalau sudah mencapai batas
    }

    setCourseDays(
      courseDays.some(d => d.id === id)
        ? courseDays.filter(d => d.id !== id) // hapus kalau sudah ada
        : [...courseDays, data]               // tambah kalau belum ada
    );
  };

const [aktif, setAktif] = useState(false);
const [tidakAktif, setTidakAktif] = useState(false);
const [voucherDiskon, setVoucherDiskon] = useState<VouchersData>();

  const handleSearch = () => {

    if (voucher.length === 0) return;
 const now = new Date();

 const filter = voucher.find((i) => {
      const endDate = new Date(i.end_date);
      return i.code === searchVoucher && endDate >= now;
    });
    
    setVoucherDiskon(filter);


    if (filter) {
      const basePrice = selectedPackage.pricePerPerson;

      const discountVoucher = filter.discount_type === 'percentage'
        ? Math.round(basePrice * (filter.discount_value / 100))
        : filter.discount_value;
  
      const finalPrice = Math.max(basePrice - discountVoucher, 0);
     
      setDiscount(finalPrice);
      setAktif(true);
      
    setTidakAktif(false);

    } else {
    setAktif(false);
    setTidakAktif(true);
     }
  }

  return (
    <>
      <div id="step-2-content" className="space-y-6">
        <div className="border-b border-marine-50 pb-4 mb-4">
          <h3 className="text-lg font-bold text-marine-900 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-cyan-600" />
            Pilih Layanan &amp; Jadwal
          </h3>
          <p className="text-xs text-marine-600 mt-1">Tentukan kategori, paket, lokasi, hari &amp; jam les, serta tanggal mulai.</p>
        </div>

        <div className="space-y-5">

          {/* Dropdown Kategori */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider flex items-center gap-1">
              <Tag className="h-4 w-4 text-cyan-600" />
              Kategori Program <span className="text-red-500">*</span>
            </label>
            <select
              id="select-category"
              value={category}
              onChange={e => handleCategoryChange(e.target.value)}
              className="w-full bg-marine-50/50 hover:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Dropdown Paket */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Paket <span className="text-red-500">*</span>
            </label>
            <select
              value={packageId as string}
              onChange={(handlePackageChange)}
              className="w-full bg-marine-50/50 hover:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              {filteredPackages.map(pkg => (
                <option key={pkg.id} value={pkg.id}>
                  {TYPE_LABEL[pkg.type]} — {pkg.name} · Rp {pkg.pricePerPerson.toLocaleString('id-ID')}/org
                </option>
              ))}
            </select>
            {packageId && (
              <div className="p-3 bg-cyan-50/60 border border-cyan-200 rounded-xl text-xs text-marine-800 flex flex-wrap gap-x-4 gap-y-1">
                <span>📌 <strong>{TYPE_LABEL[selectedPackage.type]}</strong></span>
                <span>👥 Maks. {selectedPackage.maxKids} orang</span>
                <span>🗓 {selectedPackage.sessions}x pertemuan ({selectedPackage.frequency})</span>
                <span className="text-cyan-700 font-bold">Rp {selectedPackage.pricePerPerson.toLocaleString('id-ID')}/org</span>
              </div>
            )}
          </div>

         {/* Lokasi */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="h-4 w-4 text-cyan-600" />
                Lokasi Kolam <span className="text-red-500">*</span>
              </label>
              <select
                id="select-arena-location"
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full bg-marine-50/50 hover:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
              >
                {MYCA_LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
                <option value="custom">Tulis sendiri...</option>
              </select>

              {locationId === "custom" && (
                <input
                  type="text"
                  placeholder="Masukkan lokasi kolam"
                  value={customLocation}
                  onChange={e =>  setCustomLocation(e.target.value)}
                  className="w-full bg-white text-sm py-3 px-4 rounded-xl border border-cyan-500 focus:outline-none"
                />
              )}

            </div>

           
         {/* Jam Les */}
<div className="flex flex-col gap-2 relative">
  <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider flex items-center gap-1">
    <Clock className="h-4 w-4 text-cyan-600" />
    Jam Les <span className="text-red-500">*</span>
  </label>

  {/* Trigger */}
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="w-full bg-marine-50/50 hover:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 text-left flex items-center justify-between"
  >
    <span>
      {courseTime ? `${courseTime} WIB` : "-- Pilih Jam --"}
    </span>

    <svg
      className={`w-4 h-4 transition-transform ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {/* Dropdown */}
  {isOpen && (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-marine-100 rounded-xl shadow-lg overflow-hidden">
      {/* Search */}
      <div className="p-2 border-b">
        <input
          type="text"
          placeholder="Cari jam..."
          value={searchTime}
          onChange={(e) => setSearchTime(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-cyan-500"
          autoFocus
        />
      </div>

      {/* Options */}
      <div className="max-h-60 overflow-y-auto">
        {filteredTimeSlots.length > 0 ? (
          filteredTimeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setCourseTime(t);
                setSearchTime("");
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-cyan-50 transition-colors ${
                courseTime === t
                  ? "bg-cyan-100 text-cyan-700 font-medium"
                  : ""
              }`}
            >
              {t} WIB
            </button>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">
            Jam tidak ditemukan
          </div>
        )}
      </div>
    </div>
  )}
</div>

            {/* Hari Les */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-cyan-600" />
              Hari Les <span className="text-red-500">*</span>
            </label>
             <p className="text-[10px] text-cyan-700 font-medium">
                Jika Mau Rubah Hari Silahkan Klik Hari Kembali.
              </p>
            <div className="flex flex-wrap gap-2">
              {DaysList.map((day,index) => (
                <button
                  key={`${day}-${index}`}
                  type="button"
                  id={`input-start-day`}
                  onClick={() => toggleDay( day.id,day.name)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    courseDays.some(d => d.id === day.id && d.name === day.name)
                      ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm'
                      : 'bg-white border-marine-100 text-marine-700 hover:bg-marine-50'
                  }`}
                >
                  {day.name}
                </button>
              ))}
            </div>
           
            {courseDays.length > 0 && (
              <p className="text-[10px] text-cyan-700 font-medium">
                ✓ Dipilih: {courseDays.map(d => d.name).join(', ')}
              </p>
            )}

            
          </div>
          

          {/* Tanggal Mulai */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-cyan-600" />
              Tanggal Mulai Les <span className="text-red-500">*</span>
            </label>
            <input
              id="input-start-date"
              type="date"
              min={today}
              value={startDate}
             onChange={e => setStartDate(e.target.value)}
              className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Catatan */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="input-special-notes"
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Misalnya: anak ada trauma air, target kompetisi, dll..."
              className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>

          
         {/* Cari Voucher */}
        <div className="mt-5 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-cyan-400/30">
        <p className="text-xs uppercase tracking-widest text-cyan-700 font-mono">
          Cari Voucher
        </p>

        <p className="text-lg font-bold text-slate-800 mt-1">
          Temukan Promo Terbaik
        </p>

        <p className="text-xs text-slate-600 mb-4">
          Cari dan gunakan voucher diskon yang tersedia
        </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
            type="text"
            value={searchVoucher}
            onChange={(e) => setSearchVocuher(e.target.value)}
            placeholder="Cari voucher atau promo..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-cyan-400/30 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

            <button type="button" onClick={handleSearch} className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow hover:scale-105 transition-transform">
              Klaim Voucher
            </button>
          </div>
        </div>

            
            {aktif && (
  <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md px-4 py-3 animate-fadeIn">
    <div className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      <div>
        <p className="text-sm font-semibold text-emerald-300">
          Voucher berhasil diklaim sebesar {voucherDiskon ? (voucherDiskon.discount_type === 'percentage' ? `${Number(voucherDiskon.discount_value)}%` : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(voucherDiskon.discount_value)) : ''}
        </p>
        <p className="text-xs text-emerald-200/80">
          Diskon telah diterapkan ke transaksi Anda.
        </p>
      </div>
    </div>

    <button
      className="rounded-lg p-1 text-emerald-300 hover:bg-white/10 transition"
      onClick={() => setAktif(false)}
    >
      <X size={16} />
    </button>
  </div>
)}

{tidakAktif &&
  (
  <div className="mt-4 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-md px-4 py-3 animate-fadeIn">
    <div className="flex items-center gap-3">
      <XCircle className="h-5 w-5 text-red-400" />
      <div>
        <p className="text-sm font-semibold text-red-300">
          Voucher tidak valid
        </p>
        <p className="text-xs text-red-200/80">
          Voucher tidak ditemukan atau sudah kadaluarsa.
        </p>
      </div>
    </div>

    <button
      className="rounded-lg p-1 text-red-300 hover:bg-white/10 transition"
      onClick={() => setTidakAktif(false)}
    >
      <X size={16} />
    </button>
  </div>
)}

          {/* Estimasi Biaya */}
          <div className="bg-marine-900 text-white rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
              <div>
                <p className="text-xs font-mono tracking-widest text-cyan-300 uppercase">Biaya Program</p>
                <p className="text-sm text-marine-200 mt-1 font-light">
                  <strong className="text-white">{catLabel}</strong>
                </p>
              
                {startDate && (
                  <p className="text-xs text-marine-400">
                    Mulai: {new Date(startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
              <div className="text-right">

              {/* Harga sebelum diskon */}
              {discount > 0 && (
                      <p className="text-sm text-marine-400 line-through">
                Rp {selectedPackage.pricePerPerson.toLocaleString('id-ID')}
              </p>
              )}
           

              {/* Harga setelah diskon */}
              <p className="text-2xl font-bold font-display text-cyan-400">
                Rp { discount ? discount.toLocaleString('id-ID') : selectedPackage.pricePerPerson.toLocaleString('id-ID')}
              </p>

              <p className="text-[10px] text-marine-400">per orang</p>
            </div>

            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-marine-50">
          <button
            id="btn-step2-back"
            type="button"
            onClick={handlePrevStep}
            className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold text-marine-800 hover:text-cyan-500 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Kembali
          </button>
          <button
            id="btn-step2-next"
            type="button"
            disabled={!isStep2Valid}
            onClick={() =>  handleSubmitBooking() }
            className="flex items-center gap-1.5 py-3 px-6 text-xs md:text-sm font-semibold text-white bg-marine-800 disabled:opacity-50 hover:bg-cyan-500 rounded-xl cursor-pointer shadow transition duration-300"
          >
            Lanjut Invoice
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        
      </div>
    </>
  );
};

export default LayananJadwal;
