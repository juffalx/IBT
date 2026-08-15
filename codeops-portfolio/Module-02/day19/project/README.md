# TeleBirr Transaction Report

A small report generator over a list of TeleBirr transactions for an Addis
shop, built with `map`/`filter`/`reduce`, destructuring, and spread — split
across ES modules.

## Files

- **`transactions.js`** — Data only. Exports the `transactions` array, where
  each item is `{ id, customer, amount, type }`. Holds no logic.

- **`report.js`** — Logic only. Exports pure functions that take
  transaction arrays (never the imported constant directly) and return
  summaries or formatted output:
  - `totalByType(txns, type)` — `filter` + `reduce` to total credits or debits.
  - `byType(txns, type)` — `filter` to get just one type of transaction.
  - `formatReceipts(txns)` — `map` with `{ customer, amount, type }`
    destructuring in the callback to build receipt strings using template
    literals.
  - `correctAmount(txn, newAmount)` — uses spread (`{ ...txn, amount:
newAmount }`) to return a **new** object with a corrected amount,
    leaving the original transaction untouched.
  - `buildReport(txns)` — combines the above into the full printable report
    string.

- **`script.js`** — Entry point. Imports `transactions` from
  `transactions.js` and the summary functions from `report.js`, then
  prints the report and a demo of the spread-based correction. This is the
  only file that calls `console.log`.

- **`sample-output.txt`** — Captured output from running `node script.js`.

## Running it

```bash
node script.js
```

## Requirements checklist

- [x] `filter` used to separate credits/debits (`totalByType`, `byType`)
- [x] `reduce` used to total each type (`totalByType`)
- [x] `map` with destructured params used to build receipt strings
      (`formatReceipts`)
- [x] `spread` used to produce an updated copy of a transaction without
      mutating the original (`correctAmount`)
- [x] Code split into `transactions.js` (data), `report.js` (logic), and
      `script.js` (wiring/printing), each with explicit `export`/`import`
      lines
- [x] No manual counter loops — only array methods
- [x] Receipt strings built with template literals showing customer and
      ETB amount
