export type AuditStatus = 'Success' | 'Warning' | 'Failed'
export type AuditDateFilter = 'Today' | 'Last 7 Days' | 'Last 30 Days'
export type AuditCategory = 'Admin' | 'Hospital' | 'System'

export interface AuditLog {
  id: string
  timestamp: string
  ageDays: number
  user: string
  role: string
  scope: string
  action: string
  description: string
  status: AuditStatus
  category: AuditCategory
}

export const mockAuditLogs: AuditLog[] = [
  { id: 'evt-20260825-001', timestamp: 'Aug 25, 2026 09:42', ageDays: 0, user: 'Platform Admin', role: 'Platform Admin', scope: 'Platform', action: 'Settings Updated', description: 'Updated platform notification preferences', status: 'Success', category: 'System' },
  { id: 'evt-20260825-002', timestamp: 'Aug 25, 2026 09:18', ageDays: 0, user: 'Jordan Lee', role: 'Hospital Admin', scope: "St. Mary's Medical Center", action: 'Hospital Updated', description: 'Updated hospital operating hours and contact details', status: 'Success', category: 'Hospital' },
  { id: 'evt-20260825-003', timestamp: 'Aug 25, 2026 08:56', ageDays: 0, user: 'Platform Admin', role: 'Platform Admin', scope: 'Riverside Health Network', action: 'Hospital Admin Added', description: 'Added a new hospital administrator account', status: 'Success', category: 'Admin' },
  { id: 'evt-20260825-004', timestamp: 'Aug 25, 2026 08:32', ageDays: 0, user: 'Taylor Morgan', role: 'Hospital Admin', scope: 'Northside General Hospital', action: 'Alert Resolved', description: 'Resolved a department delay alert', status: 'Success', category: 'Hospital' },
  { id: 'evt-20260825-005', timestamp: 'Aug 25, 2026 08:14', ageDays: 0, user: 'Platform Admin', role: 'Platform Admin', scope: 'Lakeside Specialty Hospital', action: 'Hospital Deactivated', description: 'Hospital temporarily marked inactive for maintenance', status: 'Warning', category: 'Hospital' },
  { id: 'evt-20260824-006', timestamp: 'Aug 24, 2026 17:41', ageDays: 1, user: 'Avery Chen', role: 'Operations Manager', scope: 'Riverside Health Network', action: 'Hospital Activated', description: 'Hospital returned to active platform status', status: 'Success', category: 'Hospital' },
  { id: 'evt-20260823-007', timestamp: 'Aug 23, 2026 14:26', ageDays: 2, user: 'Platform Admin', role: 'Platform Admin', scope: 'Platform', action: 'User Login', description: 'Platform administrator signed in successfully', status: 'Success', category: 'Admin' },
  { id: 'evt-20260821-008', timestamp: 'Aug 21, 2026 11:07', ageDays: 4, user: 'Morgan Patel', role: 'Hospital Admin', scope: 'Greenfield Community Hospital', action: 'Hospital Admin Updated', description: 'Updated administrator access role', status: 'Warning', category: 'Admin' },
  { id: 'evt-20260818-009', timestamp: 'Aug 18, 2026 16:52', ageDays: 7, user: 'Platform Admin', role: 'Platform Admin', scope: 'Platform', action: 'System Event', description: 'Scheduled platform maintenance completed', status: 'Success', category: 'System' },
  { id: 'evt-20260801-010', timestamp: 'Aug 1, 2026 10:15', ageDays: 24, user: 'Platform Admin', role: 'Platform Admin', scope: 'Northside General Hospital', action: 'Hospital Created', description: 'Created a hospital connection request', status: 'Failed', category: 'Hospital' },
]
