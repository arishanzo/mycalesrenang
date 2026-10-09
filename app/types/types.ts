export interface SwimmingPackage {
  id: string;
  name: string;
  category: 'asisten' | 'dewasa' | 'homevisit' | 'missyenny' | '3 bulan' | '6 bulan';
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



export interface EmailStatus{
  id: string;
  job_id: number;
  recipient: string;
  status: "pending" | "sent" | "failed";
}




export interface PromosiData{
  id: string;
  email: string[];
  subject: string;
  message: string;
  schedule: string;
  status: "pending" | "sent" | "failed";
}



export interface VouchersData{
  id: string;
  code: string;
  discount_type:'percentage' | 'fixed';
  discount_value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface BookingSubmission {
  id: string;
  booking_code: string;
  student_name: string;
  nama_panggilan: string;
  parent_name?: string; // If student is child
  gender: string;
  birth_date: string;
  age: number;
  phone: string;
  email: string;
  package_id: string;
  location_id: string;
  course_day: string,
  course_time: string;
  start_date: string;
  schedule_preference?: string;
  notes?: string;
  total_price: number;
   paymentProof?: File | string; // base64 image or file URL
  status: 'Perpanjangan - Menunggu Konfirmasi' | 'Menunggu Konfirmasi' | 'Terkonfirmasi' | 'Pembayaran Diterima' | 'Perpanjangan - Terkonfirmasi';
  end_date?: string;
}

export interface CourseDays {
  id: number,
  name: string,
}

export interface LoginCredentials {
  email: string;
  password: string;
}


export interface UbahPasswordCredentials {
   passwordlama : string, passwordbaru : string, komfirmpassword : string
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    message: string;
  };
}
