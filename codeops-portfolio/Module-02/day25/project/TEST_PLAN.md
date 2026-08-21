# TEST_PLAN.md — Addis Eats

Manual test plan. Run this after every change; a full green pass is the
confidence check before presenting.

- [ ] Menu loads and renders all dishes with name, category, price, image
- [ ] Add a dish → appears in cart, qty 1, cart count updates
- [ ] Add the same dish again → qty increases instead of a duplicate line
- [ ] Increase / decrease quantity with the +/− buttons
- [ ] Decrease quantity to 0 → line is removed from the cart
- [ ] Remove a line directly with the ✕ button
- [ ] Cart total (ETB) always matches sum of price × qty
- [ ] Search a dish that exists → menu filters live, cart untouched
- [ ] Search a dish that does not exist → "No dishes found" empty state
- [ ] Clear search → full menu returns
- [ ] Checkout with empty name → "Please enter your name."
- [ ] Checkout with a bad phone (e.g. `123`) → clear TeleBirr error near the field
- [ ] Checkout with empty cart → blocked with "Your cart is empty."
- [ ] Checkout with valid name + valid phone (`0912345678` or `+251912345678`)
      + non-empty cart → confirmation message with correct ETB total, cart
      clears, form resets
- [ ] Reload the page with items in the cart → cart is restored from
      localStorage
- [ ] Reload the page with an empty cart → empty-cart message shows, no errors
- [ ] Break the data URL (rename `data/menu.json`) → calm "Could not load the
      menu" message, no uncaught console error
- [ ] Click a qty `<span>` (not the +/− button) in the cart → nothing breaks
      (regression test for the delegation bug fixed in the Day 24 polish pass)
- [ ] Layout and taps work at mobile width (~375px)
- [ ] Full checkout flow is reachable and submittable by keyboard only (Tab +
      Enter, no mouse)

## Result of last run

Passed clean after the Day 24 refactor (event-delegation guard-clause bug
fixed; see `js/script.js` comments for details).
