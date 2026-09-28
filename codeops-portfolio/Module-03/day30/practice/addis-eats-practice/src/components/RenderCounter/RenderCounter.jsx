import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './RenderCounter.css'

function RenderCounter({ label }) {
  const textRef = useRef(null)
  const renders = useRef(0)

  useEffect(() => {
    renders.current += 1
    textRef.current.textContent = String(renders.current)
  })

  return (
    <p className="render-counter">
      {label}: <strong ref={textRef}>0</strong>
    </p>
  )
}

RenderCounter.propTypes = {
  label: PropTypes.string.isRequired,
}

export default RenderCounter
