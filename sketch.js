let data;
let url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRF2HVxxh0eTjlM9H_2xJQ02Du5nWVcZsr9pD__qk5KTnWygtiCkhSIfY3BV0cs-eXG1kIjB5huhKoK/pub?gid=0&single=true&output=csv";

let selectedIndex = -1;
let buttonPositions = [];

let bgImage;
let topIcon, middleRightIcon, leftMiddleIcon, bottomLeftIcon, bottomRightIcon;
let topInfoImage, bottomRightInfoImage, leftMiddleInfoImage, middleRightInfoImage, bottomLeftInfoImage;

let bgMusic; // Background music
let musicStarted = false; // Track if music has started

function preload() {
  data = loadTable(url, "csv", "header");
  bgImage = loadImage("Background.png");

  // Button icons
  topIcon = loadImage("Icon5.png");          
  middleRightIcon = loadImage("Icon1.png");  
  leftMiddleIcon = loadImage("Icon2.png");   
  bottomLeftIcon = loadImage("Icon3.png");   
  bottomRightIcon = loadImage("Icon4.png");  

  // Info images
  topInfoImage = loadImage("Icon5-2.png");        
  leftMiddleInfoImage = loadImage("Icon2-2.png");  
  middleRightInfoImage = loadImage("Icon1-2.png"); 
  bottomLeftInfoImage = loadImage("Icon3-2.png");  
  bottomRightInfoImage = loadImage("Icon4-2.png"); 

  // Background music
  bgMusic = loadSound("bgmusic.mp3");
}

function setup() {
  createCanvas(900, 500);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();

  buttonPositions = [
    { x: width / 2, y: 100 },        
    { x: width / 2 - 350, y: 250 },  
    { x: width / 2 + 350, y: 250 },  
    { x: width / 2 - 150, y: 400 },  
    { x: width / 2 + 150, y: 400 }   
  ];
}

function draw() {
  image(bgImage, width / 2, height / 2, width, height);

  if (!data) {
    fill(255);
    textSize(20);
    text("Loading...", width / 2, height / 2);
    return;
  }

  let numRows = data.getRowCount();
  let activities = data.getColumn("Activity");
  let times = data.getColumn("Time");
  let calories = data.getColumn("Calories Burned");

  // Draw icon buttons
  for (let i = 0; i < numRows; i++) {
    let pos = buttonPositions[i];
    let baseRadius = 40;
    let radius = baseRadius;

    let hovering = dist(mouseX, mouseY, pos.x, pos.y) < baseRadius;
    if (hovering) radius = baseRadius * 1.2;

    if (i === 0) image(topIcon, pos.x, pos.y, radius * 2, radius * 2);
    else if (i === 1) image(leftMiddleIcon, pos.x, pos.y, radius * 2, radius * 2);
    else if (i === 2) image(middleRightIcon, pos.x, pos.y, radius * 2, radius * 2);
    else if (i === 3) image(bottomLeftIcon, pos.x, pos.y, radius * 2, radius * 2);
    else if (i === 4) image(bottomRightIcon, pos.x, pos.y, radius * 2, radius * 2);
  }

  // Info box
  if (selectedIndex >= 0) {
    let act = activities[selectedIndex];
    let time = times[selectedIndex];
    let cal = calories[selectedIndex];

    let boxWidth = 400;
    let boxHeight = 300;
    let boxX = width / 2;
    let boxY = height / 2;

    fill(50, 200);
    stroke(255);
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 10);
    noStroke();

    let imgWidth = 225;
    let imgHeight = 150;
    let textSpacing = 30;
    let totalContentHeight = imgHeight + textSpacing * 3;
    let imgY = boxY - totalContentHeight / 2 + imgHeight / 2;

    if (selectedIndex === 0) image(topInfoImage, boxX, imgY - 10, imgWidth, imgHeight);
    else if (selectedIndex === 1) image(leftMiddleInfoImage, boxX, imgY - 10, imgWidth, imgHeight);
    else if (selectedIndex === 2) image(middleRightInfoImage, boxX, imgY - 10, imgWidth, imgHeight);
    else if (selectedIndex === 3) image(bottomLeftInfoImage, boxX, imgY - 10, imgWidth, imgHeight);
    else if (selectedIndex === 4) image(bottomRightInfoImage, boxX, imgY - 10, imgWidth, imgHeight);

    fill(255);
    textSize(16);
    let startTextY = imgY + imgHeight / 2 + textSpacing / 2;
    text("Activity: " + act, boxX, startTextY);
    text("Time: " + time, boxX, startTextY + textSpacing);
    text("Calories Burned: " + cal, boxX, startTextY + textSpacing * 2);
  }
}

// Start music on first click anywhere
function mousePressed() {
  if (!musicStarted && bgMusic) {
    bgMusic.loop();
    musicStarted = true;
  }

  if (!data) return;

  let numRows = data.getRowCount();
  let baseRadius = 40;
  for (let i = 0; i < numRows; i++) {
    let pos = buttonPositions[i];
    if (dist(mouseX, mouseY, pos.x, pos.y) < baseRadius) {
      selectedIndex = i;
      return;
    }
  }
  selectedIndex = -1;
}
