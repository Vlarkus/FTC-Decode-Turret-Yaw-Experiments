import { cameraInfoSection } from "./sections/cameraInfo.js";
import { motorInfoSection } from "./sections/motorInfo.js";
import { targetInfoSection } from "./sections/targetInfo.js";
import { initControlPanel } from "./sections/controlPanel.js";
import { algorithmSelectorSection } from "./sections/algorithmSelector.js";
import { buildAlgorithmTunables } from "./sections/algorithmTunables.js";

export function initSidePanel(sidepanelElem, sim, controlState) {
  sidepanelElem.innerHTML = `
    <div id="sidepanel-header">
      <h2>Simulation Panel</h2>
    </div>
  `;

  initControlPanel(sidepanelElem, sim, controlState);
  algorithmSelectorSection(sidepanelElem, sim);

  // Create a container for tunables
  const tunablesDiv = document.createElement("div");
  tunablesDiv.id = "algorithm-tunables";
  tunablesDiv.className = "ui-section";
  sidepanelElem.appendChild(tunablesDiv);

  // Build tunables for the starting algorithm
  buildAlgorithmTunables(sim.activeAlgorithm, tunablesDiv);

  cameraInfoSection(sidepanelElem, sim);
  motorInfoSection(sidepanelElem, sim);
  targetInfoSection(sidepanelElem, sim);
}

