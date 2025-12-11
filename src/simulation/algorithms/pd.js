export default {
  name: "pd",

  init(sim) {
    this.prevError = 0;
  },

  update(sim, dt) {
    const { camera, servo } = sim;

    if (!camera.tv) {
      this.prevError = 0;
      return;
    }

    const error = camera.tx;

    // Deadband to prevent infinite micro-adjustments
    if (Math.abs(error) < 0.2) {
      this.prevError = error;
      return;
    }

    // Derivative term
    let dError = (error - this.prevError) / dt;

    // kill super-small jitter
    if (Math.abs(error) < 0.1) dError = 0;

    // Gains
    const kP = 0.0003;
    const kD = 0.00005;

    let output = kP * error + kD * dError;

    // limit output to prevent outrunning servo physics
    const maxDelta = 0.01;
    output = Math.max(-maxDelta, Math.min(maxDelta, output));

    // Use PHYSICAL position so controller is accurate
    const base = servo.getPhysicalPosition();
    const newPos = base + output;

    servo.setPosition(newPos);

    this.prevError = error;
  }
};
