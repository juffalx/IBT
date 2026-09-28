# UseFetchPage

**Exercise 2.** Extract the fetching logic into a `useFetch` hook in its own file and use it in two components.

- `hooks/useFetch.js` holds the logic.
- `DishCount` and `DishNames` both call it.
- Each call keeps its own data, loading and error, so the Network tab shows a request for each component.
