
let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapsContainer = document.getElementById("laps-container");
let isRunning = false;

function toggleStartPause() {
  if (isRunning) {
    pause();
  } else {
    start();
  }
}

function start() {
  if (!isRunning) {
    timer = setInterval(updateTime, 10);
    isRunning = true;
    updateButtonLabel("Pause");
  }
}

function pause() {
  clearInterval(timer);
  isRunning = false;
  updateButtonLabel("Resume");
}

function stop() {
  clearInterval(timer);
  isRunning = false;
  updateButtonLabel("Start");
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  updateButtonLabel("Start");
  // clearLaps();
}

function updateTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

function updateDisplay() {
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const millisecondsElement = document.getElementById("miliseconds");

  hoursElement.textContent = formatTime(hours);
  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
  millisecondsElement.textContent = formatTime(milliseconds);

  // Ensure consistent styling during updates
  const timerElements = [hoursElement, minutesElement, secondsElement, millisecondsElement];
  timerElements.forEach((element) => {
    element.style.display = "inline-block"; // Adjust display property as needed
  });
}


function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

function laps() {
  if (isRunning) {
    let lapTime = `${formatTime(hours)}: ${formatTime(minutes)}:${formatTime(
      seconds
    )}:${formatTime(milliseconds)}`;
    createLap(lapTime);
  }
}

function createLap(lapTime) {
  let lapItem = document.createElement("p");
  lapItem.innerText = lapTime;
  lapsContainer.appendChild(lapItem);
}

function clearLaps() {
  lapsContainer.innerHTML = "";
}

function updateButtonLabel(label) {
  document.querySelector(".btn button").innerText = label;
}
