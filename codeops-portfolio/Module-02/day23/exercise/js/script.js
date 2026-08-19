const API = "https://cdn.jsdelivr.net/gh/juffalx/TESTsss@main/day01/api.json";
const KEY = "addiseats";

const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.querySelector("#menu");
const searchEl = document.querySelector("#search");
const cartEl = document.querySelector("#cart");


// LOAD MENU FROM API

async function loadMenu() {
    menuEl.textContent = "Loading...";

    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        state.dishes = await res.json();

        render();
    } catch (error) {
        menuEl.textContent =
            `Could not load the menu because of ${error.message}`;
    }
}


// RENDER EVERYTHING

function render() {
    renderMenu();
    renderCart();
}


// RENDER MENU

function renderMenu() {
    const term = state.search.toLowerCase();

    const shown = state.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(term)
    );

    menuEl.innerHTML = shown
        .map(
            (dish) => `
                <article class="dish" data-id="${dish.id}">
                    <h3>${dish.name}</h3>

                    <p class="category">
                        ${dish.category}
                    </p>

                    <p class="spicy">
                        ${dish.spicy ? "Spicy" : "Not spicy"}
                    </p>

                    <p class="price">
                        ${dish.price} ETB
                    </p>

                    <button class="add">
                        Add
                    </button>
                </article>
            `
        )
        .join("");

    if (shown.length === 0) {
        menuEl.textContent = "No dishes found.";
    }
}


// SEARCH

searchEl.addEventListener("input", (e) => {
    state.search = e.target.value;
    renderMenu();
});


// ADD TO CART — EVENT DELEGATION

menuEl.addEventListener("click", (e) => {
    if (!e.target.matches(".add")) {
        return;
    }

    const dishEl = e.target.closest(".dish");
    const id = Number(dishEl.dataset.id);
    const dish = state.dishes.find((d) => d.id === id);

    if (!dish) {
        return;
    }

    const line = state.cart.find((item) => item.id === id);

    if (line) {
        line.qty++;
    } else {
        state.cart.push({
            ...dish,
            qty: 1
        });
    }

    save();
    render();
});


// RENDER CART

function renderCart() {
    const cartItemsEl = document.querySelector("#cart-items");
    const cartTotalEl = document.querySelector("#cart-total");

    if (state.cart.length === 0) {
        cartItemsEl.innerHTML = "<li>Your cart is empty.</li>";
        cartTotalEl.textContent = "Total: 0 ETB";
        return;
    }

    cartItemsEl.innerHTML = state.cart
        .map(
            (item) => `
                <li class="cart-item" data-id="${item.id}">
                    <div>
                        <strong>${item.name}</strong>
                        <p>
                            ${item.price} ETB × ${item.qty}
                        </p>
                    </div>

                    <button class="rm">
                        Remove
                    </button>
                </li>
            `
        )
        .join("");

    cartTotalEl.textContent = `Total: ${cartTotal()} ETB`;
}


// REMOVE FROM CART

cartEl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) {
        return;
    }

    const cartItem = e.target.closest(".cart-item");
    const id = Number(cartItem.dataset.id);

    state.cart = state.cart.filter(
        (item) => item.id !== id
    );

    save();
    render();
});


// CALCULATE CART TOTAL

function cartTotal() {
    return state.cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
}


// SAVE CART

function save() {
    localStorage.setItem(
        KEY,
        JSON.stringify(state.cart)
    );
}


// LOAD CART

function load() {
    const saved = localStorage.getItem(KEY);

    if (saved) {
        state.cart = JSON.parse(saved);
    }
}


// START APPLICATION

load();
loadMenu();