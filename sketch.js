function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Ensure that the draw() function is only run once
}

function draw() {
  background(255); // Set the background to white
  let gridCount = 55; // 55 rows and 55 columns
  let gridSize = min(width, height) / gridCount; // Dynamically calculates the grid size to fit the screen size, keeping the grid in the center of the screen

  let startX = (width - gridSize * gridCount) / 2; // Calculate the x-coordinate of the start of the drawing to center the grid
  let startY = (height - gridSize * gridCount) / 2; // Calculate the y-coordinate of the start of the drawing to center the grid

  let minArea = 0.35 * gridCount * gridCount;
  let maxArea = 0.45 * gridCount * gridCount;

  // Generate a fixed blank area and draw it
  let fixedSpaces = generateFixedSpaces(gridCount, minArea, maxArea);
  noStroke(); // Disable Stroke
  fill('#FFFFFF'); // Set the color of the blank area to white
  fixedSpaces.forEach(space => {
    rect(startX + space.x * gridSize, startY + space.y * gridSize, space.w * gridSize, space.h * gridSize);
  });

  // Set up an array of colors to increase the frequency of occurrence of yellow and white
  let colors = ['#FDFD96', '#FDFD96', '#FDFD96', '#FFFFFF', '#FFFFFF', '#0000FF', '#FF0000', '#808080'];
  // Draw small squares of random color in the remaining space
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      if (!fixedSpaces.some(space => x >= space.x && x < space.x + space.w && y >= space.y && y < space.y + space.h)) {
        let colorIndex = floor(random(colors.length));
        fill(colors[colorIndex]); // Setting the color
        rect(startX + x * gridSize, startY + y * gridSize, gridSize, gridSize); // 绘制单个小方块
      }
    }
  }

  // Generate and draw large squares to be placed at the top of the layer
  let bigBlocks = generateBigBlocks(15, gridCount, ['#FF0000', '#FDFD96', '#0000FF'], gridSize);
  bigBlocks.forEach(block => {
    fill(block.color); // Setting the color of the big square
    rect(startX + block.x * gridSize, startY + block.y * gridSize, block.w * gridSize, block.h * gridSize);
  });

  // Add center cube to 9 random large cubes
  let selectedBlocks = shuffle(bigBlocks).slice(0, 9);
  selectedBlocks.forEach(block => {
    let smallWidth = block.w * 2 / 5;
    let smallHeight = block.h * 2 / 5;
    let smallX = block.x + (block.w - smallWidth) / 2;
    let smallY = block.y + (block.h - smallHeight) / 2;

    let otherColors = ['#FF0000', '#FDFD96', '#0000FF'].filter(c => c !== block.color); // Excluding the color of large squares
    let smallColor = random(otherColors); // Randomly select a different color
    fill(smallColor);
    rect(startX + smallX * gridSize, startY + smallY * gridSize, smallWidth * gridSize, smallHeight * gridSize);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); // Redraw the canvas when the window size changes
}

function generateFixedSpaces(gridCount, minArea, maxArea) {
  let spaces = [];
  let totalArea = 0;
  while (totalArea < minArea) {
    let w = floor(random(3, 10)); // Generate random widths from 3 to 10 cells in width
    let h = floor(random(2, 6)); // Generate random heights with heights from 2 to 6 cells
    let x = floor(random(0, gridCount - w)); // Randomize the X position to ensure that the shape does not exceed the mesh boundary
    let y = floor(random(0, gridCount - h)); // Randomize the Y position to ensure that the shape does not exceed the mesh boundary
    let area = w * h; // Calculate the area of the current shape
    if (!isOverlap(spaces, x, y, w, h) && totalArea + area <= maxArea) { // Ensure that there is no overlap and that the maximum area is not exceeded
      spaces.push({x, y, w, h});
      totalArea += area;
    }
  }
  return spaces;
}

function generateBigBlocks(numBlocks, gridCount, colors, gridSize) {
  let blocks = [];
  for (let i = 0; i < numBlocks; i++) {
    let w = floor(random(4, 8)); // Larger squares are wider, 4 to 8 compartments
    let h = floor(random(4, 8)); // Bigger squares are taller, 4 to 8 squares
    let x = floor(random(0, gridCount - w)); // Random X position
    let y = floor(random(0, gridCount - h)); // Random Y position
    let color = random(colors); // Random color selection
    if (!isOverlap(blocks, x, y, w, h)) { // Make sure the new square does not overlap with other squares
      blocks.push({x, y, w, h, color});
    }
  }
  return blocks;
}

function isOverlap(shapes, x, y, w, h) {
  return shapes.some(shape => !(x + w <= shape.x || y + h <= shape.y || x >= shape.x + shape.w || y >= shape.y + shape.h));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Element exchange
  }
  return array;
}
