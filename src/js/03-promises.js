import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', formHandler);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function formHandler(event) {
  event.preventDefault();

  const step = Number(formEl.elements.step.value);
  let delay = Number(formEl.elements.delay.value);
  let amount = Number(formEl.elements.amount.value);

  if (amount > 0) {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      delay += step;
    }
    return;
  }

  Notify.failure('Amount must be more than 0');
}
