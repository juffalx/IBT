// Addis Eats — Module 2 capstone
// Pattern: state → render → events → (edit state) → render

const API = "data/menu.json";
const STORAGE_KEY = "addiseats-cart";

//  Single source of truth 
const state = {
  dishes: [], // loaded from data/menu.json or any api for futuures
  cart: [], // [{ id, name, price, qty }] እንደዚ ይይዛል
  search: "", // user  insert ላይ ሚፅፈው ፅሁፍ
};

//  DOM references 
const statusEl = document.querySelector("#status");
const menuGrid = document.querySelector("#menu-grid");
const searchEl = document.querySelector("#search");

const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const cartCountEl = document.querySelector("#cart-count");
const cartPanel = document.querySelector("#cart");
const cartToggleBtn = document.querySelector("#cart-toggle");

const checkoutForm = document.querySelector("#checkout-form");
const phoneEl = document.querySelector("#phone");
const phoneErrorEl = document.querySelector("#phone-error");
const orderConfirmEl = document.querySelector("#order-confirm");

// Ethiopian TeleBirr-style safari ጭምር numbers: 09XXXXXXXX or +2519XXXXXXXX / +2517XXXXXXXX
const PHONE_PATTERN = /^(?:\+251|0)(9|7)\d{8}$/;

//  Fetching & rendering the menu 
async function loadMenu() {
  statusEl.textContent = "Loading menu…";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.dishes = await res.json();
    statusEl.textContent = "";
    render();
  } catch (err) {
    statusEl.textContent = "Could not load the menu. Please refresh.";
    console.error(err);
  }
}

function render() {
  const term = state.search.trim().toLowerCase(); // ፊልተሩ caseinsensetive እንዲሆን
  const shown = state.dishes.filter((d) => 
    d.name.toLowerCase().includes(term)
  );

  // የ show or search  የተደረገው length ባዶ ከሆነ and use • 🌶 special key from google search
  if (shown.length === 0) {
    menuGrid.innerHTML = `<p class="empty-state">No dishes found for "${escapeHtml(
      state.search
    )}".</p>`;
  } else {
    menuGrid.innerHTML = shown
      .map(
        (d) => `
      <article class="card dish" data-id="${d.id}">
        ${d.image ? `<img src="${d.image}" alt="${escapeHtml(d.name)}" />` : ""}
        <h3>${escapeHtml(d.name)}</h3>
        <p class="dish-category">${escapeHtml(d.category)}${
          d.spicy ? " • 🌶 Spicy" : ""
        }</p>
        <div class="price">${d.price} ETB</div>
        <button class="btn-add" data-id="${d.id}">Add to order</button>
      </article>`
      )
      .join("");
  }

  renderCart();
}

function renderCart() {
  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Add a dish to get started.</p>`;
  } else {
    cartItemsEl.innerHTML = state.cart
      .map(
        (item) => `
      <div class="cart-line" data-id="${item.id}">
        <span class="cart-line-name">${escapeHtml(item.name)}</span>
        <div class="qty-controls">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <span class="cart-line-price">${item.price * item.qty} ETB</span>
        <button class="cart-remove" data-id="${item.id}" aria-label="Remove ${escapeHtml(
          item.name
        )}">✕</button>
      </div>`
      )
      .join("");
  }

  const total = cartTotal();
  cartTotalEl.textContent = `${total} ETB`;
  cartCountEl.textContent = state.cart.reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

//  Persistence 
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state.cart = JSON.parse(saved);
    } catch {
      state.cart = [];
    }
  }
}

//  Search 
searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

//  Cart interactions (event delegation) 
menuGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-add");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const dish = state.dishes.find((d) => d.id === id);
  if (!dish) return;

  const line = state.cart.find((i) => i.id === id);
  if (line) {
    line.qty++;
  } else {
    state.cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
  }

  saveCart();
  renderCart();
  openCartOnMobile();
});

cartItemsEl.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.matches(".qty-btn")) {
    const line = state.cart.find((i) => i.id === id);
    if (!line) return;
    if (e.target.dataset.action === "inc") line.qty++;
    if (e.target.dataset.action === "dec") line.qty--;
    if (line.qty <= 0) {
      state.cart = state.cart.filter((i) => i.id !== id);
    }
    saveCart();
    renderCart();
  }

  if (e.target.matches(".cart-remove")) {
    state.cart = state.cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
  }
});

//  Mobile cart toggle 
function openCartOnMobile() {
  if (window.innerWidth < 900) {
    cartPanel.classList.add("cart-open");
    cartToggleBtn.setAttribute("aria-expanded", "true");
    cartPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

cartToggleBtn.addEventListener("click", () => {
  cartPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

//  Checkout validation 
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  phoneErrorEl.textContent = "";
  orderConfirmEl.textContent = "";

  if (state.cart.length === 0) {
    orderConfirmEl.textContent = "Your cart is empty — add a dish before checking out.";
    orderConfirmEl.style.color = "var(--danger)";
    return;
  }

  const phone = phoneEl.value.trim();
  if (!PHONE_PATTERN.test(phone)) {
    phoneErrorEl.textContent =
      "Enter a valid TeleBirr number, e.g. 0912345678 or +251912345678.";
    phoneEl.focus();
    return;
  }

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  // "Place" the order: clear cart
  //  persisted state
  // confirm to the user

  const total = cartTotal();
  state.cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();

  orderConfirmEl.style.color = "var(--primary)";
  orderConfirmEl.textContent = `Order placed! Total ${total} ETB will be requested via TeleBirr to ${phone}.`;
});

//  run all  
function init() {
  loadCart();
  renderCart();
  loadMenu();
}

init();
