import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  BellRing,
  ClipboardList,
  Clock3,
  ArrowUpRight,
  Settings,
  Stethoscope,
  UserCog,
  Users,
} from 'lucide-react'
import { AdminLayout } from './components/AdminLayout'
import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/useAuth'
import { getPlatformDashboard } from './services/api'
import { LoginPage } from './pages/LoginPage'
import { HospitalsPage } from './pages/HospitalsPage'
import { HospitalAdminsPage } from './pages/HospitalAdminsPage'
import { LiveMonitorPage } from './pages/LiveMonitorPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { AuditLogsPage } from './pages/AuditLogsPage'
import { DoctorsPage } from './pages/DoctorsPage'
import { PatientsPage } from './pages/PatientsPage'
import { SettingsPage } from './pages/SettingsPage'
import { AlertsPage } from './pages/AlertsPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { mockDoctors } from './data/doctorsData'
import { mockPatients } from './data/patientsData'
import './App.css'

const pageData = [
  ['hospital-admins', 'Hospital Admins', 'Oversee administrative access across the network.', UserCog],
  ['doctors', 'Doctors', 'View and manage clinical staff across hospitals.', Stethoscope],
  ['patients', 'Patients', 'A unified view of patients moving through care.', Users],
  ['analytics', 'Analytics', 'Understand capacity, flow, and care performance.', BarChart3],
  ['live-monitor', 'Live Monitor', 'Keep an eye on active journeys and queue health.', Activity],
  ['alerts', 'Alerts', 'Review issues that need platform attention.', AlertTriangle],
  ['audit-logs', 'Audit Logs', 'Trace changes and activity across the platform.', ClipboardList],
  ['settings', 'Settings', 'Configure platform preferences and access.', Settings],
] as const

function HospitalPerformanceChart({ hospitalPerformance }: { hospitalPerformance: any[] }) {
  const maxPatients = Math.max(1, ...hospitalPerformance.map((hospital) => hospital.activePatients))
  const totalAppointments = hospitalPerformance.reduce((sum, hospital) => sum + hospital.appointmentsToday, 0)
  const totalWaiting = hospitalPerformance.reduce((sum, hospital) => sum + hospital.waitingPatients, 0)

  return (
    <div className="network-overview-body" aria-label="Hospital network overview">
      <div className="network-chart-panel">
        <div className="network-chart-meta">
          <div><strong>{totalAppointments.toLocaleString()}</strong><span>appointments today</span></div>
          <div><strong>{totalWaiting}</strong><span>patients waiting</span></div>
        </div>
        <div className="network-chart-legend"><span><i className="legend-patients" />Active patients</span><span><i className="legend-waiting" />Waiting patients</span></div>
        <svg viewBox="0 0 760 238" className="network-chart" role="img" aria-label="Active and waiting patients by hospital">
          {[0, 1, 2, 3].map((line) => <line key={line} x1="42" y1={22 + line * 48} x2="730" y2={22 + line * 48} className="network-grid-line" />)}
          {hospitalPerformance.map((hospital, index) => {
            const x = 78 + index * 165
            const patientHeight = (hospital.activePatients / maxPatients) * 148
            const waitingHeight = (hospital.waitingPatients / maxPatients) * 148
            const label = hospital.name.split(' ').slice(0, 2).join(' ')
            return <g key={hospital.name}><title>{`${hospital.name}: ${hospital.activePatients} active patients, ${hospital.waitingPatients} waiting`}</title><rect x={x} y={170 - patientHeight} width="42" height={patientHeight} rx="8" className="network-patient-bar" /><rect x={x + 50} y={170 - waitingHeight} width="22" height={waitingHeight} rx="6" className="network-waiting-bar" /><text x={x + 34} y="204" textAnchor="middle" className="network-axis-label">{label}</text><text x={x + 21} y={Math.max(16, 162 - patientHeight)} textAnchor="middle" className="network-value-label">{hospital.activePatients}</text></g>
          })}
        </svg>
      </div>
      <aside className="network-health-panel"><div className="network-health-heading"><span>Network health</span><span className="health-status"><i />Stable</span></div><div className="health-score"><strong>92%</strong><span>of hospitals operational</span></div><div className="health-progress"><i /></div><div className="health-facts"><div><span>Operational</span><strong>{hospitalPerformance.filter((hospital) => hospital.status === 'Operational').length}</strong></div><div><span>Monitoring</span><strong>{hospitalPerformance.filter((hospital) => hospital.status === 'Monitoring').length}</strong></div><div><span>Avg. wait</span><strong>16 min</strong></div></div><Link className="network-link" to="/analytics">View network analytics <ArrowUpRight size={15} /></Link></aside>
    </div>
  )
}

