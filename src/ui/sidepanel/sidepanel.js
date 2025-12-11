export function initSidePanel(appElem) {
  const panel = document.createElement("div");
  panel.id = "sidepanel";

  panel.innerHTML = `
    <h2>Simulation Panel</h2>
    <p>This is a placeholder UI.</p>

    <h3>Sliders</h3>
    <div id="sliders"></div>

    <h3>Readouts</h3>
    <div id="readouts"></div>
  `;

  appElem.appendChild(panel);

}