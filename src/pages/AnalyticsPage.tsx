import { useEffect, useState } from 'react'
import { Activity, BarChart3, Building2, CheckCircle2, Clock3, TrendingDown, TrendingUp, Users } from 'lucide-react'
import { getHospitalAnalytics, getHospitals, getPlatformDashboard } from '../services/api'
import './AnalyticsPage.css'
import '../components/PortalPrimitives'

type AnalyticsPeriod = 'Today' | 'Last 7 Days' | 'Last 30 Days'
type Metric = { label: string; value: string; trend: string; tone: 'positive' | 'negative' | 'neutral' }
type HospitalRow = { name: string; appointments: number; patientsServed: number; averageWait: string; activeQueues: number; utilization: string; status: string }

const periods: AnalyticsPeriod[] = ['Today', 'Last 7 Days', 'Last 30 Days']
const records = (value: any): any[] => {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.items)) return value.items
  if (Array.isArray(value?.results)) return value.results
  return []
}
const numberValue = (value: any): number | null => typeof value === 'number' ? value : typeof value === 'string' && value.trim() && Number.isFinite(Number(value)) ? Number(value) : null

function WaitingChart({ points }: { points: { label: string; value: number }[] }) {
  if (!points.length) return <div className="empty-state"><strong>No data available</strong></div>
  const max = Math.max(1, ...points.map((point) => point.value))
  return <div className="waiting-chart"><div className="chart-y-axis"><span>{max}</span><span>{Math.round(max * .67)}</span><span>{Math.round(max * .34)}</span><span>0</span></div><div className="waiting-plot"><div className="chart-grid-lines" /><div className="waiting-bars">{points.map((point) => <div className="waiting-bar" key={point.label}><i style={{ height: `${(point.value / max) * 100}%` }} /><span>{point.value} min</span><em>{point.label}</em></div>)}</div></div></div>
}

function FlowChart({ points }: { points: { label: string; appointments: number; completed: number; active: number }[] }) {
  if (!points.length) return <div className="empty-state"><strong>No data available</strong></div>
  const max = Math.max(1, ...points.map((point) => point.appointments))
  return <div className="flow-analytics-chart"><div className="flow-legend"><span><i className="legend-appointments" />Appointments</span><span><i className="legend-completed" />Completed journeys</span><span><i className="legend-active" />Active journeys</span></div><div className="flow-columns">{points.map((point) => <div className="flow-column" key={point.label}><div className="flow-stack" title={`${point.appointments} appointments`}><i style={{ height: `${(point.completed / max) * 100}%` }} /><b style={{ height: `${(point.active / max) * 100}%` }} /></div><em>{point.label}</em></div>)}</div></div>
}

