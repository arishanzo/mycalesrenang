
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { SwimmingPackage, SemarangLocation, SwimTestimonial,  } from '../types/types';
import { User, Users, Waves, BookOpen, CheckCircle, ArrowRight, Award, Smile, Anchor,  Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';



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
    href: 'https://instagram.com/mycaaquatic',
    color: 'hover:bg-pink-500 hover:border-pink-500',
  },
  {
    icon: <FaTiktok className="h-5 w-5" />,
    label: 'Tiktok',
    href: 'https://youtube.com/@mycaaquatic',
    color: 'hover:bg-red-500 hover:border-red-500',
  },
   {
    icon: <FaFacebook className="h-5 w-5" />,
    label: 'Facebook',
    href: 'https://youtube.com/@mycaaquatic',
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
      title: 'Instruktur Tersertifikasi',
      desc: 'Seluruh tim pelatih MYCA dilatih langsung di bawah bimbingan Miss Yenny dan bersertifikat penyelamatan air (lifeguard).'
    }
  ];
