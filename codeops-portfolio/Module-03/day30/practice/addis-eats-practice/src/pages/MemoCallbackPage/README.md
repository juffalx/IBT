# MemoCallbackPage

**Exercise 7.** Profile the menu, add `React.memo` plus `useCallback` to the dish list and profile again.

- List A is plain, list B uses `React.memo` with a new handler on every render, list C uses `React.memo` with `useCallback`.
- Press **Unrelated update**: A and B re-render every time, C does not.
- `useMemo` keeps the six-dish array stable so `React.memo` can compare it by reference.
