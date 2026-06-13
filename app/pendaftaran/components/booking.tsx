import React, { useState, useEffect, useRef } from 'react';
import { MYCA_PACKAGES, MYCA_LOCATIONS } from '../../libs/data';
import { BookingSubmission, CourseDays } from '../../types/types';
import { CheckCircle, History,} from 'lucide-react';
import HistoryModal from './historyModal';
import ConfirmedBooking from './confirmedBooking';
import LayananJadwal from './layananJadwal';
import BiodataSiswa from './biodataSiswa';
import BuktiPembayaran from './buktiPembayaran';
import StepPemesanan from './stepsPemesanan';
import { InvoiceStep } from './invoice';
import { printDocument } from '@/app/utils/print';
import { createBooking } from '@/app/services/transaksi.services';
import Swal from 'sweetalert2';
import { File } from 'buffer';




// Steps: 1=Biodata, 2=Layanan & Jadwal, 3=Upload Bukti Bayar, 4=Status
const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 – Biodata
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [phone, setPhone] = useState('');

  // Step 2 – Layanan & Jadwal
  const [packageId, setPackageId] = useState('a-semiprivat-4x');
  const [locationId, setLocationId] = useState('mijen-lakers');
  const [courseTime, setCourseTime] = useState('');
  const [courseDays, setCourseDays] = useState<CourseDays[]>([]);
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
  
  const [customLocation, setCustomLocation] = useState('');


  // Step 3 – Bukti Pembayaranh
const [paymentProof, setPaymentProof] = useState<globalThis.File | null>(null);



  // Confirmed & history
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingSubmission[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const [invoicePrinted, setInvoicePrinted] = useState(false);
  const [printError, setPrintError] = useState('');


  const selectedPackage = MYCA_PACKAGES.find(p => p.id === packageId) || MYCA_PACKAGES[0];
  const totalPrice = selectedPackage.pricePerPerson;

  const isStep1Valid = studentName.trim().length >= 3 && gender !== '' && birthDate !== '' && Number(age) > 0 && phone.trim().length >= 9;
  const isStep2Valid = packageId !== '' && locationId !== ''  && courseTime !== '' && startDate !== '';
  const isStep3Valid = confirmedBooking !== null;
  const isStep4Valid = paymentProof !== null;

  const handleNextStep = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
    if (currentStep === 3 && !isStep3Valid) return;
    if (currentStep === 4 && !isStep4Valid) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
     setPaymentProof(file);
  };

 const handleSubmitBooking = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isStep1Valid || !isStep2Valid) return;

    const randomCode = 'MYCA-' + Math.floor(1000 + Math.random() * 9000);

    const newBooking: BookingSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      booking_code: randomCode,
      student_name: studentName,
      parent_name: Number(age) < 15 ? parentName : undefined,
      gender,
      birth_date: birthDate,
      age: Number(age),
      phone,
      package_id: packageId,
      location_id: customLocation ? customLocation : locationId,
      course_day: courseDays.map(i => i.name).join(','),
      course_time: courseTime,
      start_date:   startDate ?? new Date(),
      schedule_preference: `${courseTime} WIB · Mulai ${startDate}`,
      notes,
      total_price: totalPrice,
      paymentProof: paymentProof ?? undefined,
      status: 'Menunggu Konfirmasi'
    };
    
    const updatedHistory = [newBooking, ...bookingHistory];
    setBookingHistory(updatedHistory);
    localStorage.setItem('bookings', JSON.stringify(newBooking));
    setConfirmedBooking(newBooking);

     setInvoicePrinted(false);
    setPrintError('');
    setCurrentStep(3);
  };
  

  const resetForm = () => {
    setStudentName(''); setParentName(''); setAge(''); setPhone(''); setGender(''); setBirthDate('');
     setCourseTime(''); setStartDate(''); setNotes('');
    setPaymentProof(null); setConfirmedBooking(null); setCurrentStep(1);
  };

  const openWhatsApp = (booking: BookingSubmission) => {
    const loc = MYCA_LOCATIONS.find(l => l.id === booking.location_id)?.name || '';
    const pkg = MYCA_PACKAGES.find(p => p.id === booking.package_id)?.name || '';
    const selectedPackage = MYCA_PACKAGES.find(p => p.id === confirmedBooking?.package_id);
    const pkgid = selectedPackage ? `${selectedPackage.category}-${selectedPackage.name}` : '';
    
  const text = `Halo Admin,

Saya ingin konfirmasi pendaftaran.

*KODE:* ${booking.booking_code}
*Nama Lengkap:* ${booking.student_name}
*Jenis Kelamin:* ${booking.gender}
*Tanggal Lahir:* ${booking.birth_date ?  new Date(booking.birth_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
*Umur:* ${booking.age}
*No Hp / WA:* ${booking.phone}
*Nama Orang Tua:* ${booking.parent_name ?? '-'}
*Progam Kelas:* ${pkgid || '-'}
*Jenis Progam Kelas:* ${pkg}
*Lokasi:* ${loc}
*Jadwal:* ${booking.schedule_preference ?? '-'}
*Total:* Rp ${booking.total_price.toLocaleString('id-ID')}
*Tanggal Mulai:* ${booking?.start_date ? new Date(booking.start_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
*Jam Les:* ${booking?.course_time}
*Hari Les:* ${(courseDays.map(i => i.name).join(',')) || '-'}

Terima kasih!`;

window.open(
  `https://wa.me/6289675211854?text=${encodeURIComponent(text)}`,
  '_blank'
);

  };


   
  const handlePrint = () => {
    // Proactively unlock next steps to ensure sandbox frames don't leave users in an unclickable state
    setInvoicePrinted(true);
    setPrintError('');

    // Detect which printable element is currently present on screen
    const targetId = document.getElementById('printable-invoice') ? 'printable-invoice' : 'printable-ticket';
    
    printDocument(targetId, {
      bookingCode: confirmedBooking?.booking_code,
      isInvoice: targetId === 'printable-invoice'
    });
  };

