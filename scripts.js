let segLength = 80,
  x,
  y,
  x2,
  y2,
  pointArray = [],
  gaussianArray = [],
  neuronGauss = 40,
  padding = neuronGauss * 2,
  unitX,
  unitY,
  minNeuronDistance = 300,
  rowNeurons = 5,
  columnNeurons = 5,
  segments = 6,
  detail = false,
  selected = 5,
  canvasScale = 1
  fade = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  unitX = Math.floor((windowWidth - (padding * 2)) / rowNeurons);
  unitY = Math.floor((windowHeight - (padding * 2)) / columnNeurons);
  createPointArray();
  createGaussianArray();
  textFont('Roboto');
  // noCursor();
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
    text('JBM', pointArray[6].x, pointArray[6].y)
    text('RESEARCH', pointArray[7].x, pointArray[7].y)
    text('PAPERS', pointArray[8].x, pointArray[8].y)
    text('DOCUMENTS', pointArray[11].x, pointArray[11].y)
    text('TWITTER', pointArray[12].x, pointArray[12].y)
    text('GITHUB', pointArray[13].x, pointArray[13].y)

    switch (selected) {
      case 6:
        fill(0,0,0,255);
        text('JBM', pointArray[6].x, pointArray[6].y);
        break;
      case 7:
        fill(0,0,0,255);
        text('RESEARCH', pointArray[7].x, pointArray[7].y)
        break;
      case 8:
        fill(0,0,0,255);
        text('PAPERS', pointArray[8].x, pointArray[8].y)
        break;
      case 11:
        fill(0,0,0,255);
        text('DOCUMENTS', pointArray[11].x, pointArray[11].y)
        break;
      case 12:
        fill(0,0,0,255);
        text('TWITTER', pointArray[12].x, pointArray[12].y)
        break;
      case 12:
        fill(0,0,0,255);
        text('GITHUB', pointArray[13].x, pointArray[13].y)
        break;
    }
  } else {
    text('JBM', pointArray[6].x, pointArray[6].y)
    text('RESEARCH', pointArray[7].x, pointArray[7].y)
    text('PAPERS', pointArray[8].x, pointArray[8].y)
    text('DOCUMENTS', pointArray[11].x, pointArray[11].y)
    text('TWITTER', pointArray[12].x, pointArray[12].y)
    text('GITHUB', pointArray[13].x, pointArray[13].y)
  }
}

function mousePressed() {
  if (detail === false) {
    if (mouseX < (pointArray[6].x + 100) && mouseX > (pointArray[6].x - 25) && mouseY < (pointArray[6].y + 10) && mouseY > (pointArray[6].y - 25)) {
      detail = true;
      document.getElementById("bio").style.visibility = "visible";
      document.getElementById("bio").style.opacity = 1;
      selected = 6;
    } else if (mouseX < (pointArray[7].x + 100) && mouseX > (pointArray[7].x - 25) && mouseY < (pointArray[7].y + 10) && mouseY > (pointArray[7].y - 25)) {
      detail = true;
      document.getElementById("research").style.visibility = "visible";
      document.getElementById("research").style.opacity = 1;
      selected = 7;
    } else if (mouseX < (pointArray[8].x + 100) && mouseX > (pointArray[8].x - 25) && mouseY < (pointArray[8].y + 10) && mouseY > (pointArray[8].y - 25)) {
      detail = true;
      document.getElementById("papers").style.visibility = "visible";
      document.getElementById("papers").style.opacity = 1;
      selected = 8;
    } else if (mouseX < (pointArray[11].x + 100) && mouseX > (pointArray[11].x - 25) && mouseY < (pointArray[11].y + 10) && mouseY > (pointArray[11].y - 25)) {
      detail = true;
      document.getElementById("documents").style.visibility = "visible";
      document.getElementById("documents").style.opacity = 1;
      selected = 11;
    } else if (mouseX < (pointArray[12].x + 100) && mouseX > (pointArray[12].x - 25) && mouseY < (pointArray[12].y + 10) && mouseY > (pointArray[12].y - 25)) {
      window.location.href = "https://twitter.com/seanfrancismcn";
    } else if (mouseX < (pointArray[13].x + 100) && mouseX > (pointArray[13].x - 25) && mouseY < (pointArray[13].y + 10) && mouseY > (pointArray[13].y - 25)) {
      window.location.href = "https://github.com/jbmelander";
    }
  } else {
    if (mouseX < 150 && mouseY > -100) {
      detail = false;
      var x = document.getElementsByClassName("section");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].style.visibility = "none";
        x[i].style.opacity = "0";
      }
      loop();
      noCursor();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  unitX = Math.floor((windowWidth - (padding * 2)) / rowNeurons);
  unitY = Math.floor((windowHeight - (padding * 2)) / columnNeurons);
  createPointArray();
  createGaussianArray();
}

function createPointArray() {
  pointArray = [];
  for (var i = 0; i < rowNeurons; i++) {
    for (var j = 0; j < columnNeurons; j++) {
      pointArray.push(createVector(((i*unitX) + unitX/2 + randomGaussian(0, neuronGauss) + padding), ((j*unitY) + unitY/2 + randomGaussian(0, neuronGauss) + padding)));
    }
  }
}

function createGaussianArray() {
  gaussianArray = [];
  for (var i = 0; i < rowNeurons; i++) {
    for (var j = 0; j < columnNeurons; j++) {
      for(var k= 0; k < segments; k++) {
        gaussianArray.push(randomGaussian(0, 5));
      }
    }
  }
}
