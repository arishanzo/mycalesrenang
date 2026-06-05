import React, { useState, useEffect, useRef } from 'react';
import { MYCA_PACKAGES, MYCA_LOCATIONS } from '../../libs/data';
import { BookingSubmission } from '../../types/types';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  GraduationCap,
  Upload,
  History,
  Waves,
  ImageIcon,
  X,
  BadgeCheck,
  Hourglass,
} from 'lucide-react';

interface BookingFormProps {
  selectedPackageId: string;
}

// Steps: 1=Biodata, 2=Layanan & Jadwal, 3=Upload Bukti Bayar, 4=Status
export default function BookingForm({ selectedPackageId }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 – Biodata
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [phone, setPhone] = useState('');

  // Step 2 – Layanan & Jadwal
  const [packageId, setPackageId] = useState('privat');
  const [locationId, setLocationId] = useState('candi');
  const [sessions, setSessions] = useState(8);
  const [schedulePreference, setSchedulePreference] = useState('');
  const [notes, setNotes] = useState('');

  // Step 3 – Bukti Pembayaran
  const [paymentProof, setPaymentProof] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Confirmed & history
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingSubmission[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
      setCurrentStep(2);
    }
  }, [selectedPackageId]);

  useEffect(() => {
    const list = localStorage.getItem('myca_bookings');
    if (list) {
      try { setBookingHistory(JSON.parse(list)); } catch (e) { console.error(e); }
    }
  }, []);

  const selectedPackage = MYCA_PACKAGES.find(p => p.id === packageId) || MYCA_PACKAGES[0];
  const totalPrice = selectedPackage.pricePerSession * sessions;

  const isStep1Valid = studentName.trim().length >= 3 && Number(age) > 0 && phone.trim().length >= 9;
  const isStep2Valid = packageId !== '' && locationId !== '' && schedulePreference.trim().length >= 5;
  const isStep3Valid = paymentProof !== null;

  const handleNextStep = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
    if (currentStep === 3 && !isStep3Valid) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPaymentProof(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) return;

    const randomCode = 'MYCA-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      bookingCode: randomCode,
      studentName,
      parentName: Number(age) < 15 ? parentName : undefined,
      age: Number(age),
      phone,
      packageId,
      locationId,
      sessions,
      schedulePreference,
      notes,
      totalPrice,
      paymentProof: paymentProof ?? undefined,
      submittedAt: new Date().toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
      status: 'Menunggu Konfirmasi'
    };

    const updatedHistory = [newBooking, ...bookingHistory];
    setBookingHistory(updatedHistory);
    localStorage.setItem('myca_bookings', JSON.stringify(updatedHistory));
    setConfirmedBooking(newBooking);
    setCurrentStep(4);
  };

  const resetForm = () => {
    setStudentName(''); setParentName(''); setAge(''); setPhone('');
    setSchedulePreference(''); setNotes(''); setSessions(8);
    setPaymentProof(null); setConfirmedBooking(null); setCurrentStep(1);
  };

  const openWhatsApp = (booking: BookingSubmission) => {
    const loc = MYCA_LOCATIONS.find(l => l.id === booking.locationId)?.name || '';
    const pkg = MYCA_PACKAGES.find(p => p.id === booking.packageId)?.name || '';
    const text = `Halo MYCA Semarang,%0A%0ASaya ingin konfirmasi pendaftaran.%0A%0A*KODE:* ${booking.bookingCode}%0A*Murid:* ${booking.studentName}%0A*Paket:* ${pkg}%0A*Lokasi:* ${loc}%0A*Jadwal:* ${booking.schedulePreference}%0A*Total:* Rp ${booking.totalPrice.toLocaleString('id-ID')}%0A%0ATerima kasih!`;
    window.open(`https://wa.me/6289675211854?text=${text}`, '_blank');
  };

  const STEPS = [
    { num: 1, label: 'Biodata' },
    { num: 2, label: 'Layanan & Jadwal' },
    { num: 3, label: 'Bukti Bayar' },
    { num: 4, label: 'Status' },
  ];

  return (
    <section id="booking-form" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-[15%] right-[-10%] w-[350px] h-[350px] bg-cyan-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-marine-200/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center text-xs font-mono font-bold tracking-widest text-cyan-600 uppercase bg-cyan-100/60 border border-cyan-200 px-4 py-1.5 rounded-full mb-3">
            REGISTRASI LES ONLINE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-marine-900 mt-3 tracking-tight">
            Formulir Pendaftaran Murid Baru
          </h2>
          <p className="text-sm text-marine-600 mt-2 font-light max-w-lg mx-auto">
            Isi biodata, pilih layanan &amp; jadwal, upload bukti pembayaran, lalu pantau status pendaftaran Anda.
          </p>
          <div className="h-1 bg-gradient-to-r from-marine-600 to-cyan-400 mx-auto mt-4 w-20 rounded-full" />
        </div>

        {/* History button */}
        <div className="flex justify-end mb-6">
          <button
            id="btn-view-booking-history"
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center gap-1.5 text-xs text-marine-800 hover:text-cyan-600 transition-colors border border-marine-200 py-2 px-4 rounded-xl cursor-pointer bg-marine-50/50 hover:bg-white"
          >
            <History className="h-4 w-4" />
            <span>Lihat Tiket Saya ({bookingHistory.length})</span>
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto px-2">
          {STEPS.map((step) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep === step.num
                    ? 'bg-marine-800 text-white ring-4 ring-marine-100 scale-110'
                    : currentStep > step.num
                      ? 'bg-cyan-500 text-white'
                      : 'bg-marine-100 text-marine-600'
                }`}>
                  {currentStep > step.num ? <CheckCircle className="h-5 w-5 fill-cyan-600 stroke-white" /> : step.num}
                </div>
                <span className="text-[10px] font-medium text-marine-800 mt-2 tracking-wide text-center leading-tight max-w-[60px]">
                  {step.label}
                </span>
              </div>
              {step.num < 4 && (
                <div className={`h-0.5 flex-1 mx-1 -mt-5 rounded transition-colors duration-300 ${
                  currentStep > step.num ? 'bg-cyan-500' : 'bg-marine-100'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-3xl border border-marine-100 shadow-xl overflow-hidden premium-card-glass">
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-10">

            {/* ── STEP 1: BIODATA SISWA ── */}
            {currentStep === 1 && (
              <div id="step-1-content" className="space-y-6">
                <div className="border-b border-marine-50 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-marine-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-600" />
                    Biodata Calon Siswa
                  </h3>
                  <p className="text-xs text-marine-600 mt-1">Isi data diri calon murid dengan lengkap dan benar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                      Nama Calon Murid <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="input-student-name"
                        type="text"
                        required
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        placeholder="Nama Lengkap Murid"
                        className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                      <User className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                      Usia (Tahun) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-student-age"
                      type="number"
                      required
                      min={1} max={90}
                      value={age}
                      onChange={e => setAge(e.target.value !== '' ? parseInt(e.target.value) : '')}
                      placeholder="Contoh: 7"
                      className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {age !== '' && age < 15 && (
                    <div className="flex flex-col gap-2 sm:col-span-2 bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100">
                      <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                        Nama Orang Tua / Wali <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="input-parent-name"
                        type="text"
                        required
                        value={parentName}
                        onChange={e => setParentName(e.target.value)}
                        placeholder="Nama Lengkap Ayah / Ibu"
                        className="w-full bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                      <p className="text-[10px] text-marine-600 mt-1">
                        * Wajib diisi karena murid berusia di bawah 15 tahun.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                      No. WhatsApp Aktif <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="input-student-whatsapp"
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Contoh: 08123456789"
                        className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                      <Phone className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
                    </div>
                    <p className="text-[10px] text-marine-500">
                      * Nomor ini akan digunakan pelatih MYCA untuk koordinasi jadwal latihan.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-marine-50">
                  <button
                    id="btn-step1-next"
                    type="button"
                    disabled={!isStep1Valid}
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 py-3 px-6 text-sm font-semibold text-white bg-marine-800 disabled:opacity-50 hover:bg-cyan-500 rounded-xl cursor-pointer shadow transition-all duration-300"
                  >
                    Lanjut Pilih Layanan
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: LAYANAN & JADWAL ── */}
            {currentStep === 2 && (
              <div id="step-2-content" className="space-y-6">
                <div className="border-b border-marine-50 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-marine-900 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-cyan-600" />
                    Pilih Layanan &amp; Jadwal
                  </h3>
                  <p className="text-xs text-marine-600 mt-1">Tentukan paket, lokasi, jumlah sesi, dan jadwal latihan.</p>
                </div>

                <div className="space-y-6">
                  {/* Paket */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                      Paket Kelas <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {MYCA_PACKAGES.map(pkg => (
                        <div
                          id={`select-package-card-${pkg.id}`}
                          key={pkg.id}
                          onClick={() => setPackageId(pkg.id)}
                          className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                            packageId === pkg.id
                              ? 'border-cyan-500 bg-cyan-50/50 shadow-inner'
                              : 'border-marine-100 bg-white hover:bg-marine-50'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-bold text-marine-900">{pkg.name}</p>
                            <p className="text-[10px] text-marine-600 mt-1 font-light leading-snug">
                              {pkg.description.slice(0, 75)}...
                            </p>
                          </div>
                          <p className="text-xs font-bold text-cyan-600 mt-3">
                            Rp {pkg.pricePerSession.toLocaleString('id-ID')} /sesi
                          </p>
                        </div>
                      ))}
                    </div>
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
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                    <div className="p-4 bg-marine-50 rounded-2xl border border-marine-100 text-xs text-marine-800 space-y-1">
                      <p className="font-semibold text-marine-950">Fasilitas:</p>
                      {MYCA_LOCATIONS.find(l => l.id === locationId)?.facilities.map((f, i) => (
                        <p key={i} className="font-light">• {f}</p>
                      ))}
                    </div>
                  </div>

                  {/* Sesi */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                      Jumlah Sesi <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { count: 4, desc: 'Kilat (1 Bulan)', tag: 'Jadwal Instan' },
                        { count: 8, desc: 'Rekomendasi (2 Bulan)', tag: 'Favorit Murid' },
                        { count: 12, desc: 'Hemat (3 Bulan)', tag: 'Optimal' },
                      ].map(sess => (
                        <div
                          id={`select-session-card-${sess.count}`}
                          key={sess.count}
                          onClick={() => setSessions(sess.count)}
                          className={`p-3.5 border rounded-2xl cursor-pointer text-center transition-all ${
                            sessions === sess.count
                              ? 'border-cyan-500 bg-cyan-50/50 text-cyan-900 font-semibold'
                              : 'border-marine-100 bg-white hover:bg-marine-50'
                          }`}
                        >
                          <p className="text-lg font-bold font-display">{sess.count} Sesi</p>
                          <p className="text-[9px] text-marine-600 font-light mt-0.5">{sess.desc}</p>
                          <span className="inline-block text-[8px] tracking-wide bg-marine-100 text-marine-900 font-bold px-1.5 py-0.5 rounded uppercase mt-2">
                            {sess.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Jadwal */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                      Preferensi Jadwal Latihan <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="input-schedule-choices"
                        type="text"
                        required
                        value={schedulePreference}
                        onChange={e => setSchedulePreference(e.target.value)}
                        placeholder="Contoh: Setiap Sabtu Jam 16:00 & Minggu Jam 08:00"
                        className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                      <Clock className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
                    </div>
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
                        <p className="text-xs font-mono tracking-widest text-cyan-300 uppercase">Estimasi Biaya</p>
                        <p className="text-sm text-marine-200 mt-1 font-light">
                          <strong className="text-white">{selectedPackage.name}</strong> × <strong className="text-white">{sessions} Sesi</strong>
                        </p>
                      </div>
                      <p className="text-2xl font-bold font-display">
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </p>
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
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 py-3 px-6 text-sm font-semibold text-white bg-marine-800 disabled:opacity-50 hover:bg-cyan-500 rounded-xl cursor-pointer shadow transition duration-300"
                  >
                    Lanjut Upload Bukti Bayar
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: UPLOAD BUKTI PEMBAYARAN ── */}
            {currentStep === 3 && (
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
                      <img src={paymentProof} alt="Bukti Pembayaran" className="w-full max-h-64 object-contain bg-marine-50" />
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
                    disabled={!isStep3Valid}
                    className="flex items-center gap-2 py-3.5 px-8 text-sm font-bold text-white bg-cyan-600 disabled:opacity-50 hover:bg-cyan-500 rounded-xl cursor-pointer shadow-lg shadow-cyan-200/50 transition-all duration-300"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Kirim Pendaftaran
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: STATUS ── */}
            {currentStep === 4 && confirmedBooking && (
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
                    <span className="font-mono font-bold text-cyan-600 tracking-wider">{confirmedBooking.bookingCode}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 text-xs border-t border-marine-100 pt-4">
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Nama Murid</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{confirmedBooking.studentName}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Paket</p>
                      <p className="font-semibold text-cyan-600 mt-0.5">{MYCA_PACKAGES.find(p => p.id === confirmedBooking.packageId)?.name}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Lokasi</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{MYCA_LOCATIONS.find(l => l.id === confirmedBooking.locationId)?.name}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Jadwal</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{confirmedBooking.schedulePreference}</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Sesi</p>
                      <p className="font-semibold text-marine-900 mt-0.5">{confirmedBooking.sessions}× Pertemuan</p>
                    </div>
                    <div>
                      <p className="text-marine-500 uppercase tracking-wider font-mono">Total Bayar</p>
                      <p className="font-bold text-marine-900 mt-0.5">Rp {confirmedBooking.totalPrice.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-marine-100">
                    <span className="text-xs text-marine-600">Status Pendaftaran</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                      confirmedBooking.status === 'Pembayaran Diterima' || confirmedBooking.status === 'Terkonfirmasi'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {confirmedBooking.status === 'Pembayaran Diterima' || confirmedBooking.status === 'Terkonfirmasi'
                        ? <BadgeCheck className="h-3.5 w-3.5" />
                        : <Hourglass className="h-3.5 w-3.5" />
                      }
                      {confirmedBooking.status}
                    </span>
                  </div>

                  {/* Bukti Bayar thumbnail */}
                  {confirmedBooking.paymentProof && (
                    <div className="pt-2">
                      <p className="text-xs text-marine-500 uppercase font-mono tracking-wider mb-2">Bukti Pembayaran</p>
                      <img
                        src={confirmedBooking.paymentProof}
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
                    onClick={() => openWhatsApp(confirmedBooking)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    Konfirmasi via WhatsApp
                  </button>
                  <button
                    id="btn-register-new-student"
                    type="button"
                    onClick={resetForm}
                    className="flex items-center justify-center gap-1 py-3 px-5 rounded-xl text-sm font-semibold text-marine-800 hover:text-cyan-600 border border-marine-200 hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    Daftar Murid Baru
                  </button>
                </div>

              </div>
            )}

          </form>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-marine-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-marine-100 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-marine-100 pb-4 mb-6">
              <h3 className="font-display font-bold text-lg text-marine-900 flex items-center gap-2">
                <History className="h-5 w-5 text-cyan-600" />
                Histori Pendaftaran
              </h3>
              <button
                id="close-history-modal"
                onClick={() => setShowHistoryModal(false)}
                className="p-1 px-2.5 rounded-lg text-xs bg-marine-100 hover:bg-marine-200 text-marine-800 font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {bookingHistory.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-marine-600">Belum ada pendaftaran tersimpan.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookingHistory.map(book => (
                  <div key={book.id} className="p-4 border border-marine-150 rounded-2xl hover:border-cyan-500/60 bg-marine-50/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono tracking-wider text-cyan-600">{book.bookingCode}</span>
                      <span className="text-[10px] text-marine-600">{book.submittedAt}</span>
                    </div>
                    <p className="text-sm font-semibold text-marine-950 mt-2">{book.studentName}</p>
                    <p className="text-xs text-marine-800">
                      {MYCA_PACKAGES.find(p => p.id === book.packageId)?.name} • {book.sessions}× sesi
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
                        onClick={() => { setConfirmedBooking(book); setCurrentStep(4); setShowHistoryModal(false); }}
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
      )}
    </section>
  );
}
