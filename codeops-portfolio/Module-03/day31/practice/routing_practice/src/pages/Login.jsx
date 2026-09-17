import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

function Login() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname ?? '/menu'

  async function signIn(event) {
    event.preventDefault()

    try {
      await login(phone)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="page">
      <h1>Sign in</h1>
      <form className="form" onSubmit={signIn}>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0911223344"
        />
        {error && <p className="error">{error}</p>}
        <button>Sign in</button>
      </form>
    </main>
  )
}

export default Login
