# Birr Watch

A single-page app that shows live exchange rates for the Ethiopian Birr (ETB), converts an amount
to a currency of your choice, and lets you keep a watchlist of currencies that's saved between
visits.

## What it does

- Fetches live ETB exchange rates on load and shows a loading / error message while it does.
- Converts an amount from ETB into whichever currency is selected, with basic input validation
  (rejects empty, zero, negative, and non-numeric input).
- Lets you add the currently selected currency to a watchlist (no duplicates) and remove any
  entry from it.
- Saves the watchlist and last-selected currency to `localStorage`, so both are restored on
  reload.

## API used

[open.er-api.com](https://www.exchangerate-api.com/docs/free) — free, no API key required.
Endpoint called: `https://open.er-api.com/v6/latest/ETB`

## Running it

Open `index.html` in a browser. No build step, no dependencies.

## Structure

```
project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## Notes

Everything on screen is driven from a single `state` object — `rates`, `watchlist`, `currency`,
`loading`, `error`. Event handlers only ever change `state` and then call `render()`; nothing
reads from the DOM back into itself. `localStorage` only stores the watchlist and the last
currency, not the rates themselves, since rates go stale and are re-fetched every load.
