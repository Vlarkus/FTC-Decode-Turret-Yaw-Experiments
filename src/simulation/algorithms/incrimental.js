export default {
  name: "Incremental",

  // Parameters for easy tuning
  params: {
    highThreshold: { value: 15, min: 1, max: 50, step: 1 },
    midThreshold: { value: 5, min: 0, max: 20, step: 0.5 },
    stepLarge: { value: 0.005, min: 0, max: 0.02, step: 0.0001 },
    stepMedium: { value: 0.0005, min: 0, max: 0.01, step: 0.00001 },
    stepSmall: { value: 0.0001, min: 0, max: 0.005, step: 0.00001 },
  },

  init(sim) {},

  update(sim, dt) {
    const { camera, servo } = sim;
    const p = this.params;

    if (!camera.tv) return;

    const error = camera.tx;
    const sign = Math.sign(error);
    if (sign === 0) return;

    const absErr = Math.abs(error);
    let step = 0;

    if (absErr > p.highThreshold.value) {
      step = p.stepLarge.value * sign;
    } else if (absErr > p.midThreshold.value) {
      step = p.stepMedium.value * sign;
    } else {
      step = p.stepSmall.value * sign;
    }

    servo.setPosition(servo.getPosition() + step);
  },
};
