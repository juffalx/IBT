# components

Reusable UI pieces. Each component lives in its own folder with its stylesheet.

| Component | Purpose |
| --- | --- |
| `Header` | Sticky top bar with the app title and the cart badge |
| `CartBadge` | Shows the number of items in the cart, read through a narrow store selector |
| `CategoryFilter` | Sidebar of category buttons, controlled by the page |
| `Menu` | Fetches dishes with `useFetch` and renders the spinner, error note or dish list |
| `DishList` | `React.memo` list of dish cards |
| `DishCard` | One dish with its price and add button |
| `Checkout` | Cart lines, derived total, remove and clear buttons, read through a narrow store selector |
| `Spinner` | Loading state |
| `ErrorNote` | Error state |
| `Footer` | Page footer |
