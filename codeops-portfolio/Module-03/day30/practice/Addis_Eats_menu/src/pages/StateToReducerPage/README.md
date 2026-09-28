# StateToReducerPage

**Exercise 4.** Convert a component with three related `useState` calls to `useReducer` and compare the two versions.

- `CartWithState` keeps items, total and count in three `useState` calls.
- `CartWithReducer` keeps one reducer state and derives total and count.
- Both use the same `DishPicker` and `CartSummary`, so any difference comes from the state code.
