import type { LucideIcon } from 'lucide-react'
import { Construction } from 'lucide-react'

type PlaceholderPageProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <section className="placeholder-page">
      <div className="page-heading"><div><p className="eyebrow">Platform workspace</p><h2>{title}</h2><p>{description}</p></div></div>
      <div className="placeholder-card">
        <div className="placeholder-icon"><Icon size={25} /></div>
        <h3>{title} workspace</h3>
        <p>This area is ready for the next stage of the platform build.</p>
        <span className="coming-soon"><Construction size={14} /> Coming next</span>
      </div>
    </section>
  )
}
