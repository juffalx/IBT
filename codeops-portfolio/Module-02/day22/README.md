# Birr Watch 🇪🇹

A small frontend app that fetches live exchange rates and converts a foreign
currency amount into Ethiopian Birr (ETB), with a watchlist that persists
across page reloads.

## Files

- `index.html` — page structure (status line, convert form, watchlist)
- `styles.css` — styling
- `app.js` — app logic (fetch, state, rendering, events, persistence)

## Features

- **Live rates**: fetches current rates from a public exchange rate API
  (base currency ETB) on load.
- **Convert to ETB**: pick a currency, enter an amount, get the ETB
  equivalent.
- **Watchlist**: any currency you convert is automatically added to your
  watchlist (no duplicates). Remove one with the × button.
- **Persistence**: your watchlist and last-used currency are saved to
  `localStorage` and restored on the next visit.
- **Status states**: the status line shows loading, success, and error
  states depending on whether the rate fetch succeeds.

## How it works

- `state.rates[currency]` holds units of that currency per 1 ETB (as
  returned by the API). Converting _currency → ETB_ is therefore
  `amount / rate`.
- The dropdown excludes ETB itself, since converting ETB to ETB isn't
  useful.
- Watchlist rows use event delegation: one click listener on the list
  handles all delete buttons, including ones added after the initial
  render.

## Running it

Just open `index.html` in a browser — no build step or server required.
