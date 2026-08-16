/* Exercise 1 —  */
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
}

// restore on load
applyTheme(localStorage.getItem("theme") || "light");

// save on change
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});


/*Exercise 2  */
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


/* Exercise 3  */
const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorEl = document.getElementById("error");
const countEl = document.getElementById("count");


/* Exercise 4  */
const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate(name, phone) {
  if (name.length < 2) return "Enter your full name (at least 2 characters).";
  if (!PHONE.test(phone)) return "Enter a valid phone.";
  return "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  /* Exercise 5*/
  const message = validate(name, phone);
  errorEl.textContent = message;
  if (message) return;

  /* Exercise 6 */
  const entries = load("signups", []);
  entries.push({ name, phone });
  save("signups", entries);

  form.reset();
  renderCount();
});

function renderCount() {
  const entries = load("signups", []);
  countEl.textContent = `${entries.length} ${entries.length === 1 ? "person has" : "people have"} signed up.`;
}

renderCount();