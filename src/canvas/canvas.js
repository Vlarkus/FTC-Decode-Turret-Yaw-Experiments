import { renderScene } from "./renderer.js";

let canvas, ctx;
let simRef = null;
let controlStateRef = null;

let isDragging = false;

/**
 * Initialize canvas inside the container element.
 */
export function initCanvas(containerElem, sim, controlState) {
  simRef = sim;
  controlStateRef = controlState;

  // Create canvas
  canvas = document.createElement("canvas");
  canvas.id = "mainCanvas";
  containerElem.appendChild(canvas);

  ctx = canvas.getContext("2d");

  // Initial resize to container dimensions
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Click-to-set-target (only when drag mode is OFF)
  canvas.addEventListener("click", e => {
    if (controlStateRef.dragMode) return;
    setTargetFromEvent(e);
  });

  // Drag mode events
  canvas.addEventListener("mousedown", e => {
    if (!controlStateRef.dragMode) return;
    isDragging = true;
    setTargetFromEvent(e);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  canvas.addEventListener("mousemove", e => {
    if (isDragging && controlStateRef.dragMode) {
      setTargetFromEvent(e);
    }
  });
}

/**
 * Resize the canvas to fill its parent container.
 */
function resizeCanvas() {
  if (!canvas || !canvas.parentElement) return;

  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

/**
 * Convert mouse position into world coordinates and update target.
 */
function setTargetFromEvent(event) {
  if (!simRef) return;

  const rect = canvas.getBoundingClientRect();
  const cx = event.clientX - rect.left;
  const cy = event.clientY - rect.top;

  // Convert canvas coords → world coords (camera at center)
  const worldX = cx - canvas.width / 2;
  const worldY = cy - canvas.height / 2;

  simRef.target.setPosition(worldX, worldY);
}

/**
 * Render everything on the canvas.
 */
export function renderFrame(sim) {
  if (!canvas || !ctx) return;
  renderScene(ctx, sim, canvas.width, canvas.height);
}
