import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    const delay = event.target.elements['delay'].value;
    const state = event.target.elements['state'].value;
    let radios = document.getElementsByName('state');

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
    .then(delay => {
        iziToast.success({
            message: `Fulfilled after ${delay}ms`,
            position: 'topCenter',
            backgroundColor: 'rgb(0, 255, 0)'
        });
    })
    .catch(delay => {
        iziToast.error({
            message: `Rejected after ${delay}ms`,
            position: 'topCenter',
            backgroundColor: 'rgb(255, 0, 0)'
        });
    })
    .finally(() => {
        for(let i = 0; i < radios.length; i++){
            radios[i].checked = false;
        }
        document.getElementsByName('delay')[0].value = '';
    });
});