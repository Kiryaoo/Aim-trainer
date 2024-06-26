const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const difficultyList = document.querySelector("#difficulty-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const hitsEl = document.querySelector("#hits");
const accuracyEl = document.querySelector("#accuracy");
const hitsOver = document.querySelector("#hits-over");
const accuracyOver = document.querySelector("#accuracy-over");
const hearts = document.querySelectorAll(".heart");
const restartBtns = document.querySelectorAll(".restart");
const fullScreenBtn = document.querySelector("#fullscreen");
const minimizeBtn = document.querySelector("#minimize");
const themeSwitcherBtn = document.querySelector("#theme-switcher");

let time = 0;
let unlimited = false;
let difficulty = 0;
let playing= false;
let hits = 0;
let missed = 0;
let accuracy = 0;
let interval;

startBtn.addEventListener("click",()=>{
    screens[0].classList.add("up");
});
timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"));
        unlimited = e.target.getAttribute("data-unlimited");
        screens[1].classList.add("up");
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
    createRandomCircle()
};

const decreaseTime = () => {
    if (unlimited) {
        setTime("∞");
        return;
    }

    if (time === 0)  finishGame();

    const current = --time;

    let milliseconds = time * 1000;
    let minutes = Math.floor(milliseconds / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

     seconds = seconds < 10 ? "0" + seconds : seconds;
     minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = `${minutes}:${seconds}`; 
    setTime(formattedTime);
};

const setTime = (time) => timeEl.innerHTML = time;


const createRandomCircle=() =>{
    if (!playing) return;

    const circle = document.createElement("div");
    const size = getRandomNumber (50, 100);
    const colors = ["#9CA3DB", "#FE4A49", "#FED766", "#32936F", "#BAD7F2"];
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

    //create new circle when current disappeared

    circle.addEventListener("animationend", () => {
        circle.remove();
        createRandomCircle();
        addMissed();
        calculateAccuracy();
    })
}

//get event on circle click

board.addEventListener("click", (e) => {
    if(e.target.classList.contains("circle")) {
        hits++;
        e.target.remove();
        createRandomCircle();
    } else {
        // if not clicked on a circle it is a miss
        missed++;
    }

    hitsEl.innerHTML = hits;
    calculateAccuracy();
})

const finishGame=()=> {
    playing = false;
    clearInterval(interval);
    board.innerHTML = "";
    screens[3].classList.add("up");
    hitsEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    accuracy.innerHTML = "0%";
    hitsOver.innerHTML = hits;
    accuracyOver.innerHTML =  `${accuracy}%`;
}

const addMissed=()=>{
     // first check if any lives remains
     if(hearts[2].classList.contains("dead")){
        finishGame();
    } else {
        // if any lives remains
        missed++;
        //add dead to 1 heart
         for (let i = 0; i < hearts.length; i++) {
            if(!hearts[i].classList.contains("dead")) {
               hearts[i].classList.add("dead");
               break;
            }
         }
    }

}

const calculateAccuracy=()=>{
    accuracy = (hits/(hits + missed)) * 100;
    accuracy = accuracy.toFixed(2);
    accuracyEl.innerHTML = `${accuracy}%`;
}

const getRandomNumber=(min, max)=>{
    // get a random between min and max
    return Math.round(Math.random() * (max - min) + min);
}
 
const restartGame = () => {
    finishGame();
    screens[1].classList.remove("up");
    screens[2].classList.remove("up");
    screens[3].classList.remove("up");
    time = 0;
    difficulty = 0;
    hits = 0;
    missed = 0;
    accuracy = 0;
    playing = false;
    unlimited = false;
    hearts.forEach((heart) => {
        heart.classList.remove("dead");
    })
}

restartBtns.forEach((btn) => {
    btn.addEventListener("click", restartGame);
});


let elem = document.documentElement;

const fullScreen = ()=>{
    if(elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if(elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if(elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if(elem.msRequestFullScreen) {
        elem.msRequestFullScreen();
    }
    // hide full screen btn and show minimize btn
    fullScreenBtn.style.display = "none";
    minimizeBtn.style.display = "block";
}

fullScreenBtn.addEventListener("click", fullScreen);

const minimize=()=>{
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullScreen) {
        document.webkitExitFullScreen();
    } else if(document.msExitFullScreen) {
        document.msExitFullScreen();
    }
    // hide minimize btn and show full screen btn
    minimizeBtn.style.display = "none";
    fullScreenBtn.style.display = "block";
} 

minimizeBtn.addEventListener("click", minimize);

const switchTheme = () => {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme = (dataTheme === "light") ? "dark" : "light"
    rootElem.setAttribute("data-theme", newTheme)
} 

themeSwitcherBtn.addEventListener("click", switchTheme);
