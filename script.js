const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list"),
    timeEl=document.querySelector("#time"),
    board = document.querySelector("#board");
let time = 0,
    unlimited = false,
    difficulty = 0,
    playing= false,
    hits = 0,
    missed = 0,
    accuracy = "0%",
    interval;

startBtn.addEventListener("click",()=>{
    screens[0].classList.add("up");
});
timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
    }
    time = parseInt(e.target.getAttribute("data-time"));
    unlimited = e.target.getAttribute("data-unlimited");
    screens[1].classList.add("up");
});

difficultyList.addEventListener("click", (e) => {

    if (e.target.classList.contains("difficulty-btn")) {
        difficulty = parseInt(e.target.getAttribute("data-difficulty"));
        screens [2].classList.add("up");
        startGame();
    }
});


const startGame = () => {
    playing = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle()
};

const decreaseTime = () => {
    if (unlimited) {
        //if unlimited selected
        setTime("∞");
        return;
    }

    if (time === 0) {
        //game over
    }

    const current = --time;

    let milliseconds = time * 1000;
    let minutes = Math.floor(milliseconds / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    //add traling zero
     seconds = seconds < 10 ? "0" + seconds : seconds;
     minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = `${minutes}:${seconds}`; // Combine into formatted string
    setTime(formattedTime);
};

const setTime = (time) => timeEl.innerHTML = time;


function createRandomCircle() {
    if (!playing) {
        //if playing false do nothing
        return;
    }

    const circle = document.createElement("div");
    const size = getRandomNumber (30, 100);
    const colors = ["16d205", "#549e1e", "#39d33e", "#4e950d", "#078d2f"];
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    let color = Math.floor(Math.random() * 5);
    circle.style.background = `${colors[color]}`;
    board.append(circle);



    //difficulty settings

    if (difficulty === 1) {
        circle.style.animationDuration = "2s";
    } else if (difficulty === 2) {
        circle.style.animationDuration = "1s";
    } else {
        circle.style.animationDuration = "3s";
    }

}

function getRandomNumber(min, max) {
    // get a random between min and max
    return Math.round(Math.random() * (max - min) + min);
}
 
