let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let highscore = 0;
let canClick = true; // Prevent rapid clicks

const sounds = {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    purple: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    } else if (!canClick && level === 0) {
        // Restart after game over
        h2.innerText = "Level 1 | High Score: " + highscore;
        started = true;
        levelup();
    }
});

let h2 = document.querySelector("h2");
let color = ["red", "yellow", "green", "purple"];

function flash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}

function playSound(col) {
    if (sounds[col]) {
        sounds[col].currentTime = 0;
        sounds[col].play();
    }
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highscore}`;
    canClick = false;
    let random = Math.floor(Math.random() * 4);
    let btns = document.querySelector('.' + color[random]);
    setTimeout(() => {
        flash(btns);
        playSound(color[random]);
        gameseq.push(color[random]);
        canClick = true;
    }, 500);
}

function flashend() {
    document.querySelector('body').classList.add('flashend');
    setTimeout(function () {
        document.querySelector('body').classList.remove('flashend');
    }, 150);
}

function checkAns(idx) {
    if (userseq[idx] == gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if (level > highscore) {
            highscore = level;
            h2.innerHTML = `Game Over, Your score was: <b> ${level} </b> <br> <span style='color:gold'>Congrats! New High Score: ${highscore}</span><br> Press any key to restart`;
        } else {
            h2.innerHTML = `Game Over, Your score was: <b> ${level} </b> <br> High score: ${highscore}<br> Press any key to restart`;
        }
        playSound('red');
        flashend();
        canClick = false;
        restart();
    }
}

function btnpress() {
    if (!started || !canClick) return;
    let btn = this;
    flash(btn);
    let colour = btn.getAttribute("id");
    playSound(colour);
    userseq.push(colour);
    checkAns(userseq.length - 1);
}

let btns = document.querySelectorAll('.btn');
for (let bt of btns) {
    bt.addEventListener('click', btnpress);
}

function restart() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}