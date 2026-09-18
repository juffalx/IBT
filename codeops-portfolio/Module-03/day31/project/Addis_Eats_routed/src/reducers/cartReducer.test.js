import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { cartReducer, initialCartState } from './cartReducer.js'

const kitfo = { id: 3, name: 'Kitfo', category: 'Main', price: 320, spicy: true }
const shiro = { id: 2, name: 'Shiro', category: 'Vegetarian', price: 120, spicy: false }

function deepFreeze(value) {
  Object.values(value).forEach((child) => {
    if (typeof child === 'object' && child !== null) deepFreeze(child)
  })
  return Object.freeze(value)
}

describe('cartReducer', () => {
  it('adds a new dish with a quantity of one', () => {
    const next = cartReducer(initialCartState, { type: 'add', dish: kitfo })
    assert.deepEqual(next.items, [{ ...kitfo, qty: 1 }])
  })

  it('increments the quantity when the dish is already in the cart', () => {
    const once = cartReducer(initialCartState, { type: 'add', dish: kitfo })
    const twice = cartReducer(once, { type: 'add', dish: kitfo })
    assert.equal(twice.items.length, 1)
    assert.equal(twice.items[0].qty, 2)
  })

  it('keeps different dishes as separate lines', () => {
    const one = cartReducer(initialCartState, { type: 'add', dish: kitfo })
    const two = cartReducer(one, { type: 'add', dish: shiro })
    assert.deepEqual(
      two.items.map((item) => item.id),
      [3, 2],
    )
  })

  it('removes a whole line by id', () => {
    const one = cartReducer(initialCartState, { type: 'add', dish: kitfo })
    const two = cartReducer(one, { type: 'add', dish: shiro })
    const next = cartReducer(two, { type: 'remove', id: 3 })
    assert.deepEqual(
      next.items.map((item) => item.id),
      [2],
    )
  })

  it('ignores removing a dish that is not in the cart', () => {
    const one = cartReducer(initialCartState, { type: 'add', dish: kitfo })
    const next = cartReducer(one, { type: 'remove', id: 99 })
    assert.deepEqual(next.items, one.items)
  })

  it('clears every line', () => {
    const one = cartReducer(initialCartState, { type: 'add', dish: kitfo })
    const two = cartReducer(one, { type: 'add', dish: shiro })
    assert.deepEqual(cartReducer(two, { type: 'clear' }).items, [])
  })

  it('never mutates the state it receives', () => {
    const frozen = deepFreeze({ items: [{ ...kitfo, qty: 1 }] })
    assert.doesNotThrow(() => cartReducer(frozen, { type: 'add', dish: kitfo }))
    assert.doesNotThrow(() => cartReducer(frozen, { type: 'add', dish: shiro }))
    assert.doesNotThrow(() => cartReducer(frozen, { type: 'remove', id: 3 }))
    assert.doesNotThrow(() => cartReducer(frozen, { type: 'clear' }))
  })

  it('returns a new state object instead of the old one', () => {
    const next = cartReducer(initialCartState, { type: 'clear' })
    assert.notEqual(next, initialCartState)
  })

  it('throws on an unknown action', () => {
    assert.throws(() => cartReducer(initialCartState, { type: 'explode' }), {
      message: 'Unknown action: explode',
    })
  })
})
