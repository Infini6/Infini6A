import { useEffect, useMemo, useState } from 'react'
import { Activity, AlertCircle, CheckCircle2, ClipboardList, Eye, Filter, Search, TriangleAlert, X } from 'lucide-react'
import { getAuditLogs } from '../services/api'
import './AuditLogsPage.css'
import '../components/PortalPrimitives'

type AuditDateFilter = 'Today' | 'Last 7 Days' | 'Last 30 Days'
type AuditLog = { id: string; timestamp: string; ageDays: number | null; user: string; role: string; scope: string; action: string; description: string; status: string; category: string }
const dateFilters: AuditDateFilter[] = ['Today', 'Last 7 Days', 'Last 30 Days']
const iconByStatus: Record<string, typeof CheckCircle2> = { Success: CheckCircle2, Warning: TriangleAlert, Failed: AlertCircle }
const records = (value: any): any[] => {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.items)) return value.items
  if (Array.isArray(value?.results)) return value.results
  if (Array.isArray(value?.logs)) return value.logs
  return []
}

function normalizeLog(value: any): AuditLog {
  const timestamp = value.timestamp ?? value.createdAt ?? value.created_at ?? 'Not available'
  const parsed = Date.parse(timestamp)
  const ageDays = Number.isNaN(parsed) ? null : Math.floor((Date.now() - parsed) / 86400000)
  const actor = typeof value.actor === 'object' ? value.actor : null
  const hospital = typeof value.hospital === 'object' ? value.hospital : null
  return { id: String(value.id ?? value._id ?? timestamp), timestamp, ageDays, user: actor?.name ?? value.actorName ?? value.user?.name ?? value.user ?? value.actorUserId ?? 'Not available', role: actor?.role ?? value.role ?? 'Not available', scope: hospital?.name ?? value.hospitalName ?? (typeof value.hospital === 'string' ? value.hospital : value.scope ?? 'Platform'), action: value.action ?? value.event ?? 'Not available', description: value.description ?? value.message ?? (value.metadata ? JSON.stringify(value.metadata) : 'Not available'), status: value.status ?? 'Recorded', category: value.category ?? value.entity ?? value.resource ?? 'System' }
}

export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [query, setQuery] = useState('')
  const [actionFilter, setActionFilter] = useState('All actions')
  const [hospitalFilter, setHospitalFilter] = useState('All hospitals')
  const [dateFilter, setDateFilter] = useState<AuditDateFilter>('Today')
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { getAuditLogs().then((value) => setLogs(records(value).map(normalizeLog))).catch((err: any) => setError(err.message || 'Unable to load audit logs')).finally(() => setLoading(false)) }, [])
  const actions = [...new Set(logs.map((log) => log.action))]
  const hospitals = [...new Set(logs.map((log) => log.scope))]
  const filteredLogs = useMemo(() => logs.filter((log) => (actionFilter === 'All actions' || log.action === actionFilter) && (hospitalFilter === 'All hospitals' || log.scope === hospitalFilter) && `${log.user} ${log.scope} ${log.action} ${log.description}`.toLowerCase().includes(query.toLowerCase()) && (log.ageDays === null || dateFilter === 'Last 30 Days' || (dateFilter === 'Last 7 Days' ? log.ageDays <= 7 : log.ageDays === 0))), [logs, query, actionFilter, hospitalFilter, dateFilter])
  const summary = { total: logs.filter((log) => log.ageDays === 0).length, admin: logs.filter((log) => log.category.toLowerCase().includes('admin') && log.ageDays === 0).length, hospital: logs.filter((log) => log.category.toLowerCase().includes('hospital') && log.ageDays === 0).length, system: logs.filter((log) => log.category.toLowerCase().includes('system') && log.ageDays === 0).length }
  return <section className="audit-page">{loading && <p className="form-error">Loading audit logs...</p>}{error && <p className="form-error">{error}</p>}<div className="audit-heading"><div><p className="eyebrow">Governance & oversight</p><h2>Audit Logs</h2><p>Review administrative and operational activity across the Smart Hospital platform.</p></div><span className="read-only-label"><ClipboardList size={14} /> Read-only activity record</span></div><div className="audit-summary"><article><span>Total activities today</span><strong>{summary.total}</strong><em>All recorded events</em></article><article><span>Admin actions</span><strong>{summary.admin}</strong><em>Access and account changes</em></article><article><span>Hospital updates</span><strong>{summary.hospital}</strong><em>Network configuration</em></article><article><span>System events</span><strong>{summary.system}</strong><em>Automated platform events</em></article></div><div className="audit-toolbar"><div className="search-box audit-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search user, hospital, action, or description" aria-label="Search audit logs" /></div><div className="audit-filter"><Filter size={14} /><select value={actionFilter} onChange={(event) => setActionFilter(event.target.value)} aria-label="Filter by action type"><option>All actions</option>{actions.map((action) => <option key={action}>{action}</option>)}</select><select value={hospitalFilter} onChange={(event) => setHospitalFilter(event.target.value)} aria-label="Filter by hospital"><option>All hospitals</option>{hospitals.map((hospital) => <option key={hospital}>{hospital}</option>)}</select></div><div className="period-selector date-filter" aria-label="Filter by date">{dateFilters.map((date) => <button className={dateFilter === date ? 'selected' : ''} key={date} type="button" onClick={() => setDateFilter(date)}>{date}</button>)}</div></div><section className="dashboard-card audit-table-card"><div className="table-scroll"><table><thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Hospital / scope</th><th>Action</th><th>Description</th><th>Status</th><th>Details</th></tr></thead><tbody>{filteredLogs.map((log) => { const StatusIcon = iconByStatus[log.status] ?? Activity; return <tr key={log.id}><td>{log.timestamp}</td><td><strong>{log.user}</strong></td><td>{log.role}</td><td>{log.scope}</td><td><span className="action-label">{log.action}</span></td><td className="description-cell">{log.description}</td><td><span className={`audit-status ${log.status.toLowerCase()}`}><StatusIcon size={13} />{log.status}</span></td><td><button className="details-button" type="button" onClick={() => setSelectedLog(log)}><Eye size={14} /> View</button></td></tr> })}</tbody></table></div>{!loading && !filteredLogs.length && <div className="empty-state"><Search size={20} /><strong>No audit logs available</strong><p>{error || 'No records matched the selected filters.'}</p></div>}</section><p className="prototype-note">Showing {filteredLogs.length} of {logs.length} recorded activities</p>{selectedLog && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedLog(null)}><section className="hospital-modal audit-details-modal" role="dialog" aria-modal="true"><div className="modal-header"><div><p className="eyebrow">Audit event details</p><h2>{selectedLog.action}</h2></div><button className="icon-button" type="button" onClick={() => setSelectedLog(null)} aria-label="Close details"><X size={17} /></button></div><div className="audit-event-icon"><Activity size={20} /></div><dl className="audit-detail-list"><div><dt>Timestamp</dt><dd>{selectedLog.timestamp}</dd></div><div><dt>Event ID</dt><dd>{selectedLog.id}</dd></div><div><dt>User</dt><dd>{selectedLog.user}</dd></div><div><dt>Role</dt><dd>{selectedLog.role}</dd></div><div><dt>Hospital / scope</dt><dd>{selectedLog.scope}</dd></div><div><dt>Status</dt><dd>{selectedLog.status}</dd></div></dl><div className="audit-description"><span>Description</span><p>{selectedLog.description}</p></div><div className="modal-actions"><button className="outline-button" type="button" onClick={() => setSelectedLog(null)}>Close</button></div></section></div>}</section>
}
