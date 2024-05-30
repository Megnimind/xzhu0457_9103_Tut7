//Inspired by Mondrian Variations - Broadway Boogie Woogie 1943 - Éva Polgár and Sándor Vály, 
//It is the generation of production animation by the level or frequency content of the audio track. Link: https://www.youtube.com/watch?v=62pjrVGyGLM

//Due to Google's server security, you need to click on GO LIVE to run it smoothly.　
//Tap the screen to start playback, space to reset the background

//NOTE!!!Iteratively updated content
//Rectangular blocks are drawn by for loops to randomly select positions and colors in a predefined grid system as a way of generating random colored small and large squares, 
//after the generation of random white lines, random squares are used to fill the canvas, using the square squares formed by the primary colors of red, 
//yellow and blue in Piet Mondrian's work, while he also used black, white and gray to emphasize the purity of the picture's colors. In this way, 
//he creates and recovers his technique, a painting formula consisting of horizontal lines, vertical lines, three colors and three non-colors, known as the grid structure.

let gridSize = 10;
let soundFile;
let fft;
let lineCount = 0;
let maxLines = 50; // Set the maximum number of lines to generate
let currentLineIndex = 0; // Current line index
let colors = ['#FF0000', '#FFD700', '#0000FF', '#000000', '#FFFFFF', '#D3D3D3']; // Red, Yellow, Blue, Black, White, Gray
let generateSmallBlocks = false; // Flag to generate small blocks
let generateLargeBlocks = false; // Flag to generate large blocks
let currentBlockIndex = 0;

function preload() {
  soundFile = loadSound('assets/music1.mp3'); // Load the new audio file
}

function setup() {
  createCanvas(650, 690); // Set the canvas size
  background(0); // Set the background to black
  stroke(255); // Set the stroke color to white

  fft = new p5.FFT();

  // Prompt the user to click the screen to start audio playback
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Click to start', width / 2, height / 2);
}

function draw() {
  if (soundFile.isPlaying()) {
    let spectrum = fft.analyze();

    if (lineCount < maxLines) {
      drawLines(spectrum);
    } else if (generateSmallBlocks) {
      drawSmallColorBlocks();
    } else if (generateLargeBlocks) {
      drawLargeColorBlocks();
    } else {
      generateSmallBlocks = true; // Start generating small blocks
    }
  }
}

function drawLines(spectrum) {
  let linesPerFrame = 8; // Number of lines generated per frame

  for (let i = 0; i < linesPerFrame; i++) {
    if (lineCount >= maxLines) return;

    let index = currentLineIndex % (width / gridSize + height / gridSize);
    if (index < height / gridSize) {
      let y = index * gridSize;
      let level = map(spectrum[int(random(0, spectrum.length))], 0, 255, 0, 1);
      if (level > 0.5) {
        line(0, y, width, y); // Horizontal line from left to right
        lineCount++;
      }
    } else {
      let x = (index - height / gridSize) * gridSize;
      let level = map(spectrum[int(random(0, spectrum.length))], 0, 255, 0, 1);
      if (level > 0.5) {
        line(x, 0, x, height); // Vertical line from top to bottom
        lineCount++;
      }
    }
    currentLineIndex++;
  }
}

function drawSmallColorBlocks() {
  let blocksPerFrame = 8; // Number of small color blocks generated per frame

  for (let i = 0; i < blocksPerFrame; i++) {
    if (currentBlockIndex >= (width / gridSize) * (height / gridSize)) {
      generateSmallBlocks = false;
      generateLargeBlocks = true; // Finish generating small blocks, start generating large blocks
      return;
    }

    let x = int(random(width / gridSize)) * gridSize;
    let y = int(random(height / gridSize)) * gridSize;

    let colorIndex = int(random(colors.length));
    fill(colors[colorIndex]);
    rect(x, y, gridSize, gridSize);
    currentBlockIndex++;
  }
}

function drawLargeColorBlocks() {
  let blocksPerFrame = 8; // Number of large color blocks generated per frame

  for (let i = 0; i < blocksPerFrame; i++) {
    let x = int(random(width / (gridSize * 2))) * gridSize * 2;
    let y = int(random(height / (gridSize * 2))) * gridSize * 2;

    let colorIndex = int(random(colors.length));
    fill(colors[colorIndex]);
    rect(x, y, gridSize * 2, gridSize * 2);
  }
}

function mousePressed() {
  if (!soundFile.isPlaying()) {
    soundFile.play(); // Play the audio
    background(0); // Reset the background
  }
}

function keyPressed() {
  if (key === ' ') {
    background(0); // Reset the background on spacebar press
    lineCount = 0; // Reset the line counter
    currentLineIndex = 0; // Reset the current line index
    generateSmallBlocks = false; // Reset the small block generation flag
    generateLargeBlocks = false; // Reset the large block generation flag
    currentBlockIndex = 0; // Reset the color block index
  }
}
