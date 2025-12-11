import { renderScene } from "./renderer.js";

let canvas, ctx;
let simRef = null;

export function initCanvas(appElem, sim) {
  simRef = sim;

  canvas = document.createElement("canvas");
  canvas.id = "mainCanvas";
  ctx = canvas.getContext("2d");

  appElem.appendChild(canvas);

  resize();
  window.addEventListener("resize", resize);

  canvas.addEventListener("click", onClick);
}

function resize() {
  canvas.width = window.innerWidth - 260;
  canvas.height = window.innerHeight;
}

function onClick(event) {
  if (!simRef) return;

  const rect = canvas.getBoundingClientRect();
  const cx = event.clientX - rect.left;
  const cy = event.clientY - rect.top;

  // Convert canvas coords → simulation coords
  const worldX = cx - canvas.width / 2;
  const worldY = cy - canvas.height / 2;

  simRef.target.setPosition(worldX, worldY);
}

export function renderFrame(sim) {
  renderScene(ctx, sim, canvas.width, canvas.height);
}
