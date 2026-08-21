# Addis Eats

Module 2 Capstone, Day 24: Polish & Debug

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

## Day 24 changes

- Refactored render() into renderMenu() and renderCart()
- Extracted validate() and placeOrder() out of the submit handler
- Fixed a bug where clicking the quantity number (instead of the +/-
  buttons) did nothing, by reading data-id from the closest element
- Added a safe fallback for item price so a corrupted cart cannot
  produce NaN
- Added TEST_PLAN.md and ran it clean
