# reducers

| File | Purpose |
| --- | --- |
| `cartReducer.js` | Pure function handling `add`, `remove` and `clear`. It never mutates its input and throws on an unknown action |
| `cartReducer.test.js` | Node test suite that calls the reducer directly with plain objects |

Run the tests with `npm test`.

## Actions

| Action | Effect |
| --- | --- |
| `{ type: 'add', dish }` | Adds the dish with quantity 1, or increases its quantity if it is already in the cart |
| `{ type: 'remove', id }` | Removes the whole line with that dish id |
| `{ type: 'clear' }` | Empties the cart |
