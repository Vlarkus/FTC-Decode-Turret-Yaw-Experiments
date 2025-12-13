# About This Project
This is a short self-hosted simulation environment to easily test various methods for turret target aiming using camera detection. I used this to experiment with various methods to track a target if our robot does not have an encoder to know current position. In short, this project showed that it is possible to accurately aim at a target, it is heavily limited to the angular speed of the servo. This simulation proves visually that it is impossible to fully implement a PIDF algoritm for tracking due to not enough input information (unless using encoder); only P coefficient is relatively useful.

# To Run

```
npm run dev
```
