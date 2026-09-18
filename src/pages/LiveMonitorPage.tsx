import { useEffect, useState } from 'react'
import { Activity, AlertTriangle, Building2, CheckCircle2, Clock3, RefreshCw, Stethoscope, Users } from 'lucide-react'
import { getLiveMonitor } from '../services/api'
import './LiveMonitorPage.css'
import '../components/PortalPrimitives'

type QueueEntry = { service?: string; position?: number; status?: string }
type LiveQueue = { id: string; queueStatus?: string; department?: string; doctor?: string; waitingPatients: number; currentActiveQueueEntry?: QueueEntry | null }
type LiveHospital = { id: string; name: string; queues: LiveQueue[] }
type LiveData = { date?: string; lastUpdated?: string; activeQueueCount: number; waitingPatientCount: number; hospitals: LiveHospital[] }

function arrayValue(value: any): any[] {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.items)) return value.items
  if (Array.isArray(value?.results)) return value.results
  return []
}

function normalizeLiveData(value: any): LiveData {
  const hospitals = arrayValue(value?.hospitals ?? value?.hospitalStatuses ?? value?.hospitalLiveStatus).map((hospital: any) => ({
    id: String(hospital.id ?? hospital.hospitalId ?? hospital.name),
    name: hospital.hospitalName ?? hospital.name ?? 'Hospital',
    queues: arrayValue(hospital.queues ?? hospital.activeQueues).map((queue: any) => ({
      id: String(queue.id ?? queue.queueId ?? `${hospital.id}-${queue.department ?? 'queue'}`),
      queueStatus: queue.queueStatus ?? queue.status,
      department: queue.department ?? queue.departmentName,
      doctor: queue.doctor ?? queue.doctorName,
      waitingPatients: queue.waitingPatients ?? 0,
      currentActiveQueueEntry: queue.currentActiveQueueEntry ?? queue.activeQueueEntry ?? null,
    })),
  }))
  return { date: value?.date, lastUpdated: value?.lastUpdated, activeQueueCount: value?.activeQueueCount ?? 0, waitingPatientCount: value?.waitingPatientCount ?? 0, hospitals }
}

export function LiveMonitorPage() {
  const [data, setData] = useState<LiveData>({ activeQueueCount: 0, waitingPatientCount: 0, hospitals: [] })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    try { setError(''); setData(normalizeLiveData(await getLiveMonitor())) } catch (err: any) { setError(err.message || 'Unable to load live monitor') } finally { setLoading(false); setRefreshing(false) }
  }
  useEffect(() => { load() }, [])
  async function refresh() { setRefreshing(true); await load() }
  const queueCount = data.activeQueueCount
  const waitingCount = data.waitingPatientCount
  const lastUpdated = data.lastUpdated ?? data.date ?? 'Not available'

  return <section className="live-monitor-page">{loading && <p className="form-error">Loading live monitor...</p>}{error && <p className="form-error">{error}</p>}<div className="live-heading"><div><div className="live-title"><span className="live-pulse" /><p className="eyebrow">Network operations</p></div><h2>Live Monitor</h2><p>Monitor real-time operational activity across connected hospitals.</p></div><div className="live-actions"><span className="updated-time"><Clock3 size={14} /> Last updated {lastUpdated}</span><button className="outline-button refresh-button" type="button" onClick={refresh} disabled={refreshing}><RefreshCw className={refreshing ? 'spin' : ''} size={15} /> Refresh</button></div></div><div className="monitor-stats"><article><span><Building2 size={15} /> Hospitals online</span><strong>{data.hospitals.length}</strong><em className="healthy-text">Live monitor</em></article><article><span><Activity size={15} /> Active queues</span><strong>{queueCount}</strong><em>Current live count</em></article><article><span><Users size={15} /> Patients waiting</span><strong>{waitingCount}</strong><em className="warning-text">Current live count</em></article><article><span><Stethoscope size={15} /> Doctors</span><strong>{data.hospitals.reduce((total, hospital) => total + hospital.queues.filter((queue) => queue.doctor).length, 0)}</strong><em className="healthy-text">From active queues</em></article><article><span><Clock3 size={15} /> Date</span><strong>{data.date ?? 'Not available'}</strong><em>Backend live data</em></article><article><span><AlertTriangle size={15} /> Active queues</span><strong>{queueCount}</strong><em className="warning-text">Current live count</em></article></div><div className="monitor-section-heading"><div><h3>Hospital live status</h3><p>Operational activity across connected hospitals</p></div><span className="live-legend"><i className="operational-dot" />Live monitoring</span></div>{!loading && !data.hospitals.length ? <div className="empty-state"><strong>No active queues</strong><p>No live monitor records are available.</p></div> : <div className="live-hospital-grid">{data.hospitals.map((hospital) => <article className="live-hospital-card" key={hospital.id}><div className="live-hospital-header"><div><h3>{hospital.name}</h3><span className="monitor-status"><i />Live</span></div><span className="hospital-alert-count"><Activity size={13} /> {hospital.queues.length} queues</span></div><div className="hospital-metrics"><div><span>Waiting patients</span><strong>{hospital.queues.reduce((total, queue) => total + queue.waitingPatients, 0)}</strong></div><div><span>Active queues</span><strong>{hospital.queues.length}</strong></div><div><span>Queue status</span><strong>{hospital.queues[0]?.queueStatus ?? 'Not available'}</strong></div><div><span>Doctors</span><strong>{hospital.queues.filter((queue) => queue.doctor).length}</strong></div><div><span>Last updated</span><strong>{lastUpdated}</strong></div></div><div className="queue-preview"><div className="queue-preview-heading"><strong>Department queues</strong><span>Live data</span></div>{hospital.queues.map((queue) => <div className="monitor-queue" key={queue.id}><span>{queue.department ?? 'Not available'}</span><strong>{queue.waitingPatients}</strong><span>{queue.doctor ?? 'Not available'}</span><em>{queue.queueStatus ?? 'Not available'}</em>{queue.currentActiveQueueEntry && <small>{queue.currentActiveQueueEntry.service ?? 'Not available'} · position {queue.currentActiveQueueEntry.position ?? 'Not available'} · {queue.currentActiveQueueEntry.status ?? 'Not available'}</small>}</div>)}</div></article>)}</div>}<div className="monitor-section-heading alerts-heading"><div><h3>Queue activity</h3><p>Current active queue entries</p></div><span className="alert-summary"><CheckCircle2 size={14} /> {queueCount} active queues</span></div></section>
}
