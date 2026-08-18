const state = {
  rates: {},
  watchlist: [],
  currency: "USD",
  loading: false,
  error: null
};

// ---------- render ----------
function render() {
  const statusEl = document.querySelector("#status");
  if (state.loading) {
    statusEl.textContent = "Loading rates...";
  } else if (state.error) {
    statusEl.textContent = `Error: ${state.error}`;
  } else {
    statusEl.textContent = "";
  }

  const select = document.querySelector("#currency");
  select.innerHTML = Object.keys(state.rates)
    .map(c => `<option value="${c}">${c}</option>`)
    .join("");
  select.value = state.currency;

  renderWatchlist();
}

function renderWatchlist() {
  const ul = document.querySelector("#watchlist");

  if (state.watchlist.length === 0) {
    ul.innerHTML = "<li>No currencies watched yet.</li>";
    return;
  }

  ul.innerHTML = state.watchlist
    .map(c => `
      <li data-c="${c}">
        ${c} — ${state.rates[c] ?? "?"}
        <button class="remove-watch" data-c="${c}">x</button>
      </li>
    `)
    .join("");
}

// ---------- data ----------
async function loadRates() {
  state.loading = true;
  state.error = null;
  render();

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/ETB");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.rates = data.rates;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

// ---------- convert form ----------
function handleConvert(e) {
  e.preventDefault();

  const amountInput = document.querySelector("#amount");
  const amount = Number(amountInput.value);
  const resultEl = document.querySelector("#result");

  if (amountInput.value.trim() === "" || Number.isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Enter a valid positive number.";
    return;
  }

  const rate = state.rates[state.currency];
  if (rate === undefined) {
    resultEl.textContent = "Rate not available.";
    return;
  }

  const converted = (amount * rate).toFixed(2);
  resultEl.textContent = `${amount} ETB = ${converted} ${state.currency}`;
}

// ---------- watchlist events ----------
function handleAddWatch() {
  const c = state.currency;
  if (!state.watchlist.includes(c)) {
    state.watchlist.push(c);
    save();
    render();
  }
}

function handleWatchlistClick(e) {
  if (e.target.matches(".remove-watch")) {
    const c = e.target.dataset.c;
    state.watchlist = state.watchlist.filter(item => item !== c);
    save();
    render();
  }
}

// ---------- persistence ----------
function save() {
  localStorage.setItem("birrwatch", JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency
  }));
}

function load() {
  const raw = localStorage.getItem("birrwatch");
  if (!raw) return;
  const saved = JSON.parse(raw);
  state.watchlist = saved.watchlist || [];
  state.currency = saved.currency || "USD";
}

// ---------- currency select change ----------
function handleCurrencyChange(e) {
  state.currency = e.target.value;
  save();
}

// ---------- init ----------
function init() {
  load();
  document.querySelector("#convert-form").addEventListener("submit", handleConvert);
  document.querySelector("#add-watch").addEventListener("click", handleAddWatch);
  document.querySelector("#watchlist").addEventListener("click", handleWatchlistClick);
  document.querySelector("#currency").addEventListener("change", handleCurrencyChange);
  loadRates();
}

init();