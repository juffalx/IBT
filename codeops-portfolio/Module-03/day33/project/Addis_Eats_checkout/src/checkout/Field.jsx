import PropTypes from 'prop-types'

function Field({ id, label, error, hint, as: Tag = 'input', children, ...rest }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        className="field__control"
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        {...rest}
      >
        {children}
      </Tag>
      {hint && (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="field__error">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  )
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node,
}

export default Field
