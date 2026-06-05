
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
  {
    id: 'privat',
    name: 'Les Privat (1-on-1)',
    description: 'Bimbingan privat intensif eksklusif dengan perhatian 100% dari instruktur. Direkomendasikan untuk progres tercepat dan kenyamanan maksimal.',
    details: [
      '1 Instruktur Khusus Mengajar 1 Murid',
      'Jadwal Sangat Fleksibel (Bisa Sesuai Janji)',
      'Lokasi Kolam Bisa Dipilih (Home Private / MYCA Center)',
      'Program Khusus (Anak Takut Air, Dewasa, Terapi, Gaya Khusus)',
      'Laporan Evaluasi & Progres Setiap Bulan'
    ],
    pricePerSession: 250000,
    highlightColor: 'from-blue-500 to-cyan-500',
    badge: 'Progres Tercepat',
    bestFor: 'Anak-anak takut air, dewasa pemula, terapi kesehatan, atau pelatihan kompetisi.'
  },
  {
    id: 'semiprivat',
    name: 'Les Semi Privat (2-3 Murid)',
    description: 'Belajar berenang dengan suasana yang lebih interaktif tetapi tetap fokus tinggi. Sangat tepat untuk saudara kandung, pasangan, maupun teman dekat.',
    details: [
      '1 Instruktur Mengajar Maksimal 2-3 Murid',
      'Atmosfer Belajar yang Menyenangkan dan Kompetitif Sehat',
      'Jadwal Fleksibel (Disepakati Bersama Peserta Grup)',
      'Teknis Latihan yang Rinci & Dukungan Kelompok',
      'Biaya Lebih Hemat dengan Manfaat Pendampingan Tinggi'
    ],
    pricePerSession: 145000,
    highlightColor: 'from-teal-500 to-emerald-500 border-marine-500',
    badge: 'Terbaik & Hemat',
    bestFor: 'Bersaudara, teman sebaya, pasangan, atau rekan kerja yang ingin belajar bersama.'
  },
  {
    id: 'grup',
    name: 'Les Grup (4-8 Murid)',
    description: 'Program berkelompok reguler yang interaktif, penuh permainan, dan memotivasi anak-anak untuk bersosialisasi sambil menguasai keahlian berenang.',
    details: [
      'Kelas Kelompok Berisi 4 hingga 8 Anak',
      'Instruktur Bersertifikasi & Asisten Pengawas Kolam',
      'Kurikulum Bertingkat Kurikulum dari Pemula ke Mahir',
      'Banyak Program Games & Relaksasi Keberanian Air',
      'Sertifikat Kelulusan Level Penguasaan Renang'
    ],
    pricePerSession: 85000,
    highlightColor: 'from-marine-600 to-blue-700',
    badge: 'Paling Ceria & Seru',
    bestFor: 'Anak-anak usia sekolah dasar, melatih sosialisasi, dan hobi rekreasi aktif.'
  }
];

export const MYCA_LOCATIONS: SemarangLocation[] = [
  {
    id: 'candi',
    name: 'MYCA Aquatic Center - Gajahmungkur (Candi)',
    address: 'Jl. Papandayan Raya No. 12, Gajahmungkur, Kota Semarang, Jawa Tengah 50232',
    facilities: [
      'Kolam Indoor Air Hangat (Suhu Stabil 30-32°C)',
      'Sistem Filter Air Non-Klorin Garam (Sangat Aman untuk Kulit Sensitif & Bayi)',
      'Kamar Bilas Air Hangat Lengkap Sabun/Sampo',
      'Ruang Menunggu Ber-AC Dilengkapi Kafe & Live Streaming Monitor Kolam'
    ]
  },
  {
    id: 'tembalang',
    name: 'MYCA Center - Tembalang Garden Pool',
    address: 'Jl. Prof. Soedarto No. 45, Tembalang, Kota Semarang, Jawa Tengah 50275 (Dekat UNDIP)',
    facilities: [
      'Kolam Semi-Olympic Outdoor Panjang 25 Meter',
      'Kedalaman Berjenjang Mulai 0.8 Meter sampai 1.8 Meter',
      'Taman Teduh & Area Tribun Penonton Luas',
      'Sistem Keamanan Supervised Lengkap dengan Pelampung Selamatan'
    ]
  },
  {
    id: 'marina',
    name: 'MYCA Partner - Marina Grand Aquatic',
    address: 'Grand Taruma Aquatic Club, Jl. Marina Raya No. 8, Semarang Barat, Kota Semarang 50144',
    facilities: [
      'Kolam Rekreasi dengan Water Playground Kids',
      'Kolam Dewasa Standar Event Nasional',
      'Angin Laut yang Menyegarkan & Lapang',
      'Area Parkir Luas & Food Court Terintegrasi'
    ]
  }
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
