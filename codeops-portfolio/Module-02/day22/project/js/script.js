
const state = {
  rates: {},
  watchlist: [],
  currency: "USD",
  loading: false,
  error: null
};


function render() {
  renderStatus();
  renderCurrencySelect();
  renderWatchlist();
}

function renderStatus() {
  const statusEl = document.querySelector("#status");

  if (state.loading) {
    statusEl.textContent = "Loading rates...";
    statusEl.classList.remove("error");
  } else if (state.error) {
    statusEl.textContent = `Couldn't load rates: ${state.error}`;
    statusEl.classList.add("error");
  } else {
    statusEl.textContent = "";
    statusEl.classList.remove("error");
  }
}

function renderCurrencySelect() {
  const select = document.querySelector("#currency");
  const codes = Object.keys(state.rates);

  if (codes.length === 0) {
    select.innerHTML = "";
    return;
  }

  select.innerHTML = codes
    .map(code => `<option value="${code}">${code}</option>`)
    .join("");

  select.value = state.currency;
}

function renderWatchlist() {
  const ul = document.querySelector("#watchlist");

  if (state.watchlist.length === 0) {
    ul.innerHTML = `<li class="empty">Nothing watched yet — add a currency above.</li>`;
    return;
  }

  ul.innerHTML = state.watchlist
    .map(code => {
      const rate = state.rates[code];
      const rateText = rate !== undefined ? rate.toFixed(4) : "—";
      return `
        <li data-c="${code}">
          <span><span class="code">${code}</span><span class="rate">${rateText}</span></span>
          <button class="remove-watch" data-c="${code}" aria-label="Remove ${code}">×</button>
        </li>
      `;
    })
    .join("");
}


async function loadRates() {
  state.loading = true;
  state.error = null;
  render();

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/ETB");
    if (!res.ok) {
      throw new Error(`server responded ${res.status}`);
    }

    const data = await res.json();
    state.rates = data.rates;

    if (!state.rates[state.currency]) {
      state.currency = "USD";
    }
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

// ---------- convert ----------

function handleConvert(e) {
  e.preventDefault();

  const amountInput = document.querySelector("#amount");
  const resultEl = document.querySelector("#result");
  const raw = amountInput.value.trim();
  const amount = Number(raw);

  if (raw === "" || Number.isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Enter a valid amount greater than 0.";
    return;
  }

  const rate = state.rates[state.currency];
  if (rate === undefined) {
    resultEl.textContent = "Rates aren't loaded yet.";
    return;
  }

  const converted = (amount * rate).toFixed(2);
  resultEl.textContent = `${amount} ETB ≈ ${converted} ${state.currency}`;
}

function handleCurrencyChange(e) {
  state.currency = e.target.value;
  save();
}

//  watchlist ----------

function handleAddWatch() {
  const code = state.currency;
  if (!code || state.watchlist.includes(code)) return;

  state.watchlist.push(code);
  save();
  renderWatchlist();
}

function handleWatchlistClick(e) {
  const btn = e.target.closest(".remove-watch");
  if (!btn) return;

  const code = btn.dataset.c;
  state.watchlist = state.watchlist.filter(c => c !== code);
  save();
  renderWatchlist();
}


function save() {
  const toSave = {
    watchlist: state.watchlist,
    currency: state.currency
  };
  localStorage.setItem("birrwatch", JSON.stringify(toSave));
}

function load() {
  const raw = localStorage.getItem("birrwatch");
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);
    state.watchlist = Array.isArray(saved.watchlist) ? saved.watchlist : [];
    state.currency = saved.currency || "USD";
  } catch {
    // corrupted or old data, ignore it
  }
}


function init() {
  load();

  document.querySelector("#convert-form").addEventListener("submit", handleConvert);
  document.querySelector("#currency").addEventListener("change", handleCurrencyChange);
  document.querySelector("#add-watch").addEventListener("click", handleAddWatch);
  document.querySelector("#watchlist").addEventListener("click", handleWatchlistClick);

  loadRates();
}

init();