const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition and game
recognition.start();

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMsg(msg);
  checkNumber(msg);
}

//write what user says
function writeMsg(msg) {
  msgEl.innerHTML = `
        <div>You said: </div>
        <span class = "box">${msg}</span>
    `;
}

//check message against number
function checkNumber(msg) {
  const num = +msg;

  //check if number is valid
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid Number</div> ';
    return;
  }

  //check if number is in range
  if (num > 100 || num < 1) {
    msg.innerHTML += '<div>Number must be between 1 and 100</div>';
  }

  //check number
  if (num === randomNum) {
    document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! <br><br>
            It was ${num}</h2>
            <button class ="play-again" id = "play-again">Play Again</button>
        `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

//generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => {
  recognition.start();
});

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
