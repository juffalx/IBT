# MemoProviderPage

**Exercise 6.** Memoise the provider value with `useMemo` and explain what it prevents.

- The provider value in `context/CartProvider.jsx` is wrapped in `useMemo`.
- `CartRenderProbe` is a memoised consumer with a render counter.
- Press **Re-render the parent**: the counter does not move. Add a dish: it goes up by one.
- Without `useMemo` the value would be a new object on every provider render and every consumer would re-render each time.
