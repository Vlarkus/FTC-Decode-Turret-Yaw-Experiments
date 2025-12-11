export function cameraInfoSection(parent, sim) {
  const div = document.createElement("div");
  div.className = "ui-section";

  div.innerHTML = `
    <h3>Camera</h3>

    <label>FOV: <span id="fovValue">${sim.camera.fov}</span>°</label>
    <input id="fovSlider" type="range" min="10" max="150" value="${sim.camera.fov}">

    <label>Crosshair Position: <span id="crossVal">${sim.camera.crosshairNorm}</span></label>
    <input id="crosshairSlider" type="range" min="-1" max="1" step="0.01" value="${sim.camera.crosshairNorm}">

    <div style="margin-top:10px;">
      <div>Visible: <span id="tvVal">${sim.camera.tv}</span></div>
      <div>tx Error: <span id="txVal">${sim.camera.tx.toFixed(2)}</span>°</div>
      <div>Distance: <span id="distVal">${sim.camera.distance.toFixed(2)}</span></div>
    </div>
  `;

  parent.appendChild(div);

  // === HOOK UI TO SIMULATION ===

  div.querySelector("#fovSlider").addEventListener("input", e => {
    sim.camera.fov = Number(e.target.value);
    div.querySelector("#fovValue").textContent = sim.camera.fov;
  });

  div.querySelector("#crosshairSlider").addEventListener("input", e => {
    sim.camera.crosshairNorm = Number(e.target.value);
    div.querySelector("#crossVal").textContent = sim.camera.crosshairNorm;
  });

  // === LIVE READOUT UPDATE ===
  function updateReadouts() {
    div.querySelector("#tvVal").textContent = sim.camera.tv;
    div.querySelector("#txVal").textContent = sim.camera.tx.toFixed(2);
    div.querySelector("#distVal").textContent = sim.camera.distance.toFixed(2);
    requestAnimationFrame(updateReadouts);
  }
  updateReadouts();
}
