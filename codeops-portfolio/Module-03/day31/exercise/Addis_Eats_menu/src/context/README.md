# context

The cart channel.

| File | Purpose |
| --- | --- |
| `CartContext.js` | Creates the context with a default of `null` |
| `CartProvider.jsx` | Holds the reducer state, derives the total and publishes a memoised `{ items, dispatch, total }` value |

Context is a channel, not a store: the state itself lives in `useReducer` inside `CartProvider`.
