import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'

const STORAGE_KEY = 'addis-eats-user'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  async function login(phone) {
    if (!/^09\d{8}$/.test(phone)) {
      throw new Error('Enter a phone number like 0911223344')
    }

    const nextUser = { phone }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthProvider
