const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

const statusEl = document.getElementById("status");
const listEl = document.getElementById("dishList");
const refreshBtn = document.getElementById("refreshBtn");

async function load() {
  refreshBtn.disabled = true;
  statusEl.textContent = "Loading...";
  statusEl.classList.remove("error");
  listEl.innerHTML = "";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    const dishes = data.meals || [];

    dishes.forEach((dish) => {
      const li = document.createElement("li");
      li.textContent = dish.strMeal;
      listEl.appendChild(li);
    });

    statusEl.textContent = `Loaded ${dishes.length} dishes.`;
  } catch (err) {
    statusEl.textContent = "Something went wrong while loading the dishes. Please try again.";
    statusEl.classList.add("error");
  } finally {
    refreshBtn.disabled = false;
  }
}

refreshBtn.addEventListener("click", load);

load();
