import { createContext } from 'react'

export type AuthContextValue = { isAuthenticated: boolean; signIn: () => void; signOut: () => void }
export const authContext = createContext<AuthContextValue | null>(null)