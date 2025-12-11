export default {
  name: "incremental",

  init(sim) {},

  update(sim, dt) {
    const { camera, servo } = sim;

    if (!camera.tv) return;

    const error = camera.tx;
    const sign = Math.sign(error);
    if (sign === 0) return;

    let step = 0;

    if (Math.abs(error) > 15) {
      step = 0.005 * sign;
    } else if (Math.abs(error) > 5) {
      step = 0.0005 * sign;
    } else {
      step = 0.0001 * sign;
    }

    servo.setPosition(servo.getPosition() + step);
  }
};
