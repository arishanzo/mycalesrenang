
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { SwimmingPackage, SemarangLocation, SwimTestimonial,  } from '../types/types';
import { User, Users, Waves, BookOpen, Award, Smile, Anchor,  Phone, Mail,Clock, Layers, Trophy,} from 'lucide-react';



export const CONTACT_ITEMS = [
  {
    icon: <Phone className="h-5 w-5 text-white" />,
    bg: 'bg-gradient-to-br from-cyan-500 to-marine-500',
    label: 'Telepon / WhatsApp',
    value: '089675211854',
    sub: 'Senin – Sabtu, 08.00 – 16.00 WIB',
    href: 'https://wa.me/089675211854',
  },
  {
    icon: <Mail className="h-5 w-5 text-white" />,
    bg: 'bg-gradient-to-br from-marine-600 to-blue-600',
    label: 'Email',
    value: 'info@mycaaquatic.com',
    sub: 'Balas dalam 1×24 jam kerja',
    href: 'mailto:info@mycaaquatic.id',
  },
  {
    icon: <Clock className="h-5 w-5 text-white" />,
    bg: 'bg-gradient-to-br from-blue-500 to-marine-700',
    label: 'Jam Operasional',
    value: 'Senin – Minggu',
    sub: '08.00 – 16.00 WIB',
    href: null,
  },
];

export const SOCIAL_LINKS = [
  {
    icon: <FaInstagram className="h-5 w-5" />,
    label: 'Instagram',
    href: 'https://www.instagram.com/lesrenang.smg/',
    color: 'hover:bg-pink-500 hover:border-pink-500',
  },
  {
    icon: <FaTiktok className="h-5 w-5" />,
    label: 'Tiktok',
    href: 'https://www.tiktok.com/@mycalesrenang.smg',
    color: 'hover:bg-red-500 hover:border-red-500',
  },
   {
    icon: <FaFacebook className="h-5 w-5" />,
    label: 'Facebook',
    href: 'https://www.facebook.com/lesrenang.smg',
    color: 'hover:bg-red-500 hover:border-red-500',
  },
];

