export function initControlPanel(appElem, sim, controlState) {
  const panel = document.createElement("div");
  panel.id = "controlpanel";
  panel.className = "ui-section";

panel.innerHTML = `
  <h3>Controls</h3>

  <div>
    <button id="stepBtn">Step</button>
    <button id="playBtn">Play</button>
  </div>

  <label class="checkbox-inline">
    <input id="dragModeToggle" type="checkbox">
    Drag to Move Target
  </label>
`;


  appElem.appendChild(panel);

  // STEP BUTTON
  panel.querySelector("#stepBtn").addEventListener("click", () => {
    controlState.stepRequested = true;
  });

  // PLAY/PAUSE BUTTON
  const playBtn = panel.querySelector("#playBtn");
  playBtn.addEventListener("click", () => {
    controlState.playing = !controlState.playing;
    playBtn.textContent = controlState.playing ? "Pause" : "Play";
  });

  // DRAG MODE TOGGLE
  panel.querySelector("#dragModeToggle").addEventListener("change", e => {
    controlState.dragMode = e.target.checked;
  });
}
