export type HospitalAdminStatus = 'Active' | 'Inactive'

export interface HospitalAdmin {
  id: string
  fullName: string
  email: string
  phone: string
  hospital: string
  role: string
  status: HospitalAdminStatus
  lastActive: string
}

export type HospitalAdminFormValues = Pick<HospitalAdmin, 'fullName' | 'email' | 'phone' | 'hospital' | 'role' | 'status'>

export const emptyHospitalAdminForm: HospitalAdminFormValues = {
  fullName: '', email: '', phone: '', hospital: '', role: '', status: 'Active',
}

export const mockHospitalAdmins: HospitalAdmin[] = [
  { id: 'admin-001', fullName: 'Jordan Lee', email: 'jordan.lee@stmarys.example', phone: '+1 (555) 010-2401', hospital: "St. Mary's Medical Center", role: 'Hospital Administrator', status: 'Active', lastActive: 'Today, 09:42' },
  { id: 'admin-002', fullName: 'Taylor Morgan', email: 'taylor.morgan@northside.example', phone: '+1 (555) 010-2402', hospital: 'Northside General Hospital', role: 'Hospital Administrator', status: 'Active', lastActive: 'Today, 09:18' },
  { id: 'admin-003', fullName: 'Avery Chen', email: 'avery.chen@riverside.example', phone: '+1 (555) 010-2403', hospital: 'Riverside Health Network', role: 'Operations Manager', status: 'Active', lastActive: 'Today, 08:56' },
  { id: 'admin-004', fullName: 'Morgan Patel', email: 'morgan.patel@greenfield.example', phone: '+1 (555) 010-2404', hospital: 'Greenfield Community Hospital', role: 'Hospital Administrator', status: 'Active', lastActive: 'Yesterday, 17:31' },
  { id: 'admin-005', fullName: 'Casey Williams', email: 'casey.williams@lakeside.example', phone: '+1 (555) 010-2405', hospital: 'Lakeside Specialty Hospital', role: 'Operations Manager', status: 'Inactive', lastActive: 'Aug 18, 2026' },
  { id: 'admin-006', fullName: 'Riley Thompson', email: 'riley.thompson@stmarys.example', phone: '+1 (555) 010-2411', hospital: "St. Mary's Medical Center", role: 'Scheduling Administrator', status: 'Active', lastActive: 'Today, 08:21' },
]
