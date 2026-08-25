export type HospitalStatus = 'Active' | 'Inactive'

export interface Hospital {
  id: string
  name: string
  code: string
  location: string
  admin: string
  contactEmail: string
  contactPhone: string
  operatingHours: string
  departments: number
  doctors: number
  activePatients: number
  appointmentsToday: number
  waitingPatients: number
  averageWaitingTime: string
  status: HospitalStatus
}

export type HospitalFormValues = Pick<Hospital, 'name' | 'code' | 'location' | 'contactEmail' | 'contactPhone' | 'operatingHours' | 'status'>

export const emptyHospitalForm: HospitalFormValues = {
  name: '',
  code: '',
  location: '',
  contactEmail: '',
  contactPhone: '',
  operatingHours: '',
  status: 'Active',
}

export const mockHospitals: Hospital[] = [
  { id: 'sh-001', name: "St. Mary's Medical Center", code: 'SH-001', location: 'Brookfield', admin: 'Jordan Lee', contactEmail: 'admin@stmarys.example', contactPhone: '+1 (555) 010-2401', operatingHours: 'Open 24 hours', departments: 18, doctors: 142, activePatients: 284, appointmentsToday: 612, waitingPatients: 36, averageWaitingTime: '14 min', status: 'Active' },
  { id: 'sh-002', name: 'Northside General Hospital', code: 'SH-002', location: 'Northside', admin: 'Taylor Morgan', contactEmail: 'admin@northside.example', contactPhone: '+1 (555) 010-2402', operatingHours: 'Open 24 hours', departments: 22, doctors: 198, activePatients: 391, appointmentsToday: 748, waitingPatients: 58, averageWaitingTime: '22 min', status: 'Active' },
  { id: 'sh-003', name: 'Riverside Health Network', code: 'SH-003', location: 'Riverside', admin: 'Avery Chen', contactEmail: 'admin@riverside.example', contactPhone: '+1 (555) 010-2403', operatingHours: '06:00 - 22:00', departments: 15, doctors: 116, activePatients: 227, appointmentsToday: 504, waitingPatients: 21, averageWaitingTime: '11 min', status: 'Active' },
  { id: 'sh-004', name: 'Greenfield Community Hospital', code: 'SH-004', location: 'Greenfield', admin: 'Morgan Patel', contactEmail: 'admin@greenfield.example', contactPhone: '+1 (555) 010-2404', operatingHours: '07:00 - 21:00', departments: 12, doctors: 94, activePatients: 176, appointmentsToday: 386, waitingPatients: 17, averageWaitingTime: '16 min', status: 'Active' },
  { id: 'sh-005', name: 'Lakeside Specialty Hospital', code: 'SH-005', location: 'Lakeside', admin: 'Casey Williams', contactEmail: 'admin@lakeside.example', contactPhone: '+1 (555) 010-2405', operatingHours: '08:00 - 20:00', departments: 9, doctors: 67, activePatients: 0, appointmentsToday: 0, waitingPatients: 0, averageWaitingTime: '0 min', status: 'Inactive' },
]
