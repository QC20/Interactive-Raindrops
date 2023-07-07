let raindrops = [];
let balanceThreshold = 100;
let gravity = 0.25;
let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Enable microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Enable Fast Fourier Transform (FFT) to analyze sound
  fft = new p5.FFT();
  fft.setInput(mic);

  // Enable gyroscope events
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener(
            "deviceorientation",
            handleOrientation,
            true
          );
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", handleOrientation, true);
  }
}

function draw() {
  background(255);

  let micLevel = mic.getLevel();
  let rainIntensity = map(micLevel, 0, 1, 0, 1);

  // Create new raindrops based on rain intensity
  if (random() < rainIntensity) {
    let x = random(width);
    let y = random(-50, -10);
    let size = random(10, 30);
    let raindrop = new Raindrop(x, y, size);
    raindrops.push(raindrop);
  }

  // Update and display raindrops
  for (let i = raindrops.length - 1; i >= 0; i--) {
    let raindrop = raindrops[i];
    raindrop.update();
    raindrop.display();

    // Remove raindrops that fall off the screen
    if (raindrop.offScreen()) {
      raindrops.splice(i, 1);
    }
  }

  // Display voice input level bar
  let levelBarWidth = 200;
  let levelBarHeight = 20;
  let level = map(micLevel, 0, 1, 0, levelBarWidth);
  fill(0);
  rect(10, windowHeight - levelBarHeight - 10, levelBarWidth, levelBarHeight);
  fill(0, 255, 0);
  rect(10, windowHeight - levelBarHeight - 10, level, levelBarHeight);
}

function handleOrientation(event) {
  let xAcceleration = event.gamma;

  // Adjust raindrop positions based on device movement
  for (let i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];
    raindrop.balance(xAcceleration);
  }
}

class Raindrop {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = 0;
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;
  }

  display() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size);
  }

  balance(xAcceleration) {
    this.x += xAcceleration;

    if (abs(xAcceleration) > balanceThreshold) {
      this.velocity = 0;
    }
  }

  offScreen() {
    return this.y > height + this.size;
  }
}
