# Dish Explorer

In-class exercise: fetch and display live data from a public API.

## What it does

- Fetches a list of dishes from TheMealDB API (public, no key required)
- Shows a "Loading..." message while the request is in flight
- Renders each dish name as a list item once the data arrives
- Shows a friendly error message if the request fails
- Includes a Refresh button that reloads the data on demand

## Files

```
exercise/
├── index.html
├── js/
│   └── script.js
└── css/
    └── styles.css
```

## How to run

Open `index.html` in a browser. No build step or server required.

## API used

`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`

Returns a JSON object with a `meals` array; each meal has a `strMeal` field used as the display name.

## Notes

- `load()` is the async function that handles the whole flow: set loading state → fetch → check `res.ok` → parse JSON → render → catch errors → clear loading state in `finally`.
- The Refresh button is disabled while a request is in progress to avoid overlapping calls.
