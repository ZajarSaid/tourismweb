import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/common/Message.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { REGIONS, TOURISM_TYPES, destinations } from '../data/destinations.js'
import './auth.css'

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/" replace />
  }

  const from = location.state?.from || '/'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page auth-page">
      <div className="container">
        <div className="auth">
          <aside className="auth__brand">
            <div>
              <p className="auth__brand-kicker">Safari Explorer</p>
              <h2 className="auth__brand-title">
                Your Tanzania adventure starts here.
              </h2>
              <p className="auth__brand-text">
                Save favorite destinations and plan simple trips — right from
                your browser.
              </p>
            </div>
            <div className="auth__brand-stats">
              <div className="auth__brand-stat">
                <span>{destinations.length}</span>
                <p>Destinations</p>
              </div>
              <div className="auth__brand-stat">
                <span>{REGIONS.length}</span>
                <p>Regions of Tanzania</p>
              </div>
              <div className="auth__brand-stat">
                <span>{TOURISM_TYPES.length}</span>
                <p>Tourism Types</p>
              </div>
            </div>
          </aside>

          <div className="auth__panel">
            <div>
              <h1 className="page__title">Welcome back</h1>
              <p className="page__text">
                Sign in to save favorites and plan your Tanzania adventure.
              </p>
            </div>

            {error && (
              <Message variant="error" title="Unable to sign in">
                {error}
              </Message>
            )}

            <form className="auth__card" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-group__label" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  className="form-group__input"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group password-group">
                <label className="form-group__label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-group__input"
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <button
                type="submit"
                className="button auth__submit"
                disabled={submitting}
              >
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="auth__demo">
              Demo: no real account needed — data is stored locally in your
              browser.
            </p>

            <p className="auth__switch">
              Don&apos;t have an account?{' '}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage