import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

document.addEventListener('DOMContentLoaded', (event) => {

let userSelectedDate;
const startButton = document.querySelector('[data-start]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate > new Date()) {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        } else {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topCenter',
                backgroundColor: 'rgb(255, 0, 0)'
            });
            startButton.disabled = true;
        }
    },
};

flatpickr('#datetime-picker', options);

let countdownInterval;

startButton.addEventListener('click', () => {
    if (userSelectedDate) {
        startButton.disabled = true;
        document.querySelector('#datetime-picker').disabled = true;

        countdownInterval = setInterval(() => {
            const timeRemaining = userSelectedDate - new Date();
            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                document.querySelector('#datetime-picker').disabled = false;
                startButton.disabled = false;
                updateTimerInterface(0, 0, 0, 0);
            } else {
                const time = convertMs(timeRemaining);
                updateTimerInterface(time.days, time.hours, time.minutes, time.seconds);
            }
        }, 1000);
    }
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerInterface(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

});