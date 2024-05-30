//Inspired by Mondrian Variations - Broadway Boogie Woogie 1943 - Éva Polgár and Sándor Vály, 
//It is the generation of production animation by the level or frequency content of the audio track. Link: https://www.youtube.com/watch?v=62pjrVGyGLM

//Due to Google's server security, you need to click on GO LIVE to run it smoothly.　
//Tap the screen to start playback, space to reset the background


let gridSize = 10;
let soundFile;
let fft;
let lineCount = 0;
let maxLines = 50; // Set the maximum number of lines generated to 50
let currentLineIndex = 0; // Index of currently processed lines

function preload() {
  soundFile = loadSound('assets/music1.mp3'); // Loading a new audio file
}

function setup() {
  createCanvas(650, 690); // Setting the canvas size
  background(0); // Set the background to black
  stroke(255); // Set the line to white

  fft = new p5.FFT();

  // Prompts the user to tap the screen to start audio playback
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Click to start', width / 2, height / 2);
}

function draw() {
  if (soundFile.isPlaying() && lineCount < maxLines) {
    let spectrum = fft.analyze();
    drawLines(spectrum);
  }
}

function drawLines(spectrum) {
  let linesPerFrame = 4; // Number of lines generated per frame

  for (let i = 0; i < linesPerFrame; i++) {
    if (lineCount >= maxLines) return;

    let index = currentLineIndex % (width / gridSize + height / gridSize);
    if (index < height / gridSize) {
      let y = index * gridSize;
      let level = map(spectrum[int(random(0, spectrum.length))], 0, 255, 0, 1);
      if (level > 0.5) {
        line(0, y, width, y); // Setting the horizontal line from left to right
        lineCount++;
      }
    } else {
      let x = (index - height / gridSize) * gridSize;
      let level = map(spectrum[int(random(0, spectrum.length))], 0, 255, 0, 1);
      if (level > 0.5) {
        line(x, 0, x, height); // Setting the vertical line from top to bottom
        lineCount++;
      }
    }
    currentLineIndex++;
  }
}

function mousePressed() {
  if (!soundFile.isPlaying()) {
    soundFile.play(); // Play audio
    background(0); // Reset background
  }
}

function keyPressed() {
  if (key === ' ') {
    background(0); // Press the space bar to reset the background
    lineCount = 0; // Reset Line Counter
    currentLineIndex = 0; // Reset current line index
  }
}
