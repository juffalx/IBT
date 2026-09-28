# Addis Eats Practice

The seven Day 30 exercises in one app. Use the buttons at the top to switch between them.

## Run it

```bash
npm install
npm run dev
npm test
```

`npm test` runs the cart reducer cases with Node's built-in test runner, with no React involved.

## Structure

```
addis-eats-practice/
  public/            dishes.json served as a static file
  src/
    pages/           one page per exercise
    components/      the pieces the pages are built from
    context/         ThemeContext, ThemeProvider, CartContext, CartProvider
    hooks/           useFetch, useTheme, useCart
    reducers/        cartReducer, its shared test cases and its tests
    data/            small sample data
    utils/           helpers
```

Every folder under `src`, plus `public`, has its own README.

## The exercises

| # | Exercise | Page | What to look for |
| --- | --- | --- | --- |
| 1 | Create a ThemeContext holding "light" or "dark" and read it from a deeply nested component | `ThemeContextPage` | Four nested panels pass no theme props, yet the innermost one changes when you press the toggle |
| 2 | Extract the fetching logic into a `useFetch` hook and use it in two components | `UseFetchPage` | `DishCount` and `DishNames` each call the hook. The Network tab shows one request per component, because logic is shared but data is not |
| 3 | Write a `cartReducer` with add, remove and clear and call it directly with plain objects | `ReducerTestPage` | Seven cases run live in the page and the same cases run in `npm test` |
| 4 | Convert three related `useState` calls to `useReducer` and compare | `StateToReducerPage` | Both carts behave the same. The `useState` version needs three setters in every handler, the reducer version needs one `dispatch` |
| 5 | Build a `CartProvider` that holds the reducer and provides items, dispatch and the derived total | `CartProviderPage` | The picker and the panel share one cart without any props between them |
| 6 | Memoise the provider value with `useMemo` and explain what it prevents | `MemoProviderPage` | See the explanation below |
| 7 | Profile the menu, add `React.memo` plus `useCallback` to the dish list and profile again | `MemoCallbackPage` | Three versions of one list with render counters |

### Exercise 4: comparing `useState` and `useReducer`

| | Three `useState` calls | One `useReducer` |
| --- | --- | --- |
| Adding a dish | Three setters: items, total, count | `dispatch({ type: 'add', dish })` |
| Removing a dish | Find the line, then three setters with hand-written arithmetic | `dispatch({ type: 'remove', id })` |
| Clearing | Three setters | `dispatch({ type: 'clear' })` |
| Total and count | Stored, so they can drift from the items | Derived from `items` on every render |
| Testable without React | No | Yes, the reducer is a pure function |

### Exercise 6: what the memoised provider value prevents

`CartProvider` passes `{ items, dispatch, total }` to the context. Without `useMemo` that object is created again every time `CartProvider` renders, and React compares context values by reference, so every component reading the context re-renders even though the cart did not change.

On the exercise 6 page, `CartRenderProbe` reads the cart and shows how many times it rendered:

1. Press **Re-render the parent** several times. The counter stays the same, because the memoised value keeps its reference.
2. Add a dish. The counter goes up by one, because the cart really changed.
3. To see the difference, replace the memoised value in `src/context/CartProvider.jsx` with a plain `{ items: state.items, dispatch, total }` object and repeat step 1. The counter now rises on every press.

The code contains no comments, so this explanation lives here.

### Exercise 7: profiling steps

The page shows three lists that receive the same dishes:

- **A. Plain list.** Renders every time the page renders.
- **B. `React.memo` with a new handler on every render.** The handler is a new function each time, so `React.memo` can never skip anything and B renders as often as A.
- **C. `React.memo` with `useCallback`.** The handler and the dish array keep their references, so C stays still when only unrelated state changes.

Steps:

1. Press **Unrelated update** three times and read the counters. A and B go up by three, C does not move.
2. Add a dish in list C. The ordered total changes and the page re-renders, yet C still does not re-render.
3. To profile with React DevTools, install the extension, open the Profiler tab, record while pressing **Unrelated update**, and look at which lists lit up in each commit.

In development, React StrictMode runs effects twice on mount, so every counter starts at 2.
