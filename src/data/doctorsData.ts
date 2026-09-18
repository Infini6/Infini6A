export type DoctorAvailability = 'Available' | 'Busy' | 'Unavailable'

export interface Doctor {
  id: string
  name: string
  hospital: string
  department: string
  specialization: string
  availability: DoctorAvailability
  appointmentsToday: number
  currentQueue: number
  consultationHours: string
}

// DEMO SAMPLE DATA: frontend-only records used when the backend has no doctors.
export const mockDoctors: Doctor[] = [
  { id: 'DOC-IND-001', name: 'Dr. Neha Malhotra', hospital: "St. Mary's Medical Center", department: 'Cardiology', specialization: 'Interventional Cardiology', availability: 'Available', appointmentsToday: 18, currentQueue: 4, consultationHours: '08:00 - 16:00' },
  { id: 'DOC-IND-002', name: 'Dr. Aditya Rao', hospital: "St. Mary's Medical Center", department: 'General Medicine', specialization: 'Internal Medicine', availability: 'Busy', appointmentsToday: 22, currentQueue: 7, consultationHours: '09:00 - 17:00' },
  { id: 'DOC-IND-003', name: 'Dr. Sanya Menon', hospital: 'Northside General Hospital', department: 'Pediatrics', specialization: 'Pediatric Medicine', availability: 'Available', appointmentsToday: 16, currentQueue: 3, consultationHours: '08:30 - 16:30' },
  { id: 'DOC-IND-004', name: 'Dr. Karan Verma', hospital: 'Northside General Hospital', department: 'Orthopedics', specialization: 'Sports Orthopedics', availability: 'Busy', appointmentsToday: 19, currentQueue: 6, consultationHours: '10:00 - 18:00' },
  { id: 'DOC-IND-005', name: 'Dr. Ishita Desai', hospital: 'Riverside Health Network', department: 'Neurology', specialization: 'Adult Neurology', availability: 'Available', appointmentsToday: 14, currentQueue: 2, consultationHours: '08:00 - 14:00' },
  { id: 'DOC-IND-006', name: 'Dr. Nikhil Bhat', hospital: 'Greenfield Community Hospital', department: 'Radiology', specialization: 'Diagnostic Radiology', availability: 'Unavailable', appointmentsToday: 11, currentQueue: 0, consultationHours: '09:00 - 17:00' },
]
