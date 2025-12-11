export function algorithmSelectorSection(parent, sim) {
  const div = document.createElement("div");
  div.className = "ui-section";

  const algoNames = Object.keys(sim.algorithms);
  const hasAlgorithms = algoNames.length > 0;

  const options = hasAlgorithms
    ? algoNames.map(name => `<option value="${name}">${name}</option>`).join("")
    : `<option value="none">None available</option>`;

  div.innerHTML = `
    <h3>Algorithm</h3>
    <select id="algoSelect">${options}</select>
    <div style="margin-top:8px;">
      Active: <span id="activeAlgo">${sim.activeAlgorithmName}</span>
    </div>
  `;

  parent.appendChild(div);

  const select = div.querySelector("#algoSelect");

  // If algorithms exist, set the initial one; otherwise disable dropdown
  if (hasAlgorithms) {
    select.value = sim.activeAlgorithmName;
    select.disabled = false;
  } else {
    select.value = "none";
    select.disabled = true;
  }

  select.addEventListener("change", e => {
    const name = e.target.value;
    sim.setAlgorithm(name);
    div.querySelector("#activeAlgo").textContent = name;
  });
}
