function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Could not save "${key}":`, err);
    return false;
  }
}

function load(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Corrupt data for "${key}", using fallback:`, err);
    return fallback;
  }
}

const THEME_KEY = "theme";
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
}

function initTheme() {
  const saved = load(THEME_KEY, "light");
  applyTheme(saved);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  save(THEME_KEY, next);
});

const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate(name, phone) {
  if (name.length < 2) return "Enter your full name (at least 2 characters).";
  if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone number, e.g. 0912345678 or +251912345678.";
  return "";
}

const ENTRIES_KEY = "signups";

const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorEl = document.getElementById("error");
const countEl = document.getElementById("count");
const entriesEl = document.getElementById("entries");

function getEntries() {
  return load(ENTRIES_KEY, []);
}

function renderEntries() {
  const entries = getEntries();

  countEl.textContent = `${entries.length} ${entries.length === 1 ? "person has" : "people have"} signed up.`;

  entriesEl.innerHTML = "";
  for (const entry of entries) {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.phone}`;
    entriesEl.appendChild(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const message = validate(name, phone);
  errorEl.textContent = message;
  if (message) return;

  const entries = getEntries();
  entries.push({ name, phone, signedUpAt: new Date().toISOString() });
  save(ENTRIES_KEY, entries);

  form.reset();
  renderEntries();
});

initTheme();
renderEntries();