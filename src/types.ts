export type Specialization =
  | 'Counselor'
  | 'Clinical Counselor'
  | 'Psychologist'
  | 'Clinical Psychologist'
  | 'Medical Officer (Psychiatry Diploma)'
  | 'Consultant Psychiatrist';

export interface Review {
  id: string;
  reviewerNickname: string;
  rating: number; // 1-5
  reviewText: string;
  relativeDate: string; // e.g. "3 days ago"
}

export interface Slot {
  id: string;
  timeRange: string; // e.g. "09:00 AM - 09:30 AM"
  price: number; // in LKR
  duration: number; // in minutes
  extraTimePrice?: number; // extra cost in LKR
  extraTimeMinutes?: number; // extra time in minutes
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: Specialization;
  languages: string[]; // e.g. ['Sinhala', 'English', 'Tamil']
  gender: 'Male' | 'Female' | 'Other';
  price: number; // starting price in LKR
  profilePicture: string; // Image URL
  bio: string;
  qualifications: string[];
  rating: number; // calculated average star rating
  reviews: Review[];
  slots: Slot[];
}

export interface FilterParams {
  name?: string;
  category?: Specialization | '';
  language?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
  page?: number;
  size?: number;
}

export interface Appointment {
  id: string;
  referenceCode: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorPicture: string;
  timeRange: string;
  price: number;
  duration: number;
  nickname: string;
  contactMethod: string;
  dateBooked: string;
}

