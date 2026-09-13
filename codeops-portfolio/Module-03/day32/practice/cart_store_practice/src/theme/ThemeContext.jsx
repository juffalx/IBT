import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)

  if (ctx === null) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }

  return ctx
}
