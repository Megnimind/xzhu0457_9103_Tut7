//Inspired by Mondrian Variations - Broadway Boogie Woogie 1943 - Éva Polgár and Sándor Vály, 
//It is the generation of production animation by the level or frequency content of the audio track. Link: https://www.youtube.com/watch?v=62pjrVGyGLM

//Due to Google's server security, you need to click on GO LIVE to run it smoothly.　
//Tap the screen to start playback, space to reset the background

//Attention!!! Final version update
// Rectangular blocks are drawn by a for loop, generating randomly colored small and large squares by randomly selecting positions and colors in a predefined grid system, 
//After generating random white lines, the canvas is filled using squares composed of the primary colors red, yellow and blue, 
// In Piet Mondrian's work, he used squares of red, yellow and blue primary colors, as well as black, white and gray to emphasize the purity of the colors in the picture. In this way, 
// He created and revived his own technique, a painting formula consisting of horizontal lines, vertical lines, three colors and three non-colors, known as the grid structure.
//Add at the end a set of left-to-right, bottom-to-top order of rapid refresh, until the whole screen is covered up to, that is, you can clear the screen by space, the code will loop. 

let gridSize = 10;
let soundFile;
let fft;
let lineCount = 0;
let maxLines = 50; // Set the maximum number of lines to generate
let currentLineIndex = 0; // Current line index
let colors = ['#FF0000', '#FFD700', '#0000FF', '#000000', '#FFFFFF', '#D3D3D3']; // Red, Yellow, Blue, Black, White, Gray
let generateSmallBlocks = false; // Flag to generate small blocks
let generateLargeBlocks = false; // Flag to generate large blocks
let extendBlocks = false; // Flag to extend blocks
let currentBlockIndex = 0;
let noiseScale = 0.02;
let blockStartTime = 0;
let canvasWidth = 650;
let canvasHeight = 690;
let initialPhase = true; // Flag to keep track of initial phase
let interactionStartTime = 0;
let interactionEnabled = false; // Flag to enable interaction
let canvasX, canvasY;

function preload() {
  soundFile = loadSound('assets/music1.mp3'); // Load the new audio file
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Set the initial canvas size to the full window
  background(0); // Set the background to black
  stroke(255); // Set the stroke color to white

  fft = new p5.FFT();

  // Calculate the position to center the initial canvas
  canvasX = (windowWidth - canvasWidth) / 2;
  canvasY = (windowHeight - canvasHeight) / 2;

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
      if (millis() - blockStartTime > 10000) { // Check if 10 seconds have passed since large blocks started generating
        extendBlocks = true;
        generateLargeBlocks = false;
        initialPhase = false; // End the initial phase
        interactionStartTime = millis(); // Start interaction timer
      } else {
        drawLargeColorBlocks();
      }
    } else if (extendBlocks) {
      extendColorBlocks(); // Extend color blocks to fill the screen
    } else {
      generateSmallBlocks = true; // Start generating small blocks
    }
  }

  if (interactionEnabled && millis() - interactionStartTime > 17000) { // Enable interaction after 17 seconds
    animateBlocks(); // Call the function to animate blocks
  }
}

function drawLines(spectrum) {
  let linesPerFrame = 4; // Number of lines generated per frame

  for (let i = 0; i < linesPerFrame; i++) {
    if (lineCount >= maxLines) return;

    let index = currentLineIndex % (canvasWidth / gridSize + canvasHeight / gridSize);
    if (index < canvasHeight / gridSize) {
      let y = canvasY + index * gridSize;
      let level = map(spectrum[int(random(0, spectrum.length))], 0, 255, 0, 1);
      if (level > 0.5) {
        line(canvasX, y, canvasX + canvasWidth, y); // Horizontal line from left to right
        lineCount++;
      }
    } else {
      let x = canvasX + (index - canvasHeight / gridSize) * gridSize;
      let level = map(spectrum[int(random(0, spectrum.length))], 0, 255, 0, 1);
      if (level > 0.5) {
        line(x, canvasY, x, canvasY + canvasHeight); // Vertical line from top to bottom
        lineCount++;
      }
    }
    currentLineIndex++;
  }
}

function drawSmallColorBlocks() {
  let blocksPerFrame = 8; // Number of small color blocks generated per frame

  for (let i = 0; i < blocksPerFrame; i++) {
    if (currentBlockIndex >= (canvasWidth / gridSize) * (canvasHeight / gridSize)) {
      generateSmallBlocks = false;
      generateLargeBlocks = true; // Finish generating small blocks, start generating large blocks
      blockStartTime = millis(); // Record the time when large blocks start generating
      return;
    }

    let x = canvasX + int(random(canvasWidth / gridSize)) * gridSize;
    let y = canvasY + int(random(canvasHeight / gridSize)) * gridSize;

    let colorIndex = int(random(colors.length));
    fill(colors[colorIndex]);
    rect(x, y, gridSize, gridSize);
    currentBlockIndex++;
  }
}

function drawLargeColorBlocks() {
  let blocksPerFrame = 8; // Number of large color blocks generated per frame

  for (let i = 0; i < blocksPerFrame; i++) {
    let x = canvasX + int(random(canvasWidth / (gridSize * 2))) * gridSize * 2;
    let y = canvasY + int(random(canvasHeight / (gridSize * 2))) * gridSize * 2;

    let colorIndex = int(random(colors.length));
    fill(colors[colorIndex]);
    rect(x, y, gridSize * 2, gridSize * 2);
  }
}

function extendColorBlocks() {
  let blocksPerFrame = 36; // Number of color blocks to extend per frame, 4x speed

  // Generate across the entire window
  for (let i = 0; i < blocksPerFrame; i++) {
    let x = int(random(windowWidth / gridSize)) * gridSize;
    let y = int(random(windowHeight / gridSize)) * gridSize;

    let noiseVal = noise(x * noiseScale, y * noiseScale);
    let colorIndex = int(map(noiseVal, 0, 1, 0, colors.length));
    fill(colors[colorIndex]);
    rect(x, y, gridSize, gridSize);
  }

  // Start enabling interaction after all blocks have been extended
  if (!interactionEnabled) {
    interactionStartTime = millis();
    interactionEnabled = true;
  }
}

function animateBlocks() {
  let cols = width / gridSize;
  let rows = height / gridSize;
  let randomRow = int(random(rows));
  let randomCol = int(random(cols));
  let direction = int(random(2)); // 0 for horizontal, 1 for vertical

  if (direction == 0) { // Horizontal animation
    for (let x = 0; x < cols; x++) {
      let colorIndex = int(random(colors.length));
      fill(colors[colorIndex]);
      rect(x * gridSize, randomRow * gridSize, gridSize, gridSize);
    }
  } else { // Vertical animation
    for (let y = 0; y < rows; y++) {
      let colorIndex = int(random(colors.length));
      fill(colors[colorIndex]);
      rect(randomCol * gridSize, y * gridSize, gridSize, gridSize);
    }
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
    extendBlocks = false; // Reset the extend blocks flag
    currentBlockIndex = 0; // Reset the color block index
    initialPhase = true; // Reset the initial phase flag
    interactionEnabled = false; // Disable interaction
    resizeCanvas(windowWidth, windowHeight); // Reset canvas size to initial size
  }
}
