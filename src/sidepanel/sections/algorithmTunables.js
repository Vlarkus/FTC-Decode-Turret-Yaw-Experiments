export function buildAlgorithmTunables(algorithm, parentElem) {
  parentElem.innerHTML = "";

  if (!algorithm || !algorithm.params) {
    parentElem.innerHTML = "<h3>No Tunable Parameters</h3>";
    return;
  }

  const params = algorithm.params;

  for (const key in params) {
    const p = params[key];

    const row = document.createElement("div");
    row.className = "tunable-row";

    row.innerHTML = `
      <label>${key}: <span class="val">${p.value}</span></label>
      <input type="range"
             min="${p.min}"
             max="${p.max}"
             step="${p.step}"
             value="${p.value}">
    `;

    const slider = row.querySelector("input");
    const val = row.querySelector(".val");

    slider.addEventListener("input", () => {
      p.value = Number(slider.value);
      val.textContent = p.value;
    });

    parentElem.appendChild(row);
  }
}
