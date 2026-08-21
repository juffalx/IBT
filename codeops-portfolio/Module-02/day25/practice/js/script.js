const checkboxes = document.querySelectorAll("#checklist input");
const scoreEl = document.querySelector("#score");

function updateScore() {
  const checked = document.querySelectorAll("#checklist input:checked").length;
  scoreEl.textContent = checked + " of " + checkboxes.length + " checked";
}

checkboxes.forEach((box) => box.addEventListener("change", updateScore));
updateScore();
