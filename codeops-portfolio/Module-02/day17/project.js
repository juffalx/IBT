"use strict";


function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
    let points = 0; // private state (closure)
    return {
        earn(etb) { points += earnRule(etb); }, // HOF: rule passed in
        redeem(p) { points = Math.max(0, points - p); },
        balance() { return points; },
};
}
const card = createLoyalty();

card.earn(250); // +25 points
card.redeem(10);
console.log(card.balance()); // 15
// holiday rule: double points


const holiday = createLoyalty(etb => Math.floor(etb / 10) * 2);

holiday.earn(250);
holiday.redeem(10);
console.log(holiday.balance());





// // 1 point for every 10 ETB
// function createLoyalty(
//   earnRule = (etb) => Math.floor(etb / 10)
// ) {
//   // Private state
//   let points = 0;

//   return {
//     // Earn points
//     earn(etb) {
//       points += earnRule(etb);
//     },

//     // Redeem points
//     // Balance can never go below 0
//     redeem(amount) {
//       points = Math.max(0, points - amount);
//     },

//     // Get current balance
//     balance() {
//       return points;
//     },
//   };
// }


// // ==============================
// // DEMO
// // ==============================

// // Normal loyalty card
// const card = createLoyalty();


// // Earn points from 250 ETB
// // 250 / 10 = 25 points
// card.earn(250);


// // Redeem 10 points
// // 25 - 10 = 15
// card.redeem(10);


// // Print balance
// console.log("Normal card:", card.balance());


// // Try to redeem more than available
// card.redeem(100);

// console.log("After excessive redeem:", card.balance());


// // ==============================
// // SECOND CARD
// // ==============================

// // Create another independent card
// const secondCard = createLoyalty();

// secondCard.earn(500);

// console.log("Second card:", secondCard.balance());


// // The first card is still independent
// console.log("First card:", card.balance());


// // ==============================
// // HOLIDAY RULE
// // ==============================

// // Holiday rule:
// // Normal: 1 point per 10 ETB
// // Holiday: 2 points per 10 ETB

// const holidayRule = (etb) => Math.floor(etb / 10) * 2;


// // Create loyalty card using the new rule
// const holiday = createLoyalty(holidayRule);


// // Earn 250 ETB
// // Normal = 25 points
// // Holiday = 50 points
// holiday.earn(250);

// console.log("Holiday card:", holiday.balance());