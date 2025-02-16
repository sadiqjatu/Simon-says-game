let gameSeq = [];
let userSeq = [];
let started = false;
let btns = ["red", "grey", "green", "purple"];
let level = 0;
let highestScore = 0;

//Game start
let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function(){
    if(started === false){
        console.log("Game is started");
        started = true;

        levelup();  //levels up the game
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250)
}

function userFlash(btn){
    btn.classList.add("user");
    setTimeout(function(){
        btn.classList.remove("user");
    }, 350);
}

function levelup(){
    userSeq = [];
    level++;
    if(level >= highestScore){
        highestScore = level;
    }
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameFlash(randBtn);     //flashed by game
    gameSeq.push(randBtn.id);
    console.log(gameSeq);
}

function btnPress(){
    // console.log("button is pressed");
    // console.log(this);
    let btn = this;

    userFlash(btn);
    userSeq.push(btn.id);
    // console.log(userSeq);

    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelup, 1000);
        }
    }
    else{
        h2.innerHTML = `Game Over, Your score was <b> ${level} </b> <br> Press any key to start!`;
        h3.innerText = `Highest score = ${highestScore}`;
        body.style.backgroundColor = "red";
        setTimeout(function(){ body.style.backgroundColor = "white"; }, 1000);
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}