export function AnalyticsPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('Last 7 Days')
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [hospitals, setHospitals] = useState<HospitalRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true); setError('')
        const [dashboard, hospitalResponse] = await Promise.all([getPlatformDashboard(), getHospitals()])
        const hospitalRecords = records(hospitalResponse)
        const analyticsResponses = await Promise.all(hospitalRecords.map(async (hospital) => ({ hospital, data: await getHospitalAnalytics(String(hospital.id)) })))
        setMetrics([
          { label: 'Total appointments', value: String(dashboard.appointmentsToday ?? 0), trend: 'Today', tone: 'neutral' },
          { label: 'Patients', value: String(dashboard.patients ?? 0), trend: 'Platform total', tone: 'positive' },
          { label: 'Average waiting time', value: 'No data available', trend: 'No backend metric', tone: 'neutral' },
          { label: 'Active queues', value: String(dashboard.activeQueues ?? 0), trend: 'Across network', tone: 'neutral' },
          { label: 'Hospitals', value: String(dashboard.hospitals ?? 0), trend: 'Connected facilities', tone: 'positive' },
          { label: 'Doctors', value: String(dashboard.doctors ?? 0), trend: 'Platform total', tone: 'neutral' },
        ])
        setHospitals(analyticsResponses.flatMap(({ hospital, data }) => {
          const source = data && typeof data === 'object' ? data : {}
          const appointmentCount = numberValue(source.appointments ?? source.totalAppointments)
          const patientCount = numberValue(source.patientsServed ?? source.patients ?? source.totalPatients)
          const queueCount = numberValue(source.activeQueues ?? source.queues)
          if (appointmentCount === null && patientCount === null && queueCount === null && source.averageWait === undefined && source.averageWaitingTime === undefined) return []
          return [{ name: hospital.name, appointments: appointmentCount ?? 0, patientsServed: patientCount ?? 0, averageWait: source.averageWait ?? source.averageWaitingTime ?? 'No data available', activeQueues: queueCount ?? 0, utilization: source.utilization ?? 'No data available', status: source.status ?? 'Not available' }]
        }))
      } catch (err: any) { setError(err.message || 'Unable to load analytics') } finally { setLoading(false) }
    }
    load()
  }, [period])

  const waitingTrend: { label: string; value: number }[] = []
  const patientFlow: { label: string; appointments: number; completed: number; active: number }[] = []
  return <section className="analytics-page">{loading && <p className="form-error">Loading analytics...</p>}{error && <p className="form-error">{error}</p>}<div className="analytics-heading"><div><p className="eyebrow">Network intelligence</p><h2>Analytics</h2><p>Analyze operational performance across connected hospitals.</p></div><div className="period-selector" aria-label="Select time period">{periods.map((item) => <button className={period === item ? 'selected' : ''} key={item} type="button" onClick={() => setPeriod(item)}>{item}</button>)}</div></div><div className="analytics-metrics">{metrics.map((metric, index) => <article key={metric.label}><span className="analytics-metric-label">{[Activity, Users, Clock3, BarChart3, Building2, CheckCircle2][index] && (() => { const Icon = [Activity, Users, Clock3, BarChart3, Building2, CheckCircle2][index]; return <Icon size={15} /> })()}{metric.label}</span><strong>{metric.value}</strong><em className={metric.tone}>{metric.tone === 'positive' ? <TrendingUp size={12} /> : metric.tone === 'negative' ? <TrendingDown size={12} /> : null}{metric.trend}</em></article>)}</div><div className="analytics-grid charts-grid"><article className="dashboard-card analytics-card waiting-card"><div className="analytics-card-heading"><div><h3>Waiting time trend</h3><p>Average waiting time across the network</p></div><span className="chart-unit">Minutes</span></div><WaitingChart points={waitingTrend} /></article><article className="dashboard-card analytics-card flow-analytics-card"><div className="analytics-card-heading"><div><h3>Patient flow</h3><p>Aggregate journey volume over time</p></div><span className="chart-unit">Patients</span></div><FlowChart points={patientFlow} /></article></div><div className="analytics-section-heading"><div><h3>Hospital performance</h3><p>Comparison of operational indicators by hospital</p></div></div><section className="dashboard-card analytics-table-card"><div className="table-scroll"><table><thead><tr><th>Hospital</th><th>Appointments</th><th>Patients served</th><th>Average wait</th><th>Active queues</th><th>Utilization</th><th>Operational status</th></tr></thead><tbody>{hospitals.map((hospital) => <tr key={hospital.name}><td><strong>{hospital.name}</strong></td><td>{hospital.appointments.toLocaleString()}</td><td>{hospital.patientsServed.toLocaleString()}</td><td>{hospital.averageWait}</td><td>{hospital.activeQueues}</td><td>{hospital.utilization}</td><td>{hospital.status}</td></tr>)}</tbody></table></div>{!loading && !hospitals.length && <div className="empty-state"><strong>No data available</strong></div>}</section><div className="analytics-grid lower-analytics-grid"><article className="dashboard-card analytics-card queue-analytics-card"><div className="analytics-card-heading"><div><h3>Queue load analytics</h3><p>Department-level network averages</p></div><Activity size={17} className="card-icon" /></div><div className="empty-state"><strong>No data available</strong></div></article><article className="dashboard-card analytics-card peak-card"><div className="analytics-card-heading"><div><h3>Peak hours</h3><p>Queue demand by time period</p></div><Clock3 size={17} className="card-icon" /></div><div className="empty-state"><strong>No data available</strong></div></article></div></section>
}
