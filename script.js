const msgEl = document.getElementById('msg');

let chance = 10;

const randomNum = Math.floor(Math.random() * 100) + 1;
console.log('Correct number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start speech recognition
recognition.start();

//capture what user said in mic
function onSpeak(e) {
    // console.log(e);

    const msg = e.results[0][0].transcript;

    chance--;
    if (chance === 0) {
        document.body.innerHTML = `
            <h2>Sorry! You lost. <br><br>The number was '${randomNum}'</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    }

    writeMessage(msg);
    checkNumber(msg);
}

//write in DOM what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
    const num = +msg;

    //check if valid number
    if (Number.isNaN(num)) { //Not a Number
        msgEl.innerHTML = '<div>Not a valid number</div>';
        return;
    }

    //check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML = '<div>Number must be in between 1 and 100</div>';
        return;
    }

    //check number
    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number in ${10 - chance} chances. <br><br>It was '${num}'</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    }
    else if (num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    }
    else {
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
}

//speak result
recognition.addEventListener('result', onSpeak);

//keep speech recognition on until game ends
recognition.addEventListener('end', () => recognition.start());

//play again functionality
document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});