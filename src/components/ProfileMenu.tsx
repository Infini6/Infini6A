import { useEffect, useRef, useState } from 'react'
import { LogOut, Settings, UserRound, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import './ProfileMenu.css'

export function ProfileMenu({ compact = false }: { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  function openLogout() { setIsOpen(false); setShowLogoutConfirm(true) }
  function confirmLogout() { signOut(); setShowLogoutConfirm(false); navigate('/login', { replace: true }) }
  return <div className={`profile-menu-anchor ${compact ? 'compact' : ''}`} ref={menuRef}><button className={compact ? 'profile-card' : 'avatar profile-trigger'} type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-haspopup="menu">{compact ? <><div className="avatar avatar-small">PA</div><div className="profile-copy"><strong>Platform Admin</strong><span>Platform operations</span></div><UserRound size={16} /></> : 'PA'}</button>{isOpen && <div className="profile-dropdown" role="menu"><div className="profile-dropdown-heading"><div className="avatar avatar-small">PA</div><div><strong>Platform Admin</strong><span>Platform Administrator</span></div></div><button type="button" role="menuitem" onClick={() => { setShowProfile(true); setIsOpen(false) }}><UserRound size={15} /> My Profile</button><button type="button" role="menuitem" onClick={() => { navigate('/settings'); setIsOpen(false) }}><Settings size={15} /> Settings</button><button className="logout-menu-item" type="button" role="menuitem" onClick={openLogout}><LogOut size={15} /> Logout</button></div>}{showProfile && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowProfile(false)}><section className="hospital-modal profile-view-modal" role="dialog" aria-modal="true" aria-labelledby="profile-view-title"><div className="modal-header"><div><p className="eyebrow">Account profile</p><h2 id="profile-view-title">My Profile</h2></div><button className="icon-button" type="button" onClick={() => setShowProfile(false)} aria-label="Close profile"><X size={17} /></button></div><div className="profile-view-header"><div className="profile-avatar">PA</div><div><strong>Platform Admin</strong><span>Platform Administrator</span></div><span className="account-status"><i /> Active</span></div><dl className="profile-view-list"><div><dt>Email</dt><dd>admin@smarthospital.health</dd></div><div><dt>Phone</dt><dd>+1 (555) 010-2000</dd></div><div><dt>Account status</dt><dd className="healthy-value"><span />Active</dd></div></dl><div className="modal-actions"><button className="outline-button" type="button" onClick={() => setShowProfile(false)}>Close</button></div></section></div>}{showLogoutConfirm && <div className="modal-backdrop" role="presentation"><section className="hospital-modal logout-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title"><div className="modal-header"><div><p className="eyebrow">Session action</p><h2 id="logout-title">Are you sure you want to logout?</h2></div><button className="icon-button" type="button" onClick={() => setShowLogoutConfirm(false)} aria-label="Close logout confirmation"><X size={17} /></button></div><p className="logout-confirm-copy">You will return to the Smart Hospital login page.</p><div className="modal-actions"><button className="outline-button" type="button" onClick={() => setShowLogoutConfirm(false)}>Cancel</button><button className="primary-button" type="button" onClick={confirmLogout}><LogOut size={15} /> Logout</button></div></section></div>}</div>
}
