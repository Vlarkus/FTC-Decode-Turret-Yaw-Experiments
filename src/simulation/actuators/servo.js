export const ServoDirection = {
  FORWARD: "FORWARD",
  REVERSE: "REVERSE",
};

export class Servo {
  // ===== FTC-EXPOSED STATE =====
  #commandedPosition = 0;     // Last setPosition() call [0–1]
  #direction = ServoDirection.FORWARD;
  #scaledMin = 0;
  #scaledMax = 1;
  #enabled = true;

  // ===== PHYSICAL (HIDDEN) STATE =====
  #physicalPosition = 0;      // True shaft position after physics [0–1]
  #maxSpeed = 1.0;            // Units per second (0–1 range per second)

  constructor({ maxSpeed = 1.0 } = {}) {
    this.#maxSpeed = maxSpeed;
  }

  // ================================
  // ✅ FTC SERVO API (PUBLIC)
  // ================================

  setPosition(p) {
    if (!this.#enabled) return;

    // Clamp FTC input range
    p = clamp(p, 0, 1);

    // Apply direction
    if (this.#direction === ServoDirection.REVERSE) {
      p = 1 - p;
    }

    // Apply scaled output range
    this.#commandedPosition = lerp(this.#scaledMin, this.#scaledMax, p);
  }

  getPosition() {
    // FTC returns the LAST COMMANDED position (not physical)
    return this.#commandedPosition;
  }

  setDirection(direction) {
    this.#direction = direction;
  }

  scaleRange(min, max) {
    this.#scaledMin = clamp(min, 0, 1);
    this.#scaledMax = clamp(max, 0, 1);
  }

  close() {
    this.#enabled = false;
  }

  // ================================
  // ✅ PHYSICS UPDATE (HIDDEN)
  // ================================

  update(dt_seconds) {
    if (!this.#enabled) return;

    const error = this.#commandedPosition - this.#physicalPosition;
    const maxStep = this.#maxSpeed * dt_seconds;

    const step = clamp(error, -maxStep, maxStep);
    this.#physicalPosition += step;
  }

  // ================================
  // ✅ READ TRUE PHYSICAL POSITION
  // (USED BY TURRET / CAMERA ONLY)
  // ================================

  getPhysicalPosition() {
    return this.#physicalPosition;
  }
}

// ================================
// ✅ SMALL UTILITIES (LOCAL)
// ================================

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
