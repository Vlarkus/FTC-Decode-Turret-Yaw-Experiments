import "./style.css";
import { initSidePanel } from "./ui/sidepanel/sidepanel.js";
import { initCanvas, renderFrame } from "./graphics/canvas.js";

const app = document.querySelector("#app");
app.innerHTML = "";

// Initialize UI
initSidePanel(app);

// Initialize Canvas
initCanvas(app);

// Render Loop
function loop() {
  renderFrame();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
