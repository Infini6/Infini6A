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

export const mockDoctors: Doctor[] = [
  { id: 'doc-001', name: 'Dr. Maya Patel', hospital: "St. Mary's Medical Center", department: 'Cardiology', specialization: 'Interventional Cardiology', availability: 'Available', appointmentsToday: 18, currentQueue: 4, consultationHours: '08:00 - 16:00' },
  { id: 'doc-002', name: 'Dr. Daniel Brooks', hospital: "St. Mary's Medical Center", department: 'General Medicine', specialization: 'Internal Medicine', availability: 'Busy', appointmentsToday: 24, currentQueue: 8, consultationHours: '09:00 - 17:00' },
  { id: 'doc-003', name: 'Dr. Elena Rodriguez', hospital: 'Northside General Hospital', department: 'Pediatrics', specialization: 'Pediatric Medicine', availability: 'Available', appointmentsToday: 21, currentQueue: 3, consultationHours: '08:30 - 16:30' },
  { id: 'doc-004', name: 'Dr. Marcus Chen', hospital: 'Northside General Hospital', department: 'Orthopedics', specialization: 'Sports Orthopedics', availability: 'Busy', appointmentsToday: 19, currentQueue: 7, consultationHours: '10:00 - 18:00' },
  { id: 'doc-005', name: 'Dr. Priya Shah', hospital: 'Riverside Health Network', department: 'Laboratory', specialization: 'Clinical Pathology', availability: 'Unavailable', appointmentsToday: 12, currentQueue: 0, consultationHours: '07:00 - 15:00' },
  { id: 'doc-006', name: 'Dr. James Wilson', hospital: 'Riverside Health Network', department: 'General Medicine', specialization: 'Family Medicine', availability: 'Available', appointmentsToday: 16, currentQueue: 2, consultationHours: '08:00 - 14:00' },
  { id: 'doc-007', name: 'Dr. Sofia Nguyen', hospital: 'Greenfield Community Hospital', department: 'Radiology', specialization: 'Diagnostic Radiology', availability: 'Available', appointmentsToday: 14, currentQueue: 2, consultationHours: '09:00 - 17:00' },
  { id: 'doc-008', name: 'Dr. Oliver Grant', hospital: 'Greenfield Community Hospital', department: 'Cardiology', specialization: 'Clinical Cardiology', availability: 'Unavailable', appointmentsToday: 15, currentQueue: 0, consultationHours: '08:00 - 16:00' },
  { id: 'doc-009', name: 'Dr. Hannah Moore', hospital: 'Lakeside Specialty Hospital', department: 'Neurology', specialization: 'Adult Neurology', availability: 'Busy', appointmentsToday: 11, currentQueue: 5, consultationHours: '09:00 - 15:00' },
]
