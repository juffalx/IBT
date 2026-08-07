// console.log("Hellow Worled!");

// let num1 = 10;
// let num2 = 20;

// console.log(num1 + num2);

// console.log(typeof num1);       


// var name = "Mohammed Yasin"
// console.log(`hello ${name}`)

// console.log(1 < 1?"True": 2 < 3?"yes ":"False")


'use strict';
const billRaw = "800"; // from input
const bill = Number(billRaw); // → number
const partySize = 4;

const tip = bill > 300 ? bill * 0.10 : bill * 0.05;
const total = bill + tip;
const perPerson = total / partySize;
console.log(
`Total ${total} ETB, ` +
`${perPerson} ETB each`
); // "Total