const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.querySelector("#checkout");
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const errEl = document.querySelector("#form-error");

function validate({ name, phone }) {
  if (!name.trim()) return "Please enter your name.";
  if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone.";
  return "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = { name: nameEl.value, phone: phoneEl.value };
  const msg = validate(data);
  errEl.textContent = msg;
  if (msg) return;
  errEl.style.color = "green";
  errEl.textContent = "Order placed for " + data.name + "!";
  form.reset();
});
