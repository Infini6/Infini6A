import { useState } from 'react'
import { Activity, ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { signIn } = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      await signIn(email, password)

      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">

      <div className="login-aside">

        <div className="login-brand">
          <div className="brand-mark">
            <Activity size={20} />
          </div>

          <span>
            Smart <span>Hospital</span>
          </span>
        </div>

        <div className="login-message">
          <p className="eyebrow">
            Platform command center
          </p>

          <h1>
            Better flow.
            <br />
            <em>Better care.</em>
          </h1>

          <p>
            Coordinate every hospital journey from one clear operational view.
          </p>
        </div>

        <div className="login-aside-footer">
          <span className="status-dot" />
          Secure healthcare operations
        </div>

      </div>

      <section className="login-panel">

        <div className="login-form-wrap">

          <div className="mobile-login-brand">
            <div className="brand-mark">
              <Activity size={20} />
            </div>

            <span>
              Smart <span>Hospital</span>
            </span>
          </div>

          <p className="eyebrow">
            Welcome back
          </p>

          <h2>
            Sign in to your workspace
          </h2>

          <p className="login-subtitle">
            Access the Smart Hospital platform administration console.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="email">
              Work email
            </label>

            <div className="input-wrap">
              <Mail size={17} />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@smarthospital.com"
                required
              />
            </div>

            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrap">
              <LockKeyhole size={17} />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#support">
                Need help?
              </a>
            </div>

            <button
              className="primary-button login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="login-note">
            Authorized platform administrators only
          </p>

        </div>

      </section>

    </main>
  )
}