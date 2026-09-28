# hooks

Custom hooks that package stateful logic.

| Hook | Purpose |
| --- | --- |
| `useFetch(url)` | Returns `{ data, loading, error }`, restarts when the URL changes and aborts the previous request in its cleanup |
| `useCart()` | Reads the cart from context and throws if it is used outside `CartProvider` |

Each component that calls `useFetch` gets its own independent data, loading and error state.
