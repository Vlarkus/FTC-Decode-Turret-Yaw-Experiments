export default {
  name: "PIDF (NO Encoder)",

  params: {
    kP: { value: 0.0003, min: 0, max: 0.01, step: 0.00001 },
    kI: { value: 0.000001, min: 0, max: 0.001, step: 0.000001 },
    kD: { value: 0.00005, min: 0, max: 0.01, step: 0.00001 },
    kF: { value: 0.005, min: 0, max: 0.05, step: 0.0005 },
  },

  init(sim) {
    this.integral = 0;
    this.prevError = 0;
  },

  update(sim, dt) {
    const { camera, servo } = sim;
    const p = this.params;

    if (!camera.tv) return;

    // Guard against invalid or zero-time updates
    if (!dt || !isFinite(dt) || dt <= 0) return;

    const error = camera.tx;

    // Integrate error with clamping to prevent wind-up
    this.integral += error * dt;
    const MAX_INTEGRAL = 2000; // tune as needed for your scale
    this.integral = Math.max(-MAX_INTEGRAL, Math.min(MAX_INTEGRAL, this.integral));

    // Derivative term with numerical protection
    let dError = 0;
    if (this.prevError !== undefined && isFinite(this.prevError)) {
      dError = (error - this.prevError) / dt;
    }

    const output =
      p.kP.value * error +
      p.kI.value * this.integral +
      p.kD.value * dError +
      p.kF.value * Math.sign(error);

    // Prevent NaN or invalid servo positions
    const currentPos = servo.getPosition();
    const newPos = currentPos + (isFinite(output) ? output : 0);
    servo.setPosition(newPos);

    this.prevError = error;
  },
};
