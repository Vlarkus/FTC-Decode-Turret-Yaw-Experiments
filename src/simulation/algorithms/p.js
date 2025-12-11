export default {
  name: "p",

  update(sim, dt) {
    const { camera, servo } = sim;

    // Target must be visible
    if (!camera.tv) return;

    // Error in degrees from crosshair
    const error = camera.tx;

    // Proportional gain (adjustable)
    const kP = 0.0001;

    // Compute new commanded servo position
    const newPos = servo.getPosition() + kP * error;

    // FTC-style: clamp automatically handled by servo.setPosition()
    servo.setPosition(newPos);
  }
};
