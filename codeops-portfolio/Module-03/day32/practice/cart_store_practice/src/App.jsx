import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './theme/ThemeContext'
import Header from './components/Header'
import Menu from './components/Menu'
import CartPanel from './components/CartPanel'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Header />
        <main className="layout">
          <Menu />
          <CartPanel />
        </main>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
