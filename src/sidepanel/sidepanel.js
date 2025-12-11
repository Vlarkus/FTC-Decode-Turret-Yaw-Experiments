import { cameraInfoSection } from "./sections/cameraInfo.js";
import { motorInfoSection } from "./sections/motorInfo.js";
import { targetInfoSection } from "./sections/targetInfo.js";
import { initControlPanel } from "./sections/controlPanel.js";
import { algorithmSelectorSection } from "./sections/algorithmSelector.js";

export function initSidePanel(sidepanelElem, sim, controlState) {
  // Use the existing sidepanelElem instead of creating a new div
  sidepanelElem.innerHTML = `
    <div id="sidepanel-header">
      <h2>Simulation Panel</h2>
    </div>
  `;

  initControlPanel(sidepanelElem, sim, controlState);
  algorithmSelectorSection(sidepanelElem, sim);

  cameraInfoSection(sidepanelElem, sim);
  motorInfoSection(sidepanelElem, sim);
  targetInfoSection(sidepanelElem, sim);
}
