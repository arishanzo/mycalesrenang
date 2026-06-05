export interface SwimmingPackage {
  id: string;
  name: string;
  description: string;
  details: string[];
  pricePerSession: number;
  highlightColor: string;
  badge: string;
  bestFor: string;
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
  age: number;
  phone: string;
  packageId: string;
  locationId: string;
  sessions: number; // 4, 8, or 12
  schedulePreference: string;
  notes?: string;
  totalPrice: number;
  submittedAt: string;
  status: 'Menunggu Konfirmasi' | 'Terkonfirmasi' | 'Pembayaran Diterima';
  paymentProof?: string; // base64 image or file URL
}
