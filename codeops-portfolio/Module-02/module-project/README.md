# Addis Eats

**Module 2 Capstone — CodeOps · Full Stack Software Development (IBT College Canada)**
Days 23–25: Module Project Build → Polish & Debug → Review & Assessment

## What it does

Addis Eats is a single-page Ethiopian food-ordering app. Visitors browse a menu of
traditional dishes, search/filter it live, build a cart, and check out with a
validated TeleBirr phone number. The visual design carries over the colour
system and card style from the Day 15 static site ("Habesha Eatery"), rebuilt
into a data-driven, semantic, responsive layout.

### Features

- **Semantic, responsive HTML** — `header` / `main` / `section` / `aside` /
  `footer`, mobile-first, cart panel moves beside the menu at wider widths.
- **Data-driven menu** — dishes are loaded from `data/menu.json` via `fetch`,
  with loading and error states, never hard-coded into the HTML.
- **Live search** — filters the menu grid as you type, with an explicit
  "no dishes found" empty state.
- **Cart** — add a dish, increase/decrease quantity, remove a line, all via
  event delegation. The ETB total is computed with `reduce`.
- **Persistence** — the cart is saved to `localStorage` and restored on
  reload, so a refresh never loses an in-progress order.
- **Checkout** — a validated form (name, TeleBirr phone via regex, delivery
  address) confirms the order and clears the cart.

## Data source

`data/menu.json` — a local, hand-modelled JSON file (10 dishes: id, name,
category, price in ETB, spicy flag, image path). Swappable for a real API
later without changing any rendering code, since `render()` only ever reads
from `state.dishes`.

## Project structure

```
day23-25-addis-eats-project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── data/
│   └── menu.json
├── images/
│   └── (dish photos)
└── README.md
```

## How to run

No build step or dependencies. Open `index.html` directly in a browser, or
serve the folder locally (recommended, since `fetch` on a local JSON file
needs a server in some browsers):

```bash
npx serve .
# or
python3 -m http.server 5500
```

Then visit the printed local URL.

## State model

```js
const state = {
  dishes: [], // loaded from data/menu.json
  cart: [], // [{ id, name, price, qty }]
  search: "", // current filter text
};
```

Everything on screen is derived from `state` inside `render()` — the UI is
never edited directly; a user action updates `state`, saves it if needed,
and calls `render()` again.

## Known limitations / next steps (Day 24 polish)

- Checkout is simulated (no real payment gateway) — placing an order clears
  the cart and shows a confirmation message.
- No dish images for Doro Wat / Tibs / Kitfo yet — placeholder art is reused
  from the Day 15 asset set until real photos are added.
- Shiro and Beyaynet currently share one photo (`beyanet.png`) for the same
  reason — swap in dedicated photos when available.
