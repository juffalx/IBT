# server

A tiny Vite plugin that gives the app a real HTTP endpoint during `npm run dev` and `npm run preview`.

| File | Purpose |
| --- | --- |
| `mockApi.js` | Serves `GET /api/dishes?c=<category>` after a 700 ms delay. Adding `fail=1` makes it answer with status 500 |
| `data/dishes.json` | The twenty dishes returned by the endpoint |
