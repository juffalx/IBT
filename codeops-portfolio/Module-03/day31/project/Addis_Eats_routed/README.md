# Addis Eats, Routed

Day 31 mini-project: the week 1 app split across real screens with React Router v6.

## Run it

```bash
npm install
npm run dev
```

Sign in with any phone number like `0911223344`.

## Routes

| Path | Screen | Notes |
| --- | --- | --- |
| `/` | Home | Today's specials, index route of the layout |
| `/menu` | Menu | Category filter lives in the query string, e.g. `/menu?category=Vegetarian` |
| `/menu/:id` | Dish detail | Reads `id` with `useParams`, unknown ids show a not found message |
| `/cart` | Cart | Current order and total in ETB |
| `/checkout` | Checkout | Wrapped in `RequireAuth`, signed in only |
| `/login` | Sign in | Sends the person back to where they were going |
| `*` | Not found | Catch-all |

## Where things are

- `src/App.jsx` has `CartProvider` and `AuthProvider` above `BrowserRouter`, and the nested route table
- `src/Layout.jsx` renders the header, `Outlet` and footer once
- `src/DishDetail.jsx` reads the id and fetches one dish
- `src/auth/RequireAuth.jsx` waits for `loading`, then renders its children or redirects with `state={{ from: location }}`
