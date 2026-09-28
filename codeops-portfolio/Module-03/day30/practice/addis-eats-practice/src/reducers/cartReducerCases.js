const kitfo = { id: 3, name: 'Kitfo', category: 'Main', price: 320, spicy: true }
const shiro = { id: 2, name: 'Shiro', category: 'Vegetarian', price: 120, spicy: false }

export const cartReducerCases = [
  {
    name: 'add puts a new dish in the cart with a quantity of 1',
    state: { items: [] },
    action: { type: 'add', dish: kitfo },
    expected: { items: [{ ...kitfo, qty: 1 }] },
  },
  {
    name: 'add increases the quantity of a dish already in the cart',
    state: { items: [{ ...kitfo, qty: 1 }] },
    action: { type: 'add', dish: kitfo },
    expected: { items: [{ ...kitfo, qty: 2 }] },
  },
  {
    name: 'add keeps different dishes as separate lines',
    state: { items: [{ ...kitfo, qty: 1 }] },
    action: { type: 'add', dish: shiro },
    expected: { items: [{ ...kitfo, qty: 1 }, { ...shiro, qty: 1 }] },
  },
  {
    name: 'remove deletes the whole line with that id',
    state: { items: [{ ...kitfo, qty: 2 }, { ...shiro, qty: 1 }] },
    action: { type: 'remove', id: 3 },
    expected: { items: [{ ...shiro, qty: 1 }] },
  },
  {
    name: 'remove with an unknown id leaves the cart unchanged',
    state: { items: [{ ...kitfo, qty: 1 }] },
    action: { type: 'remove', id: 99 },
    expected: { items: [{ ...kitfo, qty: 1 }] },
  },
  {
    name: 'clear empties the cart',
    state: { items: [{ ...kitfo, qty: 2 }, { ...shiro, qty: 1 }] },
    action: { type: 'clear' },
    expected: { items: [] },
  },
  {
    name: 'an unknown action throws',
    state: { items: [] },
    action: { type: 'explode' },
    throws: 'Unknown action: explode',
  },
]
