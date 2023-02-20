import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
    if (selectedDates[0] - Date.now() < 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startTimerBtn.disabled = false;
    currentSelectedDate = selectedDates[0];
  },
};
const chooseTimeInput = document.querySelector('#datetime-picker');
const chooseTimePicker = flatpickr('#datetime-picker', flatpickrOptions);

let currentSelectedDate = null;
let intervalId = null;

startTimerBtn.disabled = true;
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

function setTimer(obj) {
  timerSection.daysEl.textContent = String(obj.days).padStart(2, '0');
  timerSection.hoursEl.textContent = String(obj.hours).padStart(2, '0');
  timerSection.minutesEl.textContent = String(obj.minutes).padStart(2, '0');
  timerSection.secondsEl.textContent = String(obj.seconds).padStart(2, '0');
}

function startTimer() {
  if (currentSelectedDate - Date.now() > 0) {
    startTimerBtn.disabled = true;
    chooseTimeInput.disabled = true;

    setTimer(convertMs(currentSelectedDate - Date.now()));

    intervalId = setInterval(doTimerStep, 1000);
  }
}

function doTimerStep() {
  const currentDifferenceTime = currentSelectedDate - Date.now();
  if (currentDifferenceTime > 0) {
    const timerDataObj = convertMs(currentDifferenceTime);
    setTimer(timerDataObj);
  } else {
    clearInterval(intervalId);
    Notify.success('Timer ends');
    Notify.success('You can set new data');
    chooseTimeInput.disabled = false;
  }
}
