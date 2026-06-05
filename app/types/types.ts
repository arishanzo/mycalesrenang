export interface SwimmingPackage {
  id: string;
  name: string;
  category: 'asisten' | 'dewasa' | 'homevisit' | 'missyenny';
  type: 'privat' | 'semiprivat' | 'grup' | 'oncecourse';
  sessions: number;
  frequency: string;
  maxKids: number;
  pricePerPerson: number;
  highlightColor: string;
  badge: string;
}

export interface SemarangLocation {
  id: string;
  name: string;
  address: string;
  mapEmbedUrl?: string;
  facilities: string[];
}

export interface SwimTestimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface BookingSubmission {
  id: string;
  bookingCode: string;
  studentName: string;
  parentName?: string; // If student is child
  gender: string;
  birthDate: string;
  age: number;
  phone: string;
  packageId: string;
  locationId: string;
  sessions?: number;
  courseDays: string[];
  courseTime: string;
  startDate: string;
  schedulePreference?: string;
  notes?: string;
  totalPrice: number;
  submittedAt: string;
  status: 'Menunggu Konfirmasi' | 'Terkonfirmasi' | 'Pembayaran Diterima';
  paymentProof?: string; // base64 image or file URL
}
