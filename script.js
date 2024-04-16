const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list");
let time = 0,
    unlimited = false,
    difficulty = 0,
    playing= false,
    interval;

startBtn.addEventListener("click",()=>{
    screen[0].classList.add("up");
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
};

const decreaseTime = () => {
    if (unlimited) {
        //if unlmited selected
        setTime();
        return;
    }

    if (time === 0) {
        //game over
    }

    const current = --time;

    let miliseconds = time * 1000;
    let minutes = Math.floor((miliseconds & (1000 * 60)) / 1000);
    let seconds = Math.floor(miliseconds / (1000 * 60));

    //add traling zero
     seconds = seconds < 10 ? "0" + seconds : seconds;
     minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime('${minutes}:${seconds}');
};



