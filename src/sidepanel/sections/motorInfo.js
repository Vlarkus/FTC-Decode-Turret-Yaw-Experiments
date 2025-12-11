export function motorInfoSection(parent, sim) {
  const div = document.createElement("div");
  div.className = "ui-section";

  div.innerHTML = `
    <h3>Motor</h3>

    <label>Servo Command: <span id="spVal">${sim.servo.getPosition().toFixed(2)}</span></label>
    <input id="servoSlider" type="range" min="0" max="1" step="0.01" value="${sim.servo.getPosition()}">

    <label>Max Speed: <span id="speedVal">${sim.servo.getMaxSpeed().toFixed(2)}</span></label>
    <input id="speedSlider" type="range" min="0.1" max="1" step="0.1" value="${sim.servo.getMaxSpeed()}">

    <div style="margin-top:10px;">
      <div>Physical Pos: <span id="physVal">0.00</span></div>
      <div>Camera Heading: <span id="headVal">${sim.cameraHeading.toFixed(1)}</span>°</div>
    </div>
  `;

  parent.appendChild(div);

  // === INTERACTION ===

  // Servo command slider
  div.querySelector("#servoSlider").addEventListener("input", e => {
    const value = Number(e.target.value);
    sim.servo.setPosition(value);
    div.querySelector("#spVal").textContent = value.toFixed(2);
  });

  // Max speed slider
  div.querySelector("#speedSlider").addEventListener("input", e => {
    const speed = Number(e.target.value);
    sim.servo.setMaxSpeed(speed);
    div.querySelector("#speedVal").textContent = speed.toFixed(2);
  });

  // === LIVE OUTPUT UPDATE ===
  function updateMotor() {
    div.querySelector("#physVal").textContent =
      sim.servo.getPhysicalPosition().toFixed(2);

    div.querySelector("#headVal").textContent =
      sim.cameraHeading.toFixed(1);

    requestAnimationFrame(updateMotor);
  }
  updateMotor();
}
