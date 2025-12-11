import "./style.css";
import { Simulation } from "./simulation/simulation.js";
import { initCanvas, renderFrame } from "./graphics/canvas.js";

const sim = new Simulation();

const app = document.querySelector("#app");
app.innerHTML = "";
initCanvas(app, sim);

let last = performance.now();
function loop(now) {
  const dt = (now - last) / 1000;
  last = now;

  sim.update(dt);
  renderFrame(sim);

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
