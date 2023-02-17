const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let intervalId = null;
let lastColor = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', startChengingBodyBgColor);
stopBtn.addEventListener('click', stopChengingBodyBgColor);

function setBodyBgColor() {
  const currentColor = getRandomHexColor();
  if (currentColor !== lastColor && currentColor.length === 7) {
    bodyEl.style.backgroundColor = currentColor;
    lastColor = currentColor;
    return;
  }

  console.log(`Incorrect color ${currentColor}. Restart setBodyBgColor()`);

  setBodyBgColor();
}

function startChengingBodyBgColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  setBodyBgColor();

  intervalId = setInterval(() => {
    setBodyBgColor();
  }, 1000);
}

function stopChengingBodyBgColor() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
