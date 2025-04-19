let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
var count = 0;

let turnO = true;

const winningpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [6,7,8],
];

boxes.forEach ((box) => {
    box.addEventListener("click",()=>{
        if (turnO == true){
            box.innerText = "O";
            box.style.color = "#ffd60a";
            turnO=false;
        }
        else{
            box.innerText = "X";
            box.style.color = "#003566";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let iswinner = winner();
        if(count == 9 && !iswinner){
            msg.innerText = `Game was a Draw`;
            msgcontainer.classList.remove("hide");
            disableBoxes();
        }
        winner();
    });
});

const disableBoxes =() => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes =() => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    launchConfetti();
}

const winner = () => {
    for(let pattern of winningpatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if((pos1val === pos2val) && (pos2val === pos3val)){
                disableBoxes();
                showWinner(pos1val);
            }
        }

    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide")
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

function launchConfetti() {
    confetti({
        particleCount: 1000,
        spread: 100,
        origin: { y: 0.6}
    });
}