function AlertSeverityChart({ operationalAlerts }: { operationalAlerts: any[] }) {
  const totalAlerts = operationalAlerts.length
  const counts = [
    { label: 'High', value: operationalAlerts.filter((alert) => alert.severity === 'High').length },
    { label: 'Medium', value: operationalAlerts.filter((alert) => alert.severity === 'Medium').length },
    { label: 'Low', value: operationalAlerts.filter((alert) => alert.severity === 'Low').length },
  ]

  return (
    <div className="alert-distribution" aria-label="Alert severity distribution">
      {counts.map(({ label, value }) => (
        <div className="alert-distribution-item" key={label}>
          <div className="distribution-meta">
            <span className={`severity-dot ${label.toLowerCase()}`} />
            <span>{label}</span>
          </div>
          <strong>{value}</strong>
          <div className="distribution-track">
            <i style={{ width: `${totalAlerts ? (value / totalAlerts) * 100 : 0}%` }} className={label.toLowerCase()} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Dashboard() {
  const [dashboard, setDashboard] = useState<any>({})
  const [dashboardError, setDashboardError] = useState('')
  const [dashboardLoading, setDashboardLoading] = useState(true)
  useEffect(() => {
    getPlatformDashboard()
      .then((data) => { setDashboard(data && typeof data === 'object' ? data : {}); setDashboardError('') })
      .catch((error: Error) => { setDashboard({}); setDashboardError(error.message || 'Unable to load dashboard') })
      .finally(() => setDashboardLoading(false))
  }, [])
  const totalHospitals = dashboard.hospitals ?? 0
  const totalHospitalAdmins = dashboard.hospitalAdmins ?? 0
  // DEMO SAMPLE DATA: only fill these two dashboard KPIs when backend totals are zero.
  const totalDoctors = dashboard.doctors || mockDoctors.length
  const totalPatients = dashboard.patients || mockPatients.length
  const totalAppointments = dashboard.appointmentsToday ?? 0
  const activeQueues = dashboard.activeQueues ?? 0
  const hospitalPerformanceSource = Array.isArray(dashboard.hospitalPerformance)
    ? dashboard.hospitalPerformance
    : Array.isArray(dashboard.hospitals) ? dashboard.hospitals : []
  const hospitalPerformance: any[] = hospitalPerformanceSource.map((hospital: any) => ({ name: hospital.name ?? 'Hospital', activePatients: hospital.activePatients ?? hospital.patients ?? 0, activeDoctors: hospital.activeDoctors ?? hospital.doctors ?? 0, appointmentsToday: hospital.appointmentsToday ?? hospital.appointments ?? 0, waitingPatients: hospital.waitingPatients ?? hospital.patientsWaiting ?? 0, averageWait: hospital.averageWait ?? hospital.averageWaitingTime ?? 'Not available', status: hospital.status === 'ACTIVE' || hospital.status === 'Operational' ? 'Operational' : 'Monitoring' }))
  const queueOverview: any[] = Array.isArray(dashboard.queueOverview) ? dashboard.queueOverview : Array.isArray(dashboard.queues) ? dashboard.queues : []
  const alertSource = Array.isArray(dashboard.operationalAlerts) ? dashboard.operationalAlerts : Array.isArray(dashboard.alerts) ? dashboard.alerts : []
  const operationalAlerts: any[] = alertSource.map((alert: any) => ({ title: alert.title ?? alert.message ?? 'Platform alert', hospital: alert.hospital?.name ?? alert.hospitalName ?? 'Network', time: alert.time ?? alert.createdAt ?? 'Not available', severity: alert.severity ?? 'Low', icon: AlertTriangle }))
  const queueTotal = queueOverview.reduce((sum, queue) => sum + queue.value, 0)
  const peakQueue = Math.max(...queueOverview.map((queue) => queue.value))
  const averageQueue = Math.round(queueTotal / queueOverview.length)

  const kpiCards = [
    { label: 'Hospitals in network', value: String(totalHospitals), detail: `${totalHospitalAdmins} hospital admins`, tone: 'positive', icon: Building2 },
    { label: 'Hospital admins', value: String(totalHospitalAdmins), detail: `${totalDoctors} doctors across network`, tone: 'positive', icon: UserCog },
    { label: 'Doctors', value: String(totalDoctors), detail: `${totalPatients} patients in platform`, tone: 'neutral', icon: Stethoscope },
    { label: 'Patients', value: String(totalPatients), detail: `${totalAppointments} appointments today · ${activeQueues} active queues`, tone: 'warning', icon: Users },
  ]

  return (
    <section className="dashboard-page">{dashboardLoading && <p className="form-error">Loading dashboard...</p>}{dashboardError && <p className="form-error">{dashboardError}</p>}
      <div className="welcome-row dashboard-hero">
        <div>
          <p className="eyebrow">Tuesday, August 25, 2026 <span className="hero-live-label"><i />Live network view</span></p>
          <h2>Dashboard</h2>
          <p className="section-lead">Monitor hospital operations, patient flow, and queue activity across the network.</p>
        </div>
        <Link className="primary-button" to="/live-monitor">Open live monitor <Activity size={16} /></Link>
      </div>

      <div className="dashboard-kpi-grid">
        {kpiCards.map(({ label, value, detail, tone, icon: Icon }) => (
          <article className="stat-card dashboard-kpi-card" key={label}>
            <div className="kpi-icon" data-tone={tone}>
              <Icon size={16} />
            </div>
            <div className="kpi-copy">
              <span className="stat-label">{label}</span>
              <strong>{value}</strong>
              <span className={`stat-trend ${tone}`}>{detail}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="section-title dashboard-section-heading">
        <div>
          <p className="eyebrow">Network intelligence</p>
          <h3>Hospital Network Overview</h3>
          <p>Current operational indicators across connected facilities</p>
        </div>
        <Link className="text-button" to="/hospitals">View all hospitals <span>→</span></Link>
      </div>

      <section className="dashboard-card performance-card network-overview-card">
        <HospitalPerformanceChart hospitalPerformance={hospitalPerformance} />
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Active patients</th>
                <th>Active doctors</th>
                <th>Appointments today</th>
                <th>Waiting patients</th>
                <th>Avg. waiting time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {hospitalPerformance.map((hospital) => (
                <tr key={hospital.name}>
                  <td><strong>{hospital.name}</strong></td>
                  <td>{hospital.activePatients}</td>
                  <td>{hospital.activeDoctors}</td>
                  <td>{hospital.appointmentsToday}</td>
                  <td>{hospital.waitingPatients}</td>
                  <td>{hospital.averageWait}</td>
                  <td>
                    <span className={`operation-status ${hospital.status === 'Operational' ? 'operational' : 'monitoring'}`}>
                      <span />{hospital.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="dashboard-grid lower-dashboard-grid dashboard-secondary-grid">
        <article className="dashboard-card queue-card live-queue-card">
          <div className="card-heading">
            <div>
              <div className="card-kicker"><span className="live-pulse" />Live operations</div>
              <h3>Queue status</h3>
              <p>Patients currently waiting by service</p>
            </div>
            <Link className="icon-link" to="/live-monitor" aria-label="Open live monitor"><ArrowUpRight size={17} /></Link>
          </div>

          <div className="queue-summary-grid queue-kpi-strip">
            <div className="mini-stat queue-total-stat">
              <span>Total waiting</span>
              <strong>{queueTotal}</strong>
              <small>patients now</small>
            </div>
            <div className="mini-stat">
              <span>Peak queue</span>
              <strong>{peakQueue}</strong>
              <small>patients</small>
            </div>
            <div className="mini-stat">
              <span>Average wait</span>
              <strong>{Math.max(8, Math.round(averageQueue / 3))}<small> min</small></strong>
              <small>across queues</small>
            </div>
          </div>

          <div className="queue-operations-list">
            {queueOverview.map((queue) => {
              const status = queue.value >= 70 ? 'High Load' : queue.value >= 50 ? 'Busy' : 'Normal'
              const waitMinutes = Math.max(8, Math.round(queue.value / 4))
              return <div className="queue-operation" key={queue.label}>
                <div className="queue-operation-icon" style={{ color: queue.color, background: `${queue.color}18` }}><Activity size={16} /></div>
                <div className="queue-operation-main"><div className="queue-operation-title"><strong>{queue.label}</strong><span className={`queue-status ${status.toLowerCase().replace(' ', '-')}`}><i />{status}</span></div><div className="queue-operation-meta"><span>{queue.value} patients</span><span>Avg. wait {waitMinutes} min</span></div><div className="queue-operation-track"><i style={{ width: `${(queue.value / 82) * 100}%`, background: queue.color }} /></div></div>
                <strong className="queue-operation-count">{queue.value}</strong>
              </div>
            })}
          </div>
          <div className="queue-total live-queue-total"><span>Live queue load across active services</span><Link to="/live-monitor">Open monitor <ArrowUpRight size={14} /></Link></div>
        </article>

        <article className="dashboard-card alert-card activity-card">
          <div className="card-heading">
            <div>
              <div className="card-kicker"><BellRing size={14} /> Attention required</div>
              <h3>Recent activity</h3>
              <p>Operational alerts across the network</p>
            </div>
            <Link className="text-button" to="/alerts">View all <span>→</span></Link>
          </div>

          <div className="activity-summary"><AlertSeverityChart operationalAlerts={operationalAlerts} /><span className="activity-summary-note"><Clock3 size={13} /> Updated from live operations</span></div>

          <div className="activity-feed">
            {operationalAlerts.map(({ title, hospital, time, severity, icon: Icon }) => {
              const activityTone = severity === 'High' ? 'critical' : severity === 'Medium' ? 'warning' : 'informational'
              const activityLabel = severity === 'High' ? 'Critical' : severity === 'Medium' ? 'Warning' : 'Info'
              return <div className={`activity-item ${activityTone}`} key={title}>
                <div className="activity-marker"><Icon size={14} /></div>
                <div className="activity-content"><div className="activity-title-row"><strong>{title}</strong><span className="activity-time">{time}</span></div><div className="activity-detail-row"><span>{hospital}</span><span className="activity-badge">{activityLabel}</span></div></div>
              </div>
            })}
          </div>
        </article>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginGate />} />
          <Route element={<ProtectedAdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          <Route path="hospital-admins" element={<HospitalAdminsPage />} />
          <Route path="live-monitor" element={<LiveMonitorPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          {pageData.map(([path, title, description, icon]) => <Route key={path} path={path} element={<PlaceholderPage title={title} description={description} icon={icon} />} />)}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

function LoginGate() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
}

function ProtectedAdminLayout() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />
}

export default App
