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
  student_name: string;
  parent_name?: string; // If student is child
  gender: string;
  birth_date: string;
  age: number;
  phone: string;
  program: string;
  package_id: string;
  location_id: string;
  course_days: string[];
  course_time: string;
  start_date: string;
  schedule_preference?: string;
  notes?: string;
  total_price: number;
   paymentProof?: string; // base64 image or file URL
  status: 'Menunggu Konfirmasi' | 'Terkonfirmasi' | 'Pembayaran Diterima';
 
}



export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}