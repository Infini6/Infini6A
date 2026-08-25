import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  ClipboardList,
  Settings,
  Stethoscope,
  UserCog,
  Users,
} from 'lucide-react'
import { AdminLayout } from './components/AdminLayout'
import { LoginPage } from './pages/LoginPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import './App.css'

const pageData = [
  ['hospitals', 'Hospitals', 'Manage the connected hospital network.', Building2],
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
      <div className="welcome-row"><div><p className="eyebrow">Tuesday, August 25, 2026</p><h2>Good morning, Sam</h2><p className="section-lead">Here is what is happening across your care network today.</p></div><button className="primary-button" type="button">View live monitor <Activity size={16} /></button></div>
      <div className="stat-grid"><article className="stat-card"><span className="stat-label">Connected hospitals</span><strong>24</strong><span className="stat-trend positive">+2 this month</span></article><article className="stat-card"><span className="stat-label">Active journeys</span><strong>1,284</strong><span className="stat-trend positive">+8.4% from yesterday</span></article><article className="stat-card"><span className="stat-label">Avg. wait time</span><strong>18<span className="stat-unit">min</span></strong><span className="stat-trend positive">-3 min from yesterday</span></article><article className="stat-card"><span className="stat-label">Open alerts</span><strong>07</strong><span className="stat-trend warning">2 need attention</span></article></div>
      <div className="dashboard-grid"><article className="dashboard-card flow-card"><div className="card-heading"><div><h3>Network flow</h3><p>Patient journeys currently in progress</p></div><button className="text-button" type="button">View details <span>→</span></button></div><div className="flow-chart"><div className="chart-axis"><span>500</span><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div><div className="chart-area"><div className="grid-lines" /><div className="bar-group"><i style={{ height: '53%' }} /><i style={{ height: '71%' }} /><i style={{ height: '62%' }} /><i style={{ height: '84%' }} /><i style={{ height: '76%' }} /><i style={{ height: '91%' }} /><i style={{ height: '68%' }} /></div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div></article><article className="dashboard-card alert-card"><div className="card-heading"><div><h3>Attention needed</h3><p>Recent network alerts</p></div><span className="alert-count">07</span></div><div className="alert-list"><div className="alert-row"><span className="alert-icon critical"><AlertTriangle size={15} /></span><div><strong>Queue capacity reached</strong><p>St. Mary's Medical Center</p></div><time>8 min</time></div><div className="alert-row"><span className="alert-icon warning-icon"><Activity size={15} /></span><div><strong>Journey stalled</strong><p>Northside General Hospital</p></div><time>24 min</time></div><div className="alert-row"><span className="alert-icon neutral-icon"><Users size={15} /></span><div><strong>Admin invitation pending</strong><p>Riverside Health Network</p></div><time>1 hr</time></div></div><button className="outline-button" type="button">Open alert center</button></article></div>
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
          {pageData.map(([path, title, description, icon]) => <Route key={path} path={path} element={<PlaceholderPage title={title} description={description} icon={icon} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
