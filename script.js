const msgEl = document.getElementById('msg');

// Assign getRandomNumber function
const randomNum = getRandomNumber();

console.log('Number:',randomNum);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition;

// Start recognition and game
recognition.start();

// Capture user speech
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// Display what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class='box'>${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  // Convert msg - string to a number
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    // Append this messege to the msg
    msgEl.innerHTML += '<div>That is not a valid number</div>';
    return;
  }
  // Check in range 
  if (num > 100 || num < 1) {
    // Append this messege to the msg
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }

  // Check number - Right number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2> Congrats! You have guessed the number!! <br><br>
    It was ${num}</h2>
    <button class='play-again' id='play-again'> Play Again</button>
    `;
  } else if (num > randomNum) {
    // Append this messege to the msg
    msgEl.innerHTML += '<div>GO LOWER</div>'
  } else {
    // Append this messege to the msg
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}
// Create a random number from 0 to 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SpeechRecognition service
recognition.addEventListener('end', () => recognition.start());

// Play again btn function 
document.body.addEventListener('click', (e) => {
  // If event.target.id = #play-again, reload the window
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});

//<-- SPEECH RECOGNITION -->
//https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition