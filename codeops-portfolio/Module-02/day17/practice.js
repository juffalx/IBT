// Exercises
// Complete these in your Day 17 folder and push them to GitHub. Run each one and confirm the
// output before moving on.
//? 1. Write a vat(amount, rate = 0.15) function using a default parameter, then write the same logic
// ?as an arrow function with an implicit return.

function vat(amount, rate=0.15){
    console.log(`vat is ${amount * (1 - rate)}`);
}

vat(100)

arrowFunctionVat = (amount, rate=0.15) => console.log(`vat is ${amount * (1 - rate)}`);

arrowFunctionVat(100)


//? 2. Write a makeCounter closure that returns a function incrementing a private count. Call it several
// ?times and, in a comment, explain why count stays private.

function makeCounter(){
    let count = 0;

    return function adder(){
        count++;
        return console.log(count);
    }
}

let counter = makeCounter()
counter()
counter()
counter()

// b/c makeCounter return function and that return function is remember count value so 
// when anytime call it's retturn add 1 number each time, and count variable is private only access by 
// return functions or even crate nested function like method typs


// ?3. Write a discountBy(rate) factory and create memberPrice (10%) and salePrice (30%) from it.
// ?Apply both to a price of 1000 ETB.



// ?4. Write a higher-order applyToAll(list, fn) that runs fn over every item and returns the results, then
// ?use it to add VAT to an array of prices.
// ?5. Use forEach (a callback) to print each Ethiopian city in an array with its index, e.g. "1. Addis
// ?Ababa".

