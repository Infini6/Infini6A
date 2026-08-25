export type MonitorHospitalStatus = 'Operational' | 'High Load' | 'Attention Required'
export type QueueLoad = 'Low' | 'Medium' | 'High'
export type AlertSeverity = 'High' | 'Medium' | 'Low'

export interface LiveQueue {
  id: string
  department: string
  waiting: number
  estimatedWait: number
  load: QueueLoad
}

export interface LiveHospital {
  id: string
  name: string
  status: MonitorHospitalStatus
  patientsWaiting: number
  activeQueues: number
  averageWait: number
  availableDoctors: number
  appointmentsToday: number
  activeAlerts: number
  queues: LiveQueue[]
}

export interface LiveAlert {
  id: string
  severity: AlertSeverity
  hospital: string
  message: string
  time: string
}

export const mockLiveHospitals: LiveHospital[] = [
  { id: 'live-001', name: "St. Mary's Medical Center", status: 'Operational', patientsWaiting: 36, activeQueues: 14, averageWait: 14, availableDoctors: 48, appointmentsToday: 612, activeAlerts: 1, queues: [{ id: 'q-001', department: 'Registration', waiting: 8, estimatedWait: 7, load: 'Low' }, { id: 'q-002', department: 'General Consultation', waiting: 14, estimatedWait: 18, load: 'Medium' }, { id: 'q-003', department: 'Cardiology', waiting: 5, estimatedWait: 22, load: 'Medium' }, { id: 'q-004', department: 'Laboratory', waiting: 6, estimatedWait: 11, load: 'Low' }, { id: 'q-005', department: 'Ultrasound', waiting: 3, estimatedWait: 16, load: 'Low' }] },
  { id: 'live-002', name: 'Northside General Hospital', status: 'High Load', patientsWaiting: 58, activeQueues: 19, averageWait: 22, availableDoctors: 62, appointmentsToday: 748, activeAlerts: 3, queues: [{ id: 'q-006', department: 'Registration', waiting: 17, estimatedWait: 15, load: 'High' }, { id: 'q-007', department: 'General Consultation', waiting: 23, estimatedWait: 31, load: 'High' }, { id: 'q-008', department: 'Cardiology', waiting: 7, estimatedWait: 26, load: 'Medium' }, { id: 'q-009', department: 'Laboratory', waiting: 8, estimatedWait: 19, load: 'Medium' }, { id: 'q-010', department: 'Ultrasound', waiting: 3, estimatedWait: 14, load: 'Low' }] },
  { id: 'live-003', name: 'Riverside Health Network', status: 'Operational', patientsWaiting: 21, activeQueues: 11, averageWait: 11, availableDoctors: 41, appointmentsToday: 504, activeAlerts: 0, queues: [{ id: 'q-011', department: 'Registration', waiting: 5, estimatedWait: 6, load: 'Low' }, { id: 'q-012', department: 'General Consultation', waiting: 9, estimatedWait: 14, load: 'Medium' }, { id: 'q-013', department: 'Cardiology', waiting: 2, estimatedWait: 10, load: 'Low' }, { id: 'q-014', department: 'Laboratory', waiting: 3, estimatedWait: 8, load: 'Low' }, { id: 'q-015', department: 'Ultrasound', waiting: 2, estimatedWait: 12, load: 'Low' }] },
]

export const mockLiveAlerts: LiveAlert[] = [
  { id: 'alert-001', severity: 'High', hospital: 'Northside General Hospital', message: 'Large queue buildup in General Consultation', time: '8 min ago' },
  { id: 'alert-002', severity: 'Medium', hospital: "St. Mary's Medical Center", message: 'Doctor unavailable in Cardiology', time: '24 min ago' },
  { id: 'alert-003', severity: 'Medium', hospital: 'Northside General Hospital', message: 'Department delay reported by Laboratory', time: '36 min ago' },
  { id: 'alert-004', severity: 'Low', hospital: 'Riverside Health Network', message: 'System warning: queue sync delayed', time: '1 hr ago' },
]
