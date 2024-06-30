// script.js

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let resetTime = true;
let lapCounter = 1;
let lapInterval = 10000; // Interval to record lap time (in milliseconds)

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = new Date().getTime();
        if (!resetTime) {
            startTime -= difference;
        }
        tInterval = setInterval(updateTime, 1);
        startButton.disabled = true;
        stopButton.disabled = false;
        running = true;
        resetTime = false;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startButton.disabled = false;
        stopButton.disabled = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00.000';
    startButton.disabled = false;
    stopButton.disabled = true;
    running = false;
    resetTime = true;
    difference = 0;
    laps.innerHTML = '';
    lapCounter = 1;
}

function recordLap(lapTime) {
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapElement.className = 'lap-time';
    laps.appendChild(lapElement);
    lapCounter++;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor(difference % 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = milliseconds.toString().padStart(3, '0');

    display.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

    if (difference >= lapInterval * lapCounter) {
        recordLap(display.textContent);
    }
}
