# hooks

| Hook | Purpose |
| --- | --- |
| `useFetch(url)` | Returns `{ data, loading, error }` and aborts the previous request in its cleanup |
| `useTheme()` | Reads the theme context and throws outside `ThemeProvider` |
| `useCart()` | Reads the cart context and throws outside `CartProvider` |
