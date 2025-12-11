export function drawScene(ctx, w, h) {
  // White text
  ctx.fillStyle = "white";
  ctx.font = "28px Arial";
  ctx.fillText("Canvas Render Works", 40, 60);

  // White camera point
  const cx = w / 2;
  const cy = h / 2;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();

  // Fake FOV lines
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + 200, cy - 120);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + 200, cy + 120);
  ctx.stroke();

  // Green dashed crosshair
  ctx.strokeStyle = "lime";
  ctx.setLineDash([10, 5]);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + 250, cy);
  ctx.stroke();
  ctx.setLineDash([]);

  // Red placeholder target
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(cx + 150, cy + 60, 8, 0, Math.PI * 2);
  ctx.fill();
}
