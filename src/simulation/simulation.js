import { Servo } from "./engine/actuators/servo.js";
import { Camera } from "./engine/sensors/camera.js";
import { Target } from "./engine/world/target.js";
import { Encoder } from "./engine/sensors/encoder.js";

export class Simulation {
  constructor() {
    this.servo = new Servo({ maxSpeed: 1.0 });
    this.camera = new Camera();
    this.encoder = new Encoder(this.servo);
    this.target = new Target(250, 0);

    this.angleMin = 0;
    this.angleMax = 300;

    this.algorithms = {};
    this.activeAlgorithm = null;
    this.activeAlgorithmName = "none";

    this.loadAlgorithms();
  }

  get cameraHeading() {
    const p = this.servo.getPhysicalPosition();
    return this.angleMin + (this.angleMax - this.angleMin) * p;
  }

  update(dt) {
    this.servo.update(dt);

    this.camera.update(
      this.cameraHeading,
      this.target.getPosition(),
      { x: 0, y: 0 }
    );

    if (this.activeAlgorithm?.update) {
      this.activeAlgorithm.update(this, dt);
    }
  }

  reset() {
    this.servo = new Servo({ maxSpeed: 1.0 });
    this.camera = new Camera();
    this.target = new Target(250, 0);

    if (this.activeAlgorithm?.init) {
      this.activeAlgorithm.init(this);
    }
  }


  setAlgorithm(name) {
    this.activeAlgorithmName = name;
    this.activeAlgorithm = this.algorithms[name] || null;

    if (this.activeAlgorithm?.init) {
      this.activeAlgorithm.init(this);
    }
  }

  loadAlgorithms() {
    const modules = import.meta.glob("./algorithms/*.js", {
      eager: true
    });

    for (const path in modules) {
      const mod = modules[path];
      const algo = mod.default;

      if (!algo) continue;

      // function export → wrap
      if (typeof algo === "function") {
        const name = this.extractName(path);
        this.algorithms[name] = {
          name,
          update: algo
        };
        continue;
      }

      // object export → must have update()
      if (typeof algo === "object" && typeof algo.update === "function") {
        const name = algo.name || this.extractName(path);
        this.algorithms[name] = algo;
      }
    }
  }

  extractName(path) {
    return path.split("/").pop().replace(".js", "");
  }
}
