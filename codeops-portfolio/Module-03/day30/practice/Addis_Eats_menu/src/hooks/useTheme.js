import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
  const theme = useContext(ThemeContext)

  if (theme === null) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }

  return theme
}
