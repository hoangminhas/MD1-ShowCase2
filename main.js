let order = [];
let playerOrder = [];
let flash;
let round;
let good;
let compTurn;
let intervalId;
let hardcoreMode = false;
let noise = true;
let on = false;
let win;

const roundCounter = document.getElementById('round');
const topLeft = document.getElementById('topleft');
const topRight = document.getElementById('topright');
const bottomRight = document.getElementById('bottomright');
const bottomLeft = document.getElementById('bottomleft');
const hardcoreButton = document.getElementById('hardcore');
const powerButton = document.getElementById('on');
const startButton = document.getElementById('start');

hardcoreButton.addEventListener("click", checkHardcore);
powerButton.addEventListener("click", checkPower);
startButton.addEventListener("click", checkStart);
topLeft.addEventListener("click", checkTopLeft);
topRight.addEventListener("click", checkTopRight);
bottomRight.addEventListener("click", checkBottomRight);
bottomLeft.addEventListener("click", checkBottomLeft);

function checkHardcore() {
    if (hardcoreButton.checked == true) {
        hardcoreMode = true;
    } else {
        hardcoreMode = false;
    }
}

function checkPower() {
    if (powerButton.checked == true) {
        on = true;
        roundCounter.innerHTML = '!!!';
    } else {
        on = false;
        roundCounter.innerHTML = '';
        clearColor();
        clearInterval(intervalId);
    }
}

function checkStart() {
    if (on || win) {
        play();
    }
}

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    round = 1;
    roundCounter.innerHTML = 1;
    good = true;
    //tao thu tu random cho computer
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == round) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    if (noise){
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen';
}

function two() {
    if (noise){
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = 'tomato';
}

function three() {
    if (noise){
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = 'magenta';
}

function four() {
    if (noise){
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = 'gold';
}

function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen';
    topRight.style.backgroundColor = 'darkred';
    bottomRight.style.backgroundColor = 'darkmagenta';
    bottomLeft.style.backgroundColor = 'darkgoldenrod';
}

function flashColor() {
    topLeft.style.backgroundColor = 'lightgreen';
    topRight.style.backgroundColor = 'tomato';
    bottomRight.style.backgroundColor = 'magenta';
    bottomLeft.style.backgroundColor = 'golden';
}


function checkTopLeft(){
    if (on){
        playerOrder.push(1);
        check();
        one();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
}

function checkTopRight(){
    if (on){
        playerOrder.push(2);
        check();
        two();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
}

function checkBottomRight(){
    if (on){
        playerOrder.push(3);
        check();
        three();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
}

function checkBottomLeft(){
    if (on){
        playerOrder.push(4);
        check();
        four();
        if (!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
}

function check() {
    if (playerOrder[playerOrder.length-1] !== order[playerOrder.length-1]) {
        good = false;
    }

    if (playerOrder.length == 20 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        roundCounter.innerHTML = "F*CK";
        setTimeout(() => {
            roundCounter.innerHTML = round;
            clearColor();
        }, 800);
        noise = false;
    }

    if (round == playerOrder.length && good && !win){
        round++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        roundCounter.innerHTML = round;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    roundCounter.innerHTML = 'WIN!';
    on = false;
    win = true;
}