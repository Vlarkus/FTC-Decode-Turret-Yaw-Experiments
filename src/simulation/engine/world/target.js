export class Target {
  constructor(x = 200, y = 0, id = 1) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  // ================================
  // ✅ POSITION CONTROL
  // ================================

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  // ================================
  // ✅ GEOMETRIC QUERIES (USED BY CAMERA)
  // ================================

  getWorldAngleFrom(origin = { x: 0, y: 0 }) {
    const dx = this.x - origin.x;
    const dy = this.y - origin.y;
    return radToDeg(Math.atan2(dy, dx));
  }

  getDistanceFrom(origin = { x: 0, y: 0 }) {
    const dx = this.x - origin.x;
    const dy = this.y - origin.y;
    return Math.hypot(dx, dy);
  }
}

// ================================
// ✅ LOCAL UTILITIES
// ================================

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}
