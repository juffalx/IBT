import { configureStore, createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clear: (state) => {
      state.items = []
    },
  },
})

export const { addItem, remove, clear } = cartSlice.actions

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
})
