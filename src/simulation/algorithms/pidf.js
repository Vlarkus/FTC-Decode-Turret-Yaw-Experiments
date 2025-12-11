export default {
  name: "pdf",

  params: {
    kP:       { value: 0.0003, min: 0, max: 0.01, step: 0.00001 },
    kD:       { value: 0.00005, min: 0, max: 0.01, step: 0.00001 },
    kF:       { value: 0.005, min: 0, max: 0.02, step: 0.0005 },
    maxDelta: { value: 0.01, min: 0.0001, max: 0.1, step: 0.0001 },
    deadband: { value: 0.2, min: 0, max: 5, step: 0.01 }
  },

  init(sim) {
    this.prevError = 0;
  },

  update(sim, dt) {
    const { camera, servo } = sim;
    const p = this.params;

    if (!camera.tv) {
      this.prevError = 0;
      return;
    }

    const error = camera.tx;
    if (Math.abs(error) < p.deadband.value) {
      this.prevError = error;
      return;
    }

    let dError = (error - this.prevError) / dt;
    if (Math.abs(error) < 0.1) dError = 0;

    let output =
      p.kP.value * error +
      p.kD.value * dError +
      p.kF.value * Math.sign(error);

    const md = p.maxDelta.value;
    output = Math.max(-md, Math.min(md, output));

    const newPos = servo.getPosition() + output;
    servo.setPosition(newPos);

    this.prevError = error;
  }
};
