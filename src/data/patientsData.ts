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

export const mockPatients: PatientOperationalRecord[] = [
  { id: 'PT-20481', displayName: 'Alex Morgan', hospital: "St. Mary's Medical Center", currentDepartment: 'General Consultation', journeyStatus: 'Waiting', queueStatus: 'In Queue', appointmentTime: '08:30 AM', queuePosition: 4, estimatedWaitingTime: '18 min' },
  { id: 'PT-20482', displayName: 'Jamie Rivera', hospital: 'Northside General Hospital', currentDepartment: 'Cardiology', journeyStatus: 'In Progress', queueStatus: 'Being Served', appointmentTime: '09:00 AM', queuePosition: 1, estimatedWaitingTime: '5 min' },
  { id: 'PT-20483', displayName: 'Taylor Bennett', hospital: 'Riverside Health Network', currentDepartment: 'Registration', journeyStatus: 'Completed', queueStatus: 'Complete', appointmentTime: '08:00 AM', queuePosition: 0, estimatedWaitingTime: '0 min' },
  { id: 'PT-20484', displayName: 'Morgan Ellis', hospital: 'Greenfield Community Hospital', currentDepartment: 'Laboratory', journeyStatus: 'Waiting', queueStatus: 'In Queue', appointmentTime: '09:30 AM', queuePosition: 7, estimatedWaitingTime: '26 min' },
  { id: 'PT-20485', displayName: 'Casey Brooks', hospital: 'Northside General Hospital', currentDepartment: 'Ultrasound', journeyStatus: 'In Progress', queueStatus: 'Being Served', appointmentTime: '10:00 AM', queuePosition: 2, estimatedWaitingTime: '9 min' },
  { id: 'PT-20486', displayName: 'Riley Parker', hospital: "St. Mary's Medical Center", currentDepartment: 'Registration', journeyStatus: 'Completed', queueStatus: 'Complete', appointmentTime: '08:15 AM', queuePosition: 0, estimatedWaitingTime: '0 min' },
  { id: 'PT-20487', displayName: 'Jordan Kim', hospital: 'Riverside Health Network', currentDepartment: 'General Consultation', journeyStatus: 'Waiting', queueStatus: 'In Queue', appointmentTime: '10:30 AM', queuePosition: 3, estimatedWaitingTime: '15 min' },
  { id: 'PT-20488', displayName: 'Avery Collins', hospital: 'Greenfield Community Hospital', currentDepartment: 'Cardiology', journeyStatus: 'In Progress', queueStatus: 'Being Served', appointmentTime: '09:45 AM', queuePosition: 1, estimatedWaitingTime: '6 min' },
  { id: 'PT-20489', displayName: 'Cameron Lee', hospital: 'Lakeside Specialty Hospital', currentDepartment: 'Neurology', journeyStatus: 'Completed', queueStatus: 'Complete', appointmentTime: '07:45 AM', queuePosition: 0, estimatedWaitingTime: '0 min' },
]
