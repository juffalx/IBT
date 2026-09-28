import PropTypes from 'prop-types'
import './CaseResults.css'
import { cartReducer } from '../../reducers/cartReducer'

function runCase(testCase) {
  try {
    const result = cartReducer(
      structuredClone(testCase.state),
      testCase.action,
    )

    if (testCase.throws) {
      return { passed: false, output: JSON.stringify(result) }
    }

    return {
      passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
      output: JSON.stringify(result),
    }
  } catch (error) {
    return {
      passed: error.message === testCase.throws,
      output: `throws "${error.message}"`,
    }
  }
}

function CaseResults({ cases }) {
  const results = cases.map((testCase) => ({
    testCase,
    ...runCase(testCase),
  }))
  const passedCount = results.filter((result) => result.passed).length

  return (
    <section className="case-results">
      <p className="case-results__summary">
        {passedCount} of {results.length} cases pass
      </p>
      <ul className="case-results__list">
        {results.map(({ testCase, passed, output }) => (
          <li
            key={testCase.name}
            className={
              passed
                ? 'case-results__item case-results__item--pass'
                : 'case-results__item case-results__item--fail'
            }
          >
            <strong>
              {passed ? 'PASS' : 'FAIL'} - {testCase.name}
            </strong>
            <code>action: {JSON.stringify(testCase.action)}</code>
            <code>result: {output}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}

CaseResults.propTypes = {
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
      action: PropTypes.object.isRequired,
      expected: PropTypes.object,
      throws: PropTypes.string,
    }),
  ).isRequired,
}

export default CaseResults
