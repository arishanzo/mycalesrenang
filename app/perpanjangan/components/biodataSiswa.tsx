import { UseGetBooking } from "@/app/(admin)/hook/useGetBooking";
import { BookingSubmission } from "@/app/types/types";
import { ChevronRight, Search, User } from "lucide-react";
import { useState } from "react";

interface BiodataProps {
  
  setId: (id: string) => void;
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
  setId,
  setStudentName, studentName,
  setNamaPanggilan, namaPanggilan,
  gender, setGender,
  birthDate, setBirthDate,
  setAge, setPhone, phone,
  handleNextStep, parentName, setParentName,
  age, isStep1Valid,
}: BiodataProps) => {


  const { booking } = UseGetBooking()

  const [searchKeyword, setSearchKeyword] = useState("");
const [searchResults, setSearchResults] = useState<BookingSubmission[] | null>([]);
const [selectedStudent, setSelectedStudent] = useState<BookingSubmission | null>(null);
const [selectedNoStudent, setSelectedNoStudent] = useState<string> ('')


const handleSearchStudent = async (keyword: string) => {
  setSearchKeyword(keyword);

  if (!keyword.trim()) {
    setSearchResults(null);
    return;
  }

const filter = booking
  ?.filter(i =>
    i.student_name.toLowerCase().includes(keyword.toLowerCase())
  ).filter((item, index, self) =>
    index === self.findIndex(t => t.student_name.toLowerCase() === item.student_name.toLowerCase())
  );

if (filter.length > 0) {
  setSearchResults(filter);
  setSelectedNoStudent('');
} else {
  setSearchResults([]);
  setSelectedNoStudent('Data Siswa Tidak Ada');
}
  
};


const selectStudent = (student : BookingSubmission) => {
  setId(student.id)
  setSelectedStudent(student);

  setStudentName(student.student_name);
  setNamaPanggilan(student.nama_panggilan);
  setGender(student.gender);
  setBirthDate(student.birth_date);
  setAge(student.age);
  setPhone(student.phone);
  setParentName(student.parent_name || "");
  
  setSearchResults([]);
  setSearchKeyword("");
};

  return (
    <> 
      <div id="step-1-content" className="space-y-6">
  <div className="border-b border-marine-50 pb-4 mb-4">
    <h3 className="text-lg font-bold text-marine-900 flex items-center gap-2">
      <User className="h-5 w-5 text-cyan-600" />
      Cari Murid
    </h3>
    <p className="text-xs text-marine-600 mt-1">
      Cari murid berdasarkan nama atau nomor WhatsApp.
    </p>
  </div>

  {/* Search Murid */}
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
      Cari Murid
    </label>

    <div className="relative">
      <Search className="absolute left-4 top-3.5 h-4 w-4 text-marine-400" />
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => handleSearchStudent(e.target.value)}
        placeholder="Ketik Nama Lengkap..."
        className="w-full bg-marine-50/50 hover:bg-white focus:bg-white text-sm py-3 px-4 pl-11 rounded-xl border border-marine-100 focus:border-cyan-500 focus:outline-none"
      />
    </div>

    {searchResults && (
      <div className="space-y-2">
        {searchResults.map((student) => (
          <div key={student.id} className="bg-white border border-marine-100 rounded-xl overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => selectStudent(student)}
              className="w-full text-left px-4 py-3 hover:bg-cyan-50 border-b last:border-b-0"
            >
                 <div className="text-xs text-marine-500">Booking Kode: {student.booking_code}</div>
              <div className="font-medium text-marine-900">Nama: {student.student_name}</div>
           
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
 
 { selectedNoStudent &&  searchKeyword !== '' && (
  <div className="p-4 text-center text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
    Data siswa tidak ditemukan
  </div>
 )}
 

  {/* Data Murid Otomatis */}
  {   searchKeyword !== '' || selectedStudent && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
          Nama Lengkap
        </label>
        <input
          value={studentName}
          readOnly
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
          Nama Panggilan
        </label>
        <input
          value={namaPanggilan}
          readOnly
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
          Jenis Kelamin
        </label>
        <input
          value={gender}
          readOnly
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
        />
      </div>

       <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
         Umur
        </label>
        <input
          value={age}
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
          readOnly
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
         Tanggal Lahir
        </label>
        <input
          value={ new Date(birthDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          readOnly
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
          No WhatsApp
        </label>
        <input
          value={phone}
          readOnly
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
        />
      </div>

        <div>
        <label className="text-xs font-semibold text-marine-900 uppercase tracking-wider">
          Nama Orang Tua
        </label>
        <input
          value={parentName === 'undefined' ? '-' : parentName}
          readOnly
          className="w-full bg-gray-50 py-3 px-4 rounded-xl border"
        />
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
</div>
     
    </>
  );
};

export default BiodataSiswa;
