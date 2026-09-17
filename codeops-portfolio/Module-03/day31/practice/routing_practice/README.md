# Routing Practice

The seven exercises from the Day 31 reading sheet, built up on a small menu app with a local dish list.

## Run it

```bash
npm install
npm run dev
```

Sign in with a phone number like `0911223344`.

## Exercises

| # | Exercise | Where |
| --- | --- | --- |
| 1 | Install react-router-dom, wrap the app in BrowserRouter with routes | `src/App.jsx` |
| 2 | Link instead of anchors, NavLink for the active tab | `src/Layout.jsx`, `src/pages/Home.jsx`, `src/pages/Menu.jsx` |
| 3 | Layout with nav, Outlet, nest the screens inside it | `src/Layout.jsx`, `src/App.jsx` |
| 4 | Index route for the landing page and a `*` route for NotFound | `src/App.jsx`, `src/pages/NotFound.jsx` |
| 5 | `menu/:id`, read the id with useParams, link each dish | `src/pages/DishDetail.jsx`, `src/pages/Menu.jsx` |
| 6 | Category filter in the query string with useSearchParams | `src/pages/Menu.jsx` |
| 7 | RequireAuth guarding `/checkout`, return the person after sign in | `src/auth/RequireAuth.jsx`, `src/pages/Login.jsx` |

Commit after each exercise as the sheet says.
