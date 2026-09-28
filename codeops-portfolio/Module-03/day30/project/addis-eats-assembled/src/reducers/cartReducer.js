export const initialCartState = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.dish.id)

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.dish.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }

      return { ...state, items: [...state.items, { ...action.dish, qty: 1 }] }
    }

    case 'remove':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      }

    case 'clear':
      return { ...state, items: [] }

    default:
      throw new Error('Unknown action: ' + action.type)
  }
}
