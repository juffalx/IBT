# reducers

| File | Purpose |
| --- | --- |
| `cartReducer.js` | Pure function handling `add`, `remove` and `clear`. It never mutates its input and throws on an unknown action |
| `cartReducerCases.js` | Plain-object test cases shared by the page and the test suite |
| `cartReducer.test.js` | Node test suite that runs every case and checks the reducer never mutates its input |

Run the tests with `npm test`.
