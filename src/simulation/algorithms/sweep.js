export default {
  name: "Sweep",

  params: {
    speed: { value: 0.15, min: 0.01, max: 1, step: 0.01 },
    sign:  { value: 1,    min: -1,   max: 1, step: 2 }
  },

  init(sim) {
    this.dir = this.params.sign.value;   // +1 or -1
  },

  update(sim, dt) {
    const servo = sim.servo;

    const pos = servo.getPosition();
    const v = this.params.speed.value * dt * this.dir;

    let newPos = pos + v;

    // bounce at 0 or 1
    if (newPos > 1) {
      newPos = 1;
      this.dir = -this.dir;
    }
    else if (newPos < 0) {
      newPos = 0;
      this.dir = -this.dir;
    }

    servo.setPosition(newPos);
  }
};
