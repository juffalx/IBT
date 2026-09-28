# Addis Eats, Assembled

The week 1 project: components and props, state and events, an API-driven menu with loading and error states, a category filter that drives the fetch, a cart shared through context, a reducer that owns every cart transition, and a custom `useFetch` hook.

## Run it

```bash
npm install
npm run dev
npm test
npm run build
```

`npm test` runs the cart reducer tests with Node's built-in test runner, so no React is involved.

## What is inside

```
addis-eats-assembled/
  server/            mock /api/dishes endpoint used by the dev and preview servers
  public/            static assets
  src/
    components/      reusable UI pieces
    pages/           screens that compose components
    context/         CartContext and CartProvider
    hooks/           useFetch and useCart
    reducers/        cartReducer and its tests
    utils/           small pure helpers
    constants/       shared constants
```

Every folder under `src`, plus `server` and `public`, has its own README that explains its files.

## What each hook contributes

| Hook | Where | Contribution |
| --- | --- | --- |
| `useState` | `MenuPage`, `Menu`, `useFetch` | Holds the selected category, the sort order, the simulate-error switch and the fetch result |
| `useEffect` | `useFetch` | Starts the request whenever the URL changes and aborts it in the cleanup |
| `useReducer` | `CartProvider` | Runs `cartReducer`, so every cart change goes through one pure function |
| `useContext` | `useCart` (used by `CartBadge`, `Checkout`, `Menu`) | Lets the header badge and the checkout panel read the cart with no props passed down |
| `useMemo` | `CartProvider`, `Menu` | Keeps the provider value and the sorted dish list referentially stable |
| `useCallback` | `Menu` | Keeps `onAdd` stable so `React.memo` on `DishList` can skip re-renders |
| `useFetch` (custom) | `Menu` | Packages data, loading and error handling plus request cancellation into one line |
| `useCart` (custom) | `CartBadge`, `Checkout`, `Menu` | Wraps `useContext(CartContext)` and throws a clear error outside the provider |

## Requirements checklist

| Requirement | Where it is met |
| --- | --- |
| `useFetch` returns data, loading and error and aborts on cleanup | `src/hooks/useFetch.js` |
| Pure `cartReducer` with add, remove and clear in its own file | `src/reducers/cartReducer.js` |
| `CartProvider` with `useReducer`, providing items, dispatch and derived total in ETB | `src/context/CartProvider.jsx`, totals formatted by `src/utils/formatEtb.js` |
| Header cart badge and checkout panel both read the cart with `useContext`, no prop drilling | `src/components/CartBadge/CartBadge.jsx`, `src/components/Checkout/Checkout.jsx` |
| Category filter drives the fetch and all three states are visible | `src/pages/MenuPage/MenuPage.jsx`, `src/components/Menu/Menu.jsx` |
| Provider value memoised and one deliberate `useMemo` or `useCallback` | `CartProvider.jsx`, `Menu.jsx` (explained below) |
| No console warnings | See the note on the simulated error below |

## Check yourself

- **Can the header badge read the cart without a cart prop?** Yes. `Header` renders `<CartBadge />` with no props and the badge calls `useCart()`.
- **Does the reducer work outside React?** Yes. `src/reducers/cartReducer.test.js` calls it with plain objects.
- **Is the total derived on every render?** Yes. `CartProvider` computes it from `state.items` on each render and the reducer state holds only `items`.
- **Does adding a dish update the badge, checkout panel and total together?** Yes, they all read the same context value, which changes only when `items` changes.
- **Is the provider value memoised, and what does that prevent?** Yes. Without `useMemo`, `{ items, dispatch, total }` is a new object on every render of `CartProvider`. Every component that reads the context would re-render each time the provider re-rendered, even if the cart had not changed. With `useMemo` the value keeps the same reference until `items` or `total` really changes.
- **Does `useFetch` cancel its previous request when the category changes?** Yes. The effect cleanup calls `controller.abort()`, and the aborted request is ignored. Click categories quickly and open the Network tab: earlier requests show as cancelled.
- **Can every `useMemo` and `useCallback` be justified?** See the next section.

## Memoisation decisions

- `CartProvider` `useMemo`: keeps the context value stable, as explained above.
- `Menu` `useMemo` (sorted dishes): `DishList` is wrapped in `React.memo`, so its `dishes` prop must keep the same reference between renders. Sorting creates a new array, so the sort is memoised on `[data, sortOrder]`.
- `Menu` `useCallback` (`addToOrder`): `Menu` re-renders whenever the cart changes because it reads `dispatch` from context. A stable `onAdd` lets the memoised `DishList` skip that re-render, so adding a dish does not re-render all twenty cards. `dispatch` never changes, so the dependency list is `[dispatch]`.

## Trying the three states

- **Loading:** the mock API waits 700 ms, so the spinner shows on first load and on every category change.
- **Error:** tick **Simulate a server error**. The mock API answers with status 500 and the error note appears. Untick it to recover. The browser itself prints one network line for the 500 response in the console; that is the browser reporting the failed request, not a React warning.
- **Data:** any category once loading finishes.

## Profiling

1. Install the React DevTools browser extension and open the Profiler tab.
2. Start recording, add several dishes, stop recording.
3. Select a commit: `DishList` and its cards are greyed out because they did not re-render.
4. Remove `useCallback` from `addToOrder` and record again to see `DishList` render on every add.
