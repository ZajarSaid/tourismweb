const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const USERS_KEY = 'safari_explorer_users'
const SESSION_KEY = 'safari_explorer_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function saveSession(user, token) {
  const session = { user, token }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

export async function login(email, password) {
  await delay(400)
  const normalizedEmail = email.trim().toLowerCase()
  const users = readUsers()
  const user = users.find((item) => item.email === normalizedEmail)

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.')
  }

  return saveSession(
    { id: user.id, name: user.name, email: user.email },
    `mock-token-${user.id}-${Date.now()}`,
  )
}

export async function register(name, email, password) {
  await delay(400)
  const normalizedEmail = email.trim().toLowerCase()
  const users = readUsers()

  if (users.some((item) => item.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.')
  }

  const user = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  }

  writeUsers([...users, user])

  return saveSession(
    { id: user.id, name: user.name, email: user.email },
    `mock-token-${user.id}-${Date.now()}`,
  )
}

export async function refreshToken() {
  await delay(200)
  const session = getCurrentUser()
  return session ? saveSession(session.user, `mock-token-${session.user.id}-${Date.now()}`) : null
}

export async function updateProfile({ name, email }) {
  await delay(200)
  const session = getCurrentUser()
  if (!session) {
    throw new Error('You must be signed in to update your profile.')
  }

  const normalizedEmail = email.trim().toLowerCase()
  const users = readUsers()

  if (
    users.some(
      (item) => item.email === normalizedEmail && item.id !== session.user.id,
    )
  ) {
    throw new Error('An account with this email already exists.')
  }

  const updatedUser = {
    ...session.user,
    name: name.trim(),
    email: normalizedEmail,
  }
  const updatedSession = { user: updatedUser, token: session.token }

  writeUsers(
    users.map((item) =>
      item.id === session.user.id ? { ...item, ...updatedUser } : item,
    ),
  )
  localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession))
  return updatedSession
}

export async function changePassword(currentPassword, newPassword) {
  await delay(200)
  const session = getCurrentUser()
  if (!session) {
    throw new Error('You must be signed in to change your password.')
  }

  const user = readUsers().find((item) => item.id === session.user.id)
  if (!user || user.password !== currentPassword) {
    throw new Error('Your current password is incorrect.')
  }

  writeUsers(
    readUsers().map((item) =>
      item.id === user.id ? { ...item, password: newPassword } : item,
    ),
  )
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}