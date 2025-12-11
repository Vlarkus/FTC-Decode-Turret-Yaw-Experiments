export class Encoder {
  constructor(servo) {
    this.servo = servo; // reference to the simulated servo
  }

  // Returns the true mechanical position of the servo [0–1]
  getPosition() {
    if (!this.servo) return 0;
    return this.servo.getPhysicalPosition();
  }

  // Optional helper: return scaled degrees
  getAngle(angleMin = 0, angleMax = 360) {
    const p = this.getPosition();
    return angleMin + (angleMax - angleMin) * p;
  }
}
