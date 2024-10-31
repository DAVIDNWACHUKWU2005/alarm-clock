'use strict';

// Utility functions
function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, element, callback) {
    return element.addEventListener(event, callback);
}

let alarmTime = null;
const alarmSound = new Audio('assets/AUDIO/alarm_sounds.mp3');

listen('click', select('.set-alarm'), () => {
    const hour = select('.hour').value;
    const minute = select('.minute').value;

    if (hour === "" || minute === "" || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        alert('Please enter a valid time.');
        return;
    }
    alarmTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    select('.clock p').textContent = `${hours}:${minutes}`; 
    checkAlarm(hours, minutes);
}

function checkAlarm(hours, minutes) {
    if (alarmTime === `${hours}:${minutes}`) {
        alarmSound.play();  
      
      // Stop the alarm sound after 11 seconds
      setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0; 
    }, 11000); 
    
    alarmTime = null; 
}
}
setInterval(updateClock, 1000);
