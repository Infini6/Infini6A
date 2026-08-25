import { useState, type ReactNode } from 'react'
import { authContext } from './authState'

const sessionKey = 'smart-hospital-admin-prototype-session'

function hasSession() { return sessionStorage.getItem(sessionKey) === 'active' }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasSession)
  function signIn() { sessionStorage.setItem(sessionKey, 'active'); setIsAuthenticated(true) }
  function signOut() { sessionStorage.removeItem(sessionKey); setIsAuthenticated(false) }
  return <authContext.Provider value={{ isAuthenticated, signIn, signOut }}>{children}</authContext.Provider>
}

