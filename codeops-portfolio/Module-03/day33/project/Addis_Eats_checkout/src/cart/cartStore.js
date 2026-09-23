import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id)

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id ? { ...item, qty: item.qty + 1 } : item,
              ),
            }
          }

          return { items: [...state.items, { ...dish, qty: 1 }] }
        }),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'addis-eats-cart' },
  ),
)

export function selectCount(state) {
  return state.items.reduce((sum, item) => sum + item.qty, 0)
}

export function selectTotal(state) {
  return state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
}
