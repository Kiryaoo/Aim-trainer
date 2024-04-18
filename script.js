const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list"),
    timeEl=document.querySelector("#time");
let time = 0,
    unlimited = false,
    difficulty = 0,
    playing= false,
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
};

const decreaseTime = () => {
    if (unlimited) {
        //if unlimited selected
        setTime();
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


