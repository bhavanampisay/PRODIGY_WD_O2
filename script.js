let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const lapTimes = document.getElementById('lap-times');

// Start button
document.getElementById('start-btn').addEventListener('click', function() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10); // Update every 10ms for higher precision
  }
});

// Pause button
document.getElementById('stop-btn').addEventListener('click', function() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
});

// Reset button
document.getElementById('reset-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.000";
  lapTimes.innerHTML = "";
});

// Lap button
document.getElementById('lap-btn').addEventListener('click', function() {
  if (isRunning) {
    let lapTime = formatTime(elapsedTime);
    let lapElement = document.createElement('div');
    lapElement.textContent = lapTime;
    lapTimes.appendChild(lapElement);
  }
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = ms % 1000;

  return (
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
  );
}
