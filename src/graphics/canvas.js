import { drawScene } from "./renderer.js";

let canvas, ctx;

export function initCanvas(appElem) {
  canvas = document.createElement("canvas");
  canvas.id = "mainCanvas";
  appElem.appendChild(canvas);

  ctx = canvas.getContext("2d");

  resize();
  window.addEventListener("resize", resize);
}

function resize() {
  canvas.width = window.innerWidth - 260;
  canvas.height = window.innerHeight;
}

export function renderFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScene(ctx, canvas.width, canvas.height);
}
