export function renderScene(ctx, sim, width, height) {
  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);

  drawFOV(ctx, sim.cameraHeading, sim.camera.fov, width, height);

  const targetAngle = getServoTargetAngle(sim);
  drawServoTargetLine(ctx, targetAngle, width, height);

  drawCrosshair(ctx, sim.camera.crosshairAngle, width, height);
  drawCamera(ctx);


  drawLineToTarget(ctx, sim);          
  drawPerpendicularProjection(ctx, sim); 

  drawTarget(ctx, sim.target);

  ctx.restore();
}



// -----------------------------
// DRAW CAMERA
// -----------------------------
function drawCamera(ctx) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
}


// -----------------------------
// DRAW FOV
// -----------------------------
function drawFOV(ctx, heading, fov, width, height) {
  const long = Math.sqrt(width * width + height * height);  // extend off-screen
  const leftAngle = degToRad(heading - fov / 2);
  const rightAngle = degToRad(heading + fov / 2);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.2; // thinner lines

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(leftAngle) * long, Math.sin(leftAngle) * long);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(rightAngle) * long, Math.sin(rightAngle) * long);
  ctx.stroke();
}


// -----------------------------
// DRAW CROSSHAIR
// -----------------------------
function drawCrosshair(ctx, angleDeg, width, height) {
  const long = Math.sqrt(width * width + height * height);
  const a = degToRad(angleDeg);

  ctx.strokeStyle = "lime";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([10, 5]);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(a) * long, Math.sin(a) * long);
  ctx.stroke();

  ctx.setLineDash([]); // reset
}


// -----------------------------
// DRAW TARGET
// -----------------------------
function drawTarget(ctx, target) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(target.x, target.y, 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawLineToTarget(ctx, sim) {
  if (!sim.camera.tv) return;

  ctx.strokeStyle = "orange";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(sim.target.x, sim.target.y);
  ctx.stroke();

  ctx.setLineDash([]); // reset
}

function drawServoTargetLine(ctx, angleDeg, width, height) {
  const long = Math.sqrt(width * width + height * height);
  const a = degToRad(angleDeg);

  ctx.strokeStyle = "magenta";      // pink line
  ctx.lineWidth = 1.4;
  ctx.setLineDash([8, 4]);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(a) * long, Math.sin(a) * long);
  ctx.stroke();

  ctx.setLineDash([]); 
}

function getServoTargetAngle(sim) {
  const p = sim.servo.getPosition(); // commanded [0–1]
  return sim.angleMin + (sim.angleMax - sim.angleMin) * p;
}


function drawPerpendicularProjection(ctx, sim) {
  if (!sim.camera.tv) return;

  const a = degToRad(sim.camera.crosshairAngle);
  const dirX = Math.cos(a);
  const dirY = Math.sin(a);

  const tx = sim.target.x;
  const ty = sim.target.y;

  const proj = tx * dirX + ty * dirY;

  if (proj < 0) return;

  const px = dirX * proj;
  const py = dirY * proj;

  ctx.strokeStyle = "cyan";
  ctx.setLineDash([6, 4]);
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(px, py);
  ctx.stroke();

  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fill();
}



// -----------------------------
// UTILS
// -----------------------------
function degToRad(d) {
  return (d * Math.PI) / 180;
}

