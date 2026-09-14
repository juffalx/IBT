# Addis Eats, Cart in a Store

Day 32 mini-project: the routed app from Day 31 with the cart moved out of context and into a Zustand store.

## Run it

```bash
npm install
npm run dev
npm test
```

Sign in with any phone number like `0911223344`.

## Where each piece of state lives

| State | Lives in | Why |
| --- | --- | --- |
| Cart items | Zustand store, `src/cart/cartStore.js` | Changes on every click, read by the badge, the menu, the cart and checkout, and has to survive a refresh |
| Auth session | Context, `src/auth/` behind `useAuth` | Changes rarely, every consumer needs the whole value, and `RequireAuth` has to wait for it to load |
| Theme | Context, `src/theme/` behind `useTheme` | One tiny value that changes almost never |
| Category filter | Query string | Shareable and survives a refresh |

## Why the cart is in a store and the session is not

- Components subscribe to one slice with a selector, so adding a dish re-renders the badge and the cart, not the header.
- The `persist` middleware saves the order under `addis-eats-cart`, so it survives a refresh with no effect code.
- The session stays in context because a handful of consumers all read the same rarely changing value, so selection would buy nothing.
- Every context that remains has its own provider and a guarded hook that throws a clear message outside its provider.

## Selectors

- `useCartStore((s) => s.items)`
- `useCartStore(selectCount)` for the badge
- `useCartStore(selectTotal)` for totals
- `useCartStore((s) => s.addItem)`, `remove` and `clear` for actions, so components that only write never re-render

There are no bare `useCartStore()` calls.

## Routes

| Path | Screen |
| --- | --- |
| `/` | Home with today's specials |
| `/menu` | Menu, filter in `?category=` |
| `/menu/:id` | Dish detail |
| `/cart` | Cart |
| `/checkout` | Checkout, signed in only |
| `/login` | Sign in |
| `*` | Not found |

## What re-renders when a dish is added

With React DevTools "highlight updates" on: only `CartBadge` and the dish card button flash. The header and layout stay still.
