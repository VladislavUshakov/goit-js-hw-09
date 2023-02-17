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
    let currentTimerTime = convertMs(selectedDates[0] - Date.now());
    console.log(currentTimerTime);

    timerSection.daysEl.textContent = currentTimerTime.days;
    timerSection.hoursEl.textContent = currentTimerTime.hours;
    timerSection.minutesEl.textContent = currentTimerTime.minutes;
    timerSection.secondsEl.textContent = currentTimerTime.seconds;
  },
};

const setFinalTime = flatpickr('#datetime-picker', flatpickrOptions);

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
