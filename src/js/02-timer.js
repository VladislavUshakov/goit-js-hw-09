import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startTimerBtn = document.querySelector('[data-start]');
const timerSection = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentSelectedTime = selectedDates;
    currentDifferenceTime = convertMs(selectedDates[0] - Date.now());

    setTimer(currentDifferenceTime);
  },
};

const setFinalTime = flatpickr('#datetime-picker', flatpickrOptions);
let currentSelectedTime = null;
let currentDifferenceTime = null;
let intervalId = null;

startTimerBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTimer(timeObj) {
  timerSection.daysEl.textContent = String(timeObj.days).padStart(2, '0');
  timerSection.hoursEl.textContent = String(timeObj.hours).padStart(2, '0');
  timerSection.minutesEl.textContent = String(timeObj.minutes).padStart(2, '0');
  timerSection.secondsEl.textContent = String(timeObj.seconds).padStart(2, '0');
}

function startTimer() {
  intervalId = setInterval(() => {
    flatpickrOptions.onClose(currentSelectedTime);
  }, 1000);
}
