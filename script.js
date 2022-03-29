const play = document.querySelector('.play')
const options = document.querySelectorAll('.choose-box')
const chContainer = document.querySelector('.choose')
const startContainer = document.querySelector('.start')
const playArea = document.querySelector('.play-area')
const time = document.querySelector('.time')
const score = document.querySelector('.score')
const rectArea = playArea.getBoundingClientRect();
const topArea = rectArea.top + 150;
const bottomArea = rectArea.bottom - 150
const rightArea = rectArea - 150
const leftArea = rectArea.left + 150

function playGame() {
    startContainer.style.transform = "translateY(-60%)"
    chContainer.style.transform = "translateY(-100%)"
}

function chooseInsect(){
    chContainer.style.transform = "translateY(-200%)"
    playArea.style.transform = "translateY(-200%)"
}

options.forEach((option, idx) => {
    option.addEventListener('click', () => {
        chooseInsect()
        setInterval(timer, 1000)
        const alert = document.createElement('div')
        alert.classList.add('stop-game')
        if(option.id === 'i-fly') {
            init(option.id)
        }
        else if (option.id === 'i-mosquito') {
            init(option.id)
        }
        else if (option.id === 'i-roach') {
            init(option.id)
        } 
        else if (option.id === 'i-spider'){
            init(option.id)
        }
    })
})

let scoreCounter = 0

function init(option) {
    let insectSpace = document.createElement('div')
    insectSpace.classList.add(option)
    playArea.appendChild(insectSpace)
    insectSpace.style.left = getRandomNum(leftArea, rightArea) - rectArea.left + 'px'
    insectSpace.style.top = getRandomNum(rectArea.topArea, bottomArea) - rectArea.top + 'px'
    insectSpace.style.transform = `rotate(${getRandomNum(0,360)}deg)`
    
    let insects = document.querySelectorAll('.' + option)
    insects.forEach((insect, idx) => {
        insect.addEventListener('click', () => {
            scoreCounter++
            console.log('INIT CLICK: ' + insects.length)
            score.innerHTML = `Score: ${scoreCounter}`
            insects[idx].classList.add('i-hitted')
          iFeeder(option)
        })
    })
}

function createInsects(option) {
    for(let i = 0; i < 2; i++){
        let insectSpace = document.createElement('div')
        insectSpace.classList.add(option)
        playArea.appendChild(insectSpace)
        insectSpace.style.left = getRandomNum(rectArea.left, rectArea.right - 100) - rectArea.left + 'px'
        insectSpace.style.top = getRandomNum(rectArea.top, rectArea.bottom - 100) - rectArea.top + 'px'
        insectSpace.style.transform = `rotate(${getRandomNum(0, 360)}deg)`
    }
}

function iFeeder(option) {
createInsects(option)
   const parent = document.getElementById('play-area');
   const last = parent.lastChild
   const penultimate = parent.childNodes[parent.childNodes.length - 2]
       last.addEventListener('click', () => {
        scoreCounter++
        score.innerHTML = `Score: ${scoreCounter}`
        last.classList.add('i-hitted')
        console.log('FAclick')
        iFeederB(option)
       })

       penultimate.addEventListener('click', () => {
           scoreCounter++
           score.innerHTML = `Score: ${scoreCounter}`
            penultimate.classList.add('i-hitted')
            iFeederB(option)
       })
       stopGame()
}

function iFeederB(option){
    createInsects(option)
    const parent = document.getElementById('play-area')
    const last = parent.lastChild
    const penultimate = parent.childNodes[parent.childNodes.length - 2]
    last.addEventListener('click', () => {
        last.classList.add('i-hitted')
        scoreCounter++
        score.innerHTML = `Score: ${scoreCounter}`
        console.log('FBclick')
        iFeederC(option)
    })

    penultimate.addEventListener('click', () => {
        scoreCounter++
        score.innerHTML = `Score: ${scoreCounter}`
        penultimate.classList.add('i-hitted')
        iFeederC(option)
    })
    stopGame()
}

function iFeederC(option){
    createInsects(option)
    const parent = document.getElementById('play-area')
    const last = parent.lastChild
    const penultimate = parent.childNodes[parent.childNodes.length - 2]

    last.addEventListener('click', () => {
        console.log('FCclick')
        scoreCounter++
        score.innerHTML = `Score: ${scoreCounter}`
        last.classList.add('i-hitted')
        iFeeder(option)
    })

    penultimate.addEventListener('click', () => {
        scoreCounter++
        score.innerHTML = `Score: ${scoreCounter}`
        penultimate.classList.add('i-hitted')
        iFeeder(option)
    })
    stopGame()
}

function getRandomNum(min, max){
    min = Math.ceil(min)
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let second = 0;
let minutes = 0;
function timer(){
    second++
    if(second < 10){
        if(minutes < 10){
             time.innerHTML = `0${minutes}:0${second}`;
        } else {
            time.innerHTML = `${minutes}:0${second}`
            }
        } else {
            if(minutes < 10){
                time.innerHTML = `0${minutes}:${second}`
            } else {
                time.innerHTML = `${minutes}:${second}`
            }
        }

        if(second > 60){
            minutes++
            second = 0
            if(minutes < 10){
                time.innerHTML = `0${minutes}:0${second}`
            } else {
                time.innerHTML = `${minutes}:0${second}`
            }
        }
    }

function stopGame(){
    if(scoreCounter === 15){
        const alert = document.querySelector('.stop-stripe')
        alert.classList.add('stop-active')
    }
}