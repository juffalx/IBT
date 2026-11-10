
# Ethiopian Mobile Top-Up Console Application

A simple, robust C# console application built in .NET that processes mobile top-up transactions for **Ethio Telecom** and **Safaricom**, validates user inputs, calculates percentage-based bonuses, applies high-tier bonuses, and prints a formatted receipt.

---

## Features

1. **User Input:** Captures customer name, mobile network provider, and top-up amount in ETB.
2. **Robust Validation:** Uses `decimal.TryParse` to ensure input is numeric, rejecting zero, negative values, and amounts exceeding 5,000 ETB.
3. **Dynamic Bonus Calculation (Switch Expression):**
   - **Ethio Telecom:** 5% bonus
   - **Safaricom:** 3% bonus
   - **Other/Unknown:** 0% bonus
4. **Tiered Extra Bonus:** Transactions of 1,000 ETB or more automatically receive an additional 20 ETB extra bonus.
5. **Formatted Receipt:** Displays a clean, professional receipt with values formatted to two decimal places (`N2`) and aligned columns.

---