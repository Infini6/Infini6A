import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  Settings,
  Stethoscope,
  UserCog,
  Users,
} from 'lucide-react'
import { AdminLayout } from './components/AdminLayout'
import { AuthProvider } from './auth/AuthContext'
import { useAuth } from './auth/useAuth'
import { hospitalPerformance, operationalAlerts, queueOverview } from './data/dashboardData'
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

function HospitalPerformanceChart() {
  const patientMax = Math.max(...hospitalPerformance.map((hospital) => hospital.activePatients))
  const doctorMax = Math.max(...hospitalPerformance.map((hospital) => hospital.activeDoctors))
  const appointmentMax = Math.max(...hospitalPerformance.map((hospital) => hospital.appointmentsToday))
  const waitValues = hospitalPerformance.map((hospital) => Number.parseInt(hospital.averageWait, 10))
  const waitMax = Math.max(...waitValues)
  const shortNames = hospitalPerformance.map((hospital) =>
    hospital.name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.replace(/\./g, ''))
      .join(' '),
  )

  const metrics = [
    {
      key: 'patients',
      label: 'Active patients',
      color: '#3b82f6',
      total: hospitalPerformance.reduce((sum, hospital) => sum + hospital.activePatients, 0),
      values: hospitalPerformance.map((hospital) => hospital.activePatients),
      max: patientMax,
      type: 'bars' as const,
    },
    {
      key: 'doctors',
      label: 'Active doctors',
      color: '#22a06b',
      total: hospitalPerformance.reduce((sum, hospital) => sum + hospital.activeDoctors, 0),
      values: hospitalPerformance.map((hospital) => hospital.activeDoctors),
      max: doctorMax,
      type: 'bars' as const,
    },
    {
      key: 'appointments',
      label: 'Appointments today',
      color: '#7c6cf2',
      total: hospitalPerformance.reduce((sum, hospital) => sum + hospital.appointmentsToday, 0),
      values: hospitalPerformance.map((hospital) => hospital.appointmentsToday),
      max: appointmentMax,
      type: 'bars' as const,
    },
    {
      key: 'waiting',
      label: 'Avg. waiting time',
      color: '#f59e0b',
      total: Math.round(waitValues.reduce((sum, value) => sum + value, 0) / waitValues.length),
      values: waitValues,
      max: waitMax,
      type: 'line' as const,
    },
  ]

  return (
    <div className="hospital-performance-analytics" aria-label="Hospital performance overview">
      {metrics.map((metric) => (
        <article className="hospital-metric-card" key={metric.key}>
          <div className="metric-card-header">
            <div>
              <span>{metric.label}</span>
              <strong>{metric.total}{metric.key === 'waiting' ? ' min' : ''}</strong>
            </div>
            <span className="metric-pill" style={{ backgroundColor: `${metric.color}1f`, color: metric.color }}>
              {metric.key === 'waiting' ? 'min' : 'count'}
            </span>
          </div>

          <div className="mini-chart-shell">
            <svg viewBox="0 0 310 155" className="hospital-mini-chart" preserveAspectRatio="xMidYMid meet">
              {[0, 1, 2, 3].map((line) => (
                <line key={line} x1="30" y1={16 + line * 34} x2="286" y2={16 + line * 34} className="chart-grid-line" />
              ))}

              {metric.type === 'bars' ? (
                metric.values.map((value, index) => {
                  const x = 38 + index * 58
                  const height = (value / metric.max) * 80
                  const y = 112 - height

                  return (
                    <g key={`${metric.key}-${shortNames[index]}`}>
                      <title>{`${shortNames[index]}: ${value}`}</title>
                      <rect x={x} y={y} width="18" height={height} rx="6" className="mini-chart-bar" style={{ fill: metric.color }} />
                      <text x={x + 9} y="131" textAnchor="middle" className="axis-label">{shortNames[index].split(' ')[0]}</text>
                    </g>
                  )
                })
              ) : (
                <>
                  {metric.values.map((value, index) => {
                    const x = 38 + index * 58
                    const y = 112 - (value / metric.max) * 80

                    return (
                      <g key={`${metric.key}-${shortNames[index]}`}>
                        <title>{`${shortNames[index]}: ${value} min`}</title>
                        <circle cx={x} cy={y} r="3.5" className="line-point" style={{ fill: metric.color }} />
                        <text x={x} y="131" textAnchor="middle" className="axis-label">{shortNames[index].split(' ')[0]}</text>
                      </g>
                    )
                  })}
                  <polyline
                    points={metric.values
                      .map((value, index) => `${38 + index * 58},${112 - (value / metric.max) * 80}`)
                      .join(' ')}
                    className="trend-line"
                    style={{ stroke: metric.color }}
                  />
                </>
              )}
            </svg>
          </div>
        </article>
      ))}
    </div>
  )
}

