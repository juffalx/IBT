# Cart Store Practice

The seven exercises from the Day 32 reading sheet on a small menu and cart app.

## Run it

```bash
npm install
npm run dev
```

## Exercises

| # | Exercise | Where |
| --- | --- | --- |
| 1 | `useCart` hook that throws without a provider | `src/legacy/CartContext.jsx` |
| 2 | Auth and theme in their own providers | `src/auth/AuthContext.jsx`, `src/theme/ThemeContext.jsx`, `src/App.jsx` |
| 3 | Record what re-renders when you add a dish | `NOTES.md` |
| 4 | Zustand cart store with items, addItem, remove and clear | `src/cart/cartStore.js` |
| 5 | Narrow selectors instead of `useCart` | `src/components/` |
| 6 | Persist middleware, order survives a refresh | `src/cart/cartStore.js` |
| 7 | Redux Toolkit slice, not wired in, compared with the store | `src/cart/cartSlice.js`, `NOTES.md` |

The legacy context version is kept for exercise 3 only and is not mounted.
Commit after each exercise as the sheet says.
