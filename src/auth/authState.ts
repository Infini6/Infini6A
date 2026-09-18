import { createContext } from 'react'

export type AuthContextValue = {
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

export const authContext = createContext<AuthContextValue | null>(null)