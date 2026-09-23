import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from './ThemeContext'

function ThemeProvider({ children }) {
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

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
