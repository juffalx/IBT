# Checkout Form Practice

The seven exercises from the Day 33 reading sheet, built into one small checkout form with a fixed total of 640 ETB.

## Run it

```bash
npm install
npm run dev
```

## Exercises

| # | Exercise | Where |
| --- | --- | --- |
| 1 | Name, TeleBirr phone, area and notes in one state object | `src/checkout/Checkout.jsx` |
| 2 | Select for the area, bound with `value` on the select | `src/checkout/Checkout.jsx` |
| 3 | `validate(form)` as a pure function, called during render | `src/checkout/validate.js` |
| 4 | Touched fields on blur, errors shown only after a visit | `src/checkout/Checkout.jsx` |
| 5 | Labels with `aria-invalid`, `aria-describedby` and `role="alert"` | `src/checkout/Field.jsx` |
| 6 | Submitting flag, disabled button, ETB total in the label | `src/checkout/Checkout.jsx` |
| 7 | Simulated failure: reason shown, values kept, first bad field focused | `src/api/orders.js`, `src/checkout/Checkout.jsx` |

## Try the failure paths

- A phone ending in `0000` returns a 422 with a message beside the phone field
- A phone ending in `9999` returns a general failure and keeps every value

Commit after each exercise as the sheet says.
