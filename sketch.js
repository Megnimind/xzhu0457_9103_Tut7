let gridSize = 10;
let colors = ['#FFD700', '#FF0000', '#0000FF', '#D3D3D3', '#F5F5DC'];
let specialColumnPositions;
let bigBlocks = [];

function setup() {
  createCanvas(650, 690);
  noStroke();
  scale(1.5); // Adjust the zoom of the canvas to enlarge the entire content
  specialColumnPositions = {
    1: getRandomSegmentedPositions(),
    24: getRandomSegmentedPositions(),
    37: getRandomSegmentedPositions(),
    39: getRandomSegmentedPositions()
  };
  for (let y = 0; y < height / 1.5; y += gridSize) { // Since the canvas is enlarged, the boundaries of the loop need to be adjusted
    for (let x = 0; x < width / 1.5; x += gridSize) {
      if (isSpecialRow(y) || isSpecialColumn(x)) {
        let colorIndex = randomSpecialColorIndex();
        fill(colors[colorIndex]);
      } else if (isSpecialRowSecond(y, x)) {
        let colorIndex = randomSpecialColorIndexSecond();
        fill(colors[colorIndex]);
      } else if (isSpecialColumnThird(x, y)) {
        let colorIndex = randomSpecialColorIndexThird(x, y);
        fill(colors[colorIndex]);
      } else {
        fill(colors[4]);
      }
      rect(x, y, gridSize, gridSize);
    }
  }

  // Generate and draw large squares to be placed at the top of the layer
  generateAndDrawBigBlocks();

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
    rect(smallX * gridSize, smallY * gridSize, smallWidth * gridSize, smallHeight * gridSize);
  });
}

function isSpecialRow(y) {
  let row = y / gridSize;
  return [1, 8, 21, 27, 30, 42, 47].includes(row);
}

function isSpecialRowSecond(y, x) {
  let row = y / gridSize;
  let col = x / gridSize;
  if ([33, 38, 44].includes(row)) {
    return col < 3;
  }
  return false;
}

function isSpecialColumn(x) {
  let col = x / gridSize;
  return [3, 6, 11, 22, 35, 41].includes(col);
}

function isSpecialColumnThird(x, y) {
  let col = x / gridSize;
  return [1, 24, 37, 39].includes(col);
}

function randomSpecialColorIndex() {
  let rnd = random(100);
  if (rnd < 70) {
    return 0; // Yellow
  } else if (rnd < 80) {
    return 1; // Red
  } else if (rnd < 90) {
    return 2; // Blue
  } else {
    return 3; // Gray
  }
}

function randomSpecialColorIndexSecond() {
  let rnd = random(100);
  if (rnd < 66) {
    return 0; // Yellow
  } else if (rnd < 100) {
    return Math.floor(random(1, 4)); // Random between Red, Blue, Gray
  }
}

function randomSpecialColorIndexThird(x, y) {
  let col = x / gridSize;
  let row = y / gridSize;

  if (specialColumnPositions[col] && specialColumnPositions[col].includes(row)) {
    let rnd = random(100);
    if (rnd < 60) {
      return 0; // Yellow
    } else {
      return Math.floor(random(1, 4)); // Random between Red, Blue, Gray
    }
  }
  return 4; // Skin color
}

function getRandomSegmentedPositions() {
  let positions = [];
  while (positions.length < 24) {
    let segmentLength = random(10, 15);
    let segmentStart = Math.floor(random(49 - segmentLength));
    for (let i = 0; i < segmentLength; i++) {
      if (positions.length < 24 && !positions.includes(segmentStart + i)) {
        positions.push(segmentStart + i);
      }
    }
  }
  return positions;
}

function generateAndDrawBigBlocks() {
  let colors = ['#FF0000', '#FDFD96', '#0000FF']; // Red, Yellow, Blue
  let gridCount = 49;
  for (let i = 0; i < 15; i++) {
    let w = floor(random(4, 8));
    let h = floor(random(4, 8));
    let x, y;

    do {
      x = floor(random(0, gridCount - w));
      y = floor(random(0, gridCount - h));
    } while (!(isSpecialRow(y * gridSize) || isSpecialRow((y + h) * gridSize - 1) ||
               isSpecialColumn(x * gridSize) || isSpecialColumn((x + w) * gridSize - 1)));

    let color = random(colors);
    bigBlocks.push({x, y, w, h, color});
    fill(color);
    rect(x * gridSize, y * gridSize, w * gridSize, h * gridSize);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Element exchange
  }
  return array;
}
