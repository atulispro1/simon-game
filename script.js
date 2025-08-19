let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ['yellow', 'blue', 'red', 'green'];

let h1 = document.querySelector('h1');
let levelSpan = document.querySelector('#level');
let highScoreSpan = document.querySelector('#high-score');
let startBtn = document.querySelector('#start-btn');

// Hosted Simon sounds
const sounds = {
  green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
  wrong: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
};

// Desktop start (keypress)
document.addEventListener('keypress', function () {
  if (!started) startGame();
});

// Mobile start button
startBtn.addEventListener('click', function () {
  if (!started) startGame();
});

function startGame() {
  started = true;
  level = 0;
  gameseq = [];
  userseq = [];
  startBtn.style.display = "none";
  levelup();
}

// Play sound
function playSound(color) {
  let audio = new Audio(sounds[color]);
  audio.play();
}

function flash(btn, color) {
  btn.classList.add('active');
  playSound(color);
  setTimeout(() => btn.classList.remove('active'), 250);
}

function userflash(btn, color) {
  btn.classList.add('user');
  playSound(color);
  setTimeout(() => btn.classList.remove('user'), 250);
}

function levelup() {
  userseq = [];
  level++;
  h1.innerText = 'Level ' + level;
  levelSpan.innerText = level;

  let coloridx = Math.floor(Math.random() * 4);
  let randomcolor = btns[coloridx];
  let randbtn = document.querySelector(`.${randomcolor}`);
  gameseq.push(randomcolor);
  flash(randbtn, randomcolor);
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 500);
    }
  } else {
    playSound("wrong");
    document.body.classList.add('wrong');
    setTimeout(() => document.body.classList.remove('wrong'), 150);

    if (level > highScore) {
      highScore = level;
      highScoreSpan.innerText = highScore;
    }

    h1.innerText = 'Game Over! Press Key or Tap Start';
    startBtn.style.display = "inline-block"; 
    started = false;
  }
}

function btnpress() {
  let btn = this;
  let usercolor = btn.getAttribute('id');
  userseq.push(usercolor);
  userflash(btn, usercolor);
  checkans(userseq.length - 1);
}

let allbtn = document.querySelectorAll('.btn');
for (let btn of allbtn) {
  btn.addEventListener('click', btnpress);
}
