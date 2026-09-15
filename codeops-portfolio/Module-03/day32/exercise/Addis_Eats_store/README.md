# Addis Eats, Cart in a Store

Day 32 in-class exercise: the cart moves from context and a reducer into a Zustand store.

## Run it

```bash
npm install
npm run dev
npm test
```

## What changed from Day 31

- `src/cart/cartStore.js` holds the items, `addItem`, `remove` and `clear`, wrapped in `persist` under `addis-eats-cart`
- `CartProvider`, `useCart`, `cartReducer` and the context folder are gone
- `src/auth/useAuth.js` is the guarded hook for the session
- `src/theme/` has its own provider and `useTheme` hook, separate from auth
- `CartBadge` reads only the count, `Checkout` reads the items and total, `Menu` reads only `addItem`

## Provided files

| File | Purpose |
| --- | --- |
| `src/cart/cartStore.js` | The store, selectors for count and total, persistence |
| `src/auth/useAuth.js` | Guarded context hook |
| `src/components/CartBadge/CartBadge.jsx` | Reads only the item count |
| `src/components/Checkout/Checkout.jsx` | Reads the total and calls `clear` |
