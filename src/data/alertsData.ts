export type AlertSeverity = 'High' | 'Medium' | 'Low'
export type AlertStatus = 'Active' | 'Resolved'
export type AlertCategory = 'Queue Congestion' | 'Doctor Availability' | 'Department Delay' | 'Hospital Operations' | 'System Warning'

export interface OperationalAlert {
  id: string
  title: string
  hospital: string
  category: AlertCategory
  severity: AlertSeverity
  status: AlertStatus
  message: string
  generatedTime: string
}

export const mockAlerts: OperationalAlert[] = [
  { id: 'alert-001', title: 'Large queue buildup', hospital: 'Northside General Hospital', category: 'Queue Congestion', severity: 'High', status: 'Active', message: 'General Consultation has exceeded its expected queue threshold.', generatedTime: 'Today, 09:34 AM' },
  { id: 'alert-002', title: 'Doctor unavailable', hospital: "St. Mary's Medical Center", category: 'Doctor Availability', severity: 'Medium', status: 'Active', message: 'A scheduled Cardiology resource is currently unavailable.', generatedTime: 'Today, 09:18 AM' },
  { id: 'alert-003', title: 'Department delay', hospital: 'Northside General Hospital', category: 'Department Delay', severity: 'Medium', status: 'Active', message: 'Laboratory processing time is above the current operational threshold.', generatedTime: 'Today, 08:57 AM' },
  { id: 'alert-004', title: 'Hospital operational issue', hospital: 'Riverside Health Network', category: 'Hospital Operations', severity: 'High', status: 'Resolved', message: 'A temporary registration service interruption was reported and resolved.', generatedTime: 'Today, 08:21 AM' },
  { id: 'alert-005', title: 'System warning', hospital: 'Greenfield Community Hospital', category: 'System Warning', severity: 'Low', status: 'Active', message: 'Queue synchronization took longer than the expected interval.', generatedTime: 'Today, 07:48 AM' },
  { id: 'alert-006', title: 'Queue buildup monitored', hospital: 'Riverside Health Network', category: 'Queue Congestion', severity: 'Low', status: 'Resolved', message: 'Registration queue returned to its normal operating range.', generatedTime: 'Yesterday, 04:12 PM' },
  { id: 'alert-007', title: 'Hospital activated', hospital: 'Lakeside Specialty Hospital', category: 'Hospital Operations', severity: 'Low', status: 'Resolved', message: 'Hospital connection was restored after scheduled maintenance.', generatedTime: 'Aug 23, 2026 02:40 PM' },
  { id: 'alert-008', title: 'Doctor availability notice', hospital: "St. Mary's Medical Center", category: 'Doctor Availability', severity: 'Medium', status: 'Resolved', message: 'Availability status returned to normal for the afternoon schedule.', generatedTime: 'Aug 21, 2026 11:06 AM' },
]
