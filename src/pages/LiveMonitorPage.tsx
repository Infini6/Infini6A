import { useMemo, useState } from 'react'
import { Activity, AlertTriangle, Building2, CheckCircle2, Clock3, RefreshCw, Stethoscope, Users } from 'lucide-react'
import { mockLiveAlerts, mockLiveHospitals, type LiveAlert, type MonitorHospitalStatus } from '../data/liveMonitorData'
import './LiveMonitorPage.css'

function statusClass(status: MonitorHospitalStatus) { return status.toLowerCase().replace(' ', '-') }
function alertClass(severity: LiveAlert['severity']) { return severity.toLowerCase() }

export function LiveMonitorPage() {
  const [hospitals, setHospitals] = useState(mockLiveHospitals)
  const [alerts, setAlerts] = useState(mockLiveAlerts)
  const [lastUpdated, setLastUpdated] = useState('Just now')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const summary = useMemo(() => ({
    online: hospitals.length,
    queues: hospitals.reduce((total, hospital) => total + hospital.activeQueues, 0),
    waiting: hospitals.reduce((total, hospital) => total + hospital.patientsWaiting, 0),
    doctors: hospitals.reduce((total, hospital) => total + hospital.availableDoctors, 0),
    averageWait: Math.round(hospitals.reduce((total, hospital) => total + hospital.averageWait, 0) / hospitals.length),
    alerts: hospitals.reduce((total, hospital) => total + hospital.activeAlerts, 0),
  }), [hospitals])

  function refresh() { setIsRefreshing(true); setLastUpdated('Just now'); window.setTimeout(() => setIsRefreshing(false), 500) }
  function simulateUpdate() {
    setHospitals((current) => current.map((hospital, index) => {
      const delta = index % 2 === 0 ? 3 : -2
      const nextWaiting = Math.max(0, hospital.patientsWaiting + delta)
      const nextAverage = Math.max(5, hospital.averageWait + (index === 1 ? 2 : -1))
      return { ...hospital, patientsWaiting: nextWaiting, averageWait: nextAverage, queues: hospital.queues.map((queue, queueIndex) => ({ ...queue, waiting: Math.max(0, queue.waiting + (queueIndex % 2 === 0 ? 2 : -1)), estimatedWait: Math.max(4, queue.estimatedWait + (queueIndex === 1 ? 3 : -1)) })) }
    }))
    setAlerts((current) => [{ id: `alert-${Date.now()}`, severity: 'Medium' as const, hospital: 'Northside General Hospital', message: 'Live update: queue activity has changed', time: 'Just now' }, ...current].slice(0, 4))
    setLastUpdated('Just now')
  }

  return <section className="live-monitor-page"><div className="live-heading"><div><div className="live-title"><span className="live-pulse" /> <p className="eyebrow">Network operations</p></div><h2>Live Monitor</h2><p>Monitor real-time operational activity across connected hospitals.</p></div><div className="live-actions"><span className="updated-time"><Clock3 size={14} /> Last updated {lastUpdated}</span><button className="outline-button refresh-button" type="button" onClick={refresh}><RefreshCw className={isRefreshing ? 'spin' : ''} size={15} /> Refresh</button><button className="primary-button" type="button" onClick={simulateUpdate}><Activity size={15} /> Simulate live update</button></div></div><div className="monitor-stats"><article><span><Building2 size={15} /> Hospitals online</span><strong>{summary.online}<small> / {summary.online + 1}</small></strong><em className="healthy-text">All connected</em></article><article><span><Activity size={15} /> Active queues</span><strong>{summary.queues}</strong><em>Across network</em></article><article><span><Users size={15} /> Patients waiting</span><strong>{summary.waiting}</strong><em className="warning-text">Monitor queue flow</em></article><article><span><Stethoscope size={15} /> Available doctors</span><strong>{summary.doctors}</strong><em className="healthy-text">Currently available</em></article><article><span><Clock3 size={15} /> Average wait time</span><strong>{summary.averageWait}<small> min</small></strong><em className="healthy-text">Network average</em></article><article><span><AlertTriangle size={15} /> Active alerts</span><strong>{summary.alerts}</strong><em className="warning-text">Needs review</em></article></div><div className="monitor-section-heading"><div><h3>Hospital live status</h3><p>Operational activity across connected hospitals</p></div><span className="live-legend"><i className="operational-dot" />Live monitoring</span></div><div className="live-hospital-grid">{hospitals.map((hospital) => <article className="live-hospital-card" key={hospital.id}><div className="live-hospital-header"><div><h3>{hospital.name}</h3><span className={`monitor-status ${statusClass(hospital.status)}`}><i />{hospital.status}</span></div><span className="hospital-alert-count"><AlertTriangle size={13} /> {hospital.activeAlerts}</span></div><div className="hospital-metrics"><div><span>Patients waiting</span><strong>{hospital.patientsWaiting}</strong></div><div><span>Active queues</span><strong>{hospital.activeQueues}</strong></div><div><span>Avg. waiting time</span><strong>{hospital.averageWait} min</strong></div><div><span>Available doctors</span><strong>{hospital.availableDoctors}</strong></div><div><span>Appointments today</span><strong>{hospital.appointmentsToday}</strong></div></div><div className="queue-preview"><div className="queue-preview-heading"><strong>Department queues</strong><span>Monitoring only</span></div>{hospital.queues.map((queue) => <div className="monitor-queue" key={queue.id}><span>{queue.department}</span><strong>{queue.waiting}</strong><span>{queue.estimatedWait} min</span><em className={`load-${queue.load.toLowerCase()}`}>{queue.load}</em></div>)}</div></article>)}</div><div className="monitor-section-heading alerts-heading"><div><h3>Recent operational alerts</h3><p>Events requiring platform awareness</p></div><span className="alert-summary"><CheckCircle2 size={14} /> {summary.alerts} active alerts</span></div><section className="dashboard-card monitor-alert-card"><div className="monitor-alert-list">{alerts.map((alert) => <div className="monitor-alert" key={alert.id}><span className={`monitor-alert-icon ${alertClass(alert.severity)}`}><AlertTriangle size={16} /></span><div><div className="alert-message-heading"><strong>{alert.message}</strong><span className={`severity-badge ${alertClass(alert.severity)}`}>{alert.severity}</span></div><p>{alert.hospital}</p></div><time>{alert.time}</time></div>)}</div></section></section>
}
