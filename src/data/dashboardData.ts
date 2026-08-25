import { AlertTriangle, Building2, Info, UserRoundX, type LucideIcon } from 'lucide-react'

export type DashboardMetric = {
  label: string
  value: string
  detail: string
  tone: 'positive' | 'neutral' | 'warning'
}

export type HospitalPerformance = {
  name: string
  activePatients: number
  activeDoctors: number
  appointmentsToday: number
  waitingPatients: number
  averageWait: string
  status: 'Operational' | 'Monitoring'
}

export type QueueOverview = {
  label: string
  value: number
  color: string
}

export type OperationalAlert = {
  title: string
  hospital: string
  time: string
  severity: 'High' | 'Medium' | 'Low'
  icon: LucideIcon
}

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total hospitals', value: '24', detail: '+2 this quarter', tone: 'positive' },
  { label: 'Active hospitals', value: '22', detail: '92% of network', tone: 'positive' },
  { label: 'Total patients', value: '18,642', detail: '+6.8% this month', tone: 'positive' },
  { label: 'Total doctors', value: '1,286', detail: 'Across all hospitals', tone: 'neutral' },
  { label: 'Appointments today', value: '3,948', detail: '74% confirmed', tone: 'neutral' },
  { label: 'Active queues', value: '68', detail: 'Across 22 hospitals', tone: 'neutral' },
  { label: 'Waiting patients', value: '412', detail: '38 need attention', tone: 'warning' },
  { label: 'Average waiting time', value: '18 min', detail: '-3 min from yesterday', tone: 'positive' },
  { label: 'System alerts', value: '07', detail: '2 high priority', tone: 'warning' },
]

export const hospitalPerformance: HospitalPerformance[] = [
  { name: "St. Mary's Medical Center", activePatients: 284, activeDoctors: 48, appointmentsToday: 612, waitingPatients: 36, averageWait: '14 min', status: 'Operational' },
  { name: 'Northside General Hospital', activePatients: 391, activeDoctors: 62, appointmentsToday: 748, waitingPatients: 58, averageWait: '22 min', status: 'Monitoring' },
  { name: 'Riverside Health Network', activePatients: 227, activeDoctors: 41, appointmentsToday: 504, waitingPatients: 21, averageWait: '11 min', status: 'Operational' },
  { name: 'Greenfield Community Hospital', activePatients: 176, activeDoctors: 35, appointmentsToday: 386, waitingPatients: 17, averageWait: '16 min', status: 'Operational' },
]

export const queueOverview: QueueOverview[] = [
  { label: 'Registration', value: 82, color: '#4d9bfa' },
  { label: 'Consultation', value: 64, color: '#49b7ae' },
  { label: 'Diagnostics', value: 47, color: '#7e8ce5' },
  { label: 'Pharmacy', value: 29, color: '#efad62' },
]

export const operationalAlerts: OperationalAlert[] = [
  { title: 'Large queue buildup', hospital: 'Northside General Hospital', time: '8 min ago', severity: 'High', icon: AlertTriangle },
  { title: 'Doctor unavailable', hospital: "St. Mary's Medical Center", time: '24 min ago', severity: 'Medium', icon: UserRoundX },
  { title: 'Hospital operational issue', hospital: 'Riverside Health Network', time: '41 min ago', severity: 'Medium', icon: Building2 },
  { title: 'System warning', hospital: 'Greenfield Community Hospital', time: '1 hr ago', severity: 'Low', icon: Info },
]
