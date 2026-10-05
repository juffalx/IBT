# Rendering strategy for Addis Eats

For every route two questions: does it depend on who is asking, and how stale may it be?

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | The welcome text never changes between builds |
| `/menu` | ISR, `revalidate = 3600` | Dishes change a few times a day, so an hour old is fine and speed matters most |
| `/menu/[id]` | Static via `generateStaticParams` | Every dish id is known at build time, and `dynamicParams = false` makes an unknown id a real 404 |
| `/cart` | Client (`'use client'`) | The cart is the person's own state and private |
| `/checkout` | Dynamic | Reads the `session` cookie with `cookies()`, and `checkout/layout.js` also sets `dynamic = 'force-dynamic'` for everything under it |
| `/docs/[[...slug]]` | Dynamic | Optional catch-all with no `generateStaticParams`, so the build cannot know the paths |
| `/order/history` | Static for now | A placeholder. Once it shows a real person's orders it must become dynamic |
| `/products`, `/products/electronics`, `/test` | Static | Placeholders from Day 36 with nothing request specific |

## Which read forces checkout to be dynamic

`await cookies()` in `app/checkout/page.js`. The response now depends on the request, so the page cannot be built ahead of time. The layout's `force-dynamic` states the same rule for every route added under checkout later.

## Layouts

- `app/layout.js` owns `html` and `body`, imports `globals.css` and renders the header, the page and the footer
- `app/menu/layout.js` adds the category sidebar for every route under `/menu`. It stays mounted when you go from `/menu` to `/menu/kitfo`, so only the page changes
- The sidebar categories are plain text on purpose: turning them into `?category=` links would need `searchParams`, which makes `/menu` dynamic and loses the static speed

## Streaming

- `menu/page.js` wraps `DishList` in `Suspense`, so the sidebar and heading render first and a skeleton holds the place of the dishes
- `getDishes` waits 800 ms on purpose so the skeleton is visible in `npm run dev`. In the production build the page is already static, so nothing streams
- `menu/loading.js` covers the whole segment while a dish page loads

## Build output

```
Route (app)                Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ƒ /docs/[[...slug]]
├ ○ /menu                          1h      1y
├   /menu/[id]
│ ├ ● /menu/firfir
│ ├ ● /menu/chechebsa
│ ├ ● /menu/doro-wat
│ └ ● [+4 more paths]
├ ○ /order/history
├ ○ /products
├ ○ /products/electronics
└ ○ /test


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

- ○ Static: `/`, `/cart`, `/menu` (revalidates every 1h), `/order/history`, `/products`, `/products/electronics`, `/test`
- ● SSG: `/menu/[id]`, 7 pages, one per dish
- ƒ Dynamic: `/checkout`, `/docs/[[...slug]]`
