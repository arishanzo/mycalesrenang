import { ChevronRight, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

interface BiodataProps {
  studentName: string;
  setStudentName: (id: string) => void;
  setEmail: (email: string) => void;
  email: string;
  namaPanggilan: string;
  setNamaPanggilan: (id: string) => void;
  gender: string;
  setGender: (g: string) => void;
  birthDate: string;
  setBirthDate: (d: string) => void;
  age: number | "";
  setAge: (age: number | "") => void;
  phone: string;
  setPhone: (phone: string) => void;
  parentName: string;
  setParentName: (name: string) => void;
  handleNextStep: () => void;
  isStep1Valid: boolean;
}

const err = (msg: string) => (
  <p className="text-[11px] text-red-500 mt-1 font-medium">{msg}</p>
);

const BiodataSiswa = ({
  setStudentName, studentName,
  setNamaPanggilan, namaPanggilan,
  gender, setGender,
  birthDate, setBirthDate,
  setAge, setPhone, phone,
  handleNextStep, parentName, setParentName,
  age, isStep1Valid, setEmail, email
}: BiodataProps) => {

  const [submitted, setSubmitted] = useState(false);

  const handleBirthDateChange = (val: string) => {
    setBirthDate(val);
    if (val) {
      const diff = Date.now() - new Date(val).getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      setAge(years > 0 ? years : '');
    } else {
      setAge('');
    }
  };

  const handleNext = () => {
    setSubmitted(true);
    if (!isStep1Valid) return;
    handleNextStep();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div id="step-1-content" className="space-y-6">
        <div className="border-b border-marine-50 pb-4 mb-4">
          <h3 className="text-lg font-bold text-marine-900 flex items-center gap-2">
            <User className="h-5 w-5 text-cyan-600" />
            Biodata Calon Siswa
          </h3>
          <p className="text-xs text-marine-600 mt-1">Isi data diri calon murid dengan lengkap dan benar.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Nama Lengkap */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Nama Lengkap Murid <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Nama Lengkap Murid"
                className={`w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border focus:outline-none transition-colors ${submitted && studentName.trim().length < 3 ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
              />
            </div>
            {submitted && studentName.trim().length < 3 && err('Nama lengkap minimal 3 karakter')}
          </div>

          {/* Nama Panggilan */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Nama Panggilan Murid <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
              <input
                type="text"
                value={namaPanggilan}
                onChange={e => setNamaPanggilan(e.target.value)}
                placeholder="Nama Panggilan"
                className={`w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border focus:outline-none transition-colors ${submitted && !namaPanggilan.trim() ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
              />
            </div>
            {submitted && !namaPanggilan.trim() && err('Nama panggilan wajib diisi')}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {[
                { value: 'laki-laki', label: '♂ Laki-laki' },
                { value: 'perempuan', label: '♀ Perempuan' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGender(opt.value)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    gender === opt.value
                      ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm'
                      : submitted && !gender
                      ? 'bg-red-50/30 border-red-400 text-marine-700'
                      : 'bg-white border-marine-100 text-marine-700 hover:bg-marine-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {submitted && !gender && err('Jenis kelamin wajib dipilih')}
          </div>

          {/* Tanggal Lahir */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              max={today}
              value={birthDate}
              onChange={e => handleBirthDateChange(e.target.value)}
              className={`w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border focus:outline-none transition-colors ${submitted && !birthDate ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
            />
            {age !== '' && <p className="text-[10px] text-cyan-700 font-medium">✓ Usia: {age} tahun</p>}
            {submitted && !birthDate && err('Tanggal lahir wajib diisi')}
          </div>

          {/* Usia */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Usia (Tahun) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1} max={90}
              value={age}
              onChange={e => setAge(e.target.value !== '' ? parseInt(e.target.value) : '')}
              placeholder="Otomatis dari tanggal lahir"
              className={`w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border focus:outline-none transition-colors ${submitted && !age ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
            />
            {submitted && !age && err('Usia wajib diisi')}
          </div>

          {/* No. WhatsApp */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              No. WhatsApp Aktif <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Contoh: 08123456789"
                className={`w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border focus:outline-none transition-colors ${submitted && phone.trim().length < 9 ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
              />
            </div>
            {submitted && phone.trim().length < 9 && err('Nomor WhatsApp minimal 9 digit')}
            <p className="text-[10px] text-marine-500">* Nomor ini akan digunakan pelatih MYCA untuk koordinasi jadwal latihan.</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Email Aktif <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Contoh: arif@gmail.com"
                className={`w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border focus:outline-none transition-colors ${submitted && !email.trim() ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
              />
            </div>
            {submitted && !email.trim() && err('Email wajib diisi')}
          </div>

          {/* Nama Orang Tua (kondisional) */}
          {age !== '' && age < 15 && (
            <div className="flex flex-col gap-1 sm:col-span-2 bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100">
              <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
                Nama Orang Tua / Wali <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={parentName}
                onChange={e => setParentName(e.target.value)}
                placeholder="Nama Lengkap Ayah / Ibu"
                className={`w-full bg-white text-sm py-3 px-4 rounded-xl border focus:outline-none transition-colors ${submitted && age < 15 && !parentName.trim() ? 'border-red-400 bg-red-50/30' : 'border-marine-100 focus:border-cyan-500'}`}
              />
              {submitted && age < 15 && !parentName.trim() && err('Nama orang tua wajib diisi untuk murid di bawah 15 tahun')}
              <p className="text-[10px] text-marine-600 mt-1">* Wajib diisi karena murid berusia di bawah 15 tahun.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-marine-50">
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 py-3 px-6 text-sm font-semibold text-white bg-marine-800 hover:bg-cyan-500 rounded-xl cursor-pointer shadow transition-all duration-300"
          >
            Lanjut Pilih Layanan
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BiodataSiswa;