function AlertSeverityChart() {
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
            <i style={{ width: `${(value / totalAlerts) * 100}%` }} className={label.toLowerCase()} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Dashboard() {
  const queueTotal = queueOverview.reduce((sum, queue) => sum + queue.value, 0)
  const peakQueue = Math.max(...queueOverview.map((queue) => queue.value))
  const averageQueue = Math.round(queueTotal / queueOverview.length)
  const activePatients = hospitalPerformance.reduce((sum, hospital) => sum + hospital.activePatients, 0)
  const activeDoctors = hospitalPerformance.reduce((sum, hospital) => sum + hospital.activeDoctors, 0)
  const appointmentsToday = hospitalPerformance.reduce((sum, hospital) => sum + hospital.appointmentsToday, 0)
  const openAlerts = operationalAlerts.length

  const kpiCards = [
    { label: 'Active patients', value: activePatients.toLocaleString(), detail: 'Across 4 facilities', tone: 'positive', icon: Users },
    { label: 'Active doctors', value: activeDoctors.toLocaleString(), detail: 'On shift today', tone: 'positive', icon: Stethoscope },
    { label: 'Appointments today', value: appointmentsToday.toLocaleString(), detail: 'Confirmed visits', tone: 'neutral', icon: ClipboardList },
    { label: 'Open alerts', value: openAlerts.toString().padStart(2, '0'), detail: '2 high priority', tone: 'warning', icon: AlertTriangle },
  ]

  return (
    <section className="dashboard-page">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Tuesday, August 25, 2026</p>
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

      <div className="section-title">
        <div>
          <h3>Hospital Performance Overview</h3>
          <p>Current operational indicators by hospital</p>
        </div>
        <Link className="text-button" to="/hospitals">View all hospitals <span>→</span></Link>
      </div>

      <section className="dashboard-card performance-card">
        <HospitalPerformanceChart />
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

      <div className="dashboard-grid lower-dashboard-grid">
        <article className="dashboard-card queue-card">
          <div className="card-heading">
            <div>
              <h3>Queue overview</h3>
              <p>Patients currently waiting by service</p>
            </div>
            <Activity size={18} className="card-icon" />
          </div>

          <div className="queue-summary-grid">
            <div className="mini-stat">
              <span>Peak queue</span>
              <strong>{peakQueue}</strong>
            </div>
            <div className="mini-stat">
              <span>Average</span>
              <strong>{averageQueue}</strong>
            </div>
          </div>

          <div className="queue-bars">
            {queueOverview.map((queue) => (
              <div className="queue-row" key={queue.label}>
                <div className="queue-label">
                  <span>{queue.label}</span>
                  <strong>{queue.value}</strong>
                </div>
                <div className="queue-track">
                  <i style={{ width: `${(queue.value / 82) * 100}%`, background: queue.color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="queue-total"><strong>{queueTotal}</strong> patients waiting across active queues</p>
        </article>

        <article className="dashboard-card alert-card">
          <div className="card-heading">
            <div>
              <h3>Alert preview</h3>
              <p>Recent operational alerts</p>
            </div>
            <Link className="text-button" to="/alerts">View all <span>→</span></Link>
          </div>

          <AlertSeverityChart />

          <div className="alert-list">
            {operationalAlerts.map(({ title, hospital, time, severity, icon: Icon }) => (
              <div className="alert-row" key={title}>
                <span className={`alert-icon ${severity.toLowerCase()}`}><Icon size={15} /></span>
                <div>
                  <strong>{title}</strong>
                  <p>{hospital}</p>
                </div>
                <time>{time}</time>
              </div>
            ))}
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
