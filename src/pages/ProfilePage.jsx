import { useState } from 'react'
import Message from '../components/common/Message.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { useTrips } from '../hooks/useTrips.js'
import './profile.css'

function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth()
  const { favorites } = useFavorites()
  const { trips } = useTrips()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [profileError, setProfileError] = useState('')
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const initials = (user?.name || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    setProfileError('')
    setProfileSuccess(false)

    if (!name.trim() || !email.trim()) {
      setProfileError('Please fill in your name and email.')
      return
    }

    setSavingProfile(true)
    try {
      await updateProfile({ name, email })
      setProfileSuccess(true)
    } catch (err) {
      setProfileError(err.message || 'Unable to update your profile.')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('Your new password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Your new passwords do not match.')
      return
    }

    setSavingPassword(true)
    try {
      await changePassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordSuccess(true)
    } catch (err) {
      setPasswordError(err.message || 'Unable to change your password.')
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <section className="page">
      <div className="container">
        <div className="profile__header">
          <div className="profile__avatar" aria-hidden="true">
            {initials}
          </div>
          <div>
            <h1 className="page__title">My Profile</h1>
            <p className="page__text">
              Manage your account details and password.
            </p>
          </div>
        </div>

        <div className="profile__summary">
          <p className="profile__summary-item">
            <strong>{favorites.length}</strong> favorites saved
          </p>
          <p className="profile__summary-item">
            <strong>{trips.length}</strong> trips planned
          </p>
        </div>

        <div className="profile__grid">
          <div className="profile-card">
            <h2 className="profile-card__title">Account Details</h2>

            {profileSuccess && (
              <Message variant="success" title="Profile updated.">
                Your account details have been saved.
              </Message>
            )}

            {profileError && (
              <Message variant="error" title="Unable to save changes">
                {profileError}
              </Message>
            )}

            <form
              className="profile-form"
              onSubmit={handleProfileSubmit}
              noValidate
            >
              <div className="profile-form__group">
                <label className="profile-form__label" htmlFor="profile-name">
                  Full name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  className="profile-form__input"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="profile-form__group">
                <label className="profile-form__label" htmlFor="profile-email">
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  className="profile-form__input"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="profile-form__actions">
                <button
                  type="submit"
                  className="button"
                  disabled={savingProfile}
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          <div className="profile-card">
            <h2 className="profile-card__title">Change Password</h2>

            {passwordSuccess && (
              <Message variant="success" title="Password changed.">
                Your password has been updated.
              </Message>
            )}

            {passwordError && (
              <Message variant="error" title="Unable to change password">
                {passwordError}
              </Message>
            )}

            <form
              className="profile-form"
              onSubmit={handlePasswordSubmit}
              noValidate
            >
              <div className="profile-form__group">
                <label
                  className="profile-form__label"
                  htmlFor="profile-current-password"
                >
                  Current password
                </label>
                <input
                  id="profile-current-password"
                  type="password"
                  className="profile-form__input"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                />
              </div>

              <div className="profile-form__group">
                <label
                  className="profile-form__label"
                  htmlFor="profile-new-password"
                >
                  New password
                </label>
                <input
                  id="profile-new-password"
                  type="password"
                  className="profile-form__input"
                  autoComplete="new-password"
                  minLength={6}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </div>

              <div className="profile-form__group">
                <label
                  className="profile-form__label"
                  htmlFor="profile-confirm-password"
                >
                  Confirm new password
                </label>
                <input
                  id="profile-confirm-password"
                  type="password"
                  className="profile-form__input"
                  autoComplete="new-password"
                  minLength={6}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>

              <div className="profile-form__actions">
                <button
                  type="submit"
                  className="button"
                  disabled={savingPassword}
                >
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage