import { Servo } from "./actuators/servo.js";
import { Camera } from "./sensors/camera.js";
import { Target } from "./world/target.js";

export class Simulation {
  constructor() {
    this.servo = new Servo({ maxSpeed: 1.0 });
    this.camera = new Camera();
    this.target = new Target(250, 0);

    this.angleMin = 0;   // servo = 0  → -90 degrees
    this.angleMax =  360;   // servo = 1  → +90 degrees

    this.activeAlgorithm = null;
  }

  // Convert servo shaft position (0–1) into world heading in degrees
  get cameraHeading() {
    const p = this.servo.getPhysicalPosition();
    return this.angleMin + (this.angleMax - this.angleMin) * p;
  }

  // Call this from main loop
  update(dt) {
    // 1. Actuator physics
    this.servo.update(dt);

    // 2. Sensor model
    this.camera.update(
      this.cameraHeading,
      this.target.getPosition(),
      { x: 0, y: 0 }
    );

    // 3. Optional: run active algorithm
    if (this.activeAlgorithm) {
      this.activeAlgorithm({
        servo: this.servo,
        camera: this.camera,
        target: this.target,
        dt: dt
      });
    }
  }

  // Allow UI to choose algorithm dynamically
  setAlgorithm(algoFunction) {
    this.activeAlgorithm = algoFunction;
  }
}
