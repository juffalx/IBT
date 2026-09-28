import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { cartReducer } from './cartReducer.js'
import { cartReducerCases } from './cartReducerCases.js'

function deepFreeze(value) {
  Object.values(value).forEach((child) => {
    if (typeof child === 'object' && child !== null) deepFreeze(child)
  })
  return Object.freeze(value)
}

describe('cartReducer called directly with plain objects', () => {
  cartReducerCases.forEach((testCase) => {
    it(testCase.name, () => {
      if (testCase.throws) {
        assert.throws(() => cartReducer(testCase.state, testCase.action), {
          message: testCase.throws,
        })
        return
      }

      assert.deepEqual(
        cartReducer(testCase.state, testCase.action),
        testCase.expected,
      )
    })
  })

  it('never mutates the state it receives', () => {
    cartReducerCases
      .filter((testCase) => !testCase.throws)
      .forEach((testCase) => {
        const frozen = deepFreeze(structuredClone(testCase.state))
        assert.doesNotThrow(() => cartReducer(frozen, testCase.action))
      })
  })
})
