# Addis Eats, Checkout Form

Day 33 in-class exercise: a complete checkout form on the Day 32 app.

## Run it

```bash
npm install
npm run dev
npm test
```

Sign in with any phone number like `0911223344`, add a dish, then open `/checkout`.

## Provided files

| File | Purpose |
| --- | --- |
| `src/checkout/Checkout.jsx` | The form, its state, submission and feedback |
| `src/checkout/validate.js` | The pure rules function returning an errors object |
| `src/checkout/Field.jsx` | Label, input and message with the aria wiring |
| `src/api/orders.js` | `placeOrder`, returning field errors on a 422 |

## Try the failure paths

- A phone ending in `0000` returns a 422 with a message beside the phone field
- A phone ending in `9999` returns a general failure and keeps every value in the form
