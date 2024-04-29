'use strict';

var shapes = [];
var shapeHeight= 64;
var shapeColor;

var newShape;

function setup() {
  createCanvas(5000, 5000);
  noFill();
  shapeColor = color(0);
}

function draw() {
  background(40, 102, 90);

  shapes.forEach(function(shape) {
    shape.draw();
  });

  if (newShape) {
    newShape.x2 = mouseX;
    newShape.y2 = mouseY;
    newShape.h = shapeHeight;
    newShape.c = shapeColor;
    newShape.draw();
  }
}

function Shape(x1, y1, x2, y2, h, c) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.h = h;
  this.c = c;
  this.density = random(0.1, 10); 

  Shape.prototype.draw = function() {
    var w = dist(this.x1, this.y1, this.x2, this.y2);
    var a = atan2(this.y2 - this.y1, this.x2 - this.x1);
    stroke(this.c);
    push();
    translate(this.x1, this.y1);
    rotate(a);
    translate(0, -this.h / 2);
    for (var i = 0; i < this.h; i += this.density) { // Use the random density value
      line(0, i, w, i);
    }
    pop();
  };
}

function mousePressed() {
  newShape = new Shape(pmouseX, pmouseY, mouseX, mouseY, shapeHeight, shapeColor);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') shapeColor = color(245, 85, 54);
  if (key == '2') shapeColor = color(112, 193, 179);
  if (key == '3') shapeColor = color(242, 242, 209);
  if (key == '4') shapeColor = color(0);
}