# context

| File | Purpose |
| --- | --- |
| `ThemeContext.js` | Creates the theme context |
| `ThemeProvider.jsx` | Holds "light" or "dark" in state and provides `{ theme, toggleTheme }` |
| `CartContext.js` | Creates the cart context |
| `CartProvider.jsx` | Holds the reducer state, derives the total and provides a memoised `{ items, dispatch, total }` |

Context is a channel, not a store: the state lives in `useState` or `useReducer` inside the providers.
