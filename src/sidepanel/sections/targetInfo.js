export function targetInfoSection(parent, sim) {
  const div = document.createElement("div");
  div.className = "ui-section";

  div.innerHTML = `
    <h3>Target</h3>

    <label>X: <input id="txInput" type="number" value="${sim.target.x}"></label>
    <label>Y: <input id="tyInput" type="number" value="${sim.target.y}"></label>
  `;

  parent.appendChild(div);

  const txInput = div.querySelector("#txInput");
  const tyInput = div.querySelector("#tyInput");

  // === USER MANUAL INPUT ===
  txInput.addEventListener("input", e => {
    sim.target.x = Number(e.target.value);
  });

  tyInput.addEventListener("input", e => {
    sim.target.y = Number(e.target.value);
  });

  // === AUTO REFRESH (BUT ONLY WHEN NOT EDITING) ===
  function sync() {
    if (document.activeElement !== txInput) {
      txInput.value = sim.target.x.toFixed(1);
    }
    if (document.activeElement !== tyInput) {
      tyInput.value = sim.target.y.toFixed(1);
    }

    requestAnimationFrame(sync);
  }
  sync();
}
