export type AnalyticsPeriod = 'Today' | 'Last 7 Days' | 'Last 30 Days'

export interface AnalyticsMetric {
  label: string
  value: string
  trend: string
  tone: 'positive' | 'negative' | 'neutral'
}

export interface TrendPoint {
  label: string
  value: number
}

export interface FlowPoint {
  label: string
  appointments: number
  completed: number
  active: number
}

export interface AnalyticsHospital {
  name: string
  appointments: number
  patientsServed: number
  averageWait: string
  activeQueues: number
  utilization: string
  status: 'Operational' | 'Monitoring'
}

export interface QueueAnalytic {
  department: string
  averageWait: string
  averageQueue: number
  load: 'Low' | 'Medium' | 'High'
}

export interface PeriodAnalytics {
  metrics: AnalyticsMetric[]
  waitingTrend: TrendPoint[]
  patientFlow: FlowPoint[]
  hospitals: AnalyticsHospital[]
  queues: QueueAnalytic[]
  peakHours: TrendPoint[]
}

export const analyticsByPeriod: Record<AnalyticsPeriod, PeriodAnalytics> = {
  Today: {
    metrics: [{ label: 'Total appointments', value: '3,948', trend: '+8.2% vs yesterday', tone: 'positive' }, { label: 'Patients served', value: '2,716', trend: '+5.4% vs yesterday', tone: 'positive' }, { label: 'Average waiting time', value: '18 min', trend: '-3 min vs yesterday', tone: 'positive' }, { label: 'Peak queue load', value: '78%', trend: 'At 10:00 AM', tone: 'neutral' }, { label: 'Hospital utilization', value: '82%', trend: '+4.1% vs yesterday', tone: 'positive' }, { label: 'Active hospitals', value: '22 / 24', trend: '2 currently inactive', tone: 'neutral' }],
    waitingTrend: [{ label: '8 AM', value: 14 }, { label: '10 AM', value: 22 }, { label: '12 PM', value: 19 }, { label: '2 PM', value: 24 }, { label: '4 PM', value: 18 }, { label: '6 PM', value: 13 }],
    patientFlow: [{ label: '8 AM', appointments: 420, completed: 240, active: 180 }, { label: '10 AM', appointments: 670, completed: 390, active: 280 }, { label: '12 PM', appointments: 610, completed: 425, active: 185 }, { label: '2 PM', appointments: 720, completed: 480, active: 240 }, { label: '4 PM', appointments: 810, completed: 610, active: 200 }, { label: '6 PM', appointments: 718, completed: 571, active: 147 }],
    hospitals: [{ name: "St. Mary's Medical Center", appointments: 612, patientsServed: 438, averageWait: '14 min', activeQueues: 14, utilization: '84%', status: 'Operational' }, { name: 'Northside General Hospital', appointments: 748, patientsServed: 506, averageWait: '22 min', activeQueues: 19, utilization: '91%', status: 'Monitoring' }, { name: 'Riverside Health Network', appointments: 504, patientsServed: 374, averageWait: '11 min', activeQueues: 11, utilization: '76%', status: 'Operational' }, { name: 'Greenfield Community Hospital', appointments: 386, patientsServed: 291, averageWait: '16 min', activeQueues: 9, utilization: '72%', status: 'Operational' }],
    queues: [{ department: 'Registration', averageWait: '8 min', averageQueue: 9, load: 'Low' }, { department: 'General Consultation', averageWait: '21 min', averageQueue: 22, load: 'High' }, { department: 'Cardiology', averageWait: '18 min', averageQueue: 10, load: 'Medium' }, { department: 'Laboratory', averageWait: '13 min', averageQueue: 12, load: 'Medium' }, { department: 'Ultrasound', averageWait: '16 min', averageQueue: 7, load: 'Low' }],
    peakHours: [{ label: '8-10 AM', value: 54 }, { label: '10-12 PM', value: 78 }, { label: '12-2 PM', value: 63 }, { label: '2-4 PM', value: 72 }, { label: '4-6 PM', value: 68 }],
  },
  'Last 7 Days': {
    metrics: [{ label: 'Total appointments', value: '24,682', trend: '+6.9% vs prior period', tone: 'positive' }, { label: 'Patients served', value: '17,418', trend: '+7.6% vs prior period', tone: 'positive' }, { label: 'Average waiting time', value: '19 min', trend: '-2 min vs prior period', tone: 'positive' }, { label: 'Peak queue load', value: '86%', trend: 'On Tuesday at 10 AM', tone: 'neutral' }, { label: 'Hospital utilization', value: '79%', trend: '+3.2% vs prior period', tone: 'positive' }, { label: 'Active hospitals', value: '22 / 24', trend: '92% network coverage', tone: 'neutral' }],
    waitingTrend: [{ label: 'Mon', value: 18 }, { label: 'Tue', value: 21 }, { label: 'Wed', value: 16 }, { label: 'Thu', value: 24 }, { label: 'Fri', value: 19 }, { label: 'Sat', value: 14 }, { label: 'Sun', value: 17 }],
    patientFlow: [{ label: 'Mon', appointments: 3180, completed: 2260, active: 920 }, { label: 'Tue', appointments: 3640, completed: 2580, active: 1060 }, { label: 'Wed', appointments: 3420, completed: 2490, active: 930 }, { label: 'Thu', appointments: 3790, completed: 2730, active: 1060 }, { label: 'Fri', appointments: 3860, completed: 2860, active: 1000 }, { label: 'Sat', appointments: 1490, completed: 1100, active: 390 }, { label: 'Sun', appointments: 1302, completed: 1030, active: 272 }],
    hospitals: [{ name: "St. Mary's Medical Center", appointments: 3820, patientsServed: 2774, averageWait: '16 min', activeQueues: 14, utilization: '82%', status: 'Operational' }, { name: 'Northside General Hospital', appointments: 4680, patientsServed: 3260, averageWait: '23 min', activeQueues: 19, utilization: '89%', status: 'Monitoring' }, { name: 'Riverside Health Network', appointments: 3260, patientsServed: 2418, averageWait: '13 min', activeQueues: 11, utilization: '75%', status: 'Operational' }, { name: 'Greenfield Community Hospital', appointments: 2740, patientsServed: 2021, averageWait: '17 min', activeQueues: 9, utilization: '71%', status: 'Operational' }],
    queues: [{ department: 'Registration', averageWait: '9 min', averageQueue: 10, load: 'Low' }, { department: 'General Consultation', averageWait: '23 min', averageQueue: 25, load: 'High' }, { department: 'Cardiology', averageWait: '19 min', averageQueue: 12, load: 'Medium' }, { department: 'Laboratory', averageWait: '14 min', averageQueue: 14, load: 'Medium' }, { department: 'Ultrasound', averageWait: '17 min', averageQueue: 8, load: 'Low' }],
    peakHours: [{ label: '8-10 AM', value: 62 }, { label: '10-12 PM', value: 86 }, { label: '12-2 PM', value: 71 }, { label: '2-4 PM', value: 79 }, { label: '4-6 PM', value: 74 }],
  },
  'Last 30 Days': {
    metrics: [{ label: 'Total appointments', value: '102,480', trend: '+9.8% vs prior period', tone: 'positive' }, { label: 'Patients served', value: '74,216', trend: '+10.4% vs prior period', tone: 'positive' }, { label: 'Average waiting time', value: '20 min', trend: '-1 min vs prior period', tone: 'positive' }, { label: 'Peak queue load', value: '91%', trend: 'On Aug 12 at 10 AM', tone: 'neutral' }, { label: 'Hospital utilization', value: '81%', trend: '+5.7% vs prior period', tone: 'positive' }, { label: 'Active hospitals', value: '22 / 24', trend: '92% network coverage', tone: 'neutral' }],
    waitingTrend: [{ label: 'Week 1', value: 22 }, { label: 'Week 2', value: 20 }, { label: 'Week 3', value: 23 }, { label: 'Week 4', value: 18 }, { label: 'Week 5', value: 17 }],
    patientFlow: [{ label: 'Week 1', appointments: 24400, completed: 17480, active: 6920 }, { label: 'Week 2', appointments: 25800, completed: 18820, active: 6980 }, { label: 'Week 3', appointments: 26900, completed: 19560, active: 7340 }, { label: 'Week 4', appointments: 25380, completed: 18356, active: 7024 }],
    hospitals: [{ name: "St. Mary's Medical Center", appointments: 15820, patientsServed: 11540, averageWait: '17 min', activeQueues: 14, utilization: '83%', status: 'Operational' }, { name: 'Northside General Hospital', appointments: 19480, patientsServed: 13920, averageWait: '24 min', activeQueues: 19, utilization: '90%', status: 'Monitoring' }, { name: 'Riverside Health Network', appointments: 13640, patientsServed: 9960, averageWait: '14 min', activeQueues: 11, utilization: '77%', status: 'Operational' }, { name: 'Greenfield Community Hospital', appointments: 11260, patientsServed: 8240, averageWait: '18 min', activeQueues: 9, utilization: '73%', status: 'Operational' }],
    queues: [{ department: 'Registration', averageWait: '10 min', averageQueue: 12, load: 'Medium' }, { department: 'General Consultation', averageWait: '24 min', averageQueue: 28, load: 'High' }, { department: 'Cardiology', averageWait: '20 min', averageQueue: 13, load: 'Medium' }, { department: 'Laboratory', averageWait: '15 min', averageQueue: 16, load: 'Medium' }, { department: 'Ultrasound', averageWait: '18 min', averageQueue: 9, load: 'Low' }],
    peakHours: [{ label: '8-10 AM', value: 68 }, { label: '10-12 PM', value: 91 }, { label: '12-2 PM', value: 76 }, { label: '2-4 PM', value: 83 }, { label: '4-6 PM', value: 78 }],
  },
}
