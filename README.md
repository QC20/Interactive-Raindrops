# Interactive Raindrops

This is an interactive raindrop simulation implemented using p5.js library. It allows users to create raindrops and boxes, which interact with each other based on collision detection. The raindrops fall from the top of the canvas, and when they hit a box, the box starts tumbling and the raindrop gets highlighted.

## Demo

You can see a live demo of the raindrop simulation.
<vid https://github.com/QC20/Interactive-Raindrops/assets/36644388/3fde9098-08e4-4fb6-ab3d-fe5f94e7f974>

## Features

- Raindrops are created based on microphone input, allowing users to control the rain intensity with their voice.
- Boxes are created randomly on the canvas.
- Gyroscope events are supported to adjust raindrop positions based on device movement.
- Raindrops change color based on their velocity.
- Boxes are highlighted when hit by raindrops.
- Interactive mouse events:
  - Click to create new raindrops.
  - Click and drag to create new boxes.

## Getting Started

To run the simulation locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/interactive-raindrops.git

Open the index.html file in your web browser.

Interact with the simulation using the following inputs:
- Voice input: Adjust the rain intensity with your voice.
- Mouse click: Create new raindrops.
- Mouse click and drag: Create new boxes.
- Arrow keys: Adjust rain intensity.
- '+' and '-' keys: Adjust gravity.
- 'C' key: Clear the screen.

## Dependencies
The project relies on the following dependencies:
p5.js: A JavaScript library for creative coding.

## Contributing
Contributions to improve the raindrop simulation are welcome! If you find any bugs or have suggestions for new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