export const MYCA_PACKAGES: SwimmingPackage[] = [
  // === ASISTEN ===
  { id: 'a-semiprivat-4x', category: 'asisten', type: 'semiprivat', name: 'Semi Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 2, pricePerPerson: 400000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Hemat' },
  { id: 'a-semiprivat-8x', category: 'asisten', type: 'semiprivat', name: 'Semi Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 2, pricePerPerson: 700000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Populer' },
  { id: 'a-privat-4x', category: 'asisten', type: 'privat', name: 'Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 1, pricePerPerson: 500000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Intensif' },
  { id: 'a-privat-8x', category: 'asisten', type: 'privat', name: 'Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 1, pricePerPerson: 900000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Progres Cepat' },
  { id: 'a-grup-4x', category: 'asisten', type: 'grup', name: 'Grup – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 4, pricePerPerson: 300000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Paling Hemat' },
  { id: 'a-grup-8x', category: 'asisten', type: 'grup', name: 'Grup – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 4, pricePerPerson: 500000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Aktif' },
  { id: 'a-once', category: 'asisten', type: 'oncecourse', name: 'Once Course', sessions: 1, frequency: 'Per pertemuan', maxKids: 1, pricePerPerson: 150000, highlightColor: 'from-amber-500 to-orange-500', badge: 'Fleksibel' },
  // === DEWASA ===
  { id: 'd-semiprivat-4x', category: 'dewasa', type: 'semiprivat', name: 'Semi Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 2, pricePerPerson: 550000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Hemat' },
  { id: 'd-semiprivat-8x', category: 'dewasa', type: 'semiprivat', name: 'Semi Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 2, pricePerPerson: 800000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Populer' },
  { id: 'd-privat-4x', category: 'dewasa', type: 'privat', name: 'Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 1, pricePerPerson: 650000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Intensif' },
  { id: 'd-privat-8x', category: 'dewasa', type: 'privat', name: 'Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 1, pricePerPerson: 1000000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Progres Cepat' },
  { id: 'd-grup-4x', category: 'dewasa', type: 'grup', name: 'Grup – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 4, pricePerPerson: 350000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Paling Hemat' },
  { id: 'd-grup-8x', category: 'dewasa', type: 'grup', name: 'Grup – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 4, pricePerPerson: 600000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Aktif' },
  { id: 'd-once', category: 'dewasa', type: 'oncecourse', name: 'Once Course', sessions: 1, frequency: 'Per pertemuan', maxKids: 1, pricePerPerson: 200000, highlightColor: 'from-amber-500 to-orange-500', badge: 'Fleksibel' },
  // === HOME VISIT ===
  { id: 'h-semiprivat-4x', category: 'homevisit', type: 'semiprivat', name: 'Semi Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 2, pricePerPerson: 650000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Hemat' },
  { id: 'h-semiprivat-8x', category: 'homevisit', type: 'semiprivat', name: 'Semi Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 2, pricePerPerson: 900000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Populer' },
  { id: 'h-privat-4x', category: 'homevisit', type: 'privat', name: 'Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 1, pricePerPerson: 750000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Intensif' },
  { id: 'h-privat-8x', category: 'homevisit', type: 'privat', name: 'Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 1, pricePerPerson: 1400000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Progres Cepat' },
  { id: 'h-grup-4x', category: 'homevisit', type: 'grup', name: 'Grup – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 4, pricePerPerson: 450000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Paling Hemat' },
  { id: 'h-grup-8x', category: 'homevisit', type: 'grup', name: 'Grup – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 4, pricePerPerson: 700000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Aktif' },
  { id: 'h-once', category: 'homevisit', type: 'oncecourse', name: 'Once Course', sessions: 1, frequency: 'Per pertemuan', maxKids: 1, pricePerPerson: 200000, highlightColor: 'from-amber-500 to-orange-500', badge: 'Fleksibel' },
  // === MISS YENNY ===
  { id: 'y-semiprivat-4x', category: 'missyenny', type: 'semiprivat', name: 'Semi Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 2, pricePerPerson: 550000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Hemat' },
  { id: 'y-semiprivat-8x', category: 'missyenny', type: 'semiprivat', name: 'Semi Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 2, pricePerPerson: 800000, highlightColor: 'from-teal-500 to-emerald-500', badge: 'Populer' },
  { id: 'y-privat-4x', category: 'missyenny', type: 'privat', name: 'Privat – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 1, pricePerPerson: 650000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Intensif' },
  { id: 'y-privat-8x', category: 'missyenny', type: 'privat', name: 'Privat – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 1, pricePerPerson: 1000000, highlightColor: 'from-blue-500 to-cyan-500', badge: 'Progres Cepat' },
  { id: 'y-grup-4x', category: 'missyenny', type: 'grup', name: 'Grup – 4x pertemuan', sessions: 4, frequency: '1x seminggu', maxKids: 4, pricePerPerson: 350000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Paling Hemat' },
  { id: 'y-grup-8x', category: 'missyenny', type: 'grup', name: 'Grup – 8x pertemuan', sessions: 8, frequency: '2x seminggu', maxKids: 4, pricePerPerson: 600000, highlightColor: 'from-marine-600 to-blue-700', badge: 'Aktif' },
  { id: 'y-once', category: 'missyenny', type: 'oncecourse', name: 'Once Course', sessions: 1, frequency: 'Per pertemuan', maxKids: 1, pricePerPerson: 200000, highlightColor: 'from-amber-500 to-orange-500', badge: 'Fleksibel' },
];

export const MYCA_LOCATIONS: SemarangLocation[] = [
  { id: 'mijen-lakers', name: 'Mijen Lakers BSB City', address: 'BSB City, Mijen, Semarang', facilities: ['Kolam Renang Outdoor', 'Area Parkir Luas', 'Loker & Kamar Bilas'] },
  { id: 'metro-javamall', name: 'Metro Sebelah Java Mall', address: 'Sebelah Java Mall, Semarang', facilities: ['Kolam Indoor', 'Lokasi Strategis Pusat Kota', 'Kamar Bilas'] },
  { id: 'kedaton-bsb', name: 'Kedaton BSB', address: 'BSB, Semarang', facilities: ['Kolam Renang Bersih', 'Area Aman untuk Anak', 'Parkir Tersedia'] },
  { id: 'royal-dome-marina', name: 'Royal Dome Marina', address: 'Kawasan Marina, Semarang Barat', facilities: ['Kolam Outdoor View Laut', 'Area Rekreasi', 'Food Court'] },
  { id: 'graha-wahid', name: 'Perum Graha Wahid Kedungmundu', address: 'Kedungmundu, Semarang', facilities: ['Kolam Renang Perumahan', 'Lingkungan Tenang', 'Parkir'] },
  { id: 'hotel-serata', name: 'Hotel Serata Tembalang', address: 'Tembalang, Semarang', facilities: ['Kolam Hotel Bersih', 'Air Hangat', 'Kamar Bilas Lengkap'] },
  { id: 'hotel-gets', name: 'Hotel Gets MT Haryono', address: 'MT Haryono, Semarang', facilities: ['Kolam Hotel Indoor', 'AC & Loker', 'Kamar Bilas'] },
  { id: 'jungle-toon', name: 'Jungle Toon', address: 'Semarang', facilities: ['Kolam Anak Tematik', 'Water Playground', 'Area Bermain'] },
  { id: 'hotel-stay-maja', name: 'Hotel Stay Maja', address: 'Semarang', facilities: ['Kolam Hotel Nyaman', 'Kamar Bilas', 'Parkir'] },
  { id: 'hotel-grasia', name: 'Hotel Grasia', address: 'Semarang', facilities: ['Kolam Hotel Bersih', 'Fasilitas Lengkap', 'Kamar Bilas'] },
  { id: 'hotel-quest', name: 'Hotel Quest', address: 'Semarang', facilities: ['Kolam Hotel Modern', 'Kamar Bilas', 'Parkir Tersedia'] },
  { id: 'pandanaran-hills', name: 'Pandanaran Hills', address: 'Pandanaran, Semarang', facilities: ['Kolam Outdoor View Hills', 'Udara Sejuk', 'Area Parkir'] },
  { id: 'wujil-resort', name: 'Wujil Resort Ungaran', address: 'Ungaran, Kabupaten Semarang', facilities: ['Kolam Resort Premium', 'Suasana Alam', 'Fasilitas Resort Lengkap'] },
  { id: 'bali', name: 'Provinsi Bali', address: 'Bali', facilities: ['Kolam Villa / Resort', 'Instruktur Tersertifikasi', 'Jadwal Fleksibel'] },
];

export const MYCA_TESTIMONIALS: SwimTestimonial[] = [
  {
    id: '1',
    name: 'Bunda Rania',
    role: 'Orang Tua Kenzie (6 Tahun)',
    text: 'Kenzie sempat trauma parah setelah tergelincir di kolam rekreasi umum. Atas rekomendasi rekan, kami masuk kelas Privat di MYCA Candi. Miss Yenny mendampingi dengan sentuhan psikolog anak, tidak langsung dipaksa menyosor air tapi diajak berteman dulu. Sekarang, Kenzie tidak hanya berani, tapi sudah mahir gaya dada dan bebas! Slogan "berenang itu seru" benar-benar nyata di sini.',
    rating: 5,
   
  },
  {
    id: '2',
    name: 'Dimas Wahyudo',
    role: 'Karyawan Swasta (34 Tahun)',
    text: 'Bagi pria dewasa, memulai belajar renang dari dasar itu butuh mental tebal karena rasa sungkan. Instruktur MYCA luar biasa suportif, tidak meremehkan, dan mengoreksi teknik kayuhan saya dengan sangat presisi di kelas Semi Privat bersama kolega. Tubuh terasa lebih bugar, masalah sakit punggung bawah saya hilang semenjak rajin latihan 8 sesi.',
    rating: 5,
  
  },
  {
    id: '3',
    name: 'dr. Elshinta Sp.A',
    role: 'Dokter Spesialis Anak',
    text: 'Sebagai dokter anak, saya sangat selektif menilai kebersihan kolam dan kompetensi pelatih. Sistem filtrasi garam non-klorin di MYCA Gajahmungkur sangat ramah bagi asma anak saya dan tidak membuat kulit atopik kering. Kurikulum pembelajarannya didasari keselamatan diri (water safety) sebelum mengenalkan gaya berenang. Sangat profesional!',
    rating: 5,
  }
];



export const LAYANAN_LIST = [
  {
    id: 'privat',
    icon: <User className="h-8 w-8 text-white" />,
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    badge: 'Paling Intensif',
    title: 'Les Privat Renang (1-on-1)',
    headline: 'Bimbingan Eksklusif Satu Instruktur, Satu Murid',
    description:
      'Program les renang privat di Semarang dengan pendampingan penuh dari instruktur bersertifikat. Seluruh sesi difokuskan 100% untuk satu murid — ideal untuk anak yang takut air, pemula dewasa, pemulihan cedera, maupun persiapan kompetisi renang.',
    accent: 'border-blue-200 hover:border-blue-400',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    id: 'semiprivat',
    icon: <Users className="h-8 w-8 text-white" />,
    iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-500',
    badge: 'Paling Populer',
    title: 'Les Semi Privat Renang (1-on-2)',
    headline: 'Belajar Bersama, Tetap Dapat Perhatian Penuh',
    description:
      'Kelas semi privat renang di Semarang untuk dua murid dalam satu sesi bersama satu instruktur. Pilihan terbaik untuk kakak-adik, pasangan, atau dua sahabat yang ingin belajar renang bersama dengan biaya lebih terjangkau namun kualitas tetap premium.',
 
    accent: 'border-cyan-300 hover:border-cyan-500',
    badgeColor: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    featured: true,
  },
  {
    id: 'grup',
    icon: <Waves className="h-8 w-8 text-white" />,
    iconBg: 'bg-gradient-to-br from-teal-500 to-marine-600',
    badge: 'Paling Hemat',
    title: 'Les Grup Renang (1-on-3/4)',
    headline: 'Kelas Kelompok Seru dengan Kurikulum Bertingkat',
    description:
      'Program les renang kelompok di Semarang untuk 3–4 murid per instruktur. Dirancang dengan kurikulum bertingkat dari level pemula hingga mahir, dilengkapi games air, aktivitas kolaborasi, dan sertifikat kelulusan resmi dari MYCA Aquatic.',
  
    accent: 'border-teal-200 hover:border-teal-400',
    badgeColor: 'bg-teal-50 text-teal-600 border-teal-200',
  },
  {
    id: 'onecourse',
    icon: <BookOpen className="h-8 w-8 text-white" />,
    iconBg: 'bg-gradient-to-br from-marine-600 to-blue-700',
    badge: 'Spesial Program',
    title: 'One Course — Paket Intensif Kilat',
    headline: 'Kuasai Teknik Dasar Renang dalam Satu Paket',
    description:
      'One Course adalah program intensif MYCA Aquatic yang dirancang untuk murid yang ingin menguasai teknik dasar renang dalam satu paket terjadwal penuh. Cocok untuk liburan sekolah, persiapan ujian renang, atau siapapun yang butuh hasil cepat dalam waktu terbatas.',

    accent: 'border-marine-200 hover:border-marine-400',
    badgeColor: 'bg-marine-50 text-marine-600 border-marine-100',
  },
];


export const MYCA_SEOS_FAQS = [
  {
    question: 'Apakah les renang MYCA Semarang menerima murid balita / baby?',
    answer: 'Ya, kami menyediakan program khusus Baby Swimmer & Toddler mulai usia 6 bulan di kolam indoor air hangat MYCA Gajahmungkur Candi yang steril dan aman bagi sistem imun bayi.'
  },
  {
    question: 'Berapa biaya pendaftaran dan administrasi pertama kali di MYCA?',
    answer: 'Pendaftaran awal gratis! Anda hanya membayar paket sesi yang dipilih (opsi paket 4 sesi atau 8 sesi). Seluruh biaya sudah mencakup asuransi dasar keselamatan di air saat jam latihan berlangsung.'
  },
  {
    question: 'Apakah murid perempuan bisa meminta instruktur (pelatih) wanita?',
    answer: 'Sangat bisa. Kami memahami kenyamanan murid. Baik kelas privat maupun semi privat, Anda bisa memilih instruktur renang wanita maupun pria profesional bersertifikat resmi.'
  },
  {
    question: 'Bagaimana jika anak berhalangan hadir (sakit / berpergian)? Apakah sesi hangus?',
    answer: 'Untuk kelas Privat, reschedule dapat diajukan maksimal 12 jam sebelum latihan tanpa hangus. Untuk kelas Semi-Privat & Grup, kami menyediakan jadwal kompensasi gabungan di hari alternatif.'
  }
];

export const coreValues = [
  {
    icon: <Smile className="h-6 w-6 text-cyan-600" />,
    title: 'Berenang itu Seru!',
    desc: 'Kami percaya bahwa pengajaran terbaik dimulai dari kegembiraan. Tidak ada metode teror atau pemaksaan anak ke dalam air.'
  },
  {
    icon: <Anchor className="h-6 w-6 text-cyan-600" />,
    title: 'Metode Water Safety',
    desc: 'Murid diajarkan cara mengapung darurat (survival floating) dan keselamatan diri di air sebelum melatih gaya berenang lanjutan.'
  },
  {
    icon: <Award className="h-6 w-6 text-cyan-600" />,
    title: 'Instruktur / Pelatih Berpengalaman',
    desc: 'Seluruh tim pelatih MYCA dilatih langsung di bawah bimbingan Miss Yenny dan bersertifikat penyelamatan air (lifeguard).'
  },
  {
    icon: <Layers className="h-6 w-6 text-cyan-600" />,
    title: 'Level Skill Berenang',
    desc: 'Program kami memiliki tingkatan skill yang jelas, dari pemula hingga mahir, sehingga murid dapat melihat progres nyata dalam perjalanan belajarnya.'
  },
  {
    icon: <Trophy className="h-6 w-6 text-cyan-600" />,
    title: 'Swimming Fun Tahunan',
    desc: 'Setiap tahun diadakan lomba renang menyenangkan untuk menambah kepercayaan diri, keberanian, dan semangat kompetisi sehat bagi murid.'
  }
];




  export const NAV = [ 
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
      <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
    </svg>
  )},
  { id: 'siswa', label: 'Data Siswa', href: '/siswa', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
    </svg>
  )},
  { id: 'jadwal', label: 'Jadwal', href: '/jadwal', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
  )},
  { id: 'transaksi', label: 'Transaksi', href: '/transaksi', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"/>
    </svg>
  )},
  { id: 'setting-akun', label: 'Pengaturan', href: '/setting-akun', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
    </svg>
  )},
];
