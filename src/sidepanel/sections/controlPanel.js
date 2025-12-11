export function initControlPanel(appElem, sim, controlState) {
  const panel = document.createElement("div");
  panel.id = "controlpanel";
  panel.className = "ui-section";

  panel.innerHTML = `
    <h3>Controls</h3>

    <div>
      <button id="stepBtn">Step</button>
      <button id="playBtn">Play</button>
      <button id="resetBtn">Reset</button>
    </div>

    <label class="checkbox-inline">
      <input id="dragModeToggle" type="checkbox">
      Drag to Move Target
    </label>
  `;

  appElem.appendChild(panel);

  // STEP
  panel.querySelector("#stepBtn").addEventListener("click", () => {
    controlState.stepRequested = true;
  });

  // PLAY/PAUSE
  const playBtn = panel.querySelector("#playBtn");
  playBtn.addEventListener("click", () => {
    controlState.playing = !controlState.playing;
    playBtn.textContent = controlState.playing ? "Pause" : "Play";
  });

  // RESET (NEW)
  panel.querySelector("#resetBtn").addEventListener("click", () => {
    if (typeof sim.reset === "function") sim.reset();
  });

  // DRAG MODE
  panel.querySelector("#dragModeToggle").addEventListener("change", e => {
    controlState.dragMode = e.target.checked;
  });
}
