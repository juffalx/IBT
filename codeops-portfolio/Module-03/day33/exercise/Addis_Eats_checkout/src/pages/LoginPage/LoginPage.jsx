import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'

function LoginPage() {
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
    <main className="page page--narrow">
      <h2>Sign in</h2>
      <form className="form" onSubmit={signIn}>
        <label className="form__field">
          Phone number
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0911223344"
          />
        </label>
        {error && <p className="form__error">{error}</p>}
        <button type="submit" className="button">
          Sign in
        </button>
      </form>
    </main>
  )
}

export default LoginPage
