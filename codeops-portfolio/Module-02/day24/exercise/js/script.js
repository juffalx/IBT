function cartTotalBroken(cart) {
  return cart.reduce((sum, item) => sum + item.price.amount, 0);
}

function cartTotalFixed(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

document.querySelector("#btn-typeerror").addEventListener("click", () => {
  const cart = [{ name: "Shiro", price: 180 }];
  const out = document.querySelector("#out-typeerror");
  try {
    cartTotalBroken(cart);
  } catch (err) {
    out.textContent = "Caught: " + err.message + " -> fixed by reading item.price directly, not item.price.amount";
  }
  out.textContent += " | Fixed total: " + cartTotalFixed(cart) + " ETB";
});

document.querySelector("#btn-nan").addEventListener("click", () => {
  const cart = [{ name: "Tibs", price: "280" }, { name: "Kitfo", price: 350 }];
  const out = document.querySelector("#out-nan");
  const brokenTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const fixedTotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  out.textContent = "Without Number(): " + brokenTotal + " | With Number(): " + fixedTotal + " ETB";
});

function renderCartGuarded(cart) {
  if (cart.length === 0) {
    return "Your cart is empty";
  }
  return cart.length + " item(s) in cart";
}

document.querySelector("#btn-guard").addEventListener("click", () => {
  const out = document.querySelector("#out-guard");
  out.textContent = renderCartGuarded([]) + " | " + renderCartGuarded([{ name: "Sambusa" }]);
});

document.querySelector("#btn-optional").addEventListener("click", () => {
  const dish = { name: "Beyaynet" };
  const out = document.querySelector("#out-optional");
  const price = dish?.price ?? 0;
  out.textContent = "dish.price is missing, safe fallback price = " + price + " ETB";
});
