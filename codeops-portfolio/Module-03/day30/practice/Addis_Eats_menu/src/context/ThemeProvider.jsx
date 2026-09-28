import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from './ThemeContext'

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
