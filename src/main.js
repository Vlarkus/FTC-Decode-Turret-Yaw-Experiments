import "./style.css";
import { Simulation } from "./simulation/simulation.js";
import { initCanvas, renderFrame } from "./canvas/canvas.js";
import { initSidePanel } from "./sidepanel/sidepanel.js";

const sim = new Simulation();

const controlState = {
  playing: true,
  stepRequested: false,
  dragMode: false
};

const app = document.querySelector("#app");
app.innerHTML = `
  <div id="layout">
    <div id="sidepanel"></div>
    <div id="canvas-container"></div>
  </div>
`;

const sidepanelElem = document.getElementById("sidepanel");
const canvasContainer = document.getElementById("canvas-container");

initSidePanel(sidepanelElem, sim, controlState);
initCanvas(canvasContainer, sim, controlState);



let last = performance.now();

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;

  if (controlState.playing || controlState.stepRequested) {
    sim.update(dt);
    controlState.stepRequested = false;
  }

  renderFrame(sim);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
