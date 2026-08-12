'use strict';

const bll = "800";
const bill = Number(bll);
const partySize = 4;

const tip = bill > 300 ? bill * 0.10 : bill * 0.05;
const total = bill + tip;

let serviceFee = 0;

switch ("TeleBirr") {
  case "TeleBirr":
    serviceFee = 5;
    break;
  case "CBE Birr":
    serviceFee = 3;
    break;
}

const finalTotal = total + serviceFee;
const perPerson = finalTotal / partySize;

console.log(
  `Total ${finalTotal} ETB, ` +
  `${perPerson} ETB each`
);