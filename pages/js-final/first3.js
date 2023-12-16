// setup canvas
const canvas = document.querySelector("canvas");
canvas.style.display = "block";
document.body.style.margin = "0";
document.body.style.overflow = "hidden"; // Remove scrolling
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function makeCircle(x, y, size, color, label) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
}

var circleSize = 40;

class Ball {
  constructor(x, y, velX, velY, color, size, label) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.label = label;
    // Add click event listener to each ball
    this.addClickListener();
  }

  drawCircle() {
    makeCircle(this.x, this.y, circleSize, this.color, this.label);
  }

  addClickListener() {
    canvas.addEventListener("click", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (this.isClicked(mouseX, mouseY)) {
        this.handleClick();
      }
    });
  }

  isClicked(mouseX, mouseY) {
    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = mouseX - canvasRect.left;
    const canvasY = mouseY - canvasRect.top;
  
    const dx = canvasX - this.x;
    const dy = canvasY - this.y;
    return dx * dx + dy * dy <= this.size * this.size;
  }

  handleClick() {
    if (this.label === "!" && selectedNumbers.length > 0) {
      // Clicked on the '!' ball, clear selections
      selectedNumbers = [];
    } else if (selectedNumbers.length < 3) {
      // Add the clicked number to the selected numbers
      selectedNumbers.push(this.label);
    }
    console.log("Selected Numbers:", selectedNumbers);
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX / 2; // Adjust speed
    this.y += this.velY / 2; // Adjust speed
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
          //   ball.velY = this.velY = this.velY + 0.01;
        }
      }
    }
  }
}

const balls = [];
const labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!"];

while (balls.length < 11) {
  const size = random(30, 40); // Larger ball size
  const label = labels.pop();
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
    label
  );

  balls.push(ball);
}

let selectedNumbers = [];


submitButton.addEventListener("click", () => {
  // Send the selected numbers to the main file
  if(selectedNumbers.length < 3) {
    alert('You need to select more numbers silly!');
  } else {
    const selectedNumberList = selectedNumbers.join('');
    alert(`Selected Number: ${selectedNumberList}`);
    console.log("selected nums list: ", selectedNumberList);
    localStorage.setItem("first3", selectedNumberList);
  }
});
document.body.appendChild(submitButton);

function loop() {
  ctx.fillStyle = "lavender"; // Change the background color
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.drawCircle();
    ball.update();
    ball.collisionDetect();
  }

  var selectedNumbersSection = document.getElementById("selectedNumbersSection");
  // Update the selected numbers display
  selectedNumbersSection.textContent = `Selected Numbers: ${selectedNumbers.join()}`;

  requestAnimationFrame(loop);
}

loop();
