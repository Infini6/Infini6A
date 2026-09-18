export type JourneyStatus = 'Waiting' | 'In Progress' | 'Completed'
export type QueueStatus = 'In Queue' | 'Being Served' | 'Complete'

export interface PatientOperationalRecord {
  id: string
  displayName: string
  hospital: string
  currentDepartment: string
  journeyStatus: JourneyStatus
  queueStatus: QueueStatus
  appointmentTime: string
  queuePosition: number
  estimatedWaitingTime: string
}

// DEMO SAMPLE DATA: frontend-only records used when the backend has no patients.
export const mockPatients: PatientOperationalRecord[] = [
  { id: 'PT-IND-1001', displayName: 'Aarav Sharma', hospital: "St. Mary's Medical Center", currentDepartment: 'General Consultation', journeyStatus: 'Waiting', queueStatus: 'In Queue', appointmentTime: '08:30 AM', queuePosition: 3, estimatedWaitingTime: '15 min' },
  { id: 'PT-IND-1002', displayName: 'Ananya Iyer', hospital: 'Northside General Hospital', currentDepartment: 'Cardiology', journeyStatus: 'In Progress', queueStatus: 'Being Served', appointmentTime: '09:00 AM', queuePosition: 1, estimatedWaitingTime: '5 min' },
  { id: 'PT-IND-1003', displayName: 'Rohan Mehta', hospital: 'Riverside Health Network', currentDepartment: 'Registration', journeyStatus: 'Completed', queueStatus: 'Complete', appointmentTime: '08:00 AM', queuePosition: 0, estimatedWaitingTime: '0 min' },
  { id: 'PT-IND-1004', displayName: 'Kavya Nair', hospital: 'Greenfield Community Hospital', currentDepartment: 'Laboratory', journeyStatus: 'Waiting', queueStatus: 'In Queue', appointmentTime: '09:30 AM', queuePosition: 6, estimatedWaitingTime: '24 min' },
  { id: 'PT-IND-1005', displayName: 'Vikram Singh', hospital: 'Northside General Hospital', currentDepartment: 'Ultrasound', journeyStatus: 'In Progress', queueStatus: 'Being Served', appointmentTime: '10:00 AM', queuePosition: 2, estimatedWaitingTime: '10 min' },
  { id: 'PT-IND-1006', displayName: 'Meera Joshi', hospital: "St. Mary's Medical Center", currentDepartment: 'Registration', journeyStatus: 'Completed', queueStatus: 'Complete', appointmentTime: '08:15 AM', queuePosition: 0, estimatedWaitingTime: '0 min' },
  { id: 'PT-IND-1007', displayName: 'Arjun Kapoor', hospital: 'Riverside Health Network', currentDepartment: 'General Consultation', journeyStatus: 'Waiting', queueStatus: 'In Queue', appointmentTime: '10:30 AM', queuePosition: 4, estimatedWaitingTime: '18 min' },
  { id: 'PT-IND-1008', displayName: 'Diya Patel', hospital: 'Greenfield Community Hospital', currentDepartment: 'Cardiology', journeyStatus: 'In Progress', queueStatus: 'Being Served', appointmentTime: '09:45 AM', queuePosition: 1, estimatedWaitingTime: '6 min' },
]
