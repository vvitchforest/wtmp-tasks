//TASK 1 i.
const createSecretCode = (secretCode) => {
  const keyPresses = new Array(secretCode.length);

  document.addEventListener('keypress', event => {
    keyPresses.shift();
    keyPresses.push(event.key);
    console.log(keyPresses);
    if(keyPresses.join('').toLowerCase() === secretCode.toLowerCase()) {
      alert('You entered correct secret code! ' + secretCode);
    }
  });
};
createSecretCode('hello');


//TASK 1 ii.
const doubleClickCoords = () => {
  const coords = document.querySelector('.coords');
  document.addEventListener('dblclick', event => {
    console.log('Double click coordinates: ', event.clientX, event.clientY);
     coords.textContent = `Double click coordinates: ${event.clientX}, ${event.clientY}`;

  });
};
doubleClickCoords();

//TASK 1 iii.
const touchReact = () => {
  const touchElement = document.querySelector('.touch');
  const coords = document.querySelector('.coords');
  touchElement.addEventListener('touchstart', event => {
    console.log('Target touched', event);
    coords.textContent = `Target touched coordinates: ${event.targetTouches[0].clientX},
    ${event.targetTouches[0].clientY}`;
  });
};
touchReact();

//TASK1 iv
const createTimer = (seconds) => {
  const timer = document.querySelector('.coords');
  setTimeout(() => {
    timer.textContent = `Hurry up!`;
  }, seconds * 1000);
};
createTimer(5);

//TASK1 v
const inactivityTimer = (seconds) => {
  let timer;
  const resetTimer = event => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('Hurry up!');
    }, seconds * 1000);
  };
  document.addEventListener('mousemove', resetTimer);
};
inactivityTimer(5);
