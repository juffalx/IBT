const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};


const statusLine = document.querySelector("#status-line");
const select = document.querySelector("#target-currency");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const convertBtn = document.querySelector("#convert-btn");
const result = document.querySelector("#conversion-result");
const watchlistEl = document.querySelector("#watchlist-items");

function setStatus(type, message) {
  statusLine.textContent = message;
  statusLine.classList.remove("loading", "success", "error");
  statusLine.classList.add(type);
}

async function loadRates() {
  setStatus("loading", "Loading rates...");

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    state.rates = data.rates;

    setStatus("success", "Rates loaded.");
    select.disabled = false;
    convertBtn.disabled = false;
  } catch (err) {
    setStatus("error", "Could not load rates. Please try again later.");
  }
}

function render() {

  const codes = Object.keys(state.rates).filter((c) => c !== state.base);

  select.innerHTML = codes
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  if (codes.includes(state.currency)) {
    select.value = state.currency;
  } else if (codes.length) {
    state.currency = codes[0];
    select.value = state.currency;
  }

  renderWatchlist();
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchlistEl.innerHTML = `<li class="empty-message">No currencies yet</li>`;
    return;
  }

  watchlistEl.innerHTML = state.watchlist
    .map((c) => {
      const r = state.rates[c];
      const value = r ? (1 / r).toFixed(2) : "—";
      return `<li class="watchlist-item" data-c="${c}">
        <span>1 ${c} = ${value} ETB</span>
        <button type="button" class="delete-btn">×</button>
      </li>`;
    })
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amt = Number(amountInput.value);
  if (!amt || amt <= 0) {
    result.classList.remove("hidden");
    result.textContent = "Enter a valid amount.";
    return;
  }

  const currency = select.value;
  const rate = state.rates[currency];
  if (!rate) {
    result.classList.remove("hidden");
    result.textContent = "Rate not available.";
    return;
  }

  state.amount = amt;
  state.currency = currency;

  const out = (amt / rate).toFixed(2);
  result.classList.remove("hidden");
  result.textContent = `${amt} ${currency} = ${out} ETB`;

  if (!state.watchlist.includes(currency)) {
    state.watchlist.push(currency);
    renderWatchlist();
  }

  save();
});

watchlistEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");
  if (!btn) return;
  const c = btn.closest("li").dataset.c;
  state.watchlist = state.watchlist.filter((x) => x !== c);
  save();
  renderWatchlist();
});

function save() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      watchlist: state.watchlist,
      currency: state.currency,
    })
  );
}

function load() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) Object.assign(state, JSON.parse(saved));
  } catch (err) {
    console.warn("Could not load saved state:", err);
  }
}

async function init() {
  load();
  await loadRates();
  render();
}

init();