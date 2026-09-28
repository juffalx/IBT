import PropTypes from 'prop-types'
import './NestedPanel.css'
import ThemeReadout from '../ThemeReadout/ThemeReadout'

function NestedPanel({ level, depth }) {
  return (
    <div className="nested-panel">
      <span className="nested-panel__label">
        Level {level} of {depth} (no props about the theme)
      </span>
      {level < depth ? (
        <NestedPanel level={level + 1} depth={depth} />
      ) : (
        <ThemeReadout />
      )}
    </div>
  )
}

NestedPanel.propTypes = {
  level: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
}

export default NestedPanel
