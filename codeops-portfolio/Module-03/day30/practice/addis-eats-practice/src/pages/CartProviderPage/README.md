# CartProviderPage

**Exercise 5.** Build a `CartProvider` that holds the reducer and provides items, dispatch and the derived total.

- `context/CartProvider.jsx` runs `useReducer` and derives the total from the items.
- `CartDishPicker` dispatches actions and `CartPanel` reads the cart. Neither receives cart props.
