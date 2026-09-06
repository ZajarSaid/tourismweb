import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Message from '../components/common/Message.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { REGIONS, TOURISM_TYPES, destinations } from '../data/destinations.js'
import './auth.css'

function RegisterPage() {
  const { user, register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      await register(form.name, form.email, form.password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
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
                Create an account to save favorite destinations and plan simple
                trips — right from your browser.
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
              <h1 className="page__title">Create an account</h1>
              <p className="page__text">
                Join Safari Explorer to save favorites and plan your trips.
              </p>
            </div>

            {error && (
              <Message variant="error" title="Unable to register">
                {error}
              </Message>
            )}

            <form className="auth__card" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-group__label" htmlFor="register-name">
                  Name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  className="form-group__input"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="register-email">
                  Email
                </label>
                <input
                  id="register-email"
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
                <label
                  className="form-group__label"
                  htmlFor="register-password"
                >
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-group__input"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
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

              <div className="form-group password-group">
                <label
                  className="form-group__label"
                  htmlFor="register-confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-group__input"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  }
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <button
                type="submit"
                className="button auth__submit"
                disabled={submitting}
              >
                {submitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth__demo">
              Demo: no real account needed — data is stored locally in your
              browser.
            </p>

            <p className="auth__switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage