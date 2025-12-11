import { buildAlgorithmTunables } from "./algorithmTunables.js";

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
  select.value = sim.activeAlgorithmName;

  select.addEventListener("change", e => {
    const algoName = e.target.value;

    sim.setAlgorithm(algoName);
    div.querySelector("#activeAlgo").textContent = algoName;

    // 🔥 REQUIRED FIX — rebuild tunables UI
    const tunablesDiv = document.getElementById("algorithm-tunables");
    buildAlgorithmTunables(sim.activeAlgorithm, tunablesDiv);
  });
}
