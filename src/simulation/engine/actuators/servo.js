export const ServoDirection = {
  FORWARD: "FORWARD",
  REVERSE:  "REVERSE",
};

export class Servo {
  // ===== FTC-EXPOSED STATE =====
  #commandedPosition = 0;     // [0–1]
  #direction = ServoDirection.FORWARD;
  #scaledMin = 0;
  #scaledMax = 1;
  #enabled   = true;

  // ===== PHYSICAL STATE =====
  #physicalPosition = 0;      // [0–1]
  #maxSpeed = 1.0;            // [0–1] / second
  #movement_threshold = 0.00001;  // ignore tiny commands

  constructor({ maxSpeed = 1.0 } = {}) {
    this.#maxSpeed = maxSpeed;
  }

  // ================================
  // FTC API
  // ================================

  setPosition(p) {
    if (!this.#enabled) return;

    // Clamp & normalize input
    p = clamp(p, 0, 1);

    // Handle direction reversal
    if (this.#direction === ServoDirection.REVERSE) {
      p = 1 - p;
    }

    // Convert normalized p into scaled servo range
    const scaled = lerp(this.#scaledMin, this.#scaledMax, p);

    // Ignore tiny changes (movement threshold)
    if (Math.abs(scaled - this.#commandedPosition) < this.#movement_threshold) {
      return;
    }

    this.#commandedPosition = scaled;
  }

  getPosition() {
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
  // SPEED CONTROL
  // ================================

  setMaxSpeed(speed) {
    this.#maxSpeed = Math.max(0, speed);
  }

  getMaxSpeed() {
    return this.#maxSpeed;
  }

  // ================================
  // PHYSICS UPDATE
  // ================================

  update(dt_seconds) {
    if (!this.#enabled) return;

    const error   = this.#commandedPosition - this.#physicalPosition;
    const maxStep = this.#maxSpeed * dt_seconds;

    const step = clamp(error, -maxStep, maxStep);
    this.#physicalPosition += step;
  }

  getPhysicalPosition() {
    return this.#physicalPosition;
  }
}

// ================================
// Utilities
// ================================

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
