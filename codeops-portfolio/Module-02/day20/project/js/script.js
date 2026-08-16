const out = document.querySelector("#facts");
const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");


function renderMessage(text, isError = false) {
  out.innerHTML = "";
  const msg = document.createElement("p");
  msg.className = isError ? "state-message state-message--error" : "state-message";
  msg.textContent = text;
  out.appendChild(msg);
}


function renderFactRow(list, label, value) {
  const row = document.createElement("li");
  row.className = "fact-row";

  const labelEl = document.createElement("span");
  labelEl.className = "fact-row__label";
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.className = "fact-row__value";
  valueEl.textContent = value;

  row.appendChild(labelEl);
  row.appendChild(valueEl);
  list.appendChild(row);
}


function renderCountryCard(country) {
  out.innerHTML = "";

  const card = document.createElement("article");
  card.className = "card";

  // Stamp accent
  const stamp = document.createElement("div");
  stamp.className = "card__stamp";
  stamp.textContent = country.alpha2Code ? country.alpha2Code : "—";
  card.appendChild(stamp);

  const header = document.createElement("div");
  header.className = "card__header";

  const flag = document.createElement("img");
  flag.className = "card__flag";
  flag.src = country.flags?.png || "";
  flag.alt = `Flag of ${country.name}`;

  const titleGroup = document.createElement("div");
  titleGroup.className = "card__title-group";

  const name = document.createElement("h2");
  name.className = "card__name";
  name.textContent = country.name;

  const nativeName = document.createElement("span");
  nativeName.className = "card__official";
  nativeName.textContent = country.nativeName || "";

  titleGroup.appendChild(name);
  if (country.nativeName) titleGroup.appendChild(nativeName);
  header.appendChild(flag);
  header.appendChild(titleGroup);
  card.appendChild(header);

  const factsList = document.createElement("ul");
  factsList.className = "card__facts";

  const capital = country.capital || "No capital listed";
  const population = country.population?.toLocaleString() || "Unknown";
  const region = [country.region, country.subregion].filter(Boolean).join(" · ");
  const currencies = country.currencies?.length
    ? country.currencies.map((c) => `${c.name} (${c.symbol || "—"})`).join(", ")
    : "Unknown";
  const languages = country.languages?.length
    ? country.languages.map((l) => l.name).join(", ")
    : "Unknown";

  renderFactRow(factsList, "Capital", capital);
  renderFactRow(factsList, "Population", population);
  renderFactRow(factsList, "Region", region);
  renderFactRow(factsList, "Currencies", currencies);
  renderFactRow(factsList, "Languages", languages);

  card.appendChild(factsList);
  out.appendChild(card);
}


async function showCountry(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    renderMessage("Type a country name to search.");
    return;
  }

  renderMessage("Loading…");

  try {
    
    const res = await fetch(
      `https://countries.dev/name/${encodeURIComponent(trimmed)}`
    );

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const data = await res.json();
    const [country] = data;

    if (!country) {
      throw new Error("Country not found");
    }

    renderCountryCard(country);
  } catch (err) {
   
    const message =
      err.message === "Country not found"
        ? "Country not found. Check the spelling and try again."
        : "Something went wrong reaching the atlas. Please try again.";
    renderMessage(message, true);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showCountry(input.value);
});

showCountry("Ethiopia");