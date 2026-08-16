# Validated, Persistent Signup Form

A small signup form that:

- Validates a full name (at least 2 characters) and an Ethiopian phone number
  against `/^(?:\+251|0)9\d{8}$/`.
- Shows one clear, specific error message at a time using `textContent`
  (never `innerHTML`).
- Saves each valid entry to `localStorage` as JSON, clears the form, and
  shows a running count of signups.
- Restores saved signups on reload, guarding against missing (`null`) or
  corrupt storage data.
- Includes a light/dark theme toggle that remembers your choice the same
  way, via generic `save()` / `load()` helpers in `script.js`.

## Run it

Open `index.html` in a browser — no build step or server required.

## Files

- `index.html` — form markup and page structure
- `style.css` — light/dark theme styling
- `script.js` — `save()`/`load()` storage helpers, theme toggle, validation,
  and signup persistence logic
