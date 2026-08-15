# Day 18 — map/filter/reduce, destructuring, spread & modules

IBT College Canada CodeOps · Full Stack Software Development

Run with Node.js (ESM enabled via `"type": "module"` in `package.json`).

```
npm run exercises   # exercises/script.js
npm run report       # mini-project/script.js
```

## Folder structure

```
Day18/
├── package.json
├── README.md
├── exercises/
│   ├── money.js      # module exporting VAT and addVat (Exercise 5)
│   └── script.js      # main file — Exercises 1 to 5, in order
└── mini-project/
    ├── transactions.js  # raw data
    ├── report.js         # summary functions
    └── script.js          # main file — wires modules together, prints report
```

Every folder's main entry point is named **`script.js`**, so it's always
obvious which file to run.

## Exercises (`exercises/`)

`script.js` is a single file that runs all five exercises in order, each
clearly labelled in the console output:

1. `map` to add VAT, `filter` under 1000 ETB, `reduce` to a grand total.
2. A customer object logged with `Object.entries` in a `for...of` loop.
3. One-line destructuring of `name`/`city`, plus a `greet({ name })`
   function using parameter destructuring.
4. A non-mutating updated copy of a customer object using spread (new city,
   added phone field).
5. The module-split exercise: `money.js` exports `VAT` and `addVat`, and
   `script.js` imports and uses them — proof that the logic really is split
   across two files, not just written inline.

## Mini-project — TeleBirr Transaction Report (`mini-project/`)

Split across three modules:

- **`transactions.js`** — responsible for the raw data only. Exports the
  `transactions` array (`{ id, customer, amount, type }`), no logic.
- **`report.js`** — responsible for pure summary functions:
  - `totalByType(txns, type)` — `filter` by type, then `reduce` to a total.
  - `formatReceipts(txns)` — `map` with `{ customer, amount, type }`
    destructured in the callback, returns template-literal receipt strings.
  - `correctAmount(txn, newAmount)` — returns a **new** transaction object
    via spread, leaving the original untouched.
- **`script.js`** — responsible for wiring `transactions.js` and `report.js`
  together and printing the report to the console.

### Sample output (`npm run report`)

```
=== TeleBirr Transaction Report ===

Receipts:
  Almaz: 250 ETB (debit)
  Dawit: 600 ETB (credit)
  Tigist: 180 ETB (debit)
  Bereket: 1200 ETB (credit)
  Selam: 90 ETB (debit)

Totals:
  Credits: 1800 ETB
  Debits:  520 ETB
  Net:     1280 ETB

Correction example (transaction #1):
  Original: { id: 1, customer: 'Almaz', amount: 250, type: 'debit' }
  Corrected copy: { id: 1, customer: 'Almaz', amount: 300, type: 'debit' }
  Original left unchanged? true
```

### Check yourself

- ✅ `filter`, `map`, and `reduce` are used throughout — no manual counter
  `for` loops anywhere.
- ✅ `formatReceipts` and `totalByType`'s reducer both destructure the
  transaction object in their callback parameters.
- ✅ `correctAmount` returns a new object via spread; `transactions[0]` is
  verified unchanged in `script.js`.
- ✅ Logic is split across modules with explicit `export`/`import` lines in
  both the exercises (`money.js` → `script.js`) and the mini-project
  (`transactions.js` + `report.js` → `script.js`).
- ✅ Receipt strings are built with template literals showing customer and
  ETB amount.
