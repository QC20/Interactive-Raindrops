let raindrops = [];
let boxes = [];
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
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
  
  // Create the boxes
  let numBoxes = 100;
  let boxSize = 40;
  for (let i = 0; i < numBoxes; i++) {
    let x = random(width);
    let y = random(height);
    let color = getRandomColor();
    let box = new Box(x, y, boxSize, color);
    boxes.push(box);
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
    
    // Check collision with boxes
    for (let j = boxes.length - 1; j >= 0; j--) {
      let box = boxes[j];
      if (raindrop.hits(box)) {
        box.tumble();
      }
    }
    
    // Remove raindrops that fall off the screen
    if (raindrop.offScreen()) {
      raindrops.splice(i, 1);
    }
  }
  
  // Update and display boxes
  for (let box of boxes) {
    box.update();
    box.display();
  }
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
  
  hits(box) {
    let raindropBottom = this.y + this.size / 2;
    let boxTop = box.y - box.size / 2;
    return raindropBottom >= boxTop;
  }
}

class Box {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.angle = 0;
    this.angularVelocity = 0;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
  }
  
  tumble() {
    this.angularVelocity = random(-0.1, 0.1);
  }
  
  update() {
    this.angle += this.angularVelocity;
  }
}

function getRandomColor() {
  let r = random(100, 255);
  let g = random(100, 255);
  let b = random(100, 255);
  return color(r, g, b);
}
