import './ThemeReadout.css'
import { useTheme } from '../../hooks/useTheme'

function ThemeReadout() {
  const { theme } = useTheme()

  return (
    <div className={`theme-readout theme-readout--${theme}`}>
      <p className="theme-readout__text">
        The deepest component reads the theme straight from context.
      </p>
      <strong>Current theme: {theme}</strong>
    </div>
  )
}

export default ThemeReadout
