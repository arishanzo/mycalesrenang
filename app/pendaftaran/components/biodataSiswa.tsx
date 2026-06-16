import { ChevronRight, Phone, User } from "lucide-react";

interface BiodataProps {
  studentName: string;
  setStudentName: (id: string) => void;
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

const BiodataSiswa = ({
  setStudentName, studentName,
  setNamaPanggilan, namaPanggilan,
  gender, setGender,
  birthDate, setBirthDate,
  setAge, setPhone, phone,
  handleNextStep, parentName, setParentName,
  age, isStep1Valid,
}: BiodataProps) => {

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

          {/* Nama */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Nama Lengkap Murid <span className="text-red-500">*</span>
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


            {/* Nama */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Nama Panggilan Murid <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="input-student-name"
                type="text"
                required
                value={namaPanggilan}
                onChange={e => setNamaPanggilan(e.target.value)}
                placeholder="Nama Lengkap Murid"
                className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <User className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
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
                  id={`gender-btn-${opt.value}`}
                  onClick={() => setGender(opt.value)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    gender === opt.value
                      ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm'
                      : 'bg-white border-marine-100 text-marine-700 hover:bg-marine-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tanggal Lahir */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              id="input-birth-date"
              type="date"
              max={today}
              value={birthDate}
              onChange={e => handleBirthDateChange(e.target.value)}
              className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            {age !== '' && (
              <p className="text-[10px] text-cyan-700 font-medium">✓ Usia: {age} tahun</p>
            )}
          </div>

          {/* Usia (readonly, auto-hitung) */}
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
              placeholder="Otomatis dari tanggal lahir"
              className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Nama Orang Tua (kondisional) */}
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

          {/* No. WhatsApp */}
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
    </>
  );
};

export default BiodataSiswa;
