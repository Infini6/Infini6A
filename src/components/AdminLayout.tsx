import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Settings,
  Stethoscope,
  UserCog,
  Users,
  X,
} from 'lucide-react'
import { ProfileMenu } from './ProfileMenu'

const navigation = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Hospitals', path: '/hospitals', icon: Building2 },
  { label: 'Hospital Admins', path: '/hospital-admins', icon: UserCog },
  { label: 'Doctors', path: '/doctors', icon: Stethoscope },
  { label: 'Patients', path: '/patients', icon: Users },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Live Monitor', path: '/live-monitor', icon: Activity },
  { label: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { label: 'Audit Logs', path: '/audit-logs', icon: ClipboardList },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const currentPage = navigation.find((item) => item.path === location.pathname)

  return (
    <div className="admin-app">
      <div
        className={`sidebar-backdrop ${isMobileOpen ? 'is-visible' : ''}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isCollapsed ? 'is-collapsed' : ''} ${isMobileOpen ? 'is-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Activity size={20} /></div>
          <span className="brand-name">Smart <span>Hospital</span></span>
          <button className="icon-button close-mobile" type="button" onClick={() => setIsMobileOpen(false)} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>
        <div className="workspace-label">PLATFORM ADMIN</div>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map(({ label, path, icon: Icon }, index) => (
            <div key={path} className="nav-group">
              {(index === 5 || index === 9) && <div className="nav-section-label">{index === 5 ? 'OPERATIONS' : 'CONFIGURATION'}</div>}
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? label : undefined}
              >
                <Icon size={18} strokeWidth={1.9} />
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="collapse-button" type="button" onClick={() => setIsCollapsed((collapsed) => !collapsed)}>
            {isCollapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
            <span>{isCollapsed ? 'Expand menu' : 'Collapse menu'}</span>
          </button>
          <ProfileMenu compact />
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-title">
            <button className="icon-button mobile-menu" type="button" onClick={() => setIsMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
            <div className="topbar-heading"><p className="eyebrow">Operations center</p><h1>{currentPage?.label ?? 'Platform Admin'}</h1></div>
          </div>
          <div className="topbar-actions">
            <span className="topbar-scope">Network overview</span>
            <span className="system-status"><span className="status-dot" />All systems operational</span>
            <ProfileMenu />
          </div>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  )
}
