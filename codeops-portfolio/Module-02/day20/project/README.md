# The Field Atlas — Country Facts Page

A single-page app that looks up live facts about any country — capital,
population, region, currencies, languages, and flag — using a free
country data API.

Built with plain HTML, CSS, and vanilla JavaScript (`fetch` + `async`/`await`).
No frameworks, no build step.

> **Note on the API:** this project originally targeted
> [restcountries.com](https://restcountries.com)'s free `v3.1` endpoint, as
> named in the assignment brief. That endpoint has since been deprecated —
> `restcountries.com` moved to a `v5` API that requires a signed-up API key.
> Since a keyless, browser-callable API was a hard requirement here, this
> app now points at [countries.dev](https://countries.dev), a free,
> keyless alternative that returns the same shape of country data (name,
> capital, population, region, currencies, languages, flags) with
> permissive CORS for direct browser use.

## How to run it

1. Clone or download this repository.
2. Open `index.html` directly in your browser (double-click it, or
   right-click → Open With → your browser).

That's it — there's no server or build step required, since everything
runs client-side and the API is called directly from the browser.

If your browser blocks `fetch` from a `file://` page, serve the folder
locally instead, for example:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000` in your browser.

## Which API it uses

[countries.dev](https://countries.dev), specifically the
`/name/{country}` endpoint, e.g.:

```
https://countries.dev/name/ethiopia
```

It's a free, keyless public API — no sign-up or API key required, and it
returns permissive CORS headers so it can be called directly from the
browser.

## Features

- Search any country by name, with a default lookup of **Ethiopia** on
  first page load.
- Three explicit UI states:
  - **Loading** — shown while the request is in flight.
  - **Error** — a friendly message (e.g. "Country not found") if the
    country doesn't exist or the request fails, handled with `try`/`catch`
    and an `res.ok` check.
  - **Success** — a card built entirely with `document.createElement`,
    showing the flag, capital, population (formatted with commas via
    `toLocaleString()`), region/subregion, currencies, and languages.

## Files

| File          | Purpose                                            |
| ------------- | --------------------------------------------------- |
| `index.html`  | Page structure: search form and results container   |
| `styles.css`  | Visual styling (atlas / field-notebook theme)        |
| `script.js`   | Fetch logic, loading/error/success state rendering  |
