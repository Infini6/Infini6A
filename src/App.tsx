import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
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
import { dashboardMetrics, hospitalPerformance, operationalAlerts, queueOverview } from './data/dashboardData'
import { LoginPage } from './pages/LoginPage'
import { HospitalsPage } from './pages/HospitalsPage'
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

function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="welcome-row"><div><p className="eyebrow">Tuesday, August 25, 2026</p><h2>Platform overview</h2><p className="section-lead">Monitor hospital operations, patient flow, and queue activity across the network.</p></div><Link className="primary-button" to="/live-monitor">Open live monitor <Activity size={16} /></Link></div>
      <div className="stat-grid dashboard-stat-grid">{dashboardMetrics.map((metric) => <article className="stat-card" key={metric.label}><span className="stat-label">{metric.label}</span><strong>{metric.value}</strong><span className={`stat-trend ${metric.tone}`}>{metric.detail}</span></article>)}</div>
      <div className="section-title"><div><h3>Hospital performance</h3><p>Current operational indicators by hospital</p></div><Link className="text-button" to="/hospitals">View all hospitals <span>→</span></Link></div>
      <section className="dashboard-card performance-card"><div className="table-scroll"><table><thead><tr><th>Hospital</th><th>Active patients</th><th>Active doctors</th><th>Appointments today</th><th>Waiting patients</th><th>Avg. waiting time</th><th>Status</th></tr></thead><tbody>{hospitalPerformance.map((hospital) => <tr key={hospital.name}><td><strong>{hospital.name}</strong></td><td>{hospital.activePatients}</td><td>{hospital.activeDoctors}</td><td>{hospital.appointmentsToday}</td><td>{hospital.waitingPatients}</td><td>{hospital.averageWait}</td><td><span className={`operation-status ${hospital.status === 'Operational' ? 'operational' : 'monitoring'}`}><span />{hospital.status}</span></td></tr>)}</tbody></table></div></section>
      <div className="dashboard-grid lower-dashboard-grid"><article className="dashboard-card queue-card"><div className="card-heading"><div><h3>Queue overview</h3><p>Patients currently waiting by service</p></div><Activity size={18} className="card-icon" /></div><div className="queue-bars">{queueOverview.map((queue) => <div className="queue-row" key={queue.label}><div className="queue-label"><span>{queue.label}</span><strong>{queue.value}</strong></div><div className="queue-track"><i style={{ width: `${(queue.value / 82) * 100}%`, background: queue.color }} /></div></div>)}</div><p className="queue-total"><strong>222</strong> patients waiting across active queues</p></article><article className="dashboard-card alert-card"><div className="card-heading"><div><h3>Alert preview</h3><p>Recent operational alerts</p></div><Link className="text-button" to="/alerts">View all <span>→</span></Link></div><div className="alert-list">{operationalAlerts.map(({ title, hospital, time, severity, icon: Icon }) => <div className="alert-row" key={title}><span className={`alert-icon ${severity.toLowerCase()}`}><Icon size={15} /></span><div><strong>{title}</strong><p>{hospital}</p></div><time>{time}</time></div>)}</div></article></div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          {pageData.map(([path, title, description, icon]) => <Route key={path} path={path} element={<PlaceholderPage title={title} description={description} icon={icon} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