const handleFinishPayment = async () => {
  if (!confirmedBooking) return;

  const completedBooking: BookingSubmission = {
    ...confirmedBooking,
    paymentProof: paymentProof || "bukti_transfer.jpg",
  };

  const formData = new FormData();
   Object.entries(completedBooking).forEach(([key, val]) => {
      formData.append(key, val);
    });


  try {

    const res = await createBooking(formData);

    if (res) {
      // misalnya tampilkan alert sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Transkasi Berhasil Dibuat Silahkan Chat Admin.",
        timer: 2000,
        showConfirmButton: false,
      });

      setConfirmedBooking(completedBooking);
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Pembayaran gagal, coba lagi.",
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Terjadi kesalahan server.",
    });
  }
};


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
          <h2 className="font-display md:text-4xl text-4xl sm:text-4xl font-bold text-marine-900 mt-3 tracking-tight">
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
            <span>History </span>
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto px-2">
          <StepPemesanan 
          currentStep={currentStep}
          />
        
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-3xl border border-marine-100 shadow-xl overflow-hidden premium-card-glass">
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-10">

            {/* ── STEP 1: BIODATA SISWA ── */}
            {currentStep === 1 && (
              <BiodataSiswa
                setStudentName={setStudentName}
                studentName={studentName}
                gender={gender}
                setGender={setGender}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                setAge={setAge}
                setPhone={setPhone}
                phone={phone}
                handleNextStep={handleNextStep}
                parentName={parentName}
                setParentName={setParentName}
                age={age}
                isStep1Valid={isStep1Valid}
              />
            )}

            {/* ── STEP 2: LAYANAN & JADWAL ── */}
            {currentStep === 2 && (
             <LayananJadwal
              packageId={packageId}
              setPackageId={setPackageId}
              locationId={locationId}
              setLocationId={setLocationId}
              courseTime={courseTime}
              setCourseTime={setCourseTime}
              startDate={startDate}
              setStartDate={setStartDate}
              notes={notes}
              setNotes={setNotes}
              selectedPackage={selectedPackage}
              handlePrevStep={handlePrevStep}
              isStep2Valid={isStep2Valid}
              handleSubmitBooking={handleSubmitBooking}
              courseDays={courseDays}
              setCourseDays={setCourseDays}
              customLocation={customLocation}
              setCustomLocation={setCustomLocation}
             />
            )}

            {/* ── STEP 3: UPLOAD BUKTI PEMBAYARAN ── */}
            {currentStep === 4 &&  (
             <BuktiPembayaran
               paymentProof={paymentProof}
               setPaymentProof={setPaymentProof}
               handleFileChange={handleFileChange}
               handlePrevStep={handlePrevStep}
               totalPrice={totalPrice}
               isStep4Valid={isStep4Valid}
               handleNextStep={handleNextStep}
                handleFinishPayment={handleFinishPayment}
             />
            )}

             {/* STEP 4: TAGIHAN INVOICE RESMI (Cetak PDF) */}
            {currentStep === 3 && confirmedBooking && (
              <InvoiceStep
                confirmedBooking={confirmedBooking}
                printError={printError}
                setPrintError={setPrintError}
                setCurrentStep={setCurrentStep}
                handlePrint={handlePrint}
                courseDays={courseDays}
                
              />
            )}


            {/* ── STEP 4: STATUS ── */}
            {currentStep === 5 && confirmedBooking && (

              <ConfirmedBooking
                confirmedBooking={confirmedBooking}
                resetForm={resetForm}
                openWhatsApp={ () => openWhatsApp(confirmedBooking) }
                handlePrint={handlePrint}
                invoicePrinted={invoicePrinted}
   courseDays={courseDays}
              />
             
            )}

          </form>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <HistoryModal
          onClose={() => setShowHistoryModal(false)}
          onSelectBooking={(booking) => {
            setConfirmedBooking(booking);
            setCurrentStep(5);
            setShowHistoryModal(false);
          }}
        />
      )}
    </section>
  );
}


export default BookingForm;
