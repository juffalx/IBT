import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

const data = new Map()
globalThis.window = {
  localStorage: {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  },
}

const { useCartStore, selectCount, selectTotal } = await import('./cartStore.js')

const kitfo = { id: 3, name: 'Kitfo', price: 320 }
const shiro = { id: 2, name: 'Shiro', price: 120 }

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
  })

  it('adds a new dish with a quantity of one', () => {
    useCartStore.getState().addItem(kitfo)
    assert.deepEqual(useCartStore.getState().items, [{ ...kitfo, qty: 1 }])
  })

  it('increments the quantity for a dish already in the cart', () => {
    useCartStore.getState().addItem(kitfo)
    useCartStore.getState().addItem(kitfo)
    const { items } = useCartStore.getState()
    assert.equal(items.length, 1)
    assert.equal(items[0].qty, 2)
  })

  it('removes a dish by id', () => {
    useCartStore.getState().addItem(kitfo)
    useCartStore.getState().addItem(shiro)
    useCartStore.getState().remove(3)
    assert.deepEqual(useCartStore.getState().items.map((item) => item.id), [2])
  })

  it('derives the count and the total', () => {
    useCartStore.getState().addItem(kitfo)
    useCartStore.getState().addItem(kitfo)
    useCartStore.getState().addItem(shiro)
    assert.equal(selectCount(useCartStore.getState()), 3)
    assert.equal(selectTotal(useCartStore.getState()), 760)
  })

  it('saves the cart under the persist key', () => {
    useCartStore.getState().addItem(shiro)
    const saved = JSON.parse(data.get('addis-eats-cart'))
    assert.equal(saved.state.items[0].id, 2)
  })
})
