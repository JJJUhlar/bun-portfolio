const res = await fetch("frames");
const reader = res.body.getReader();
const decoder = new TextDecoder("utf-8");

let buffer = ""; // Buffer to store partial data chunks
const delimiter = "---FRAME---"; // Assuming frames are separated by '---'
const frameRate = 70; // Milliseconds between frames (10 FPS)
let frames = [];
let currentFrame = 0;
let drawing = false;
let streamComplete = false;
const container = document.getElementById("ascii-container");

function drawFrame() {
  if (frames.length > 0) {
    container.textContent = frames[currentFrame].trim();
    currentFrame = (currentFrame + 1) % frames.length;

    setTimeout(() => requestAnimationFrame(drawFrame), frameRate);
  }
}

async function processStream() {

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log("completed stream");

      streamComplete = true;
      break;
    }
    buffer += decoder.decode(value, { stream: true });

    // Process buffer for complete frames
    let parts = buffer.split(delimiter);
    while (parts.length > 1) {
      frames.push(parts.shift().trim());
    }
    buffer = parts[0]; // Remaining part after the last delimiter

    // Start drawing frames if not already started
    if (!drawing && frames.length > 0) {
      drawing = true;
      drawFrame();
    }
  }

  // Start drawing frames if not already started (in case the stream was too fast)
  if (!drawing && frames.length > 0) {
    drawing = true;
    drawFrame();
  }
}

processStream();