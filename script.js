// let idxOne = document.querySelector('#one');
// let idxTwo = document.querySelector('#two');
// let idxThree = document.querySelector('#three');
// let idxFour = document.querySelector('#four');
// let idxFive = document.querySelector('#five');
// let idxSix = document.querySelector('#six');
// let idxSeven = document.querySelector('#seven');
// let idxEight = document.querySelector('#eight');
// let idxNine = document.querySelector('#nine');

let msg = document.getElementById("msg");
let body = document.querySelector('body')
let count = 0;
// ----------------------light mode----------------------------


let light = document.querySelector('#light');
let lightMode = document.querySelector('#light-mode');

function lightSystem(){
    if (lightMode.innerText ==="light off"){
        body.style.background = "linear-gradient(45deg, black,white,black)";
        lightMode.innerText = "light on";
        lightMode.style.background = 'black';
        lightMode.style.color = 'white';
    }
    else if (lightMode.innerText === "light on"){
        body.style.background = "linear-gradient(45deg,gray, silver, wheat)";
        lightMode.innerText = "light off";
        lightMode.style.background = 'white';
        lightMode.style.color = 'black';
    }
}

light.addEventListener('click',lightSystem);

// -----------------------game things----------------------------

let scoreO = 0;
let scoreX = 0;
let boxes = document.querySelectorAll('.box');
let playerO = true;

let winnerCond = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const reset = document.querySelector('#reset');

let resetGame = ()=>{
    playerO = true;
    msg.innerText = "Winner Announcement";
    enableBoxes()
}

let disabledBoxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
}


let enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText ="";
    }
}

reset.addEventListener('click',resetGame);



boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(playerO == true){
            box.innerText = 'X';
            playerO = false;
            box.style.color = "blue";
        }
        else{
            box.innerText = 'O';
            playerO = true;
            box.style.color = "red";
        }
        box.disabled = true;
        
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () =>{
    msg.innerText = "Game Draw";
}


const msgAnnounce = (winner)=>{
    msg.innerText = `${winner} Won the Game`;
    disabledBoxes();
}

const checkWinner = ()=>{
    for(let condition of winnerCond){
        let pos1Val = boxes[condition[0]].innerText;
        let pos2Val = boxes[condition[1]].innerText;
        let pos3Val = boxes[condition[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                if(pos1Val === 'O'){
                    document.getElementById("o-score").innerText = ++scoreO;
                }
                else{
                    document.getElementById("x-score").innerText = ++scoreX;
                }
                msgAnnounce(pos1Val);
                addScore();
                return true;
            }
        }
    }
};

