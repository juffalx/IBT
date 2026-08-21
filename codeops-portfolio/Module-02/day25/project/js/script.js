const API = "data/menu.json";
const STORAGE_KEY = "addiseats-cart";
const PHONE_PATTERN = /^(?:\+251|0)(9|7)\d{8}$/;

const state = {
  dishes: [],
  cart: [],
  search: "",
};

const statusEl = document.querySelector("#status");
const menuGrid = document.querySelector("#menu-grid");
const searchEl = document.querySelector("#search");

const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const cartCountEl = document.querySelector("#cart-count");
const cartPanel = document.querySelector("#cart");
const cartToggleBtn = document.querySelector("#cart-toggle");

const checkoutForm = document.querySelector("#checkout-form");
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const phoneErrorEl = document.querySelector("#phone-error");
const orderConfirmEl = document.querySelector("#order-confirm");

async function loadMenu() {
  statusEl.textContent = "Loading menu...";
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
  renderMenu();
  renderCart();
}

function renderMenu() {
  const term = state.search.trim().toLowerCase();
  const shown = state.dishes.filter((d) => d.name.toLowerCase().includes(term));

  if (shown.length === 0) {
    menuGrid.innerHTML = `<p>No dishes found for "${escapeHtml(state.search)}".</p>`;
    return;
  }

  menuGrid.innerHTML = shown.map(renderDishCard).join("");
}

function renderDishCard(d) {
  return `
    <article class="card" data-id="${d.id}">
      ${d.image ? `<img src="${d.image}" alt="${escapeHtml(d.name)}" />` : ""}
      <h3>${escapeHtml(d.name)}</h3>
      <p>${escapeHtml(d.category)}${d.spicy ? " - Spicy" : ""}</p>
      <div class="price">${d.price} ETB</div>
      <button class="btn-add" data-id="${d.id}">Add to order</button>
    </article>`;
}

function renderCart() {
  renderCartLines();
  renderCartTotal();
}

function renderCartLines() {
  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }
  cartItemsEl.innerHTML = state.cart.map(renderCartLine).join("");
}

function renderCartLine(item) {
  const price = item.price ?? 0;
  return `
    <div class="cart-line" data-id="${item.id}">
      <span>${escapeHtml(item.name)}</span>
      <div class="qty-controls">
        <button data-action="dec" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button data-action="inc" data-id="${item.id}">+</button>
      </div>
      <span>${price * item.qty} ETB</span>
      <button class="cart-remove" data-id="${item.id}">x</button>
    </div>`;
}

function renderCartTotal() {
  cartTotalEl.textContent = cartTotal() + " ETB";
  cartCountEl.textContent = state.cart.reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    state.cart = Array.isArray(parsed) ? parsed : [];
  } catch {
    state.cart = [];
  }
}

searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderMenu();
});

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
  const target = e.target.closest("[data-id]");
  if (!target) return;
  const id = Number(target.dataset.id);

  if (target.matches("[data-action]")) {
    const line = state.cart.find((i) => i.id === id);
    if (!line) return;
    if (target.dataset.action === "inc") line.qty++;
    if (target.dataset.action === "dec") line.qty--;
    if (line.qty <= 0) {
      state.cart = state.cart.filter((i) => i.id !== id);
    }
    saveCart();
    renderCart();
  }

  if (target.matches(".cart-remove")) {
    state.cart = state.cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
  }
});

function openCartOnMobile() {
  if (window.innerWidth < 900) {
    cartPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

cartToggleBtn.addEventListener("click", () => {
  cartPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

function validate({ name, phone }) {
  if (!name.trim()) return "Please enter your name.";
  if (!PHONE_PATTERN.test(phone)) return "Enter a valid TeleBirr number, e.g. 0912345678.";
  if (state.cart.length === 0) return "Your cart is empty.";
  return "";
}

function placeOrder(data) {
  const order = {
    ...data,
    items: state.cart,
    total: cartTotal(),
    placedAt: new Date().toISOString(),
  };
  console.log("Order placed:", order);

  state.cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();

  orderConfirmEl.textContent = `Order placed! Total ${order.total} ETB will be requested via TeleBirr to ${data.phone}.`;
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  phoneErrorEl.textContent = "";
  orderConfirmEl.textContent = "";

  const data = { name: nameEl.value, phone: phoneEl.value.trim() };
  const msg = validate(data);

  if (msg) {
    if (msg.toLowerCase().includes("telebirr")) {
      phoneErrorEl.textContent = msg;
      phoneEl.focus();
    } else {
      orderConfirmEl.textContent = msg;
    }
    return;
  }

  placeOrder(data);
});

function init() {
  loadCart();
  renderCart();
  loadMenu();
}

init();
