export default {
  name: "p",

  params: {
    kP: { value: 0.0003, min: 0, max: 0.01, step: 0.00001 }
  },

  init(sim) {},

  update(sim, dt) {
    const { camera, servo } = sim;
    const p = this.params;

    if (!camera.tv) return;

    const error = camera.tx;
    let output = p.kP.value * error;

    const newPos = servo.getPosition() + output;
    servo.setPosition(newPos);
  }
};
