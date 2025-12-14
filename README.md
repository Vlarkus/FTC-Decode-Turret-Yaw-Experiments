# About This Project
This is a short self-hosted simulation environment to easily test various methods for turret target aiming using camera detection. I used this to experiment with various methods to track a target if our robot does not have an encoder to know current position. In short, this project showed that it is possible to accurately aim at a target, it is heavily limited to the angular speed of the servo. This simulation proves visually that it is impossible to fully implement a PIDF algoritm for tracking due to not enough input information (unless using encoder); only P coefficient is relatively useful.

# Example
![Example](public\image.png)
Symbols:
- Red Point - the aiming point that represents April Tag for FTC
- Whie Point & Lines - the camera and its Field of View (FOV)
- Green Line - the crosshair of camera
- Magenta Line - the target position of servo on which camera is mounted
- Cyan Line - the difference between visible aiming point and the crosshair
- Orange Line - the distance to aiming point
- Yellow Arc - the angular difference between current servo position and the target position
- Red Line (under the Green Line) - the current position of servo; it is different from the Green Line because the crosshair may be not always in the center of FOV
- Right Section - has various controllables of the simulation


# To Run

1. Download the repository
2. Open its location in terminal
3. Run the following command:

```
npm run dev
```
4. Enjoy the simulation :]