const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list"),
    timeEl = document.querySelector("#time"),
    board = document.querySelector("#board"),
    hitsEl = document.querySelector("#hits"),
    accuracyEl = document.querySelector("#accuracy"),
    hitsOver = document.querySelector("#hits-over"),
    accuracyOver = document.querySelector("#accuracy-over"),
    hearts = document.querySelectorAll(".heart"),
    restartBtns = document.querySelectorAll(".restart"),
    fullScreenBtn = document.querySelector("#fullscreen"),
    minimizeBtn = document.querySelector("#minimize");

let time = 0,
    unlimited = false,
    difficulty = 0,
    playing= false,
    hits = 0,
    missed = 0,
    accuracy = 0,
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
        finishGame();
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
        //increase hits by 1
        hits++;
        //remove circle
        e.target.remove();
        //create next circle
        createRandomCircle();
    } else {
        // if not clicked on a circle it is a miss
        missed++;
    }
    
    //show hits on document
    hitsEl.innerHTML = hits;
    calculateAccuracy();
})

function finishGame() {
    playing = false;
    clearInterval(interval);
    board.innerHTML = "";
    screens[3].classList.add("up");
    hitsEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    accuracy.innerHTML = "0%";
    //final stats
    hitsOver.innerHTML = hits;
    accuracyOver.innerHTML =  `${accuracy}%`;
}

function addMissed() {
     // first check if any lives remains
     if(
        hearts[0].classList.contains("dead") &&
        hearts[1].classList.contains("dead") &&
        hearts[2].classList.contains("dead")
    ) { // if all the hearts are dead
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

function calculateAccuracy() {
    accuracy = (hits/(hits + missed)) * 100;
    accuracy = accuracy.toFixed(2);
    accuracyEl.innerHTML = `${accuracy}%`;
}

function getRandomNumber(min, max) {
    // get a random between min and max
    return Math.round(Math.random() * (max - min) + min);
}
 
restartBtns.forEach((btn) => {
    btn.addEventListener("click", restartGame);
});

function restartGame() {
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

let elem = document.documentElement;

fullScreenBtn.addEventListener("click", fullScreen);

function fullScreen() {
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

minimizeBtn.addEventListener("click", minimize);

function minimize() {
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