import { useState, type ReactNode } from 'react'
import { authContext } from './authState'
import { loginAdmin } from '../services/api'

function hasSession() {
  return Boolean(localStorage.getItem('accessToken'))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasSession)

  async function signIn(email: string, password: string) {
    const data = await loginAdmin(email, password)

    if (data.user?.role !== 'PLATFORM_ADMIN') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      throw new Error('Only Platform Administrators can access this portal')
    }

    setIsAuthenticated(true)
  }

  function signOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    sessionStorage.removeItem('smart-hospital-admin-prototype-session')
    setIsAuthenticated(false)
  }

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  )
}