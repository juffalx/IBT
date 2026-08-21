# Addis Eats

Module 2 Capstone, Day 25: Review & Assessment

Order Ethiopian food online: browse the menu, search, build a cart, and
check out with a validated TeleBirr phone number.

## Features

- Menu loaded from data/menu.json with fetch
- Live search filtering
- Cart with add/increase/decrease/remove via event delegation
- Cart total in ETB, persisted to localStorage
- Checkout form validated with a regex for Ethiopian phone numbers

## How to run

Open index.html in a browser, or serve locally:

```
npx serve .
```

## Status

Presented, peer reviewed against the Module 2 rubric, and ready for
assessment. Known gaps: some dishes reuse placeholder images, no
payment gateway (checkout is simulated), not yet deployed to a live URL.
