# Addis Eats — Module Project (Day 23)

CodeOps · Full Stack Software Development
Module 2 · Frontend: HTML, CSS & JavaScript
Day 23 — Module Project Build (Milestone 1 core)

## What this is

A single-page food-ordering app for an Addis restaurant. Users can browse
a menu loaded from data, search/filter dishes live, add items to a cart,
see a running ETB total, and have their cart persist across page reloads.

This is the Day 23 deliverable: a working vertical slice — data loaded,
rendered, filtered, and a cart that saves. Checkout form and polish come
on Day 24.

## Features

- Semantic, accessible HTML (`header`, `main`, `section`, `aside`, `footer`)
- Responsive layout: single column on mobile, menu + cart side-by-side
  on desktop (≥800px)
- Menu fetched from a remote JSON source into a state object
- Live search — filters the menu as you type
- Add to cart / remove from cart via event delegation
- Live ETB total calculated with `reduce`
- Cart persisted with `localStorage` — survives a page reload

## File structure

\```
day23/
index.html Semantic scaffold
css/
styles.css Responsive layout + component styles
js/
script.js State, fetch, render, and all event handling
data/
menu.json Local copy of the menu data (reference / fallback)
\```

## How it works

1. `load()` restores any saved cart from `localStorage`.
2. `loadMenu()` fetches the dish data and stores it in `state.dishes`.
3. `render()` calls `renderMenu()` and `renderCart()` to draw the UI
   from state.
4. Typing in the search box updates `state.search` and re-renders the
   filtered menu.
5. Clicking "Add" pushes/increments a line in `state.cart`, saves it,
   and re-renders.
6. Clicking "Remove" on a cart line filters it out of `state.cart`,
   saves, and re-renders.

## Milestone 1 checklist

- [x] Layout looks right on mobile
- [x] Layout looks right on desktop
- [x] Semantic tags in place
- [x] Menu renders from data
- [x] Search works
- [x] Cart add/remove works
- [x] Total is correct
- [x] Reload keeps the cart
- [ ] Pushed to GitHub

## Next (Day 24)

- Add a validated checkout form
- Handle empty/loading states more gracefully
- Refactor and polish styling
