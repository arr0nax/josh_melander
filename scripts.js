let segLength = 80,
  x,
  y,
  x2,
  y2,
  pointArray = [],
  gaussianArray = [],
  neuronGauss = 60,
  padding = neuronGauss * 2,
  unitX,
  unitY,
  minNeuronDistance = 300,
  segments = 6,
  detail = false,
  selected = 5,
  canvasScale = 1
  fade = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  unitX = Math.floor((windowWidth - (padding * 2)) / 4);
  unitY = Math.floor((windowHeight - (padding * 2)) / 4);
  createPointArray();
  createGaussianArray();
  noCursor();
}

function draw() {
  background(255)
  scale(canvasScale);
  translate((-pointArray[selected].x + 50) * (canvasScale - 1), (-pointArray[selected].y + 50) * (canvasScale - 1))
  if (detail) {
    fill(0,0,0,255 * (canvasScale - 1))
    textSize(8);
    text('BACK', pointArray[selected].x, pointArray[selected].y - 25)
    if (canvasScale < 2) {
      canvasScale += 0.03;
    } else {
      noLoop();
      cursor();
    }
  } else {
    if (canvasScale > 1) {
      canvasScale -= 0.03;
    }
  }
  // points();
  lines();
  words();
}

function points() {
  pointArray.forEach(point => {
    push(); // Start a new drawing state
    fill(204, 153, 0);
    circle(point.x, point.y, 20);
    pop();
  })
}

function lines() {
  pointArray.forEach((apoint, apointi) => {
    push();
    let d = int(dist(mouseX, mouseY, apoint.x, apoint.y));
    if (d < minNeuronDistance) {
      let dNormal = 1-(d/minNeuronDistance);
      stroke(`rgba(100,255,100,${dNormal})`);
      strokeWeight(10 * dNormal);
      let dx = apoint.x - mouseX;
      let dy = apoint.y - mouseY;
      let dxUnit = dx / segments;
      let dyUnit = dy / segments;
      let wanderArray = [];
      wanderArray.push(createVector(mouseX, mouseY))
      for (let i=1; i<segments+1; i++) {
        wanderArray.push(createVector(mouseX + gaussianArray[apointi * segments + i - 1] + (dxUnit * i), mouseY + gaussianArray[apointi * segments + i - 1] + (dyUnit * i)))
        line(wanderArray[i-1].x, wanderArray[i-1].y, wanderArray[i].x, wanderArray[i].y);


      }
      line(wanderArray[segments].x, wanderArray[segments].y, apoint.x, apoint.y)
      // wanderArray.forEach(point => {
      //   push(); // Start a new drawing state
      //   fill(204, 153, 0);
      //   circle(point.x, point.y, 20);
      //   pop();
      // })
      for (let i=1; i<segments+1; i++) {
        stroke(`rgba(255,100,100,${dNormal})`);
        strokeWeight(5)
        point(wanderArray[i].x, wanderArray[i].y)
      }
    }
    pop();
  })
}

function words() {
  textAlign(LEFT, CENTER);
  textSize(16);
  fill(0,0,0,(2 - canvasScale) * 255)
  if (detail) {
    text('JBM', pointArray[5].x, pointArray[5].y)
    text('PAPERS', pointArray[6].x, pointArray[6].y)
    text('BIOGRAPHY', pointArray[9].x, pointArray[9].y)
    text('LINKS', pointArray[10].x, pointArray[10].y)

    switch (selected) {
      case 5:
        fill(0,0,0,255);
        text('JBM', pointArray[5].x, pointArray[5].y);
        break;
      case 6:
        fill(0,0,0,255);
        text('PAPERS', pointArray[6].x, pointArray[6].y)
        break;
      case 9:
        fill(0,0,0,255);
        text('BIOGRAPHY', pointArray[9].x, pointArray[9].y)
        break;
      case 10:
        fill(0,0,0,255);
        text('LINKS', pointArray[10].x, pointArray[10].y)
        break;
    }
  } else {
    text('JBM', pointArray[5].x, pointArray[5].y)
    text('PAPERS', pointArray[6].x, pointArray[6].y)
    text('BIOGRAPHY', pointArray[9].x, pointArray[9].y)
    text('LINKS', pointArray[10].x, pointArray[10].y)
  }
}

function mousePressed() {
  if (detail === false) {
    if (mouseX < (pointArray[5].x + 100) && mouseX > (pointArray[5].x - 25) && mouseY < (pointArray[5].y + 10) && mouseY > (pointArray[5].y - 25)) {
      detail = true;
      selected = 5;
    } else if (mouseX < (pointArray[6].x + 100) && mouseX > (pointArray[6].x - 25) && mouseY < (pointArray[6].y + 10) && mouseY > (pointArray[6].y - 25)) {
      detail = true;
      selected = 6;
    } else if (mouseX < (pointArray[9].x + 100) && mouseX > (pointArray[9].x - 25) && mouseY < (pointArray[9].y + 10) && mouseY > (pointArray[9].y - 25)) {
      detail = true;
      selected = 9;
    } else if (mouseX < (pointArray[10].x + 100) && mouseX > (pointArray[10].x - 25) && mouseY < (pointArray[10].y + 10) && mouseY > (pointArray[10].y - 25)) {
      detail = true;
      selected = 10;
    }
  } else {
    if (mouseX < 150 && mouseY > -100) {
      detail = false;
      loop();
      noCursor();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  unitX = Math.floor((windowWidth - (padding * 2)) / 4);
  unitY = Math.floor((windowHeight - (padding * 2)) / 4);
  createPointArray();
  createGaussianArray();
}

function createPointArray() {
  pointArray = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      pointArray.push(createVector(((i*unitX) + unitX/2 + randomGaussian(0, neuronGauss) + padding), ((j*unitY) + unitY/2 + randomGaussian(0, neuronGauss) + padding)));
    }
  }
}

function createGaussianArray() {
  gaussianArray = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      for(var k= 0; k < segments; k++) {
        gaussianArray.push(randomGaussian(0, 5));
      }
    }
  }
}
