import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  changePassword as apiChangePassword,
  getCurrentUser,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  updateProfile as apiUpdateProfile,
} from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = getCurrentUser()
    return session ? session.user : null
  })

  const login = useCallback(async (email, password) => {
    const session = await apiLogin(email, password)
    setUser(session.user)
    return session
  }, [])

  const register = useCallback(async (name, email, password) => {
    const session = await apiRegister(name, email, password)
    setUser(session.user)
    return session
  }, [])

  const logout = useCallback(() => {
    apiLogout()
    setUser(null)
  }, [])

  const updateProfile = useCallback(async ({ name, email }) => {
    const session = await apiUpdateProfile({ name, email })
    setUser(session.user)
    return session
  }, [])

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    await apiChangePassword(currentPassword, newPassword)
  }, [])

  const value = useMemo(
    () => ({ user, login, register, logout, updateProfile, changePassword }),
    [user, login, register, logout, updateProfile, changePassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}