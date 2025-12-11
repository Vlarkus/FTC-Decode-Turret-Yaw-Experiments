export default {
  name: "PIDF (With Encoder)",

  params: {
    kP: { value: 0.0003, min: 0, max: 0.01, step: 0.00001 },
    kI: { value: 0.000001, min: 0, max: 0.001, step: 0.000001 },
    kD: { value: 0.00005, min: 0, max: 0.01, step: 0.00001 },
    kF: { value: 0.005, min: 0, max: 0.05, step: 0.0005 },
  },

  init(sim) {
    this.integral = 0;
    this.prevError = 0;
    this._logTimer = 0; // for throttled console output
  },

  update(sim, dt) {
    const { camera, servo, encoder } = sim;
    const p = this.params;

    if (!camera.tv) return;
    if (!dt || !isFinite(dt) || dt <= 0) return;

    const error = camera.tx;

    // PID math
    this.integral += error * dt;
    const MAX_INTEGRAL = 2000;
    this.integral = Math.max(-MAX_INTEGRAL, Math.min(MAX_INTEGRAL, this.integral));

    const dError =
      this.prevError !== undefined && isFinite(this.prevError)
        ? (error - this.prevError) / dt
        : 0;

    const termP = p.kP.value * error;
    const termI = p.kI.value * this.integral;
    const termD = p.kD.value * dError;
    const termF = p.kF.value * Math.sign(error);

    const output = termP + termI + termD + termF;

    const currentPos = encoder.getPosition();
    const newPos = currentPos + output;

    servo.setPosition(newPos);
    this.prevError = error;

  },
};
