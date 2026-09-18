import type { LucideIcon } from 'lucide-react'

export function InitialsAvatar({ name, tone = 'blue' }: { name: string; tone?: 'blue' | 'teal' | 'slate' }) {
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  return <span className={`portal-avatar ${tone}`} aria-hidden="true">{initials}</span>
}

export function MetricCard({ label, value, detail, icon: Icon, tone = 'blue' }: { label: string; value: string | number; detail: string; icon: LucideIcon; tone?: 'blue' | 'teal' | 'amber' | 'red' }) {
  return <article className={`portal-metric-card ${tone}`}><span className="portal-metric-icon"><Icon size={18} /></span><div><span className="portal-metric-label">{label}</span><strong>{value}</strong><small>{detail}</small></div></article>
}

export function StatusPill({ label, tone }: { label: string; tone: string }) {
  return <span className={`portal-status-pill ${tone}`}><i />{label}</span>
}
