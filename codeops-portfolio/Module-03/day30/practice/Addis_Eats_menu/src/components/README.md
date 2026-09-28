# components

Each component lives in its own folder with its stylesheet.

| Component | Used by | Purpose |
| --- | --- | --- |
| `ExerciseNav` | App | Buttons that switch between exercises |
| `ExerciseHeader` | every page | Exercise number, title and goal |
| `ThemeToggle` | exercise 1 | Switches between light and dark |
| `NestedPanel` | exercise 1 | Recursive wrapper that nests panels without passing the theme |
| `ThemeReadout` | exercise 1 | Innermost component that reads the theme from context |
| `DishCount` | exercise 2 | Uses `useFetch` and shows how many dishes there are |
| `DishNames` | exercise 2 | Uses `useFetch` and lists the dish names |
| `CaseResults` | exercise 3 | Runs the shared reducer cases and shows PASS or FAIL |
| `DishPicker` | exercises 4 to 6 | Buttons that add sample dishes |
| `CartSummary` | exercises 4 to 6 | Shows lines, total and count with remove and clear buttons |
| `CartWithState` | exercise 4 | Cart built with three `useState` calls |
| `CartWithReducer` | exercise 4 | The same cart built with `useReducer` |
| `CartDishPicker` | exercises 5 and 6 | `DishPicker` wired to the cart context |
| `CartPanel` | exercise 5 | `CartSummary` wired to the cart context |
| `CartRenderProbe` | exercise 6 | Memoised context consumer with a render counter |
| `RenderCounter` | exercises 6 and 7 | Shows how many times its parent rendered |
| `DishList` | exercise 7 | Plain dish list with a render counter |
| `MemoDishList` | exercise 7 | The same list wrapped in `React.memo` |
| `DishCard` | exercise 7 | One dish with an add button |
| `Spinner`, `ErrorNote` | exercises 2 and 7 | Loading and error states |
