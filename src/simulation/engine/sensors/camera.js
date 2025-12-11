export class Camera {
  // ================================
  // ✅ PUBLIC STATE (READ BY ROBOT / UI)
  // ================================

  tv = false;        // target visible
  tx = 0;            // error from CROSSHAIR (degrees)
  distance = 0;      // distance to target (world units)

  fov = 68;          // horizontal FOV in degrees
  crosshairNorm = 0; // [-1, 1] crosshair position inside FOV
  crosshairAngle = 0; // world angle of crosshair (degrees)

  // ================================
  // 🔒 INTERNAL STATE
  // ================================

  #cameraHeading = 0;
  #targetWorldAngle = 0;

  // ================================
  // ✅ MAIN UPDATE (NO RETURNS)
  // ================================

  update(cameraHeading, targetPosition, cameraPosition = { x: 0, y: 0 }) {
    this.#cameraHeading = cameraHeading;

    // 1. Compute crosshair world angle
    this.crosshairAngle =
      cameraHeading + (this.crosshairNorm * this.fov) / 2;

    // 2. Compute target world angle
    const dx = targetPosition.x - cameraPosition.x;
    const dy = targetPosition.y - cameraPosition.y;

    this.#targetWorldAngle = radToDeg(Math.atan2(dy, dx));

    // 3. Compute distance
    this.distance = Math.hypot(dx, dy);

    // 4. Compute FOV edges
    const fovLeft = cameraHeading - this.fov / 2;
    const fovRight = cameraHeading + this.fov / 2;

    // 5. Visibility test
    this.tv = isAngleBetween(
      this.#targetWorldAngle,
      fovLeft,
      fovRight
    );

    // 6. Error from crosshair
    if (this.tv) {
      this.tx = normalizeAngle(
        this.#targetWorldAngle - this.crosshairAngle
      );
    } else {
      this.tx = 0;
      this.distance = 0;
    }
  }
}

// ================================
// ✅ LOCAL MATH UTILITIES
// ================================

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function normalizeAngle(deg) {
  while (deg > 180) deg -= 360;
  while (deg < -180) deg += 360;
  return deg;
}

function isAngleBetween(angle, min, max) {
  angle = normalizeAngle(angle);
  min = normalizeAngle(min);
  max = normalizeAngle(max);

  if (min <= max) {
    return angle >= min && angle <= max;
  } else {
    // Wrap-around case (e.g. 170° to -170°)
    return angle >= min || angle <= max;
  }
}
