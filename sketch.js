let stars = [
  { name: "Sun", radius: 300, x: -100, y: 300, color: "#FFD700", dragging: false }
];

let planets = [
  { name: "Jupiter", radius: 100, x: 350, y: 150, image: null, dragging: false },
  { name: "Saturn", radius: 84, x: 500, y: 320, image: null, dragging: false },
  { name: "Uranus", radius: 52, x: 650, y: 150, image: null, dragging: false },
  { name: "Neptune", radius: 52, x: 800, y: 320, image: null, dragging: false },
  { name: "Earth", radius: 11.7, x: 950, y: 150, image: null, dragging: false },
  { name: "Venus", radius: 10, x: 1100, y: 320, image: null, dragging: false },
  { name: "Mars", radius: 5.8, x: 1250, y: 150, image: null, dragging: false },
  { name: "Mercury", radius: 3.59, x: 1350, y: 320, image: null, dragging: false },
];

function preload() {
  for (let planet of planets) {
    planet.image = loadImage(`${planet.name}.png`);
  }
  for (let star of stars) {
    star.image = loadImage(`${star.name}.png`);
  }
  
}

function setup() {
  createCanvas(1500, 600);
  textSize(20);

  for (let i = 0; i < 300; i++) {
    stars.push(createVector(random(width), random(height)));
  }

  shufflePlanets();
}

function draw() {
  background(0);
  drawStars();

  for (let planet of planets) {
    displayPlanet(planet);
  }
  fill(203, 195, 227);
  rect(550,550, 400, 30)
  fill(48, 25, 52);
  textAlign(CENTER, BOTTOM);
  textStyle(BOLD);
  text("Our Solar System", 750,575);
}

function drawStars() {
  for (let star of stars) {
    if (star.name === "Sun") {
      image(star.image, star.x - star.radius+70, star.y - star.radius-150, star.radius * 2, star.radius * 3);
      fill(0);
      textAlign(CENTER, BOTTOM);
      text(star.name, star.x + 170, star.y - star.radius + 300);
    } else {
      fill(255);
      noStroke();
      ellipse(star.x, star.y, 2, 2);
    }
  }
}


function displayPlanet(planet) {
  if (planet.image) {
    image(planet.image, planet.x - planet.radius, planet.y - planet.radius, planet.radius * 2, planet.radius * 2);
  }
  fill(255);
  textAlign(CENTER, CENTER);
  text(planet.name, planet.x, planet.y + planet.radius + 15);
}

function shufflePlanets() {
  for (let i = planets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [planets[i], planets[j]] = [planets[j], planets[i]];
  }
}

function mousePressed() {
  for (let planet of planets) {
    if (mouseX > planet.x - planet.radius && mouseX < planet.x + planet.radius &&
      mouseY > planet.y - planet.radius && mouseY < planet.y + planet.radius) {
      planet.dragging = true;
    }
  }
}

function mouseDragged() {
  for (let planet of planets) {
    if (planet.dragging) {
      planet.x = mouseX;
      planet.y = mouseY;
    }
  }
}

function mouseReleased() {
  let sorted = true;
  for (let i = 0; i < planets.length; i++) {
    if (Math.abs(planets[i].x - (350 + i * 150)) > planets[i].radius ||
      Math.abs(planets[i].y - 100) > planets[i].radius) {
      sorted = false;
      break;
    }
  }

  if (sorted) {
    alert("Congratulations! You arranged the planets correctly!");
    shufflePlanets();
  }

  for (let planet of planets) {
    planet.dragging = false;
  }
}
