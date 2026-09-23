# Addis Eats, Checkout

Day 33 mini-project: a checkout form that handles all six form states honestly.

## Run it

```bash
npm install
npm run dev
npm test
```

Sign in with any phone number like `0911223344`, add a dish, then open `/checkout`.

## Validation rules and why they exist

| Field | Rule | Why |
| --- | --- | --- |
| Full name | Not empty after trimming | The courier needs a name at the door |
| TeleBirr phone | `09…` or `+2519…`, 10 digits, spaces and dashes ignored | Payment goes through TeleBirr, and formatting we can fix ourselves is never a reason to reject a number |
| Delivery area | Bole, Kazanchis, Megenagna or Piassa | Only these areas are served, so anything else is a mistake |
| Notes | Optional, 200 characters at most | Keeps the courier's screen readable |

The rules live in `src/checkout/validate.js` as a pure function. Errors are derived on every render, so they can never disagree with the values.

## The six states

| State | What the person sees |
| --- | --- |
| pristine | No errors until a field has been visited |
| dirty | Their input exactly as typed |
| invalid | A message in words, with a ⚠ mark, beside the field, and focus on the first bad one |
| submitting | A disabled button reading "Sending your order…" |
| failed | The reason, with every value still in the form |
| succeeded | A redirect to `/orders/:id` and an empty cart |

## Accessibility

- A real `label` per field, linked with `htmlFor` and `id`
- `aria-invalid` and `aria-describedby` on every field, `role="alert"` on every message
- Colour is never the only signal: words, a ⚠ mark, a dashed border and focus
- The handler is on the form, so Enter submits and the whole form works with the keyboard
- The ETB total is in the button label

## Try the failure paths

- A phone ending in `0000` returns a 422 with a message beside the phone field and focus on it
- A phone ending in `9999` returns a general failure and keeps every value
- Press Order twice quickly: only one order is sent
