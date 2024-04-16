const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list");
let time = 0,
    unlimited = false,
    difficulty = 0;


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
