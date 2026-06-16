'use client';
import { useState } from 'react';
import { MYCA_LOCATIONS, MYCA_PACKAGES } from "@/app/libs/data";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, GraduationCap, MapPin, Tag } from "lucide-react";
import {  CourseDays } from '@/app/types/types';

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

const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00',
];

interface LayananJadwalProps {
  
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
  
}: LayananJadwalProps) => {
  const [category, setCategory] = useState<string>('asisten');

  const filteredPackages = MYCA_PACKAGES.filter(p => p.category === category);

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

  const catLabel = CATEGORIES.find(c => c.id === category)?.label ?? '';

  // min date = today
  const today = new Date().toISOString().split('T')[0];


 
  const maxSessions = 0;

  const DaysList = [ 
    { id: 1,name: 'senin'},
    { id: 2,name: 'selasa'},
    { id: 3,name: 'rabu'},
    { id: 4,name: 'kamis'},
    { id: 5,name: 'jumat'},
    { id: 6,name: 'sabtu'},
    { id: 7,name: 'minggu'}]
    ;

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
              id="select-package"
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
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider flex items-center gap-1">
              <Clock className="h-4 w-4 text-cyan-600" />
              Jam Les <span className="text-red-500">*</span>
            </label>
            <select
              id="select-course-time"
              value={courseTime}
              onChange={e => setCourseTime(e.target.value)}
              className="w-full bg-marine-50/50 hover:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option value="">-- Pilih Jam --</option>
              {TIME_SLOTS.map(t => (
                <option key={t} value={t}>{t} WIB</option>
              ))}
            </select>
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
                <p className="text-2xl font-bold font-display">
                  Rp {selectedPackage.pricePerPerson.toLocaleString('id-ID')}
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
            onClick={() =>  handleSubmitBooking()}
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
